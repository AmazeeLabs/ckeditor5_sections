<?php

namespace Drupal\ckeditor5_sections\Discovery;

use Drupal\Component\Plugin\Discovery\DiscoveryInterface;

/**
 * Enables Sectiony discovery for plugin definitions.
 *
 * You should normally extend this class to add validation for the values in the
 * YAML data or to restrict use of the class or derivatives keys.
 */
class SectionDiscoveryDecorator extends SectionDiscovery {

  /**
   * The Discovery object being decorated.
   *
   * @var \Drupal\Component\Plugin\Discovery\DiscoveryInterface
   */
  protected $decorated;

  /**
   * Constructs a SectionDiscoveryDecorator object.
   *
   * @param \Drupal\Component\Plugin\Discovery\DiscoveryInterface $decorated
   *   The discovery object that is being decorated.
   * @param array $directories
   *   An array of directories to scan.
   */
  public function __construct(DiscoveryInterface $decorated, array $directories) {
    parent::__construct($directories);

    $this->decorated = $decorated;
  }

  /**
   * {@inheritdoc}
   */
  public function getDefinitions() {
    return parent::getDefinitions() + $this->decorated->getDefinitions();
  }

  /**
   * Passes through all unknown calls onto the decorated object.
   */
  public function __call($method, $args) {
    return call_user_func_array([$this->decorated, $method], $args);
  }

}
