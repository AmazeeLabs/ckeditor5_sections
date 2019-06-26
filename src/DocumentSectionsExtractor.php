<?php

namespace Drupal\ckeditor5_sections;

use Drupal\Core\TypedData\DataDefinitionInterface;
use Drupal\Core\TypedData\TypedData;
use Drupal\Core\TypedData\TypedDataInterface;

class DocumentSectionsExtractor extends TypedData {

  /**
   * Cached sections.
   *
   * @var array|null
   */
  protected $sections = NULL;

  /**
   * {@inheritdoc}
   */
  public function __construct(DataDefinitionInterface $definition, $name = NULL, TypedDataInterface $parent = NULL) {
    parent::__construct($definition, $name, $parent);
    if ($definition->getSetting('text source') === NULL) {
      throw new \InvalidArgumentException("The definition's 'text source' key has to specify the name of the text property to be processed.");
    }
  }

  /**
   * {@inheritdoc}
   */
  public function getValue() {
    if ($this->sections !== NULL) {
      return $this->sections;
    }
    $item = $this->getParent();
    $text = $item->{($this->definition->getSetting('text source'))};
    // TODO: Properly inject this.
    $text = \Drupal::service('token')->replace($text);
    // Avoid doing unnecessary work on empty strings.
    if (!isset($text) || $text === '') {
      $this->sections = [];
    }
    else {
      /* @var \Drupal\ckeditor5_sections\DocumentConverterInterface $parser */
      $parser = \Drupal::service('ckeditor5_sections.document_converter');
      $this->sections = $parser->extractSectionData($text);;
    }
    return $this->sections;
  }

  /**
   * {@inheritdoc}
   */
  public function setValue($value, $notify = TRUE) {
    $this->sections = $value;
    // Notify the parent of any changes.
    if ($notify && isset($this->parent)) {
      $this->parent->onChange($this->name);
    }
  }

}
