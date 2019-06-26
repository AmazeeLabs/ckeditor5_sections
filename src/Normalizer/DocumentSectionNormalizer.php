<?php

namespace Drupal\ckeditor5_sections\Normalizer;

use Drupal\ckeditor5_sections\DocumentSection;
use Drupal\serialization\Normalizer\NormalizerBase;
use InvalidArgumentException;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

/**
 * Normalizer class for document section objects.
 */
class DocumentSectionNormalizer extends NormalizerBase implements DenormalizerInterface {

  protected $supportedInterfaceOrClass = 'Drupal\ckeditor5_sections\DocumentSection';

  /**
   * {@inheritdoc}
   */
  public function normalize($object, $format = NULL, array $context = []) {
    $data['__type'] = substr($object->getType(), strlen('section:'));
    foreach ($object->getFields() as $field => $value) {
      if (is_array($value)) {
        foreach ($value as $index => $item) {
          $data[$field][$index] = $this->normalize($item, $format, $context);
        }
      }
      elseif ($value instanceof DocumentSection) {
        $data[$field] = $this->normalize($value, $format, $context);
      }
      else {
        $data[$field] = $value;
      }
    }
    return $data;
  }

  /**
   * {@inheritdoc}
   */
  public function denormalize($data, $class = NULL, $format = NULL, array $context = []) {
    if (is_array($data) && empty($data['__type'])) {
      return array_map(function ($item) use ($class, $format, $context) {
        return $this->denormalize($item, $class, $format, $context);
      }, $data);
    }
    elseif (is_array($data) && !empty($data['__type'])) {
      $section = new DocumentSection('section:' . $data['__type']);
      foreach ($data as $field => $value) {
        if ($field === '__type') {
          continue;
        }
        if (is_array($value)) {
          $section->set($field, $this->denormalize($value, $class, $format, $context));
        }
        else {
          $section->set($field, $value);
        }

      }
      return $section;
    }
    throw new InvalidArgumentException('The data must be either an array of sections or an array with the section information.');
  }

}
