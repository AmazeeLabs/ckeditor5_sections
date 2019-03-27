<?php

namespace Drupal\ckeditor5_sections;

/**
 * Interface for document parser classes.
 *
 * The document parser classes are able to do two things: to parse a document
 * (usually a template) to get all the metadata information about the contained
 * section types and their fields and to parse a data document in order to
 * extract its actual data.
 */
interface DocumentParserInterface {

  /**
   * Extracts the section definitions from a document, sent as a parameter. The
   * parameter is actually just the content (string) of the document and should
   * be a valid XML string.
   *
   * @param string $document
   *  The document to be parsed.
   * @return array
   *  The section definitions. The keys of the items in the array represent the
   *  type of the section. The values are associative arrays with the following
   *  keys:
   *   - type: The type of the section.
   *   - fields: An array with all the fields of the section type. Each key
   *     identifies the field name, and each value contains another array with
   *     at least two keys: the label of the field and the type of the field.
   *     The type of the field can be have any Drupal typed data value.
   *  Example of a returned result:
   * [
   *   'teaser' => [
   *     'type' => 'teaser',
   *     'fields' => [
   *        'layout' => [
   *          'label' => 'layout',
   *          'type' => 'string',
   *        ],
   *        'image' => [
   *          'label' => 'image',
   *          'type' => 'section:image',
   *        ],
   *        'text' => [
   *          'label' => 'text',
   *          'type' => 'string',
   *        ],
   *      ],
   *    ],
   *   'image' => [
   *     'type' => 'image',
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
  public function extractSectionDefinitions($document);

  /**
   * Extracts the section data from a document.
   *
   * The data has to match the section definition we have
   *
   * @param string $document
   *  The document to be parsed for the data.
   * @return mixed
   *  The extracted data.
   */
  public function extractSectionData($document);
}