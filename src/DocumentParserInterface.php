<?php

namespace Drupal\ckeditor5_sections;

/**
 * Interface for document parser classes.
 *
 * The document parser classes are able to do two things: to parse a document
 * (usually a template) to get all the metadata information about the contained
 * object types and their fields and to parse a data document in order to
 * extract its actual data.
 */
interface DocumentParserInterface {

  /**
   * Extracts the object definitions from a document, sent as a parameter. The
   * parameter is actually just the content (string) of the document and should
   * be a valid XML string.
   *
   * @return array
   *  The object definitions. The keys of the items in the array represent the
   *  type of the object. The values are associative arrays with the following
   *  keys:
   *   - fields: An array with all the fields of the object type. Each key
   *     identifies the field name, and each value contains another array with
   *     at least two keys: the label of the field and the type of the field.
   *     The type of the field can be have any Drupal typed data value.
   *  Example of a returned result:
   * [
   *   'document_object:teaser' => [
   *     'fields' => [
   *        'layout' => [
   *          'label' => 'layout',
   *          'type' => 'string',
   *        ],
   *        'image' => [
   *          'label' => 'image',
   *          'type' => 'document_object:image',
   *        ],
   *        'text' => [
   *          'label' => 'text',
   *          'type' => 'string',
   *        ],
   *      ],
   *    ],
   *   'document_object:image' => [
   *     'fields' => [
   *        'mediaType' => [
   *          'label' => 'mediaType',
   *          'type' => 'string',
   *        ],
   *        'mediaUuid' => [
   *          'label' => 'mediaUuid',
   *          'type' => 'string',
   *        ],
   *      ]
   *    ]
   * ]
   */
  public function extractObjectDefinitions($document);

  // @todo: define the method for extracting the data.
}
