<?php

namespace Drupal\ckeditor5_sections\Plugin\GraphQL\Interfaces;

use Drupal\graphql\Plugin\GraphQL\Interfaces\InterfacePluginBase;

/**
 * @GraphQLInterface(
 *   id = "section",
 *   name = "Section",
 *   type = "section",
 *   description = @Translation("Section interface.")
 * )
 */
class Section extends InterfacePluginBase {

}
