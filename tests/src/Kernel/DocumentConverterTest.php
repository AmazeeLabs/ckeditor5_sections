<?php

namespace Drupal\Tests\ckeditor5_sections\Unit;

use Drupal\ckeditor5_sections\Normalizer\DocumentSectionNormalizer;
use Drupal\KernelTests\KernelTestBase;

/**
 * Tests for the Document parser class.
 */
class DocumentConverterTest extends KernelTestBase {

  public static $modules = [
    'ckeditor5_sections',
    'editor',
    'media',
    'filter',
    'serialization'
  ];

  /**
   * @var \Symfony\Component\Serializer\Normalizer\NormalizerInterface
   */
  protected $normalizer;

  protected function setUp() {
    parent::setUp();
    $this->installConfig(['ckeditor5_sections']);
  }

  /**
   * Helper function to load all asset pairs (*.html + *.json files) from a
   * given directory. Used in test data providers.
   *
   * @param $directory
   *   The directory to scan.
   *
   * @return array
   *   Two dimensional array of html/json pairs.
   */
  protected function loadTestAssets($directory) {
    $data = [];
    $dir = dirname(__FILE__) . '/' . $directory;
    foreach (scandir($dir) as $file) {
      if (substr($file, -5) !== '.json') {
        continue;
      }

      $name = substr($file, 0, -5);
      $data[$name] = [
        file_get_contents($dir . '/' . $name . '.html'),
        json_decode(file_get_contents($dir . '/' . $file), TRUE),
      ];
    }
    return $data;
  }

  /**
   * Data provider for testExtractSectionDefinitions().
   */
  public function extractSectionDefinitionsProvider() {
    return $this->loadTestAssets('assets/definitions');
  }


  /**
   * Data provider for document conversion tests.
   */
  public function extractSectionDataProvider() {
    return $this->loadTestAssets('assets/data');
  }

  /**
   * @covers \Drupal\ckeditor5_sections\DocumentConverter::extractSectionDefinitions
   * @dataProvider extractSectionDefinitionsProvider
   */
  public function testExtractSectionDefinitions($template, $result) {
    $documentParser = $this->container->get('ckeditor5_sections.document_converter');
    $this->assertEquals($result, $documentParser->extractSectionDefinitions($template));
  }

  /**
   * @covers \Drupal\ckeditor5_sections\DocumentConverter::extractSectionData
   * @dataProvider extractSectionDataProvider
   */
  public function testExtractSectionData($document, $result) {
    /** @var \Symfony\Component\Serializer\Normalizer\NormalizerInterface $normalizer */
    $normalizer = new DocumentSectionNormalizer();;
    $documentParser = $this->container->get('ckeditor5_sections.document_converter');
    /** @var \Drupal\ckeditor5_sections\DocumentSection $data */
    $data = $documentParser->extractSectionData($document);
    $this->assertEquals($result, $normalizer->normalize($data, 'json'));
  }

  /**
   * @covers \Drupal\ckeditor5_sections\DocumentConverter::extractSectionData
   * @dataProvider extractSectionDataProvider
   */
  public function testNormalization($document, $result) {
    /** @var \Symfony\Component\Serializer\Normalizer\NormalizerInterface $normalizer */
    $normalizer = new DocumentSectionNormalizer();
    $documentParser = $this->container->get('ckeditor5_sections.document_converter');
    /** @var \Drupal\ckeditor5_sections\DocumentSection $data */
    $data = $documentParser->extractSectionData($document);
    $this->assertEquals($data, $normalizer->denormalize($normalizer->normalize($data)));
  }

  /**
   * @covers \Drupal\ckeditor5_sections\DocumentConverter::buildDocument
   * @dataProvider extractSectionDataProvider
   */
  public function testBuildDocument($document, $data) {
    /** @var \Drupal\ckeditor5_sections\DocumentConverter $documentParser */
    $documentParser = $this->container->get('ckeditor5_sections.document_converter');
    $normalizer = new DocumentSectionNormalizer();
    $doc = $normalizer->denormalize($data);
    $doc = $documentParser->buildDocument($doc);
    $result = $doc->saveHTML();
    $this->assertXmlStringEqualsXmlString($document, $result);
  }
}
