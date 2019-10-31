<?php


namespace Drupal\ckeditor5_sections\Plugin\EntityUsage\Track;

use Drupal\Core\Field\FieldItemInterface;
use Drupal\entity_usage\EntityUsageTrackBase;

abstract class CKEditor5SectionsBase extends EntityUsageTrackBase{

  /**
   * {@inheritdoc}
   */
  public function getTargetEntities(FieldItemInterface $item) {
    $text = $item->html;
    if (empty($text)) {
      return [];
    }
    $entities_in_text = $this->parseEntitiesFromText($text);
    $valid_entities = [];
    foreach ($entities_in_text as $uuid => $entity_type) {
      // Check if the target entity exists since text fields are not
      // automatically updated when an entity is removed.
      if ($target_entity = $this->entityRepository->loadEntityByUuid($entity_type, $uuid)) {
        $valid_entities[] = $target_entity->getEntityTypeId() . "|" . $target_entity->id();
      }
    }
    return array_unique($valid_entities);
  }

  /**
   * Parse an HTML snippet looking for embedded entities.
   *
   * @param string $text
   *   The partial (X)HTML snippet to load. Invalid markup will be corrected on
   *   import.
   *
   * @return array
   *   An array of all embedded entities found, where keys are the uuids and the
   *   values are the entity types.
   */
  abstract public function parseEntitiesFromText($text);
}
