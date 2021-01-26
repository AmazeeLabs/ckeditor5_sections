<?php

namespace Drupal\ckeditor5_sections;

use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Symfony\Component\DependencyInjection\ContainerInterface;

class SectionsPermissions implements ContainerInjectionInterface {
  use StringTranslationTrait;

  /**
   * The sections collector service.
   * @var SectionsCollectorInterface
   */
  protected $sectionsCollector;

  /**
   * SectionsPermissions constructor.
   * @param SectionsCollectorInterface $sections_collector
   */
  public function __construct(SectionsCollectorInterface $sections_collector) {
    $this->sectionsCollector = $sections_collector;
  }

  /**
   * {@inheritDoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('ckeditor5_sections.sections_collector')
    );
  }

  /**
   * Returns an array of permission for each of the defined sections.
   * @return array
   */
  public function permissions() {
    $permissions = [];
    foreach ($this->sectionsCollector->getSections() as $id => $section) {
      $permissions += [
        'use ' . $id . ' ckeditor section' => [
          'title' => $this->t('Use @section (@section_id) section in the editor', ['@section' => $section['label'], '@section_id' => $id]),
        ]
      ];
    }
    return $permissions;
  }
}
