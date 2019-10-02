<?php

namespace Drupal\ckeditor5_sections\Plugin\Validation\Constraint;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

/**
 * Section validation constraint.
 */
class SectionTypeValidator extends ConstraintValidator {

  /**
   * {@inheritdoc}
   */
  public function validate($value, Constraint $constraint) {
    if ($value['__type'] !== $constraint->type && $constraint->type !== 'Section') {
      $this->context->buildViolation('Invalid type provided')
        ->setInvalidValue($value)
        ->setCode(SectionTypeConstraint::INVALID_SECTION_TYPE)
        ->addViolation();
    }
  }

}
