<?php

namespace Drupal\ckeditor5_sections;

use Drupal\ckeditor5_sections\Event\ProcessTwigEvent;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Twig\Extension\ExtensionInterface;

/**
 * Class TwigProcessor
 *
 * @package Drupal\ckeditor5_sections
 */
class TwigProcessor {

  /**
   * @var \Twig\Extension\ExtensionInterface
   */
  protected $twigExtension;

  /**
   * @var \Symfony\Component\EventDispatcher\EventDispatcherInterface
   */
  protected $eventDispatcher;

  /**
   * TwigProcessor constructor.
   *
   * @param \Twig\Extension\ExtensionInterface $twig_extension
   * @param \Symfony\Component\EventDispatcher\EventDispatcherInterface $event_dispatcher
   */
  public function __construct(ExtensionInterface $twig_extension, EventDispatcherInterface $event_dispatcher) {
    $this->twigExtension = $twig_extension;
    $this->eventDispatcher = $event_dispatcher;
  }

  /**
   * Runs the contents of a Twig template through the Twig engine.
   *
   * @param string $twig_markup
   *
   * @return string
   */
  public function processTwigTemplate($twig_markup) {
    // Preprocess.
    $event = new ProcessTwigEvent($twig_markup);
    $this->eventDispatcher->dispatch(ProcessTwigEvent::PREPROCESS, $event);
    $twig_markup = $event->getTwigMarkup();
    // Process.
    $twig_markup = $this->twigExtension->renderVar($twig_markup);
    // Post process.
    $event = new ProcessTwigEvent($twig_markup);
    $this->eventDispatcher->dispatch(ProcessTwigEvent::POSTPROCESS, $event);
    $twig_markup = $event->getTwigMarkup();
    return $twig_markup;
  }

}
