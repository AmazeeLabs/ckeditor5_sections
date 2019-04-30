<?php

namespace Drupal\ckeditor5_sections\Plugin\Deriver;

use Drupal\ckeditor5_sections\SectionsCollectorInterface;
use Drupal\ckeditor5_sections\TypedData\DocumentSectionDataDefinition;
use Drupal\Component\Plugin\Derivative\DeriverBase;
use Drupal\Core\Plugin\Discovery\ContainerDeriverInterface;
use Drupal\Core\TypedData\TypedDataManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Base class for section derivers.
 */
class SectionDeriverBase extends DeriverBase implements ContainerDeriverInterface {

  /**
   * @var \Drupal\Core\TypedData\TypedDataManagerInterface
   */
  protected $typedDataManager;

  /**
   * @var \Drupal\ckeditor5_sections\SectionsCollectorInterface
   */
  protected $sectionsCollector;

  /**
   * @param \Drupal\Core\TypedData\TypedDataManagerInterface $typedDataManager
   * @param \Drupal\ckeditor5_sections\SectionsCollectorInterface $sectionsCollector
   */
  public function __construct(
    TypedDataManagerInterface $typedDataManager,
    SectionsCollectorInterface $sectionsCollector
  ) {
    $this->sectionsCollector = $sectionsCollector;
    $this->typedDataManager = $typedDataManager;
  }

  /**
   * @inheritdoc
   */
  public static function create(ContainerInterface $container, $base_plugin_id) {
    return new static(
      $container->get('typed_data_manager'),
      $container->get('ckeditor5_sections.sections_collector')
    );
  }

  /**
   * Returns all available sections as typed data definitions.
   *
   * @return \Drupal\Core\TypedData\DataDefinitionInterface[]
   *   Array keys are data type IDs.
   */
  protected function getSectionTypeDefinitions() {
    $result = [];
    foreach ($this->sectionsCollector->getSections() as $sectionType => $section) {
      if ($this->typedDataManager->hasDefinition("section:{$sectionType}")) {
        $definition = $this->typedDataManager->createDataDefinition("section:{$sectionType}");
        $result[$definition->getDataType()] = $definition;
        $result += $this->getNestedSectionTypeDefinitions($definition);
      }
    }
    return $result;
  }

  /**
   * Returns nested sections as typed data definitions.
   *
   * @param \Drupal\Core\TypedData\DataDefinitionInterface $definition
   *
   * @return \Drupal\Core\TypedData\DataDefinitionInterface[]
   *   Array keys are data type IDs.
   */
  protected function getNestedSectionTypeDefinitions($definition) {
    $result = [];
    if ($definition instanceof DocumentSectionDataDefinition) {
      foreach ($definition->getPropertyDefinitions() as $propertyName => $propertyDefinition) {
        if ($propertyDefinition  instanceof DocumentSectionDataDefinition) {
          $result[$propertyDefinition->getDataType()] = $propertyDefinition;
          $result += $this->getNestedSectionTypeDefinitions($propertyDefinition);
        }
      }
    }
    return $result;
  }

}
