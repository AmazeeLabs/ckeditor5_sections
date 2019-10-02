<?php

namespace Drupal\ckeditor5_sections;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Session\AccountInterface;
use Drupal\media_library\MediaLibraryFieldWidgetOpener;
use Drupal\media_library\MediaLibraryState;

class SectionsMediaLibraryOpener extends MediaLibraryFieldWidgetOpener {

  public function checkAccess(
    MediaLibraryState $state,
    AccountInterface $account
  ) {
    return AccessResult::allowed();
  }

}
