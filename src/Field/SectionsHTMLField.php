<?php

namespace Drupal\ckeditor5_sections\Field;

use Drupal\Core\TypedData\TypedData;

/**
 * Reconstruct the html document from data and templates.
 */
class SectionsHTMLField extends TypedData {

  /**
   * {@inheritdoc}
   */
  public function getValue() {
    $item = $this->getParent();
    // Check temporary storage for a merge result string.
    // TODO: Move document merge to json.
    if ($item->mergeResult) {
      return $item->mergeResult;
    }

    $data = $item->sections;

    /** @var \Drupal\ckeditor5_sections\DocumentConverter $documentConverter */
    $documentConverter = \Drupal::service('ckeditor5_sections.document_converter');

    if (!$data) {
      return '';
    }
    $document = $documentConverter->buildDocument($data);

    $document = $document->saveHTML($document->documentElement);
    return $document;
  }

  public function setValue($value, $notify = TRUE) {
    if ($value) {
      /** @var \Drupal\ckeditor5_sections\DocumentConverter $documentConverter */
      $documentConverter = \Drupal::service('ckeditor5_sections.document_converter');
      $doc = $documentConverter->extractSectionData($value);
      $this->parent->setValue(json_encode($doc->getValue()));
      // Check temporary storage for a merge result string.
      // TODO: Move document merge to json.
      if ($this->parent->mergeResult) {
        $this->parent->mergeResult = $value;
      }
    }
  }

}
