<?php

namespace Drupal\ckeditor5_sections\Plugin\Field\FieldType;

use Drupal\ckeditor5_sections\Field\SectionsDataField;
use Drupal\ckeditor5_sections\Field\SectionsHTMLField;
use Drupal\ckeditor5_sections\Field\SectionsProcessedDataField;
use Drupal\ckeditor5_sections\Field\SectionsProcessedHTMLField;
use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\TypedData\DataDefinition;
use Drupal\filter\Entity\FilterFormat;

/**
 * @FieldType(
 *   id="sections",
 *   label=@Translation("Sections"),
 *   default_formatter="sections_html",
 *   default_widget="sections_json",
 *   list_class = "\Drupal\ckeditor5_sections\Field\SectionsItemList",
 * )
 */
class SectionsItem extends FieldItemBase {

  /**
   * Temporary storage for a merge result string.
   * TODO: Move document merge to json.
   *
   * @type string
   */
  public $mergeResult;

  /**
   */
  public function fieldSettingsForm(array $form, FormStateInterface $form_state) {
    $element = [];

    $element['template'] = [
      '#type' => 'select',
      '#title' => $this->t('Template'),
      '#description' => $this->t('The template to use for this field type.'),
      '#default_value' => $this->getSetting('template'),
      '#required' => TRUE,
    ];
    /** @var \Drupal\ckeditor5_sections\SectionsCollectorInterface $sectionsCollector */
    $sectionsCollector = \Drupal::service('ckeditor5_sections.sections_collector');
    foreach ($sectionsCollector->getSections() as $id => $section) {
      $element['template']['#options'][$id] = $section['label'];
    }

    $element['filter_format'] = [
      '#type' => 'select',
      '#title' => $this->t('Filter format'),
      '#description' => $this->t('Select a filter format that will be applied to raw data.'),
      '#default_value' => $this->getSetting('filter_format'),
    ];

    $formats = FilterFormat::loadMultiple();
    foreach ($formats as $format) {
      $element['filter_format']['#options'][$format->id()] = $format->label();
    }

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {
    $properties = [];

    $properties['json'] = DataDefinition::create('string')
      ->setLabel('JSON string');

    $properties['sections'] = DataDefinition::create('section')
      ->setLabel('The sections object tree')
      ->setClass(SectionsDataField::class)
      ->setComputed(TRUE);

    $properties['sections_processed'] = DataDefinition::create('section')
      ->setLabel('The processed sections object tree')
      ->setClass(SectionsProcessedDataField::class)
      ->setSetting('processed', TRUE)
      ->setComputed(TRUE);

    $properties['html'] = DataDefinition::create('string')
      ->setLabel('HTML Document')
      ->setComputed(TRUE)
      ->setClass(SectionsHTMLField::class)
      ->setDescription('The assembled HTML document.');

    $properties['html_processed'] = DataDefinition::create('string')
      ->setLabel('Processed HTML Document')
      ->setComputed(TRUE)
      ->setClass(SectionsProcessedHTMLField::class)
      ->setSetting('processed', TRUE)
      ->setDescription('The assembled HTML document.');

    return $properties;
 }

  /**
   * {@inheritdoc}
   */
  public static function defaultFieldSettings() {
    return [
      'template' => 'page',
      'filter_format' => '',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public static function schema(FieldStorageDefinitionInterface $field_definition) {
    return [
      'columns' => [
        'json' => [
          'type' => 'text',
          'size' => 'big',
          'not null' => FALSE,
        ],
      ],
    ];
  }

  public function setValue($values, $notify = TRUE) {
    if (isset($this->properties['json'])) {
      unset($this->properties['json']);
    }
    parent::setValue($values, $notify);
  }


}
