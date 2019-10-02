<?php

namespace Drupal\ckeditor5_sections\Plugin\SectionValidation;

use Drupal\ckeditor5_sections\SectionValidation\SectionValidationBase;
use Drupal\ckeditor5_sections\Exceptions\SectionValidationException;

/**
 * Base class for section validation plugins.
 *
 * @SectionValidation(
 *   id = "MediaValidation",
 *   label = @Translation("Section Media validation", context = "Validation")
 * )
 */
class SectionMediaValidation extends SectionValidationBase {

  /**
   * Returns attributes passed into section validation plugin.
   *
   * {@inheritDoc}
   */
  public function validate($data) {
    if (empty($data->get('data-media-uuid')->getValue())) {
      throw new SectionValidationException('Media is required');
    }
  }

}
