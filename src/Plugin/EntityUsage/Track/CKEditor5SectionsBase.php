<?php


namespace Drupal\ckeditor5_sections\Plugin\EntityUsage\Track;

use Drupal\ckeditor5_sections\DocumentSection;
use Drupal\Core\Field\FieldItemInterface;
use Drupal\entity_usage\EntityUsageTrackBase;

abstract class CKEditor5SectionsBase extends EntityUsageTrackBase{

  /**
   *
   * @var array
   */
  protected $valid_entities = [];

  /**
   * {@inheritdoc}
   */
  public function getTargetEntities(FieldItemInterface $item) {
    $this->valid_entities = [];
    $text = $item->json;

    /* @var \Drupal\ckeditor5_sections\DocumentConverterInterface $parser */
    $sections = DocumentSection::fromValue(json_decode($text, TRUE));
    $this->iterateSections($sections);

    return $this->valid_entities;
  }

  protected function iterateSections(DocumentSection $section) {
    // Process current section.
    $this->processSection($section);

    foreach ($section->getFields() as $field) {
      if ($field instanceof DocumentSection) {
        $this->iterateSections($field);
      }

      if (is_array($field)) {
        foreach ($field as $field_item) {
          if ($field_item instanceof DocumentSection) {
            $this->iterateSections($field_item);
          }
        }
      }
    }
  }

  /**
   * Get entity id by uuid.
   */
  protected function getIdByUuid($entityType, $uuid, $revision = FALSE) {
    $entityTypeManager = \Drupal::service('entity_type.manager');
    $definitions = $entityTypeManager->getDefinitions();
    $info = $definitions[$entityType];

    // Get all UUIDs in one query.
    $result = \Drupal::database()
      ->select($info->getBaseTable(), 't')
      ->fields('t', array($info->getKeys()['id']))
      ->condition($info->getKeys()['uuid'], $uuid, 'IN')
      ->execute()
      ->fetchField();

    return $result;
  }

  /**
   * @param $section
   */
  protected abstract function processSection($section);

}
