<?php

namespace Drupal\ckeditor5_sections\Plugin\Deriver;

use Drupal\graphql\Utility\StringHelper;

/**
 * Deriver for section types.
 */
class SectionTypeDeriver extends SectionDeriverBase {

  /**
   * {@inheritdoc}
   */
  public function getDerivativeDefinitions($basePluginDefinition) {
    foreach ($this->getSectionTypeDefinitions() as $sectionType => $definition) {
      $derivative = [
        'name' => StringHelper::camelCase($sectionType),
        'interfaces' => ['Section'],
        'type' => $sectionType,
      ] + $basePluginDefinition;
      $this->derivatives[$sectionType] = $derivative;
    }
    return parent::getDerivativeDefinitions($basePluginDefinition);
  }

}
