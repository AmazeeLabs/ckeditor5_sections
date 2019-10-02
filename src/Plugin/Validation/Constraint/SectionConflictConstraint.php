<?php

namespace Drupal\ckeditor5_sections\Plugin\Validation\Constraint;

use Symfony\Component\Validator\Constraint;

/**
 * Verify that there are no remaining conflict elements in the document.
 *
 * @Constraint(
 *   id = "SectionConflict",
 *   label = @Translation("Section conflict", context = "Validation"),
 *   type = "string"
 * )
 */
class SectionConflictConstraint extends Constraint {
  public $containsConflicts = 'Document contains a conflict. Please resolve it first.|Document contains %count conflicts. Please resolve them first.';
}
