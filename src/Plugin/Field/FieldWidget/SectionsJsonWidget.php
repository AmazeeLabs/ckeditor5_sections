<?php

namespace Drupal\ckeditor5_sections\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\Plugin\Field\FieldWidget\StringTextareaWidget;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'sections_editor' widget.
 *
 * @FieldWidget(
 *   id = "sections_json",
 *   label = @Translation("Sections JSON"),
 *   field_types = {
 *     "sections"
 *   }
 * )
 */
class SectionsJsonWidget extends StringTextareaWidget {

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $element = parent::formElement($items, $delta, $element, $form, $form_state);
    return $element;
  }

}
