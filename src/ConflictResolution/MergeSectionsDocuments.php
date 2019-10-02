<?php

namespace Drupal\ckeditor5_sections\ConflictResolution;

use Drupal\ckeditor5_sections\Field\SectionsItemList;
use Drupal\Core\Conflict\ConflictResolution\MergeStrategyBase;
use Drupal\Core\Conflict\Event\EntityConflictResolutionEvent;
use Drupal\ckeditor5_sections\DocumentMerge;

/**
 * Merge sections documents.
 */
class MergeSectionsDocuments extends MergeStrategyBase {

  public function getMergeStrategyId(): string {
    return 'conflict_resolution.merge_invisible_fields';
  }

  public function resolveConflictsContentEntity(EntityConflictResolutionEvent $event) {
    $local_entity = $event->getLocalEntity();
    $remote_entity = $event->getRemoteEntity();
    $base_entity = $event->getBaseEntity();
    $result_entity = $event->getResultEntity();

    foreach ($conflicts = array_keys($event->getConflicts()) as $component) {
      $items = $local_entity->get($component);
      if ($items instanceof SectionsItemList) {
        for ($i = 0; $i < $items->count(); $i++) {
          $sourceItem = $base_entity->get($component)->get($i);
          $leftItem = $remote_entity->get($component)->get($i);
          $rightItem = $local_entity->get($component)->get($i);
          if (!$rightItem) {
            $result_entity->get($component)->appendItem([
              'json' => $leftItem->json,
            ]);
            continue;
          }

          $merge = new DocumentMerge();
          $source = $sourceItem ? $sourceItem->html : '<div id="dummy"></div>';
          if ($sourceItem) {
            $merge->setLabel('source', t('Original version'));
          }
          $left = $leftItem ? $leftItem->html : '';
          $merge->setLabel('left', t('@workspace version', ['@workspace' => $remote_entity->workspace->entity->label()]));

          $right = $rightItem ? $rightItem->html : '';
          $merge->setLabel('right', t('@workspace version', ['@workspace' => $local_entity->workspace->entity->label()]));

          $result = $left && $right && $source ? $merge->merge($source, $left, $right) : '';

          $resultItem = $result_entity->get($component)->get($i);
          if (!$resultItem) {
            $resultItem = $result_entity->get($component)->appendItem([
              'json' => $leftItem->json,
            ]);
          }
          // Set temporary storage for a merge result string.
          // TODO: Move document merge to json.
          $resultItem->mergeResult = $result;
        }
      }
    }
  }

}
