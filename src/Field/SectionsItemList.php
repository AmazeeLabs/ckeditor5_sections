<?php

namespace Drupal\ckeditor5_sections\Field;

use Drupal\Core\Field\FieldItemList;
use Drupal\Core\Form\FormStateInterface;

class SectionsItemList extends FieldItemList {

  public function defaultValuesForm(array &$form, FormStateInterface $form_state) {
    // We never want to set a default value since this is handled by templates.
    return NULL;
  }

  public function getConstraints() {
    $constraints = parent::getConstraints();
    $constraints[] = $this->typedDataManager->getValidationConstraintManager()->create('SectionConflict', []);
    return $constraints;
  }


}
