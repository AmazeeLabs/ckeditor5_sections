<?php

namespace Drupal\ckeditor5_sections;

class SectionPluginConverter implements DocumentConverterInterface {

  /**
   * @var \Drupal\ckeditor5_sections\SectionPluginCollector
   */
  protected $sectionPluginCollector;

  /**
   * @var \Drupal\ckeditor5_sections\SectionPluginDocumentParser
   */
  protected $documentParser;

  /**
   * @var \Drupal\ckeditor5_sections\SectionPluginDocumentBuilder
   */
  protected $documentBuilder;

  /**
   * @var \Drupal\Core\Extension\ModuleHandlerInterface
   */
  protected $moduleHandler;

  public function __construct(
    SectionPluginCollector $sectionPluginCollector,
    SectionPluginDocumentParser $documentParser,
    SectionPluginDocumentBuilder $documentBuilder
  ) {
    $this->sectionPluginCollector = $sectionPluginCollector;
    $this->documentParser = $documentParser;
    $this->documentBuilder = $documentBuilder;
  }

  /**
   * Retrieve all section type definitions
   *
   * @return array
   */
  public function getSectionTypeDefinitions() {
    // @note: currently \Drupal\ckeditor5_sections\SectionsCollector::getSectionDefinitions
    // duplicates \Drupal\ckeditor5_sections\DocumentConverter::getSectionTypeDefinitions
    return $this->sectionPluginCollector->getSectionDefinitions();
  }

  /**
   * {@inheritdoc}
   */
  public function extractSectionDefinitions($document) {
    return $this->documentParser->extractSectionDefinitions($document);
  }

  /**
   * {@inheritdoc}
   */
  public function extractSectionData($document) {
    // TODO: Implement extractSectionData() method.
    return $this->documentParser->extractSectionData($document);
  }

  /**
   * {@inheritdoc}
   */
  public function buildDocument(DocumentSection $section) {
    // TODO: Implement buildDocument() method.
    return $this->documentBuilder->buildDocument($section);
  }

}
