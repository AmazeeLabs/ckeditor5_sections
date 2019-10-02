<?php

namespace Drupal\Tests\ckeditor5_sections_test\Unit;

use Drupal\ckeditor5_sections_test\Plugin\SectionValidation\ExampleButtonValidation;
use Drupal\Core\DependencyInjection\ContainerBuilder;
use Drupal\KernelTests\KernelTestBase;

/**
 * Tests for the Document parser class.
 */
class DocumentSectionTypedDataCustomValidationTest extends KernelTestBase {
  /**
   * TypedDataManager.
   *
   * @var \Drupal\Core\TypedData\TypedDataManagerInterface
   */
  protected $typedDataManager;

  public static $modules = [
    'ckeditor5_sections_test',
    'ckeditor5_sections',
    'editor',
    'filter',
    'serialization',
    'media',
    'node',
    'user',
    'linkit',
    'image'
  ];

  public function register(ContainerBuilder $container) {
    parent::register($container);
    $this->container->setParameter('ckeditor5_sections.template_directory', realpath(__DIR__ . '/../../sections'));
  }

  /**
   * Test setup.
   */
  protected function setUp() {
    parent::setUp();
    $this->installConfig(['ckeditor5_sections']);
    $this->installConfig(['ckeditor5_sections_test']);

    $this->typedDataManager = \Drupal::service('typed_data_manager');
    $this->installEntitySchema('media');
    $this->installEntitySchema('media_type');
  }

  /**
   * Test named validation constraint generation.
   */
  public function testNamedValidationConstraints() {
    $definition = $this->typedDataManager->createDataDefinition('section:test_teaser');
    $link = $definition->getPropertyDefinitions()['link'];
    $this->assertEqual(2, count($link->getConstraints()));
    $this->assertEquals($link->getConstraint('SectionType'), [
      'type' => 'button',
    ]);
    $this->assertEquals($link->getConstraint('SectionValidation'), [
      'name' => 'ExampleButtonValidation',
      'attributes' => [
        'ck-validation' => 'ExampleButtonValidation',
        'itemtype' => 'button',
        'itemprop' => 'link',
        'class' => 'teaser__link',
        'link-target' => '',
      ],
    ]);
  }

  /**
   * Test named validation error with invalid data.
   */
  public function testNamedValidationInvalid() {
    $definition = $this->typedDataManager->createDataDefinition('section:test_teaser');
    $linkInvalid = json_decode(file_get_contents(__DIR__ . '/assets/validation/teaser_link_invalid.json'), TRUE);
    $section = $this->typedDataManager->create($definition, $linkInvalid);
    $errors = $section->validate();
    $this->assertEqual(1, $errors->count());
    $this->assertEqual($errors->get(0)->getCode(), ExampleButtonValidation::MUST_FILL_OUT_BOTH_OR_NONE);
  }

  /**
   * Test named validation with valid data.
   */
  public function testNamedValidationValid() {
    $definition = $this->typedDataManager->createDataDefinition('section:test_teaser');
    $linkValid = json_decode(file_get_contents(__DIR__ . '/assets/validation/teaser_link.json'), TRUE);
    $section = $this->typedDataManager->create($definition, $linkValid);
    $errors = $section->validate();
    $this->assertEqual(0, $errors->count());
  }

}
