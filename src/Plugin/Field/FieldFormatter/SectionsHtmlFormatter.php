<?php

namespace Drupal\ckeditor5_sections\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\text\Plugin\Field\FieldFormatter\TextDefaultFormatter;

/**
 * Plugin implementation of the 'sections_html' formatter.
 *
 * @FieldFormatter(
 *   id = "sections_html",
 *   label = @Translation("Sections HTML"),
 *   field_types = {
 *     "sections",
 *   }
 * )
 */
class SectionsHtmlFormatter extends TextDefaultFormatter {
  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = [];

    // The ProcessedText element already handles cache context & tag bubbling.
    // @see \Drupal\filter\Element\ProcessedText::preRenderText()
    foreach ($items as $delta => $item) {
      $elements[$delta] = [
        '#type' => 'processed_text',
        '#text' => $item->html,
        '#format' => 'sections_data',
        '#langcode' => $item->getLangcode(),
      ];
    }

    return $elements;
  }

}
