<?php

namespace Drupal\ckeditor5_sections\Field;

use Drupal\Core\TypedData\TypedData;

/**
 * Reconstruct the html document from data and templates.
 */
class SectionsProcessedHTMLField extends TypedData {
  /**
   * {@inheritdoc}
   */
  public function getValue() {
    $item = $this->getParent();
    $data = $item->sections_processed;

    /** @var \Drupal\ckeditor5_sections\DocumentConverter $documentConverter */
    $documentConverter = \Drupal::service('ckeditor5_sections.document_converter');

    if (!$data) {
      return '';
    }
    $document = $documentConverter->buildDocument($data);

    return $document->saveXML($document->documentElement, LIBXML_NOEMPTYTAG);
  }

  public function setValue($value, $notify = TRUE) {
    if ($value) {
      /** @var \Drupal\ckeditor5_sections\DocumentConverter $documentConverter */
      $documentConverter = \Drupal::service('ckeditor5_sections.document_converter');
      $doc = $documentConverter->extractSectionData($value);
      $this->parent->setValue(json_encode($doc->getValue()));
    }
  }

}
