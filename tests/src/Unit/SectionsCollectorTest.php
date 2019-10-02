<?php

namespace {

  if (!function_exists('file_scan_directory')) {

    /**
     * Mock a global function.
     */
    function file_scan_directory($dir) {
      $path = __DIR__ . '/assets/data/';
      return [
        $path . 'test1.yml' =>
          (object) [
            'uri' => $path . 'test1.yml',
            'filename' => 'test1.yml',
            'name' => 'test1',
          ],
        $path . 'test2.yml' =>
          (object) [
            'uri' => $path . 'test2.yml',
            'filename' => 'test2.yml',
            'name' => 'test2',
          ],
      ];
    }

  }

}

namespace Drupal\Tests\ckeditor5_sections\Unit {

  use Drupal\ckeditor5_sections\SectionsCollector;
  use Drupal\Tests\UnitTestCase;

  /**
   * Class SectionsCollectorTest.
   *
   * @package Drupal\Tests\ckeditor5_sections\Unit
   * @group ckeditor5_sections
   */
  class SectionsCollectorTest extends UnitTestCase {

    public $sectionsCollector;

    protected $entityTypeManager;

    protected $twigProcessor;

    /**
     * {@inheritdoc}
     */
    public function setUp() {
      parent::setUp();
      $this->entityTypeManager = $this->createMock('Drupal\Core\Entity\EntityTypeManagerInterface');
      $this->twigProcessor = $this->createMock('Drupal\ckeditor5_sections\TwigProcessor');
      $this->sectionsCollector = new SectionsCollector($this->entityTypeManager, $this->twigProcessor, realpath(__DIR__ . '/../../ckeditor5_sections_test/templates'));
    }

    /**
     * @test
     *
     * @covers \Drupal\ckeditor5_sections\SectionsCollector::getSections
     * @covers \Drupal\ckeditor5_sections\SectionsCollector::collectSectionsFromDirectory
     */
    public function testGetSections() {
      $this->twigProcessor->method('processTwigTemplate')->willReturn('TRANSLATED TEMPLATE!');
      $sections = $this->sectionsCollector->getSections('/');
      $this->assertFalse($sections['test1']['template'] == strip_tags($sections['test1']['template']));
      $this->assertTrue($sections['test2']['template'] == strip_tags($sections['test2']['template']));
      $this->assertNotEquals('TRANSLATED TEMPLATE!', $sections['test1']['template']);
      $this->assertEquals('TRANSLATED TEMPLATE!', $sections['test2']['template']);
    }

  }
}
