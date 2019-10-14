<?php

namespace Drupal\ckeditor5_sections\Form;

use Drupal\ckeditor5_sections\SectionsMediaLibraryOpener;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\CloseDialogCommand;
use Drupal\Core\Ajax\InvokeCommand;
use Drupal\Core\Form\FormStateInterface;
use Drupal\media_library\Ajax\UpdateSelectionCommand;
use Drupal\Core\Ajax\ReplaceCommand;
use Drupal\media_library\Form\FileUploadForm;
use Drupal\media\MediaInterface;
use Drupal\media_library\Plugin\Field\FieldWidget\MediaLibraryWidget;
use Drupal\Core\Form\FormBuilderInterface;

/**
 * Alter media upload form.
 */
class SectionsMediaLibraryUploadForm extends FileUploadForm {

  /**
   * Processes an upload (managed_file) element.
   *
   * @param array $element
   *   The upload element.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The form state.
   *
   * @return array
   *   The processed upload element.
   */
  public function processUploadElement(array $element, FormStateInterface $form_state) {
    $element = parent::processUploadElement($element, $form_state);
    $query = $this->getMediaLibraryState($form_state)->all() + [
      FormBuilderInterface::AJAX_FORM_REQUEST => TRUE,
    ];
    $element['upload_button']['#ajax']['options']['query'] = $query;

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function updateLibrary(array &$form, FormStateInterface $form_state) {
    if ($form_state::hasAnyErrors()) {
      return $form;
    }

    $return_type = $this->getReturnType($form_state);
    $media_ids = array_map(function (MediaInterface $media) use ($return_type) {
      return $return_type == 'uuid' ? $media->uuid() : $media->id();
    }, $this->getAddedMediaItems($form_state));

    $response = new AjaxResponse();
    $response->addCommand(new UpdateSelectionCommand($media_ids));
    $response->addCommand(new ReplaceCommand('#media-library-add-form-wrapper', $this->buildMediaLibraryUi($form_state)));
    return $response;
  }

  /**
   * {@inheritdoc}
   */
  public function updateWidget(array &$form, FormStateInterface $form_state) {
    if ($form_state::hasAnyErrors()) {
      return $form;
    }

    $opener_id = $this->getMediaLibraryState($form_state)->getOpenerId();
    if ($field_id = MediaLibraryWidget::getOpenerFieldId($opener_id)) {
      $return_type = $this->getReturnType($form_state);
      $current_media_ids = array_map(function (MediaInterface $media) use ($return_type) {
        if ($return_type == 'uuid') {
          return $media->uuid();
        }
        return $media->id();
      }, $this->getCurrentMediaItems($form_state));
      // Pass the selection to the field widget based on the current widget ID.
      return (new AjaxResponse())
        ->addCommand(new InvokeCommand("[data-media-library-widget-value=\"$field_id\"]", 'val', [implode(',', $current_media_ids)]))
        ->addCommand(new InvokeCommand("[data-media-library-widget-update=\"$field_id\"]", 'trigger', ['mousedown']))
        ->addCommand(new CloseDialogCommand());
    }
  }

  /**
   * Returns the return type for the widget.
   *
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The form state.
   *
   * @return string
   *   Either 'id' or 'uuid'.
   */
  protected function getReturnType(FormStateInterface $form_state) {
    $opener = $this->openerResolver->get($this->getMediaLibraryState($form_state));
    if ($opener instanceof SectionsMediaLibraryOpener) {
      return 'uuid';
    }
    return 'id';
  }

}
