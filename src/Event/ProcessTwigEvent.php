<?php

namespace Drupal\ckeditor5_sections\Event;

use Symfony\Component\EventDispatcher\Event;

/**
 * Class ProcessTwigEvent
 *
 * @package Drupal\ckeditor5_sections\Event
 */
class ProcessTwigEvent extends Event {

  /**
   * The preprocess event ID.
   */
  const PREPROCESS = 'event.preprocess';

  /**
   * The postprocess event ID.
   */
  const POSTPROCESS = 'event.postprocess';

  /**
   * @var string
   */
  protected $twigMarkup;

  /**
   * PreProcessEvent constructor.
   *
   * @param string $twig_markup
   */
  public function __construct($twig_markup) {
    $this->twigMarkup = $twig_markup;
  }

  /**
   * Event description.
   *
   * @return string
   */
  public function myEventDescription() {
    return 'This event occurs both before and after editor markup is rendered through Twig.';
  }

  /**
   * Gets the not-yet-rendered markup string.
   *
   * @return string
   */
  public function getTwigMarkup() {
    return $this->twigMarkup;
  }

  /**
   * Sets the markup string.
   *
   * @param $twig_markup
   *
   * @return string
   */
  public function setTwigMarkup($twig_markup) {
    $this->twigMarkup = $twig_markup;
    return $this->twigMarkup;
  }

}
