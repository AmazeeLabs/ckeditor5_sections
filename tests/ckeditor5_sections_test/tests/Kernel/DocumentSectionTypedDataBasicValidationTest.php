<?php

namespace Drupal\Tests\ckeditor5_sections_test\Unit;

use Drupal\ckeditor5_sections\Plugin\Validation\Constraint\SectionTypeConstraint;
use Drupal\Core\DependencyInjection\ContainerBuilder;
use Drupal\Core\Validation\Plugin\Validation\Constraint\CountConstraint;
use Drupal\Core\Validation\Plugin\Validation\Constraint\LengthConstraint;
use Drupal\field\Entity\FieldConfig;
use Drupal\field\Entity\FieldStorageConfig;
use Drupal\KernelTests\KernelTestBase;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Tests for the Document parser class.
 */
class DocumentSectionTypedDataBasicValidationTest extends KernelTestBase {

  /**
   * TypedDataManager.
   *
   * @var \Drupal\Core\TypedData\TypedDataManagerInterface
   */
  protected $typedDataManager;

  public static $modules = [
    'system',
    'field',
    'ckeditor5_sections_test',
    'ckeditor5_sections',
    'editor',
    'filter',
    'serialization',
    'media',
    'node',
    'user',
    'file',
    'linkit',
    'image',
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
   * Test section type constraint and validator.
   */
  public function testSectionTypeValidation() {
    $teaserJson = json_decode(file_get_contents(__DIR__ . '/assets/data/test_teaser.json'), TRUE);
    $teaserSectionTypeDataDefinition = $this->typedDataManager->createDataDefinition('section:test_teaser');
    $teaserSection = $this->typedDataManager->create($teaserSectionTypeDataDefinition, $teaserJson);

    // Assert that the teaser sections match.
    $this->assertEmpty($teaserSection->validate(), 'Teaser and embedded sections validate');

    // Assert that if we manipulate the type that we get a validation error.
    $teaserSection->set('__type', 'invalid-type');
    $errors = $teaserSection->validate();
    $this->assertEqual($errors->count(), 1);
    $this->assertEqual($errors->get(0)->getCode(), SectionTypeConstraint::INVALID_SECTION_TYPE);

    // @todo: validate ck-contains?
  }

  /**
   * Test ck-min and ck-max attributes on texts.
   */
  public function testTextLengthRangeValidation() {
    $teaserSectionTypeDataDefinition = $this->typedDataManager->createDataDefinition('section:test_teaser');
    $teaserJson = json_decode(file_get_contents(__DIR__ . '/assets/data/test_teaser.json'), TRUE);
    $teaserSection = $this->typedDataManager->create($teaserSectionTypeDataDefinition, $teaserJson);

    $contraints = $teaserSectionTypeDataDefinition->getPropertyDefinitions()['headline']->getConstraints();
    $this->assertEqual(3, count($contraints));

    // Note: using array_key_exists as constraint value can be NULL.
    $this->assertArrayHasKey('Length', $contraints);
    $this->assertEqual($contraints['Length']['min'], 2);
    $this->assertEqual($contraints['Length']['max'], 255);
    $this->assertArrayHasKey('NotBlank', $contraints);
    $this->assertArrayHasKey('PrimitiveType', $contraints);

    // ck-min: 2 - too short.
    $teaserSection->set('headline', 'A');
    $errors = $teaserSection->validate();
    $this->assertEqual($errors->count(), 1);
    $this->assertEqual($errors->get(0)->getCode(), LengthConstraint::TOO_SHORT_ERROR);

    // ck-max: 255.
    $teaserSection->set('headline', str_repeat('A', 256));
    $errors = $teaserSection->validate();
    $this->assertEqual($errors->count(), 1);
    $this->assertEqual($errors->get(0)->getCode(), LengthConstraint::TOO_LONG_ERROR);

    // ck-min: 2 - blank!
    $teaserSection->set('headline', '');
    $errors = $teaserSection->validate();
    $this->assertEqual($errors->count(), 1);
    $this->assertEqual($errors->get(0)->getCode(), NotBlank::IS_BLANK_ERROR);
  }

  /**
   * Test ck-min and ck-max attributes on containers.
   */
  public function testContainerRangeValidation() {
    $pageDefinition = $this->typedDataManager->createDataDefinition('section:test_page');
    $contraints = $pageDefinition->getPropertyDefinitions()['sections']->getConstraints();
    $this->assertEqual(1, count($contraints));
    $this->assertTrue(isset($contraints['Count']));
    $this->assertEqual($contraints['Count']['min'], 1);
    $this->assertEqual($contraints['Count']['max'], 5);

    // ck-min: 1 - no sections, too few.
    $tooFew = json_decode(file_get_contents(__DIR__ . '/assets/validation/page_too_few.json'), TRUE);
    $section = $this->typedDataManager->create($pageDefinition, $tooFew);
    $errors = $section->validate();
    $this->assertEqual($errors->count(), 1);
    $this->assertEqual($errors->get(0)->getCode(), CountConstraint::TOO_FEW_ERROR);

    // ck-max: 5 - 6 sections, trigger too many error.
    $tooMany = json_decode(file_get_contents(__DIR__ . '/assets/validation/page_too_many.json'), TRUE);
    $section = $this->typedDataManager->create($pageDefinition, $tooMany);
    $errors = $section->validate();
    $this->assertEqual($errors->count(), 1);
    $this->assertEqual($errors->get(0)->getCode(), CountConstraint::TOO_MANY_ERROR);
  }

}
