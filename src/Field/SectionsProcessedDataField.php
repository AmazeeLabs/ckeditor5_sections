<?php

namespace Drupal\ckeditor5_sections\Field;

use Drupal\ckeditor5_sections\DocumentSection;
use Drupal\Core\Entity\Plugin\DataType\EntityAdapter;
use Drupal\Core\Render\RenderContext;
use Drupal\Core\TypedData\TypedData;

/**
 * Computed field property implementation to extract typed sections data.
 */
class SectionsProcessedDataField extends TypedData {

  /**
   * {@inheritdoc}
   */
  public function getValue() {
    $renderContext = new RenderContext();
    $item = $this->getParent();
    $text = $item->json;

    $filterFormat = $item->getFieldDefinition()->getSetting('filter_format');

    if ($filterFormat) {
      /** @var \Drupal\Core\Render\Renderer $renderer */
      $renderer = \Drupal::service('renderer');

      $build = [
        '#type' => 'processed_text',
        '#text' => $text,
        '#format' => $filterFormat,
        '#filter_types_to_skip' => [],
        '#langcode' => $item->getLangcode(),
      ];

      // Capture the cacheability metadata associated with the processed text.
      $text = $renderer->executeInRenderContext($renderContext, function () use (&$build, $renderer) {
        // Put the entity into the token_filter's static cache.
        $entity = &drupal_static('token_filter_entity');
        $entity = $this->getParentEntity();
        return $renderer->render($build, TRUE);
      });
    }

    /* @var \Drupal\ckeditor5_sections\DocumentConverterInterface $parser */
    $sections = DocumentSection::fromValue(json_decode($text, TRUE));

    // Invoke alter hooks before returning data.
    if ($sections) {
      \Drupal::moduleHandler()->alter('section_data', $sections, $item);
      if (!$renderContext->isEmpty() && $cacheableMetadata = $renderContext->pop()) {
        $sections->addCacheableDependency($cacheableMetadata);
      }
    }
    return $sections;
  }

  /**
   * {@inheritDoc}
   */
  public function setValue($value, $notify = TRUE) {
    if ($value) {
      if (is_array($value)) {
        $this->parent->setValue(json_encode($value));
      }
      if ($value instanceof DocumentSection) {
        $this->parent->setValue(json_encode($value->getValue()));
      }
    }
  }

  /**
   * Returns the parent entity.
   *
   * @return \Drupal\Core\Entity\EntityInterface
   */
  protected function getParentEntity() {
    $parent = $this;

    while ($parent && !$parent instanceof EntityAdapter) {
      $parent = $parent->getParent();
    }

    if ($parent instanceof EntityAdapter) {
      return $parent->getEntity();
    }
  }

}
