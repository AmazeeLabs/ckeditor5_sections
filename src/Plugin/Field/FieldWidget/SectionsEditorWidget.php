<?php

namespace Drupal\ckeditor5_sections\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\Plugin\Field\FieldWidget\StringTextareaWidget;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'sections_editor' widget.
 *
 * @FieldWidget(
 *   id = "sections_editor",
 *   label = @Translation("Sections editor"),
 *   field_types = {
 *     "sections"
 *   }
 * )
 */
class SectionsEditorWidget extends StringTextareaWidget {

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function massageFormValues(array $values, array $form, FormStateInterface $form_state) {
    return array_map(function (array $item) {
      return ['html' => $item['html']['value']];
    }, $values);
  }

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $element['html'] = $element + [
      '#type' => 'text_format',
      '#format' => 'sections_data',
      '#allowed_formats' => ['sections_data'],
      '#default_value' => $items[$delta]->html,
      '#base_type' => 'textarea',
      '#rows' => $this->getSetting('rows'),
      '#placeholder' => $this->getSetting('placeholder'),
      '#attributes' => [
        'class' => ['js-text-full', 'text-full'],
        'data-sections-template' => $items->getSetting('template'),
      ],
    ];

    return $element;
  }

}
