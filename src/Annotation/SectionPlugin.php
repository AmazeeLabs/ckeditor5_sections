<?php

namespace Drupal\ckeditor5_sections\Annotation;

use Drupal\Component\Annotation\Plugin;

/**
 * Defines a Section plugin item annotation object.
 *
 * @see \Drupal\ckeditor5_sections\Plugin\SectionPluginManager
 * @see plugin_api
 *
 * @Annotation
 */
class SectionPlugin extends Plugin {

  /**
   * The section ID.
   *
   * @var string
   */
  public $id;

  /**
   * The label of the section.
   *
   * @var \Drupal\Core\Annotation\Translation
   *
   * @ingroup plugin_translatable
   */
  public $label;

  /**
   * The icon for the section.
   *
   * @var string
   */
  public $icon;

  /**
   * An array of context definitions describing the context used by the plugin.
   *
   * The array is keyed by context names.
   *
   * @var \Drupal\Core\Annotation\ContextDefinition[]
   */
  public $context_definitions = [];

  /**
   * The section plugin class.
   *
   * This default value is used for section plugins that do not specify a class
   * themselves.
   *
   * @var string
   */
  public $class = \Drupal\ckeditor5_sections\Plugin\SectionPlugin\SectionPlugin::class;
}
