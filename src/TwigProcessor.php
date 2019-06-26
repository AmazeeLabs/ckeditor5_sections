<?php

namespace Drupal\ckeditor5_sections;

use Drupal\Core\Template\TwigEnvironment;

/**
 * Class TwigProcessor.
 *
 * @package Drupal\ckeditor5_sections
 */
class TwigProcessor {

  /**
   * @var \Drupal\Core\Template\TwigEnvironment
   */
  protected $twigEnvironment;

  /**
   * TwigProcessor constructor.
   *
   * @param \Drupal\Core\Template\TwigEnvironment $twig_environment
   */
  public function __construct(TwigEnvironment $twig_environment) {
    $this->twigEnvironment = $twig_environment;
  }

  /**
   * Runs the contents of a Twig template through the Twig engine.
   *
   * @param string $file_path
   *
   * @return string
   *
   * @throws \Twig\Error\LoaderError
   * @throws \Twig\Error\RuntimeError
   * @throws \Twig\Error\SyntaxError
   */
  public function processTwigTemplate($file_path) {
    $template = $this->twigEnvironment->load($file_path);
    $markup = $template->render();
    return $markup;
  }

}
