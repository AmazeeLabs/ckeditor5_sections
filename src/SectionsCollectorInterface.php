<?php

namespace Drupal\ckeditor5_sections;

/**
 * Interface for the section collector services.
 */
interface SectionsCollectorInterface {

  /**
   * Returns a list of all available sections.
   *
   * @param null $directory
   *
   * @return array
   */
  public function getSections($directory = NULL);

  /**
   * Returns a list of all available section definitions (including embedded
   * sections).
   *
   * @param null $directory
   *
   * @return array
   */
  public function getSectionDefinitions($directory = NULL);

}
