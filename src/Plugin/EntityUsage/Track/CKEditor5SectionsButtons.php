<?php

namespace Drupal\ckeditor5_sections\Plugin\EntityUsage\Track;

use Drupal\Component\Utility\Html;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\EntityFieldManagerInterface;
use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Path\PathValidatorInterface;
use Drupal\entity_usage\EntityUsage;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Tracks usage of entities in button sections fields.
 *
 * @EntityUsageTrack(
 *   id = "sections_buttons",
 *   label = @Translation("Sections buttons"),
 *   description = @Translation("Tracks entity relationships created in button section fields."),
 *   field_types = {"sections"},
 * )
 */
class CKEditor5SectionsButtons extends CKEditor5SectionsBase {

  /**
   * The Drupal Path Validator service.
   *
   * @var \Drupal\Core\Path\PathValidatorInterface
   */
  protected $pathValidator;

  /**
   * Constructs the CKEditor5SectionsButtons plugin.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\entity_usage\EntityUsage $usage_service
   *   The usage tracking service.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The EntityTypeManager service.
   * @param \Drupal\Core\Entity\EntityFieldManagerInterface $entity_field_manager
   *   The EntityFieldManager service.
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The factory for configuration objects.
   * @param \Drupal\Core\Entity\EntityRepositoryInterface $entity_repository
   *   The EntityRepositoryInterface service.
   * @param \Drupal\Core\Path\PathValidatorInterface $path_validator
   *   The Drupal Path Validator service.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityUsage $usage_service, EntityTypeManagerInterface $entity_type_manager, EntityFieldManagerInterface $entity_field_manager, ConfigFactoryInterface $config_factory, EntityRepositoryInterface $entity_repository, PathValidatorInterface $path_validator) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $usage_service, $entity_type_manager, $entity_field_manager, $config_factory, $entity_repository);
    $this->pathValidator = $path_validator;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('entity_usage.usage'),
      $container->get('entity_type.manager'),
      $container->get('entity_field.manager'),
      $container->get('config.factory'),
      $container->get('entity.repository'),
      $container->get('path.validator')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function parseEntitiesFromText($text) {
    $dom = Html::load($text);
    $xpath = new \DOMXPath($dom);
    $entities = [];
    foreach ($xpath->query('//ck-button') as $node) {
      $link_target = $node->getAttribute('link-target');
      $target_type = $target_id = NULL;

      // Check if the target links to an entity.
      try {
        $url = $this->pathValidator->getUrlIfValidWithoutAccessCheck($link_target);
        if ($url && $url->isRouted() && preg_match('/^entity\./', $url->getRouteName())) {
          // Ge the target entity type and ID.
          $route_parameters = $url->getRouteParameters();
          $target_type = array_keys($route_parameters)[0];
          $target_id = $route_parameters[$target_type];
        }
        if ($target_type && $target_id) {
          $entity = $this->entityTypeManager->getStorage($target_type)->load($target_id);
          if ($entity) {
            $entities[$entity->uuid()] = $target_type;
          }
        }
      }
      catch (\Exception $e) {
        // Do nothing.
      }
    }
    return $entities;
  }

}
