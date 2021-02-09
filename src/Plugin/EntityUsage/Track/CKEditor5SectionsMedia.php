<?php

namespace Drupal\ckeditor5_sections\Plugin\EntityUsage\Track;

use Drupal\Component\Utility\Html;
use Drupal\Core\Field\FieldItemInterface;

/**
 * Tracks usage of media in sections fields.
 *
 * @EntityUsageTrack(
 *   id = "sections_media",
 *   label = @Translation("Sections media"),
 *   description = @Translation("Tracks media relationships created section fields."),
 *   field_types = {"sections"},
 * )
 */
class CKEditor5SectionsMedia extends CKEditor5SectionsBase {

  /**
   * @inheritDoc
   */
  protected function processSection($section) {
    $type = $section->get('data-media-type');
    $uuid = $section->get('data-media-uuid');
    if ($type && $uuid) {
      $entityType = explode(':', $type)[0];
      /** @var \Drupal\Core\Entity\EntityTypeManager $entityTypeManager */
      $entityTypeManager = \Drupal::service('entity_type.manager');
      $definitions = $entityTypeManager->getDefinitions();
      if (empty($definitions[$entityType])) {
        $entityType = 'media';
      }
      $entity_id = $this->getIdByUuid($entityType, $uuid, false);
      if ($entity_id) {
        $this->valid_entities[] = $entityType . "|" . $entity_id;
      }
    }
  }

}
