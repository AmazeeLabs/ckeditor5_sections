<?php

namespace Drupal\ckeditor5_sections;

use Drupal\ckeditor5_sections\Event\ProcessTwigEvent;
use Drupal\Core\Template\TwigEnvironment;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

/**
 * Class TwigProcessor
 *
 * @package Drupal\ckeditor5_sections
 */
class TwigProcessor {

  /**
   * @var \Drupal\Core\Template\TwigEnvironment
   */
  protected $twigEnvironment;

  /**
   * @var \Symfony\Component\EventDispatcher\EventDispatcherInterface
   */
  protected $eventDispatcher;

  /**
   * TwigProcessor constructor.
   *
   * @param \Drupal\Core\Template\TwigEnvironment $twig_environment
   * @param \Symfony\Component\EventDispatcher\EventDispatcherInterface $event_dispatcher
   */
  public function __construct(TwigEnvironment $twig_environment, EventDispatcherInterface $event_dispatcher) {
    $this->twigEnvironment = $twig_environment;
    $this->eventDispatcher = $event_dispatcher;
  }

  /**
   * Runs the contents of a Twig template through the Twig engine.
   *
   * @param string $twig_markup
   *
   * @return string
   * @throws \Twig\Error\LoaderError
   * @throws \Twig\Error\RuntimeError
   * @throws \Twig\Error\SyntaxError
   */
  public function processTwigTemplate($twig_markup) {
    // Preprocess.
    $event = new ProcessTwigEvent($twig_markup);
    $this->eventDispatcher->dispatch(ProcessTwigEvent::PREPROCESS, $event);
    $twig_markup = $event->getTwigMarkup();
    // Process.
    $template = $this->twigEnvironment->load($twig_markup);
    $twig_markup = $template->render();
    // Post process.
    $event = new ProcessTwigEvent($twig_markup);
    $this->eventDispatcher->dispatch(ProcessTwigEvent::POSTPROCESS, $event);
    $twig_markup = $event->getTwigMarkup();
    return $twig_markup;
  }

}
