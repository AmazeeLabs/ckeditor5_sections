<?php

namespace Drupal\ckeditor5_sections;

use Drupal\Core\Config\ConfigEvents;
use Drupal\Core\Config\ConfigImporterEvent;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Yaml\Yaml;

/**
 * Sections collector service class.
 */
class SectionsCollector implements SectionsCollectorInterface, EventSubscriberInterface {

  /**
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * @var \Drupal\ckeditor5_sections\TwigProcessor
   */
  protected $twigProcessor;

  protected $sections;

  /**
   * SectionsCollector constructor.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   * @param \Drupal\ckeditor5_sections\TwigProcessor $twigProcessor
   */
  public function __construct(EntityTypeManagerInterface $entityTypeManager, TwigProcessor $twigProcessor) {
    $this->entityTypeManager = $entityTypeManager;
    $this->twigProcessor = $twigProcessor;
  }

  /**
   * Returns an array with all the available templates from the system.
   *
   * @return array
   *   An array of all the available sections.
   */
  public function getSections($directory = NULL) {
    if ($directory) {
      return $this->collectSectionsFromDirectory($directory);
    }
    if (!isset($this->sections)) {

      /** @var \Drupal\Core\Config\Entity\ConfigEntityStorageInterface $storage */
      $storage = $this->entityTypeManager->getStorage('editor');

      /** @var Editor[] $editors */
      $editors = $storage->loadByProperties([
        'editor' => 'ckeditor5_sections',
        'status' => TRUE,
      ]);

      /** @var \Drupal\ckeditor5_sections\SectionsCollectorInterface $collector */
      $templates = [];
      foreach ($editors as $editor) {
        $templates = array_merge($templates, $this->collectSectionsFromDirectory($editor->getSettings()['templateDirectory']));
      }
      $this->sections = $templates;
    }
    return $this->sections;
  }

  /**
   * Returns all sections defined in templates/sections.
   *
   * @param null $directory
   *
   * @return array
   */
  public function getSectionDefinitions($directory = NULL) {
    /** @var \Drupal\ckeditor5_sections\DocumentConverter $document_converter */
    $document_converter = \Drupal::getContainer()->get('ckeditor5_sections.document_converter');

    $templates = $this->getSections();
    $section_types = [];
    foreach ($templates as $template) {
      $section_types = array_merge($section_types, $document_converter->extractSectionDefinitions($template['template']));
    }
    return $section_types;
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
    foreach ($files as $file => $file_info) {
      $info = Yaml::parseFile($file);
      $filename = dirname($file_info->uri) . '/' . $file_info->name;
      // If the template is a Twig file, process the Twig placeholders etc.
      if (file_exists($filename . '.html.twig')) {
        $file_path = $filename . '.html.twig';
        $template = $this->twigProcessor->processTwigTemplate($file_path);
      }
      else {
        $file_path = $filename . '.html';
        $template = file_get_contents($file_path);
      }
      $sections[$file_info->name] = [
        'label' => array_key_exists('label', $info) ? $info['label'] : $file_info->name,
        'icon' => array_key_exists('icon', $info) ? $info['icon'] : 'text',
        'template' => $template,
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
