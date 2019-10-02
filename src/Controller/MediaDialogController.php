<?php

namespace Drupal\ckeditor5_sections\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Drupal\media_library\MediaLibraryState;
use Drupal\media_library\MediaLibraryUiBuilder;
use Drupal\Core\Ajax\OpenModalDialogCommand;
use Drupal\Core\Ajax\AjaxResponse;

/**
 * Helper class for opening media dialog.
 */
class MediaDialogController extends ControllerBase {

  /**
   * The currently active request object.
   *
   * @var \Symfony\Component\HttpFoundation\Request
   */
  protected $request;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static($container->get('request_stack'));
  }

  /**
   * MediaDialogController constructor.
   *
   * @param \Symfony\Component\HttpFoundation\RequestStack $requestStack
   *   Request stack.
   */
  public function __construct(RequestStack $requestStack) {
    $this->request = $requestStack->getCurrentRequest();
  }

  /**
   * Controller callback for opening dialog.
   */
  public function openDialog() {
    $query = $this->request->query;

    $state = MediaLibraryState::create(
      'media_library.opener.sections',
      $query->get('media_library_allowed_types'),
      $query->get('media_library_selected_type'),
      $query->get('media_library_remaining'),
      [
        'field_widget_id' => $query->get('field_id'),
      ]
    );

    $libraryUi = \Drupal::service('media_library.ui_builder')->buildUi($state);

    if ($query->get('upload_form')) {
      unset($libraryUi['content']['view']);
    }
    else {
      unset($libraryUi['content']['form']);
    }

    $dialogOptions = MediaLibraryUiBuilder::dialogOptions();
    return (new AjaxResponse())
      ->addCommand(new OpenModalDialogCommand($dialogOptions['title'], $libraryUi, $dialogOptions));
  }

}
