<?php

namespace Drupal\ckeditor5_sections\Plugin\EntityUsage\Track;

use Drupal\Component\Utility\Html;

/**
 * Base class for mentions entity usage tracker.
 */
abstract class CKEditor5SectionsMentionsBase extends CKEditor5SectionsBase {

  /**
   * @inheritDoc
   */
  protected function processSection($section) {
    foreach ($section->getFields() as $field) {
      if (is_string($field)) {
        $dom = Html::load($field);
        $xpath = new \DOMXPath($dom);
        $entities = [];
        $mention_prefix = $this->getMentionPrefix();
        foreach ($xpath->query("//span[@data-mention]") as $node) {
          $mention = $node->getAttribute('data-mention');
          if (strpos($mention, $mention_prefix) === 0) {
            // The machine name of the mention we get by removing the mention
            // prefix.
            $machine_name = substr($mention, strlen($mention_prefix));
            $mention_entities = $this->entityTypeManager->getStorage($this->getMentionEntityType())->loadByProperties(['machine_name' => $machine_name]);
            if (!empty($mention_entities)) {
              $mention_entity = reset($mention_entities);
              $this->valid_entities[] = $this->getMentionEntityType() . '|' . $mention_entity->id();
            }
          }
        }
      }
    }
  }

  /**
   * Returns the prefix for this mention type.
   */
  abstract public function getMentionPrefix();

  /**
   * Returns the entity type of this mention.
   */
  abstract public function getMentionEntityType();
}
