<?php

namespace Drupal\ckeditor5_sections\Plugin\GraphQL\Types;

use Drupal\ckeditor5_sections\DocumentSection;
use Drupal\graphql\GraphQL\Execution\ResolveContext;
use Drupal\graphql\Plugin\GraphQL\Types\TypePluginBase;
use GraphQL\Type\Definition\ResolveInfo;

/**
 * @GraphQLType(
 *   id = "section",
 *   deriver = "Drupal\ckeditor5_sections\Plugin\Deriver\SectionTypeDeriver"
 * )
 */
class SectionType extends TypePluginBase {

  /**
   * {@inheritdoc}
   */
  public function applies($object, ResolveContext $context, ResolveInfo $info) {
    return $object instanceof DocumentSection &&
      $object->getType() === $this->getPluginDefinition()['type'];
  }

}
