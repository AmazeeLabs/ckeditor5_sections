<?php

namespace Drupal\ckeditor5_sections\Annotation;

use Drupal\Component\Annotation\Plugin;

/**
 * Defines an mention provider annotation object.
 *
 * Plugin Namespace: Plugin\MentionProvider.
 *
 * For a working example, see
 * \Drupal\ckeditor5_sections_token\Plugin\MentionProvider\TokenMentionProvider.
 *
 * @see \Drupal\filter\FilterPluginManager
 * @see \Drupal\filter\Plugin\FilterInterface
 * @see \Drupal\filter\Plugin\FilterBase
 * @see plugin_api
 *
 * @Annotation
 */
class MentionProvider extends Plugin {

  /**
   * The plugin ID.
   *
   * @var string
   */
  public $id;

  /**
   * The human-readable name of the mention provider.
   *
   * @var \Drupal\Core\Annotation\Translation
   * @ingroup plugin_translatable
   */
  public $title;

  /**
   * The mention prefix.
   *
   * @var string
   */
  public $prefix;

}
