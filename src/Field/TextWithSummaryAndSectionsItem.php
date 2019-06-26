<?php

namespace Drupal\ckeditor5_sections\Field;

use Drupal\ckeditor5_sections\DocumentSectionsExtractor;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\TypedData\DataDefinition;
use Drupal\text\Plugin\Field\FieldType\TextWithSummaryItem;

class TextWithSummaryAndSectionsItem extends TextWithSummaryItem {

  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {
    $properties = parent::propertyDefinitions($field_definition);

    $properties['sections'] = DataDefinition::create('any')
      ->setLabel(t('Sections'))
      ->setDescription(t('The extracted sections of the field.'))
      ->setComputed(TRUE)
      ->setClass(DocumentSectionsExtractor::class)
      ->setSetting('text source', 'value')
      ->setDataType('section')
      ->setInternal(FALSE);

    return $properties;
  }

}
