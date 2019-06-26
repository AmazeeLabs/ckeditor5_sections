<?php

namespace Drupal\ckeditor5_sections;

interface DocumentSectionInterface {

  public function getType();

  public function set($field_name, $value = NULL);

  public function get($field_name);

  public function getFields();

}
