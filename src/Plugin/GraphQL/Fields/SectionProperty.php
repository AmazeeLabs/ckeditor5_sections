<?php

namespace Drupal\ckeditor5_sections\Plugin\GraphQL\Fields;

use Drupal\ckeditor5_sections\DocumentSection;
use Drupal\graphql\GraphQL\Execution\ResolveContext;
use Drupal\graphql\Plugin\GraphQL\Fields\FieldPluginBase;
use GraphQL\Type\Definition\ResolveInfo;

/**
 * @GraphQLField(
 *   id = "section_property",
 *   secure = true,
 *   deriver = "Drupal\ckeditor5_sections\Plugin\Deriver\SectionPropertyDeriver",
 * )
 */
class SectionProperty extends FieldPluginBase {

  /**
   * {@inheritdoc}
   */
  public function resolveValues($value, array $args, ResolveContext $context, ResolveInfo $info) {
    if ($value instanceof DocumentSection) {
      $result = $value->get($this->getPluginDefinition()['propertyName']);
      if (is_array($result)) {
        foreach ($result as $item) {
          yield $item;
        }
      }
      else {
        yield $result;
      }
    }
  }

}
