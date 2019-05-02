<?php

namespace Drupal\ckeditor5_sections;

use Drupal\Core\Entity\EntityTypeManagerInterface;

/**
 * Sections collector service class.
 */
class SectionsCollector implements SectionsCollectorInterface {

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
        'status' => TRUE
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

}
