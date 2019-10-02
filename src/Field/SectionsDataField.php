<?php

namespace Drupal\ckeditor5_sections\Field;

use Drupal\ckeditor5_sections\DocumentSection;
use Drupal\Core\TypedData\TypedData;

/**
 * Computed field proparty implementation to extract typed sections data.
 */
class SectionsDataField extends TypedData {

  /**
   * {@inheritdoc}
   */
  public function getValue() {
    $item = $this->getParent();
    $text = $item->json;

    /* @var \Drupal\ckeditor5_sections\DocumentConverterInterface $parser */
    $sections = DocumentSection::fromValue(json_decode($text, TRUE));

    // Invoke alter hooks before returning data.
    if ($sections) {
      \Drupal::moduleHandler()->alter('section_data', $sections, $item);
    }
    return $sections;
  }

  public function setValue($value, $notify = TRUE) {
    if ($value) {
      if (is_array($value)) {
        $this->parent->setValue(json_encode($value));
      }
      if ($value instanceof DocumentSection) {
        $this->parent->setValue(json_encode($value->getValue()));
      }
    }
  }


}
