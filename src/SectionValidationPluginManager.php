<?php

namespace Drupal\ckeditor5_sections;

use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Plugin\DefaultPluginManager;

/**
 * A plugin manager for source plugins.
 */
class SectionValidationPluginManager extends DefaultPluginManager {

  /**
   * Constructs a SectionValidationPluginManager object.
   *
   * @param \Traversable $namespaces
   *   An object that implements \Traversable which contains the root paths
   *   keyed by the corresponding namespace to look for plugin implementations.
   * @param \Drupal\Core\Cache\CacheBackendInterface $cache_backend
   *   Cache backend instance to use.
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   *   The module handler to invoke the alter hook with.
   */
  public function __construct(\Traversable $namespaces, CacheBackendInterface $cache_backend, ModuleHandlerInterface $module_handler) {
    parent::__construct('Plugin/SectionValidation', $namespaces, $module_handler, 'Drupal\ckeditor5_sections\SectionValidation\SectionValidationInterface', 'Drupal\ckeditor5_sections\Annotation\SectionValidation');
    $this->alterInfo('ckeditor5_sections_section_validation_plugin_info');
    $this->setCacheBackend($cache_backend, 'ckeditor5_sections_section_validation_plugin');
  }

}
