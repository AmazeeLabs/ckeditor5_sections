<?php

namespace Drupal\ckeditor5_sections;

use Drupal\Core\Cache\CacheableMetadata;

/**
 * Class DocumentSection.
 *
 * Typed wrapper class for section data.
 */
class DocumentSection extends CacheableMetadata implements DocumentSectionInterface {

  /**
   * The section type.
   *
   * @var string
   */
  protected $sectionType;

  /**
   * All property values.
   *
   * @var array
   */
  protected $fields;

  /**
   * DocumentSection constructor.
   *
   * @param string $section_type
   *   The section type.
   * @param array $fields
   *   All field values as an array.
   */
  public function __construct($section_type, array $fields = []) {
    $this->sectionType = $section_type;
    $this->fields = $fields;
  }

  /**
   * Retrieve the section type id.
   *
   * @return string
   */
  public function getType() {
    return $this->sectionType;
  }

  /**
   * Retrieve all field values keyed by name.
   *
   * @return array
   */
  public function getFields() {
    return $this->fields;
  }

  /**
   * Retrieve the value of a specific field.
   *
   * @param $field_name
   *   The field name.
   *
   * @return mixed|null
   *   The field value.
   */
  public function get($field_name) {
    return $this->fields[$field_name] ?? NULL;
  }

  /**
   * Magic getter implementation.
   *
   * @param $name
   *   The field name.
   *
   * @return mixed|null
   *   The field value.
   */
  public function __get($name) {
    return $this->get($name);
  }

  /**
   * Set or unset a field value.
   *
   * @param string $field_name
   *   The field name.
   * @param mixed|null $value
   *   The field value. Passing NULL will unset the field.
   */
  public function set($field_name, $value = NULL) {
    if (is_null($value) && isset($this->fields[$field_name])) {
      unset($this->fields[$field_name]);
    }
    else {
      $this->fields[$field_name] = static::fromValue($value);
    }
  }

  /**
   * Magic setter implementation.
   *
   * @param string $name
   *   The field name.
   * @param mixed|null $value
   *   The field value. Passing NULL will unset the field.
   */
  public function __set($name, $value) {
    $this->set($name, $value);
  }

  /**
   * Turn a document section into its simple php array representation.
   *
   * @return array
   *   The array representation of this section.
   */
  public function getValue() {
    $value = [
      '__type' => $this->sectionType,
    ];
    foreach ($this->fields as $key => $field) {
      if (is_array($field)) {
        $value[$key] = array_map(function (DocumentSection $section) {
          return $section->getValue();
        }, $field);
      }
      else if ($field instanceof DocumentSection) {
        $value[$key] =  $field->getValue();
      }
      else {
        $value[$key] =  $field;
      }
    }
    return $value;
  }

  /**
   * Turn a piece of data into a section object.
   *
   * @param mixed $data
   *   Any value.
   *
   * @return mixed
   *   The input value, wrapped in a DocumentSection object if possible.
   */
  public static function fromValue($data) {
    if (!is_array($data)) {
      return $data;
    }

    if (!array_key_exists('__type', $data)) {
      return array_map([DocumentSection::class, 'fromValue'], $data );
    }

    $type = $data['__type'];
    unset($data['__type']);

    $fields = array_map(function ($value) {
      if (!is_array($value)) {
        return $value;
      }

      if (array_values($value) === $value) {
        return array_map([DocumentSection::class, 'fromValue'], $value);
      }

      return static::fromValue($value);
    }, $data);

    return new static($type, $fields);
  }

}
