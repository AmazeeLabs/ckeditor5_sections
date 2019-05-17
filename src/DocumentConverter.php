<?php

namespace Drupal\ckeditor5_sections;

use Drupal\ckeditor5_sections\Plugin\DataType\DocumentSectionAdapter;
use Drupal\Core\TypedData\ComplexDataDefinitionInterface;
use Drupal\Core\TypedData\ListDataDefinitionInterface;
use Drupal\Core\TypedData\ListInterface;
use Drupal\Core\TypedData\TypedDataManagerInterface;

/**
 * Parser class for extracting the section definitions and data from
 * templates and documents.
 */
class DocumentConverter implements DocumentConverterInterface {

  /**
   * @var \Drupal\Core\TypedData\TypedDataManagerInterface
   */
  protected $typedDataManager;

  /**
   * @var \Drupal\ckeditor5_sections\SectionsCollectorInterface
   */
  protected $sectionsCollector;

  /**
   * Maps type names to their template DOM nodes.
   * @var \DOMElement[]
   */
  protected $typeNodeMap;

  /**
   * DocumentConverter constructor.
   *
   * @param \Drupal\Core\TypedData\TypedDataManagerInterface $typedDataManager
   *   A typed data manager to register new data types.
   * @param \Drupal\ckeditor5_sections\SectionsCollectorInterface $sectionsCollector
   *   The sections collector to retrieve all defined templates.
   */
  public function __construct(
    TypedDataManagerInterface $typedDataManager,
    SectionsCollectorInterface $sectionsCollector
  ) {
    $this->sectionsCollector = $sectionsCollector;
    $this->typedDataManager = $typedDataManager;
  }

  /**
   * Retrieve all section type definitions.
   * @return array
   */
  public function getSectionTypeDefinitions() {
    $templates = $this->sectionsCollector->getSections();
    $section_types = [];
    foreach ($templates as $template) {
      $section_types = array_merge($section_types, $this->extractSectionDefinitions($template['template']));
    }
    return $section_types;
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
    $node = $doc->importNode($this->getTypeNode(substr($section->getType(), strlen('section:'))), TRUE);
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
        if ($next) {
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
      else {
        $fragment = $el->ownerDocument->createDocumentFragment();
        $fragment->appendXML('<div>' . $section->get($prop) . '</div>');
        foreach ($el->childNodes as $child) {
          $el->removeChild($child);
        }

        foreach ($fragment->firstChild->childNodes as $child) {
          $el->appendChild($child);
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

  /**
   * {@inheritdoc}
   */
  public function extractSectionDefinitions($document) {
    // The following rules apply when extracting the section definitions from a
    // document:
    // 1. If the element has the 'itemtype' attribute, it is treated like an
    // section. All of its attributes, except the 'class' and 'ck-*' are treated
    // like properties (fields) on the section, of type string. The 'data-*'
    // attributes are converted to properties according to
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
    // @todo: handle the case when the same item type appears more times, and check for recursion.

    // 2. If the element has an 'itemprop' then this is treated like a property
    // (field) and attached to the parent type (it will be basically the first
    // ancestor element which has an itemtype). If there is not parent, then the
    // field is not attached to anything, it will basically not appear anywhere.
    // The type of the fields depends on the 'itemtype' property of the element.
    // If the 'itemtype' is empty, then the type will be set to string. If there
    // is an 'itemtype' then this will become the type of the field.

    $dom = new \DOMDocument();
    // Load the document and convert the encoding to HTML-ENTITIES, see
    // https://davidwalsh.name/domdocument-utf8-problem
    $dom->loadHTML(mb_convert_encoding($document, 'HTML-ENTITIES', 'UTF-8'), LIBXML_NOERROR);
    $result = [];
    $this->buildSectionDefinitions($dom, $result);
    return $result;
  }

  /**
   * @param $type
   *
   * @return \DOMElement
   */
  public function getTypeNode($type) {
    if (!isset($this->typeNodeMap)) {
      // Make sure all templates are scanned and the typemap is built.
      $this->getSectionTypeDefinitions();
    }
    return $this->typeNodeMap[$type];
  }

  /**
   * {@inheritdoc}
   */
  public function extractSectionData($document) {
    $dom = new \DOMDocument();
    $dom->loadHTML(mb_convert_encoding($document, 'HTML-ENTITIES', 'UTF-8'), LIBXML_NOERROR);
    //$list_definition = \Drupal::typedDataManager()->createListDataDefinition('section');
    //$result = \Drupal::typedDataManager()->create($list_definition);
    $result = [];
    if($dom->documentElement->hasAttribute('itemtype')) {
      throw new \Exception('Data extraction requires type definition at root.');
    }
    $this->buildSectionData($dom, $result);
    return $result[0];
  }

  /**
   * Recursively traverses a dom and extracts the section definitions.
   *
   * @param \DOMNode $node
   *  The node currently being processed.
   * @param $result
   *  The extraction result.
   */
  protected function buildSectionDefinitions(\DOMNode $node, &$result, $parentType = '') {
    // If the current node is a DOMElement, process it.
    $newParentType = $parentType;
    if ($node instanceof \DOMElement) {
      // Check if the current element is a type. If yes, we will add all its
      // attributes to the result.
      if ($node->hasAttribute('itemtype')) {
        $type = $node->getAttribute('itemtype');
        $this->typeNodeMap[$type] = $node;
        // We also update the new parent type which will be used when processing
        // the children of the current node.
        $newParentType = $type;
        // We need to decide what we do if the type is already added to the
        // result. For now, we just keep processing the data, so we will just
        // merge any new fields, but we may want to change this in the future.
        if (empty($result[$type])) {
          $result[$type] = [
            'type' => $type,
            'fields' => [],
          ];
        }
        foreach ($node->attributes as $attribute) {
          $attributeName = $attribute->nodeName;
          // Specific attributes should be ignored.
          if (in_array($attributeName, ['itemtype', 'itemscope', 'itemprop', 'itemexpand', 'class'])) {
            continue;
          }
          // Also, if the attribute name starts with 'ck-', we ignore it as
          // well.
          if (strpos($attributeName, 'ck-') === 0) {
            continue;
          }
          // Add the attribute as a string field.
          $result[$type]['fields'][$attributeName] = [
            'label' => $attributeName,
            'type' => 'string',
          ];
        }
      }
      // If the element has an item prop, then we actually have to add it to its
      // parent (if any).
      if ($node->hasAttribute('itemprop') && !empty($parentType)) {
        // The type of the field depends actually on the itemtype property. If
        // there is an itemtype, it will just be used as the type, otherwise
        // the type will be 'string'.
        $itemtype = $node->hasAttribute('itemtype') ? 'section:' . $node->getAttribute('itemtype') : 'string';
        if ($node->hasAttribute('ck-contains')) {
          $itemtype = 'section';
        }
        $fieldName = $node->getAttribute('itemprop');
        $result[$parentType]['fields'][$fieldName] = [
          'label' => $fieldName,
          'type' => $itemtype,
        ];
        if ($node->hasAttribute('ck-contains')) {
          $result[$parentType]['fields'][$fieldName]['cardinality'] = 'multiple';
        }
      }
    }

    // Process all the children of the current node, if any.
    if ($node->hasChildNodes()) {
      foreach (iterator_to_array($node->childNodes) as $child) {
        $this->buildSectionDefinitions($child, $result, $newParentType);
      }
    }
  }

  public function buildSectionData(\DOMNode $node, array &$sections_list, DocumentSection $parent = NULL) {
    $new_parent = $parent;
    $stop_processing = FALSE;
    if ($node instanceof \DOMElement) {
      $value = [
        'item_type' => NULL,
        'item_cardinality' => 'single',
      ];
      // If the element has an itemprop attribute, and we are in the context of
      // a parent, then we extract the item type and its cardinality from the
      // data definition we have in the system. If the element has an itemprop,
      // but we are not in the context of a parent then we can't say what type
      // is, unless it has an itemtype attribute.
      if ($node->hasAttribute('itemprop') && !empty($parent)) {
        $parent_type = $parent->getType();
        $field_name = $node->getAttribute('itemprop');
        $value['field_name'] = $field_name;
        /* @var \Drupal\Core\TypedData\ComplexDataDefinitionInterface $data_definition */
        $data_definition = $this->typedDataManager->createDataDefinition($parent_type);
        $field_definition = $data_definition->getPropertyDefinition($field_name);
        // @todo: throw an exception maybe?
        if (!empty($field_definition)) {
          $value['item_type'] = $field_definition->getDataType();
          // If the field data definition is an instance of ListDataDefinition,
          // then the cardinality is multiple, and its type is section.
          if ($field_definition instanceof ListDataDefinitionInterface) {
            $value['item_cardinality'] = 'multiple';
            $value['item_type'] = 'section';
          }
        }
      }
      elseif ($node->hasAttribute('itemtype')) {
        $value['item_type'] = 'section:' . $node->getAttribute('itemtype');
      }

      // We only process the actual item if we could extract the item type.
      if (!empty($value['item_type'])) {
        // If we encounter a multiple field, then this is actually just a list
        // of items. In this case we directly extract the list and assign it to
        // the field.
        if ($value['item_cardinality'] === 'multiple') {
          if (!empty($parent) && !empty($value['field_name'])) {
            $field_result = [];
            if ($node->hasChildNodes()) {
              foreach (iterator_to_array($node->childNodes) as $child) {
                $this->buildSectionData($child, $field_result);
              }
            }
            $parent->set($value['field_name'], $field_result);
          }
          // As we already processed the list, we set this flag to true so this
          // does not get processed again.
          $stop_processing = TRUE;
        }
        else {
          $item_field_definition = $this->typedDataManager->createDataDefinition($value['item_type']);
          // If the field is a complex field, then we need to additionally check
          // the values of the attributes.
          if ($item_field_definition instanceof ComplexDataDefinitionInterface) {
            $item_field_data = new DocumentSection($value['item_type']);
            // Add all the attributes.
            foreach ($node->attributes as $attribute) {
              $attributeName = $attribute->nodeName;
              // Add the attribute to the current value.
              if ($item_field_definition->getPropertyDefinition($attributeName)) {
                $item_field_data->set($attributeName, $node->getAttribute($attribute->nodeName));
              }
            }
            $new_parent = $item_field_data;
          }
          else {
            // If the field is just a simple (scalar) field, then we just dump
            // the entire html of the node in it for now.
            $item_field_data = $this->getDOMInnerHtml($node);
            if (trim($item_field_data, " \t\n\r\0\x0B\xC2\xA0") === '') {
              // CKEditor and friends sometimes use the non-breaking space
              // character in empty elements for various reasons. Treat such
              // cases as empty strings, so that the user code can perform the
              // is-empty checks in an easy way.
              $item_field_data = '';
            }
          }

          // If we are in the context of a parent, then just set the item data
          // to the proper field name.
          if (!empty($parent)) {
            if (!empty($value['field_name'])) {
              $parent->set($value['field_name'], $item_field_data);
            }
          }
          // If we are not in the context of a parent, we just append the data
          // to the result array.
          else {
            $sections_list[] = $item_field_data;
          }
        }
      }
    }
    // Process all the children of the current node, if any.
    if (!$stop_processing && $node->hasChildNodes()) {
      foreach (iterator_to_array($node->childNodes) as $child) {
        $this->buildSectionData($child, $sections_list, $new_parent);
      }
    }
  }

  // @todo: this is an initial implementation which uses the typed data, but this
  // did not work properly when having lists of items. So for now we just use
  // the above implementation which uses the typed data information to retrieve
  // the metadata about the fields, but the values themselves are stored in
  // DocumentSection objects.
  public function __buildSectionData(\DOMNode $node, ListInterface $result, DocumentSectionAdapter $parent = NULL) {
    $new_result = $result;
    $new_parent = $parent;
    $update_new_result = FALSE;
    $update_new_parent = FALSE;
    if ($node instanceof \DOMElement) {
      $value = [
        'item_type' => NULL,
        'item_cardinality' => 'single',
      ];
      // If the element has an itemprop attribute, and we are in the context of
      // a parent, then we extract the item type and its cardinality from the
      // data definition we have in the system. If the element has an itemprop,
      // but we are not in the context of a parent then we can't say what type
      // is, unless it has an itemtype attribute.
      if ($node->hasAttribute('itemprop') && !empty($parent)) {
        $parent_type = $parent->get('section_type')->getValue();
        $field_name = $node->getAttribute('itemprop');
        $value['field_name'] = $field_name;
        /* @var \Drupal\Core\TypedData\ComplexDataDefinitionInterface $data_definition */
        $data_definition = $this->typedDataManager->createDataDefinition($parent_type);
        $field_definition = $data_definition->getPropertyDefinition($field_name);
        // @todo: throw an exception maybe?
        if (!empty($field_definition)) {
          $value['item_type'] = $field_definition->getDataType();
          // If the field data definition is an instance of ListDataDefinition,
          // then the cardinality is multiple, and its type is section.
          if ($field_definition instanceof ListDataDefinitionInterface) {
            $value['item_cardinality'] = 'multiple';
            $value['item_type'] = 'section';
          }
        }
      }
      elseif ($node->hasAttribute('itemtype')) {
        $value['item_type'] = $node->getAttribute('itemtype');
      }

      // We only process the actual item if we could extract the item type.
      if (!empty($value['item_type'])) {
        if ($value['item_cardinality'] === 'multiple') {
          $item_field_definition = $this->typedDataManager->createListDataDefinition($value['item_type']);
          $item_field_data = $this->typedDataManager->create($item_field_definition);
          $update_new_result = TRUE;
        }
        else {
          $item_field_definition = $this->typedDataManager->createDataDefinition($value['item_type']);
          // If the field is a complex field, then we need to additionally check
          // the values of the attributes.
          if ($item_field_definition instanceof ComplexDataDefinitionInterface) {
            /* @var \Drupal\Core\TypedData\ComplexDataInterface $item_field_data */
            $item_field_data = $this->typedDataManager->create($item_field_definition);
            // Add all the attributes.
            foreach ($node->attributes as $attribute) {
              $attributeName = $attribute->nodeName;
              // Add the attribute to the current value.
              if ($item_field_definition->getPropertyDefinition($attributeName)) {
                $item_field_data->set($attributeName, $node->getAttribute($attribute->nodeName));
              }
            }
            $item_field_data->set('section_type', $value['item_type']);
            $update_new_parent = TRUE;
          }
          else {
            // If the field is just a simple (scalar) field, then we just dump
            // the entire html of th node in it for now.
            $item_field_data = $this->typedDataManager->create($item_field_definition, $this->getDOMInnerHtml($node));
          }
        }
        // If we are in the context of a parent, then just set the item data
        // to the proper field name.
        if (!empty($parent)) {
          if (!empty($value['field_name'])) {
            $parent->set($value['field_name'], $item_field_data->getValue());
            if ($update_new_result) {
              $new_result = $parent->get($value['field_name']);
            }
            if ($update_new_parent) {
              $new_parent = $parent->get($value['field_name']);
            }
          }
        }
        // If we are not in the context of a parent, we just append the data
        // to the result array.
        else {
          $appended_item = $result->appendItem($item_field_data->getValue());
          $appended_item->getDataDefinition()->setSectionType($item_field_data->getDataDefinition()->getConstraint('SectionType'));
          if ($update_new_result) {
            $new_result = $appended_item;
          }
          if ($update_new_parent) {
            $new_parent = $appended_item;
          }
        }
      }
    }
    // Process all the children of the current node, if any.
    if ($node->hasChildNodes()) {
      foreach (iterator_to_array($node->childNodes) as $child) {
        $this->buildSectionData($child, $new_result, $new_parent);
      }
    }
  }

  /**
   * Returns the inner html of a DOM node.
   *
   * @param \DOMNode $node
   *  The DOM node.
   * @return string
   *  The html result.
   */
  protected function getDOMInnerHtml(\DOMNode $node) {
    $innerHTML = "";
    foreach ($node->childNodes as $child) {
      $innerHTML .= $node->ownerDocument->saveHTML($child);
    }
    return $innerHTML;
  }
}
