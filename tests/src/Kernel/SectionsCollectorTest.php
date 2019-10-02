<?php

namespace Drupal\Tests\ckeditor5_sections\Kernel;

use Drupal\KernelTests\KernelTestBase;

/**
 * Class SectionsCollectorTest.
 *
 * @package Drupal\Tests\ckeditor5_sections\Kernel
 * @group ckeditor5_sections
 */
class SectionsCollectorTest extends KernelTestBase {

  /**
   * The service under test.
   *
   * @var \Drupal\ckeditor5_sections\SectionsCollector
   */
  protected $sectionsCollector;

  /**
   * The modules to load to run the test.
   *
   * @var array
   */
  public static $modules = [
    'ckeditor5_sections',
    'ckeditor5_sections_test',
    'config_translation',
    'editor',
    'filter',
    'language',
    'language_test',
    'locale',
    'serialization',
    'system',
    'linkit',
    'user',
  ];

  /**
   * {@inheritdoc}
   */
  protected function setUp() {
    parent::setUp();

    $this->installConfig([
      'ckeditor5_sections',
      'locale',
      'language',
      'system',
    ]);

    $this->sectionsCollector = $this->container->get('ckeditor5_sections.sections_collector');
  }

  /**
   * Data provider for ::testTemplateProcessing() - now with added Gàidligh󠁧󠁢󠁳󠁣󠁴󠁿!
   *
   * @return array
   */
  public function stringData() {
    return [
      [
        'en' => 'Enter a title (optional) ...',
        'gd' => 'Cuir a-steach tiotal (roghainneil) ...',
      ],
      [
        'en' => 'Enter some content ...',
        'gd' => 'Cuir a-steach cuid de shusbaint ...',
      ],
      [
        'en' => 'Enter some footer notes (optional) ...',
        'gd' => 'Cuir a-steach cuid de notaichean spògan (roghainneil) ...',
      ],
    ];
  }

  /**
   * @dataProvider stringData
   */
  public function testTemplateProcessing($en, $gd) {
    // Mock the translation manager for ease.
    $string_translation = $this->getMockBuilder('ContentTranslationManagerInterface')
      ->setMethods(['translateString'])
      ->getMock();
    $string_translation
      ->expects($this->exactly(3))
      ->method('translateString')
      ->willReturnOnConsecutiveCalls('Cuir a-steach tiotal (roghainneil) ...', 'Cuir a-steach cuid de shusbaint ...', 'Cuir a-steach cuid de notaichean spògan (roghainneil) ...');
    \Drupal::getContainer()->set('string_translation', $string_translation);

    // Get the dummy templates and run them through the method.
    $path = drupal_get_path('module', 'ckeditor5_sections_test') . '/templates';
    $sections = $this->sectionsCollector->getSections($path);

    // Check to ensure the expected strings are where we want them.
    $this->assertTrue(strpos($sections['test1']['template'], $en));
    $this->assertFalse(strpos($sections['test1']['template'], $gd));
    $this->assertTrue(strpos($sections['test2']['template'], $gd));
    $this->assertFalse(strpos($sections['test2']['template'], $en));
  }

}
