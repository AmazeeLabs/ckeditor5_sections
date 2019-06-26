<?php

namespace Drupal\ckeditor5_sections\TypedData;

use Drupal\Core\TypedData\DataDefinitionInterface;
use Drupal\Core\TypedData\MapDataDefinition;

/**
 * Data definition class for the DocumentSection typed data plugins.
 */
class DocumentSectionDataDefinition extends MapDataDefinition {

  /**
   * {@inheritdoc}
   */
  public static function create($section_type = NULL) {
    $data_type = 'section';
    if (!empty($section_type)) {
      $data_type = "section:{$section_type}";
    }
    $values = \Drupal::typedDataManager()->getDefinition($data_type);
    $definition = new static(is_array($values) ? $values : []);
    // $definition->setDataType($data_type);
    if (!empty($section_type)) {
      $definition->setSectionType($section_type);
    }
    return $definition;
  }

  /**
   * {@inheritdoc}
   */
  public static function createFromDataType($data_type) {
    $parts = explode(':', $data_type);
    if ($parts[0] != 'section') {
      throw new \InvalidArgumentException('Data type must be in the form of "section:SECTION_TYPE".');
    }
    return static::create(
      isset($parts[1]) ? $parts[1] : NULL
    );
  }

  /**
   * Sets the SectionType constraint.
   *
   * @param string $section_type
   *
   * @return \Drupal\ckeditor5_sections\TypedData\DocumentSectionDataDefinition
   */
  public function setSectionType($section_type) {
    // @todo: clarify if this is really a constraint, or whether you want to
    // just store the section type?
    return $this->addConstraint('SectionType', ['type' => $section_type]);
  }

  /**
   * Returns the current SectionType constraint.
   *
   * @return string|null
   */
  public function getSectionType() {
    return isset($this->definition['constraints']['SectionType']) ? $this->definition['constraints']['SectionType']['type'] : NULL;
  }

  /**
   * {@inheritdoc}
   */
  public function getDataType() {
    $data_type = 'section';
    if ($section_type = $this->getSectionType()) {
      $data_type .= ':' . $section_type;
    }
    return $data_type;
  }

  /**
   * {@inheritdoc}
   */
  public function getPropertyDefinitions() {
    if (!isset($this->propertyDefinitions)) {
      $this->propertyDefinitions = [];

      if ($section_type = $this->getSectionType()) {
        $section_types = \Drupal::service('ckeditor5_sections.sections_collector')->getSectionDefinitions();
        if (!empty($section_types[$section_type])) {
          $this->propertyDefinitions['section_type'] = \Drupal::typedDataManager()->createDataDefinition('string')
            ->setLabel('Type');
          foreach ($section_types[$section_type]['fields'] as $field_name => $field) {
            if (!empty($field['cardinality']) && $field['cardinality'] === 'multiple') {
              $this->propertyDefinitions[$field_name] = \Drupal::typedDataManager()->createListDataDefinition($field['type'])
                ->setLabel($field['label']);
            }
            else {
              $this->propertyDefinitions[$field_name] = \Drupal::typedDataManager()->createDataDefinition($field['type'])
                ->setLabel($field['label']);
            }

            $this->applyConstraints($this->propertyDefinitions[$field_name], $field);
          }
        }
      }
    }
    return $this->propertyDefinitions;
  }

  /**
   * Apply core constraints (ck-min/ck-max).
   *
   * @param \Drupal\Core\TypedData\DataDefinitionInterface $data
   * @param $field
   */
  protected function applyCoreConstraints(DataDefinitionInterface $data, $field) {
    // "System" constraints.
    if (isset($field['attributes']) && (isset($field['attributes']['ck-min']) || isset($field['attributes']['ck-max']))) {
      $options = [
        'min' => isset($field['attributes']['ck-min']) ? (int) $field['attributes']['ck-min'] : NULL,
        'max' => isset($field['attributes']['ck-max']) ? (int) $field['attributes']['ck-max'] : NULL,
      ];

      if ($data->getDataType() === 'string') {
        $data->addConstraint('Length', $options);

        // Length constraint does not work on empty strings / null values.
        // @see https://symfony.com/doc/3.4/reference/constraints/Length.html
        if ($options['min'] > 0) {
          $data->addConstraint('NotBlank');
        }
      }
      else {
        $data->addConstraint('Count', $options);
      }
    }
    // @todo: do we need to validate ck-contains?
  }

  /**
   * Apply core validation and name validation rules/constraints.
   *
   * @param \Drupal\Core\TypedData\DataDefinitionInterface $data
   * @param $field_name
   * @param $field
   */
  public function applyConstraints(DataDefinitionInterface $data, $field) {
    $this->applyCoreConstraints($data, $field);
    // If we have a named validation rule.
    if (isset($field['attributes']) && !empty($field['attributes']['ck-validation'])) {
      $data->addConstraint('SectionValidation', [
        'name' => $field['attributes']['ck-validation'],
        'attributes' => $field['attributes'],
      ]);
    }
    // @todo: add alter hook.
  }

}
