<?php

namespace Drupal\ckeditor5_sections;

use Drupal\ckeditor5_sections\Plugin\SectionPluginInterface;
use Drupal\ckeditor5_sections\Plugin\SectionPluginManager;
use Drupal\Core\Config\ConfigEvents;
use Drupal\Core\Config\ConfigImporterEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class SectionPluginCollector implements SectionsCollectorInterface, EventSubscriberInterface {

  /**
   * @var \Drupal\ckeditor5_sections\Plugin\SectionPluginManager
   */
  protected $sectionPluginManager;

  /**
   * SectionsCollector constructor.
   */
  public function __construct(SectionPluginManager $sectionPluginManager) {
    $this->sectionPluginManager = $sectionPluginManager;
  }

  /**
   * {@inheritDoc}
   */
  public function getSections($directory = NULL) {
    /** @var SectionPluginInterface[] $definitions */
    $definitions = $this->sectionPluginManager->getDefinitions();
    $sections = [];
    // Using foreach as array_map cannot maintain associate array keys.
    foreach ($definitions as $id => $plugin) {
      /** @var SectionPluginInterface $section_plugin */
      $section_plugin = $this->sectionPluginManager->createInstance($id);
      $sections[$id] = $section_plugin->getSectionInfo();
    }
    return $sections;
  }

  /**
   * {@inheritDoc}
   */
  public function getSectionDefinitions($directory = NULL) {
    // @todo: We cannot inject this at the moment due to circular references.
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
   * {@inheritDoc}
   */
  public function getStyleSheets($directory = NULL) {
    /** @var SectionPluginInterface[] $definitions */
    $definitions = $this->sectionPluginManager->getDefinitions();
    $stylesheets = [];
    // Using foreach as array_map cannot maintain associate array keys.
    foreach ($definitions as $id => $plugin) {
      /** @var SectionPluginInterface $section_plugin */
      $section_plugin = $this->sectionPluginManager->createInstance($id);
      // @todo: move getStylesheetFilename to interface or determine how to handle
      // this (shouldn't we "auto declare" libraries instead?)
      $stylesheets[] = $section_plugin->getStylesheetFilename();
    }
    return $stylesheets;
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
          $this->sectionPluginManager->clearCachedDefinitions();
          return ;
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
