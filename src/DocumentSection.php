<?php

namespace Drupal\ckeditor5_sections;

/**
 * Class DocumentSection.
 */
class DocumentSection implements DocumentSectionInterface {

  protected $sectionType;

  protected $fields;

  public function __construct($section_type, array $fields = []) {
    $this->sectionType = $section_type;
    $this->fields = $fields;
  }

  public function getType() {
    return $this->sectionType;
  }

  public function set($field_name, $value = NULL) {
    if (is_null($value)) {
      if (isset($this->fields[$field_name])) {
        unset($this->fields[$field_name]);
      }
    }
    else {
      $this->fields[$field_name] = $value;
    }
  }

  public function get($field_name) {
    return $this->fields[$field_name] ?? NULL;
  }

  public function getFields() {
    return $this->fields;
  }

  /**
   * Turn a document section into its simple php array representation.
   */
  public function getValue() {
    $value = [
      '__type' => substr($this->sectionType, strlen('section:')),
    ];
    foreach ($this->fields as $key => $field) {
      $value[$key] = $field instanceof DocumentSection ? $field->getValue() : $field;
    }
    return $value;
  }

  public static function fromValue(array $value) {
    if (!array_key_exists('__type', $value)) {
      return NULL;
    }
    $type = 'section:' . $value['__type'];
    unset($value['__type']);
    $fields = array_map(function ($field) {
      if (!is_array($field)) {
        return $field;
      }
    }, $value);
  }

}
