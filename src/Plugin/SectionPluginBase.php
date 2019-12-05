<?php

namespace Drupal\ckeditor5_sections\Plugin;

use Drupal\ckeditor5_sections\DocumentSection;
use Drupal\Core\Plugin\ContextAwarePluginBase;

/**
 * Base class for Section plugin plugins.
 */
abstract class SectionPluginBase extends ContextAwarePluginBase implements SectionPluginInterface {

  /**
   * @return  \Drupal\ckeditor5_sections\DocumentConverterInterface
   */
  protected function getConverter() {
    // @todo DI this.
    return \Drupal::service('ckeditor5_sections.document_converter');
  }

  /**
   * @return \Drupal\ckeditor5_sections\SectionPluginDocumentBuilder
   */
  protected function getDocumentBuilder() {
    // @todo DI this.
    return \Drupal::service('ckeditor5_sections.section_plugin_document_builder');
  }

  /**
   * @return DocumentSection
   * @throws \Drupal\Component\Plugin\Exception\PluginException
   */
  protected function getDocumentSection() {
    if ($document_section = $this->getContextValue('document_section')) {
      return $document_section;
    }
    if (!empty($this->configuration['document_section'])) {
      return $this->configuration['document_section'];
    }
    throw new \LogicException('Section plugin has not been instantiated with a "document_section"-context or -configuration');
  }

  /**
   * @return string
   */
  protected function getTemplateFilename() {
    // @note: \Twig\Loader\FilesystemLoader can't handle absolute paths?!
    // it turns /absolute/dir/template.html.twig in
    // {DRUPAL_ROOT}/./absolute/dir/template.html.twig which fails?!
    // @todo: would it make sense to define a custom @section namespace?
    return str_replace(DRUPAL_ROOT . '/', '', $this->getPluginDefinition()['template']);
  }

  /**
   * @return false|string
   */
  public function getTemplate() {
    $filename = $this->getTemplateFilename();
    if (empty($filename)) {
      throw new \InvalidArgumentException('Invalid template for SectionPlugin #' . $this->getPluginId());
    }
    // If the template is a Twig file, process the Twig placeholders etc.
    if (strpos($filename, '.html.twig') !== FALSE) {
      return \Drupal::service('ckeditor5_sections.twig_processor')->processTwigTemplate($filename);
    }
    else {
      return file_get_contents($filename);
    }
  }

  /**
   * @return |null
   */
  public function getStyleSheetFilename() {
    return !empty($this->getPluginDefinition()['stylesheet']) ? $this->getPluginDefinition()['stylesheet'] : NULL;
  }

  /**
   * @return string|null
   */
  public function getIcon() {
    return !empty($this->getPluginDefinition()['icon']) ? $this->getPluginDefinition()['icon'] : NULL;
  }

  /**
   * @return string
   */
  public function getLabel() {
    return !empty($this->getPluginDefinition()['label']) ? $this->getPluginDefinition()['label'] : $this->getPluginId();
  }

  /**
   * @return array
   */
  public function getSectionInfo() {
    return [
      'id' => $this->getPluginId(),
      'label' => $this->getLabel(),
      'icon' => $this->getIcon(),
      'stylesheet_filename' => $this->getStyleSheetFilename(),
      'template_filename' =>$this->getTemplateFilename(),
      'template' => $this->getTemplate(),
    ];
  }

  /**
   * {@inheritDoc}
   */
  public function extractSectionDefinition() {
    // @todo: this should be wrapped in some for of (typed) definition class.
    return $this->getConverter()->extractSectionDefinitions($this->getTemplate());
  }

  /**
   * @return \DOMDocument
   * @throws \Drupal\Component\Plugin\Exception\PluginException
   */
  public function build() {
    return $this->getDocumentBuilder()->buildDocument($this->getDocumentSection());
  }

  /**
   * @return array
   * @throws \Drupal\Component\Plugin\Exception\PluginException
   */
  public function view() {
    $document_section = $this->getDocumentSection();
    return [
      '#theme' => 'section',
      '#document_section' => $document_section,
    ];
  }
}
