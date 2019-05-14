<?php

namespace Drupal\ckeditor5_sections;

use Drupal\Core\Config\ConfigEvents;
use Drupal\Core\Config\ConfigImporterEvent;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Sections collector service class.
 */
class SectionsCollector implements SectionsCollectorInterface, EventSubscriberInterface {

  /**
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  protected $sections;

  /**
   * SectionsCollector constructor.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   */
  public function __construct(EntityTypeManagerInterface $entityTypeManager) {
    $this->entityTypeManager = $entityTypeManager;
  }

  /**
   * Returns an array with all the available templates from the system.
   *
   * @return array
   *  An array of all the available sections.
   */
  public function getSections() {
    if (!isset($this->sections)) {

      /** @var \Drupal\Core\Config\Entity\ConfigEntityStorageInterface $storage */
      $storage = $this->entityTypeManager->getStorage('editor');

      /** @var Editor[] $editors */
      $editors = $storage->loadByProperties([
        'editor' => 'ckeditor5_sections',
      ]);

      /** @var \Drupal\ckeditor5_sections\SectionsCollectorInterface $collector */
      $templates = [];
      foreach($editors as $editor) {
        $templates = array_merge($templates, $this->collectSectionsFromDirectory($editor->getSettings()['templateDirectory']));
      }

      $this->sections = $templates;
    }
    return $this->sections;
  }

  /**
   * {@inheritdoc}
   */
  protected function collectSectionsFromDirectory($directory) {
    if ($directory === '') {
      $directory = drupal_get_path('module', 'ckeditor5_sections') . '/sections';
    }
    $files = file_scan_directory($directory, '/.*.yml/');
    $sections = [];
    foreach ($files as $file => $fileInfo) {
      $info = \Symfony\Component\Yaml\Yaml::parseFile($file);
      $sections[$fileInfo->name] = [
        'label' => array_key_exists('label', $info) ? $info['label'] : $fileInfo->name,
        'icon' => array_key_exists('icon', $info) ? $info['icon'] : 'text',
        'template' => file_get_contents(dirname($fileInfo->uri) . '/' . $fileInfo->name . '.html'),
      ];
    }
    return $sections;
  }

  /**
   * Fires after the configuration import.
   *
   * @param \Drupal\Core\Config\ConfigImporterEvent $event
   */
  public function afterConfigImport(ConfigImporterEvent $event) {
    foreach ($event->getChangelist() as $list) {
      foreach ($list as $item) {
        if (strpos($item, 'editor.editor.') === 0) {
          // Clear sections cache if there are changes in the editor config.
          $this->sections = NULL;
          break 2;
        }
      }
    }
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events = [];
    $events[ConfigEvents::IMPORT][] = ['afterConfigImport'];
    return $events;
  }

}
