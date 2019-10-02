<?php

namespace Drupal\ckeditor5_sections\Plugin\Validation\Constraint;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class SectionConflictConstraintValidator extends ConstraintValidator {

  public function validate($value, Constraint $constraint) {
    foreach ($value as $item) {
      if (isset($item->mergeResult)) {
        $dom = new \DOMDocument();
        libxml_use_internal_errors(true);
        $dom->loadHTML($item->mergeResult);
        $xpath = new \DOMXPath($dom);
        $conflicts = $xpath->query('//*[local-name() = \'ck-conflict-text\' or local-name() =\'ck-conflict-media\' or (local-name() = \'ck-button\' and @left)]')->count();
        if ($conflicts > 0) {
          $this->context->buildViolation($constraint->containsConflicts)
            ->setParameter('%count', $conflicts)
            ->setPlural($conflicts)
            ->addViolation();
        }
      }
    }
  }

}
