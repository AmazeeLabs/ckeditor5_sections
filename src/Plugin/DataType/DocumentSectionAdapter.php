<?php

namespace Drupal\ckeditor5_sections\Plugin\DataType;

use Drupal\Core\TypedData\Plugin\DataType\Map;

/**
 * Defines the "document section" data type.
 *
 * @DataType(
 *   id = "section",
 *   label = @Translation("Document section"),
 *   description = @Translation("All kind of document sections."),
 *   deriver = "\Drupal\ckeditor5_sections\Plugin\DataType\Deriver\DocumentSectionDeriver",
 *   definition_class = "\Drupal\ckeditor5_sections\TypedData\DocumentSectionDataDefinition"
 * )
 */
class DocumentSectionAdapter extends Map {

  /**
   * {@inheritdoc}
   */
  public function getProperties($include_computed = FALSE) {
    $properties = [];
    if ($this->definition->getDataType() == 'section:Section') {
      $this->definition = $this->getTypedDataManager()->createDataDefinition('section:' . $this->getValue()['__type']);
    }
    foreach ($this->definition->getPropertyDefinitions() as $name => $definition) {
      // Exclude entity from properties.
      if (($include_computed || !$definition->isComputed()) && $name !== 'entity') {
        $properties[$name] = $this->get($name);
      }
    }
    return $properties;
  }

}
