<?php

namespace Drupal\ckeditor5_sections\Plugin\Deriver;

use Drupal\ckeditor5_sections\TypedData\DocumentSectionDataDefinition;
use Drupal\graphql\Utility\StringHelper;

/**
 * Deriver for section properties.
 */
class SectionPropertyDeriver extends SectionDeriverBase {

  /**
   * {@inheritdoc}
   */
  public function getDerivativeDefinitions($basePluginDefinition) {
    foreach ($this->getSectionTypeDefinitions() as $sectionType => $definition) {
      if ($definition instanceof DocumentSectionDataDefinition) {
        foreach ($definition->getPropertyDefinitions() as $propertyName => $propertyDefinition) {
          $derivative = [
            'parents' => [StringHelper::camelCase($sectionType)],
            'name' => StringHelper::propCase($propertyName),
            'type' => $propertyDefinition->isList() ? StringHelper::listType('Section') : $propertyDefinition->getDataType(),
            'propertyName' => $propertyName,
          ] + $basePluginDefinition;
          $this->derivatives["{$sectionType}-$propertyName"] = $derivative;
        }
      }
    }
    return parent::getDerivativeDefinitions($basePluginDefinition);
  }

}
