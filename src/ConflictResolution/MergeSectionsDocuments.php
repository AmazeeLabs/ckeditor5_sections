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

    // In case we react to a conflict resolution form submission, we have to
    // make sure that the SectionConflict constraint will not fire if the
    // selection is different than 'custom' (so if the user selected the right
    // or left version). For that, we just unset the mergeResult value, if it
    // exists, on any of the submitted properties (the SectionConflict
    // constraint will use the value of the mergeResult field to check for
    // conflicts).
    if ($input = $event->getContextParameter('resolution_form_result')) {
      foreach ($input as $property => $selection) {
        if ($selection !== '__custom__') {
          $items = $result_entity->get($property);
          if ($items instanceof SectionsItemList) {
            for ($i = 0; $i < $items->count(); $i++) {
              $item = $result_entity->get($property)->get($i);
              if (isset($item->mergeResult)) {
                unset($item->mergeResult);
              }
            }
          }
        }
      }
    }

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
          // We set the merge result only if we are in the process of submitting
          // a conflict resolution, and we chose the 'custom' option, or we are
          // not in the process of submitting a conflict resolution for the
          // component.
          if (empty($input) || empty($input[$component]) || $input[$component] === '__custom__') {
            $resultItem->mergeResult = $result;
          }
        }
      }
    }
  }

}
