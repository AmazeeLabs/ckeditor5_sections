<?php
namespace Drupal\ckeditor5_sections;

use Drupal\Component\Utility\Html;

class SectionPluginDocumentBuilder {

  /**
   * @var \Drupal\ckeditor5_sections\SectionPluginDocumentParser
   */
  protected $pluginDocumentParser;

  /**
   * SectionPluginDocumentBuilder constructor.
   *
   * @param \Drupal\ckeditor5_sections\SectionPluginDocumentParser $pluginDocumentParser
   */
  public function __construct(SectionPluginDocumentParser $pluginDocumentParser) {
    $this->pluginDocumentParser = $pluginDocumentParser;
  }

  /**
   * Rebuild a document from its data representation.
   *
   * @param \Drupal\ckeditor5_sections\DocumentSection $section
   *   The data representation of a document.
   *
   * @return \DOMDocument
   */
  public function buildDocument(DocumentSection $section) {
    $xml = new \DOMDocument();
    $xml->appendChild($this->buildDocumentSection($section, $xml));
    return $xml;
  }

  /**
   * Rebuild a single en section of a document.
   */
  protected function buildDocumentSection(DocumentSection $section, \DOMDocument $doc) {
    $node = $doc->importNode($this->pluginDocumentParser->getTypeNode(substr($section->getType(), strlen('section:'))), TRUE);
    $this->processTemplateNode($section, $node);
    return $node;
  }

  /**
   * Process one node in a template.
   *
   * @param \Drupal\ckeditor5_sections\DocumentSection $section
   *   The current section object to write data to.
   * @param \DOMElement $el
   *   The current template DOM node.
   */
  protected function processTemplateNode(DocumentSection $section, \DOMElement $el) {
    $fields = $section->getFields();
    $current = $section->getType() === 'section:' . $el->getAttribute('itemtype');
    $isContainer = $el->hasAttribute('ck-contains');
    $isInput = $el->hasAttribute('ck-input');
    $removableAttributes = [];
    foreach ($el->attributes as $attributeName => $attribute) {
      if (strpos($attributeName, 'ck-') === 0) {
        $removableAttributes[] = $attributeName;
      }
      if ($current) {
        if (array_key_exists($attributeName, $fields)) {
          $el->setAttribute($attributeName, $fields[$attributeName]);
        }
      }
    }

    foreach ($removableAttributes as $attributeName) {
      $el->removeAttribute($attributeName);
    }

    if ($el->hasAttribute('itemprop')) {
      $prop = $el->getAttribute('itemprop');
      if ($el->hasAttribute('itemtype')) {
        $next = $section->get($prop);
        if ($next instanceof DocumentSection) {
          $this->processTemplateNode($next, $el);
          return;
        }
      }
      elseif ($isContainer) {
        $sections = $section->get($prop);
        foreach ($sections as $child) {
          $childSection = $this->buildDocumentSection($child, $el->ownerDocument);
          $el->appendChild($childSection);
        }
      }
      elseif ($section->get($prop) || $isInput) {
        $value = $section->get($prop);
        $prop_value = Html::normalize($value);
        $fragment = new \DOMDocument();
        $fragment->loadHTML('<?xml encoding="utf-8" ?><div>' . $prop_value . '</div>');
        foreach ($el->childNodes as $child) {
          $el->removeChild($child);
        }
        foreach ($fragment->documentElement->lastChild->lastChild->childNodes as $child) {
          $el->appendChild($el->ownerDocument->importNode($child, TRUE));
        }
      }
    }

    if (!$isContainer) {
      foreach ($el->childNodes as $child) {
        if ($child instanceof \DOMElement) {
          $this->processTemplateNode($section, $child);
        }
      }
    }
  }
}
