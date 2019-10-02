<?php

namespace Drupal\ckeditor5_sections\Plugin\views\field;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\CloseDialogCommand;
use Drupal\Core\Ajax\InvokeCommand;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Form\FormBuilderInterface;
use Drupal\Core\Url;
use Drupal\media_library\Plugin\views\field\MediaLibrarySelectForm;
use Drupal\media_library\MediaLibraryState;
use Drupal\media_library\Plugin\Field\FieldWidget\MediaLibraryWidget;
use Symfony\Component\HttpFoundation\Request;

/**
 * Defines a field that outputs a checkbox and form for selecting media.
 *
 * @ViewsField("sections_media_library_select_form")
 *
 * @internal
 */
class CKEditor5SectionsMediaLibrarySelectForm extends MediaLibrarySelectForm {

  /**
   * {@inheritdoc}
   */
  public function viewsForm(array &$form, FormStateInterface $form_state) {
    $form['#attributes'] = [
      'class' => ['media-library-views-form', 'js-media-library-views-form'],
    ];

    // Add the view to the form state so the opener ID can be fetched from the
    // view request object in ::updateWidget().
    $form_state->set('view', $this->view);

    // Render checkboxes for all rows.
    $form[$this->options['id']]['#tree'] = TRUE;
    foreach ($this->view->result as $row_index => $row) {
      $entity = $this->getEntity($row);
      $form[$this->options['id']][$row_index] = [
        '#type' => 'checkbox',
        '#title' => $this->t('Select @label', [
          '@label' => $entity->label(),
        ]),
        '#title_display' => 'invisible',
        '#return_value' => $entity->uuid(),
      ];
    }

    // The selection is persistent across different pages in the media library
    // and populated via JavaScript.
    $selection_field_id = 'media_library_select_form_selection';
    $form[$selection_field_id] = [
      '#type' => 'hidden',
      '#attributes' => [
        // This is used to identify the hidden field in the form via JavaScript.
        'id' => 'media-library-modal-selection',
      ],
    ];

    // @todo Remove in https://www.drupal.org/project/drupal/issues/2504115
    // Currently the default URL for all AJAX form elements is the current URL,
    // not the form action. This causes bugs when this form is rendered from an
    // AJAX path like /views/ajax, which cannot process AJAX form submits.
    $url = parse_url($form['#action'], PHP_URL_PATH);
    $query = $this->view->getRequest()->query->all();
    $query[FormBuilderInterface::AJAX_FORM_REQUEST] = TRUE;
    $form['actions']['submit']['#ajax'] = [
      'url' => Url::fromUserInput($url),
      'options' => [
        'query' => $query,
      ],
      'callback' => [static::class, 'updateWidget'],
    ];

    $form['actions']['submit']['#value'] = $this->t('Select entity');
    $form['actions']['submit']['#button_type'] = 'primary';
    $form['actions']['submit']['#field_id'] = $selection_field_id;
    $form['actions']['submit']['#option_id'] = $this->options['id'];

    $form['actions']['submit']['#attributes'] = [
      'class' => ['media-library-select'],
      'data-disable-refocus' => 'true',
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public static function updateWidget(array &$form, FormStateInterface $form_state, Request $request) {
    $field_id = $form_state->getTriggeringElement()['#field_id'];
    if (!$request->query->get('media_library_opener_id')) {
      $query = $request->query;
      $state = MediaLibraryState::create(
        'media_library.opener.sections',
        $query->get('media_library_allowed_types', []),
        $query->get('media_library_selected_type'),
        $query->get('media_library_remaining'),
        $query->get('media_library_opener_parameters', [
          'field_widget_id' => $query->get('field_id'),
        ])
      );
    }
    else {
      $state = MediaLibraryState::fromRequest($request);
    }

    if ($request->get('content_library_widget_id')) {
      $optionId = $form_state->getTriggeringElement()['#option_id'];
      $selected = array_filter($form_state->getValue($optionId, []));
    }
    else {
      $selected = array_filter(explode(',', $form_state->getValue($field_id, [])));
    }

    return \Drupal::service('media_library.opener_resolver')
      ->get($state)
      ->getSelectionResponse($state, $selected)
      ->addCommand(new CloseDialogCommand());
  }

}
