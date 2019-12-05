<?php

namespace Drupal\ckeditor5_sections\Plugin;

use Drupal\ckeditor5_sections\DocumentSection;
use Drupal\ckeditor5_sections\Discovery\SectionDiscoveryDecorator;
use Drupal\ckeditor5_sections\Plugin\Context\DocumentSectionContext;
use Drupal\Core\Extension\ThemeHandlerInterface;
use Drupal\Core\Plugin\Context\Context;
use Drupal\Core\Plugin\DefaultPluginManager;
use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Plugin\Discovery\AnnotatedClassDiscovery;

/**
 * Provides the Section plugin plugin manager.
 */
class SectionPluginManager extends DefaultPluginManager {

  /**
   * @var \Drupal\Core\Extension\ThemeHandlerInterface
   */
  protected $themeHandler;

  /**
   * Constructs a new SectionPluginManager object.
   *
   * @param \Traversable $namespaces
   *   An object that implements \Traversable which contains the root paths
   *   keyed by the corresponding namespace to look for plugin implementations.
   * @param \Drupal\Core\Cache\CacheBackendInterface $cache_backend
   *   Cache backend instance to use.
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   *   The module handler to invoke the alter hook with.
   */
  public function __construct(\Traversable $namespaces, CacheBackendInterface $cache_backend, ModuleHandlerInterface $module_handler, ThemeHandlerInterface $theme_handler) {
    parent::__construct('Plugin/SectionPlugin', $namespaces, $module_handler, 'Drupal\ckeditor5_sections\Plugin\SectionPluginInterface', 'Drupal\ckeditor5_sections\Annotation\SectionPlugin');

    $this->alterInfo('section_info');
    $this->setCacheBackend($cache_backend, 'section_info');
    $this->themeHandler = $theme_handler;
  }

  /**
   * {@inheritdoc}
   */
  protected function getDiscovery() {
    if (!isset($this->discovery)) {
      // Use default annotation based discovery.
      $discovery = new AnnotatedClassDiscovery($this->subdir, $this->namespaces, $this->pluginDefinitionAnnotationName, $this->additionalAnnotationNamespaces);

      // BC: ensure that the "old" way of determining
      if (
        \Drupal::getContainer()->hasParameter('ckeditor5_sections.template_directory') &&
        \Drupal::getContainer()->getParameter('ckeditor5_sections.template_directory')
      ) {
        $all_directories = [
          \Drupal::getContainer()->getParameter('ckeditor5_sections.template_directory')
        ];
      }
      else {
        $module_directories = $this->moduleHandler->getModuleDirectories();
        $all_directories = array_merge(
          $module_directories,
          $this->themeHandler->getThemeDirectories()
        );

        // Search for sections in subdirectory sections/, under
        // modules/profiles and themes, and the core directory.
        $all_directories = array_map(function ($dir) {
          return [$dir . '/sections'];
        }, $all_directories);
      }

      $this->discovery = new SectionDiscoveryDecorator($discovery, $all_directories);
    }
    return $this->discovery;
  }

  /**
   * Helper function that creates a section plugin from values (auto-inspecting
   * DocumentS type instantiate it).
   *
   * @param $value  array|DocumentSection
   *   Array or DocumentSection to instantiate plugin from.
   * @param $configuration  array
   *   Array of configuration additionally passed to plugin instance.
   *
   * @return \Drupal\ckeditor5_sections\Plugin\SectionPluginBase
   * @throws \Drupal\Component\Plugin\Exception\ContextException
   * @throws \Drupal\Component\Plugin\Exception\PluginException
   */
  public function createFromValue($value, $configuration = []) {
    /** @var DocumentSection $document_section */
    $document_section = DocumentSection::fromValue($value);
    /** @var \Drupal\ckeditor5_sections\Plugin\SectionPluginBase $section_plugin */
    $section_plugin = $this->createInstance(str_replace('section:', $document_section->getType(), ''), $configuration);
    $section_plugin->setContext('document_section', new Context(new DocumentSectionContext(), $document_section));
    return $section_plugin;
  }
}
