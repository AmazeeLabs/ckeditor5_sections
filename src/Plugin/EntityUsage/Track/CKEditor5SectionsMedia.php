<?php

namespace Drupal\ckeditor5_sections\Plugin\EntityUsage\Track;

use Drupal\Component\Utility\Html;

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
   * {@inheritdoc}
   */
  public function parseEntitiesFromText($text) {
    $dom = Html::load($text);
    $xpath = new \DOMXPath($dom);
    $entities = [];
    foreach ($xpath->query('//ck-media[@data-media-uuid]') as $node) {
      // By default, the media widget references media entities. However, it is
      // possible that it references other entity types as well. This is stored
      // in the 'data-media-type' attribute, so we have to parse it and see if
      // we do actually reference a media or some other entity type. The pattern
      // of the 'data-media-type' is: "entity_type:entity_bundle".
      // @todo: this ck-media element should probably be refactored and renamed
      // to something like 'ck-entity'.
      $enity_type = 'media';
      $media_type_attribute = $node->getAttribute('data-media-type');
      if (!empty($media_type_attribute)) {
        $words = explode(':', $media_type_attribute);
        $enity_type = $words[0];
      }
      $entities[$node->getAttribute('data-media-uuid')] = $enity_type;
    }
    return $entities;
  }

}
