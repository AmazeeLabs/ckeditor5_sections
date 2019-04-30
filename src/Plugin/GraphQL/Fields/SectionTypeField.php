<?php

namespace Drupal\ckeditor5_sections\Plugin\GraphQL\Fields;

use Drupal\ckeditor5_sections\DocumentSection;
use Drupal\graphql\GraphQL\Execution\ResolveContext;
use Drupal\graphql\Plugin\GraphQL\Fields\FieldPluginBase;
use GraphQL\Type\Definition\ResolveInfo;

/**
 * @GraphQLField(
 *   id = "section_type",
 *   secure = true,
 *   name = "sectionType",
 *   type = "String",
 *   parents = {"Section"},
 * )
 */
class SectionTypeField extends FieldPluginBase {

  /**
   * {@inheritdoc}
   */
  public function resolveValues($value, array $args, ResolveContext $context, ResolveInfo $info) {
    if ($value instanceof DocumentSection) {
      yield $value->getType();
    }
  }

}
