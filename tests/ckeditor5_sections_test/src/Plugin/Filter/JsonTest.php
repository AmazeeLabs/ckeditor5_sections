<?php

namespace Drupal\ckeditor5_sections_test\Plugin\Filter;

use Drupal\filter\FilterProcessResult;
use Drupal\filter\Plugin\FilterBase;

/**
 * @Filter(
 *   id = "sections_json_test",
 *   title = @Translation("JSON Test"),
 *   description = @Translation("Test filter for json data"),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_TRANSFORM_REVERSIBLE
 * )
 */
class JsonTest extends FilterBase {

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode) {
    $result = new FilterProcessResult(str_replace('the headline', 'THE HEADLINE', $text));
    return $result;
  }

}
