<?php

namespace Drupal\ckeditor5_sections\MentionProvider;

/**
 * Class MentionProviderItem.
 */
class MentionProviderItem {
  /**
   * ID of the mention item.
   *
   * @var string
   */
  public $id;

  /**
   * Optional label of the mention item.
   *
   * @var string|null
   */
  public $label;

  /**
   * Optional description of the mention item.
   *
   * @var string|null
   */
  public $description;

  /**
   * MentionProviderItem constructor.
   *
   * @param string $id
   *   ID of the mention item.
   * @param string|null $label
   *   Optional label of the mention item.
   * @param string|null $description
   *   Optional description of the mention item.
   */
  public function __construct($id, $label = NULL, $description = NULL) {
    $this->id = $id;
    $this->label = $label;
    $this->description = $description;
  }

}
