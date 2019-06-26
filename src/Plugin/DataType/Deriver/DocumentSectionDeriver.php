<?php

namespace Drupal\ckeditor5_sections\Plugin\DataType\Deriver;

use Drupal\ckeditor5_sections\DocumentSection;
use Drupal\Component\Plugin\Derivative\DeriverBase;

/**
 * Provides data type plugins for each document section type.
 */
class DocumentSectionDeriver extends DeriverBase {

  /**
   * {@inheritdoc}
   */
  public function getDerivativeDefinitions($base_plugin_definition) {
    // Also keep the 'entity' defined as is.
    $this->derivatives[''] = $base_plugin_definition;
    $section_types = $this->getSectionTypes();
    foreach ($section_types as $section_type) {
      $this->derivatives[$section_type->getType()] = $base_plugin_definition;
    }
    return $this->derivatives;
  }

  /**
   * Returns an array with all the available document section types from the
   * system.
   *
   * @return \Drupal\ckeditor5_sections\DocumentSection[]
   */
  protected function getSectionTypes() {
    $section_types = \Drupal::getContainer()->get('ckeditor5_sections.document_converter')->getSectionTypeDefinitions();
    return array_map(function ($section) {
      return new DocumentSection($section['type']);
    }, $section_types);
  }

}
