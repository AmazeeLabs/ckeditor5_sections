<?php

namespace Drupal\ckeditor5_sections\Plugin;

use Drupal\Component\Plugin\PluginInspectionInterface;

/**
 * Defines an interface for Section plugin plugins.
 */
interface SectionPluginInterface extends PluginInspectionInterface {

  /**
   * @return array
   */
  public function getSectionInfo();

  /**
   * @return mixed
   */
  public function extractSectionDefinition();
}
