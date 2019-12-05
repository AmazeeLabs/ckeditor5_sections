<?php

namespace Drupal\ckeditor5_sections\Plugin\Context;

use Drupal\Core\Plugin\Context\ContextDefinition;

/**
 * Defines a class to provide document section context definitions.
 */
class DocumentSectionContext extends ContextDefinition {

  /**
   * {@inheritDoc}
   */
  public function __construct($label = NULL, $required = TRUE, $multiple = FALSE, $description = NULL, $default_value = NULL) {
    // @todo: as soon as DocumentSection is exposed to TypedData we can map it
    // better.
    parent::__construct('any', $label, $required, $multiple, $description, $default_value);
  }

}
