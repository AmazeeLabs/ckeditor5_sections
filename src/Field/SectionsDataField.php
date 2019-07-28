<?php

namespace Drupal\ckeditor5_sections\Field;

use Drupal\ckeditor5_sections\DocumentSection;
use Drupal\Core\TypedData\TypedData;

/**
 * Computed field proparty implementation to extract typed sections data.
 */
class SectionsDataField extends TypedData {

  /**
   * Cached sections.
   *
   * @var array|null
   */
  protected $sections = NULL;

  /**
   * {@inheritdoc}
   */
  public function getValue() {
    if ($this->sections !== NULL) {
      return $this->sections;
    }

    $item = $this->getParent();
    $text = $item->json;

    /* @var \Drupal\ckeditor5_sections\DocumentConverterInterface $parser */
    $this->sections = DocumentSection::fromValue(json_decode($text, TRUE));

    // Invoke alter hooks before returning data.
    if ($this->sections) {
      \Drupal::moduleHandler()->alter('section_data', $this->sections, $item);
    }
    return $this->sections;
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
