<?php

namespace Drupal\ckeditor5_sections;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Render\Element;
use Drupal\tmgmt_content\FieldProcessorInterface;

class SectionsTmgmtFieldProcessor implements FieldProcessorInterface {

  /**
   * Extracts the translatatable data structure from the given field.
   *
   * @param \Drupal\Core\Field\FieldItemListInterface $field
   *   The field object.
   *
   * @return array $data
   *   An array of elements where each element has the following keys:
   *   - #text
   *   - #translate
   *
   * @see \Drupal\tmgmt_content\Plugin\tmgmt\Source\ContentEntitySource::extractTranslatableData()
   */
  public function extractTranslatableData(FieldItemListInterface $field) {
    $data = array();
    foreach ($field as $delta => $field_item) {
      $sections = $field_item->sections->getValue();
      $data[$delta]['json'] = [];
      $this->extractSectionsData($sections, $data[$delta]['json']);
    }
    return $data;
  }

  protected function extractSectionsData($sections, &$data) {
    foreach ($sections as $section_property_name => $section_property_data) {
      if (is_string($section_property_data)) {
        $data[$section_property_name] = [
          '#label' => ucfirst($section_property_name),
          '#text' => $section_property_data,
          '#translate' => $this->shouldTranslateSectionProperty($section_property_name),
        ];
      }
      else {
        $label = is_numeric($section_property_name) ? t('Delta #@delta', array('@delta' => $section_property_name)) : ucfirst($section_property_name);
        // Append the type of the section to the label, if it exists.
        if (!empty($section_property_data['__type'])) {
          $label .= ': ' . $section_property_data['__type'];
        }
        $data[$section_property_name] = [
          '#label' => $label,
        ];
        $this->extractSectionsData($section_property_data, $data[$section_property_name]);
      }
    }
  }

  /**
   * Process the translated data for this field back into a structure that can be saved by the content entity.
   *
   * @param array $field_data
   *   The translated data for this field.
   * @param \Drupal\Core\Field\FieldItemListInterface $field
   *   The field object.
   *
   * @see \Drupal\tmgmt_content\Plugin\tmgmt\Source\ContentEntitySource::doSaveTranslations()
   */
  public function setTranslations($field_data, FieldItemListInterface $field) {
    foreach (Element::children($field_data) as $delta) {
      $translation_data = $field_data[$delta]['json'];
      $sections_data = [];
      $this->buildSectionsFromTranslation($translation_data, $sections_data);
      // If the offset does not exist, populate it with the current value
      // from the source content, so that the translated field offset can be
      // saved.
      if (!$field->offsetExists(($delta))) {
        $translation = $field->getEntity();
        $source = $translation->getUntranslated();
        $source_field = $source->get($field->getName());
        $source_offset = $source_field->offsetGet($delta);
        // Note that the source language value will be immediately
        // overwritten.
        $field->offsetSet($delta, $source_offset);
      }
      $field->offsetGet($delta)->set('json', json_encode($sections_data));
    }
  }

  /**
   * Create a sections structure from data of a translation job.
   */
  protected function buildSectionsFromTranslation($translation_data, &$sections_data) {
    // Each element from the translation_data array is either an array with a
    // '#text' key (which means this is a translated string), or an array
    // which has nested arrays inside, in which case we have to process them.
    if (is_array($translation_data)) {
      if (isset($translation_data['#text'])) {
        $sections_data = isset($translation_data['#translation']['#text']) && $translation_data['#translate'] ? $translation_data['#translation']['#text'] : $translation_data['#text'];
      }
      else {
        foreach (Element::children($translation_data) as $property) {
          $sections_data[$property] = [];
          $this->buildSectionsFromTranslation($translation_data[$property], $sections_data[$property]);
        }
      }
    }
  }

  /**
   * Checks if a section property should be translatable.
   */
  protected function shouldTranslateSectionProperty($property) {
    // @todo: make this more flexible, maybe invoke a hook to get any other
    // untranslatable properties.
    $non_translatable_properties = [
      '__type',
      'id',
    ];
    if (in_array($property, $non_translatable_properties)) {
      return FALSE;
    }
    // Any data property should not be translatable.
    if (strpos($property, 'data-') === 0) {
      return FALSE;
    }
    return TRUE;
  }
}
