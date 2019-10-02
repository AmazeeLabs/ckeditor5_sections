<?php

namespace Drupal\Tests\ckeditor5_sections\Kernel;

use Drupal\ckeditor5_sections\DocumentSection;
use Drupal\Core\DependencyInjection\ContainerBuilder;
use Drupal\field\Entity\FieldConfig;
use Drupal\field\Entity\FieldStorageConfig;
use Drupal\KernelTests\Core\Entity\EntityKernelTestBase;

class SectionsFieldTest extends EntityKernelTestBase {
  protected $entityType = "entity_test";
  protected $bundle = "entity_test";
  protected $fieldName = "body";
  protected $entity;
  protected $embeddedEntity;
  protected $document = [
    '__type' => 'section:page',
    'sections' => [
      [
        '__type' => 'section:image',
        'content' => [
          '__type' => 'section:media',
          'data-media-type' => 'entity_test:entity_test',
          'data-media-uuid' => '',
        ],
        'caption' => 'Image caption'
      ],
      [
        '__type' => 'section:text',
        'headline' => 'This is the headline',
        'content' => 'This is some content',
      ],
    ],
  ];

   public static $modules = [
     'editor',
     'linkit',
     'ckeditor5_sections',
     'ckeditor5_sections_test',
   ];

  public function register(ContainerBuilder $container) {
    parent::register($container);
    $this->container->setParameter('ckeditor5_sections.template_directory', realpath(__DIR__ . '/assets/sections'));
  }

  protected function setUp() {
    parent::setUp();
    $this->installEntitySchema('entity_test');
    $this->installConfig(['ckeditor5_sections_test']);

    FieldStorageConfig::create([
      'field_name' => $this->fieldName,
      'type' => 'sections',
      'entity_type' => $this->entityType,
      'cardinality' => FieldStorageConfig::CARDINALITY_UNLIMITED
    ])->save();

    FieldConfig::create([
      'field_name' => $this->fieldName,
      'entity_type' => $this->entityType,
      'bundle' => $this->bundle,
      'label' => 'Body',
      'settings' => [
        'template' => 'page',
        'filter_format' => 'sections_data_test',
      ]
    ])->save();

    $storage = $this->entityTypeManager
      ->getStorage($this->entityType);

    $this->embeddedEntity = $storage
      ->create();
    $this->embeddedEntity->save();
    $this->document['sections'][0]['content']['data-media-uuid'] = $this->embeddedEntity->uuid();

    $this->entity = $storage
      ->create([
        'body' => json_encode($this->document),
      ]);
  }

  /**
   * Test  retrieving a raw json string.
   */
  public function testRetrieveJSONString() {
    $this->assertEquals(json_encode($this->document), $this->entity->body->json);
  }

  /**
   * Test retrieving section objects.
   */
  public function testRetrieveSectionData() {
    $data = $this->entity->body->sections;
    $this->assertInstanceOf(DocumentSection::class, $data);
    $expected = $this->document;
    /** @var \Drupal\Core\Entity\EntityRepositoryInterface $entityRepository */
    $entityRepository = $this->container->get('entity.repository');
    $expected['sections'][0]['content']['entity'] = $entityRepository->loadEntityByUuid('entity_test', $this->embeddedEntity->uuid());
    $expected['sections'][1]['headline'] = 'This is the headline';
    $this->assertEquals($expected, $data->getValue());
  }

  /**
   * Test retrieving section objects.
   */
  public function testRetrieveProcessedSectionData() {
    $data = $this->entity->body->sections_processed;
    $this->assertInstanceOf(DocumentSection::class, $data);
    $expected = $this->document;
    /** @var \Drupal\Core\Entity\EntityRepositoryInterface $entityRepository */
    $entityRepository = $this->container->get('entity.repository');
    $expected['sections'][0]['content']['entity'] = $entityRepository->loadEntityByUuid('entity_test', $this->embeddedEntity->uuid());
    $expected['sections'][1]['headline'] = 'This is THE HEADLINE';
    $this->assertEquals($expected, $data->getValue());
  }

  /**
   * Test retrieval of the assembled html document.
   */
  public function testRetrieveHTMLDocument() {
    $data = $this->entity->body->html;
    $uuid = $this->embeddedEntity->uuid();
    $expected = <<<XML
<ck-section class="page" itemtype="page">
  <ck-container class="page__container" itemprop="sections">
    <ck-section class="image" itemtype="image">
      <ck-media class="image__media" data-media-type="entity_test:entity_test" data-media-uuid="{$uuid}" itemprop="content" itemtype="media"/>
      <div class="image__caption" itemprop="caption">image caption</div>
    </ck-section>
    <ck-section class="text" itemtype="text">
      <h2 itemprop="headline">this is the headline</h2>
      <div class="text__content" itemprop="content">this is some content</div>
    </ck-section>
  </ck-container>
</ck-section>
XML;

    $this->assertXmlStringEqualsXmlString($expected, $data);
  }

  /**
   * Test retrieval of the assembled html document.
   */
  public function testRetrieveProcessedHTMLDocument() {
    $data = $this->entity->body->html_processed;
    $uuid = $this->embeddedEntity->uuid();
    $expected = <<<XML
<ck-section class="page" itemtype="page">
  <ck-container class="page__container" itemprop="sections">
    <ck-section class="image" itemtype="image">
      <ck-media class="image__media" data-media-type="entity_test:entity_test" data-media-uuid="{$uuid}" itemprop="content" itemtype="media"/>
      <div class="image__caption" itemprop="caption">image caption</div>
    </ck-section>
    <ck-section class="text" itemtype="text">
      <h2 itemprop="headline">this is THE HEADLINE</h2>
      <div class="text__content" itemprop="content">this is some content</div>
    </ck-section>
  </ck-container>
</ck-section>
XML;

    $this->assertXmlStringEqualsXmlString($expected, $data);
  }

  /**
   * Test directly setting a json string.
   */
  public function testSetJSONString() {
    $doc = [
      '__type' => 'section:page',
      'sections' => [
        [
          '__type' => 'section:text',
          'headline' => 'X',
          'content' => 'Y',
        ],
      ],
    ];

    $this->entity->body->json = json_encode($doc);
    $this->assertEquals($doc, $this->entity->body->sections->getValue());
  }

  /**
   * Write a php array to the sections property.
   */
  public function testSetSectionsArray() {
    $doc = [
      '__type' => 'section:page',
      'sections' => [
        [
          '__type' => 'section:text',
          'headline' => 'X',
          'content' => 'Y',
        ],
      ],
    ];

    $this->entity->body->sections = $doc;
    $this->assertEquals($doc, $this->entity->body->sections->getValue());
  }

  /**
   * Write a php array to the sections property.
   */
  public function testSetSectionsObject() {
    $doc = [
      '__type' => 'section:page',
      'sections' => [
        [
          '__type' => 'section:text',
          'headline' => 'X',
          'content' => 'Y',
        ],
      ],
    ];

    $this->entity->body->sections = DocumentSection::fromValue($doc);
    $this->assertEquals($doc, $this->entity->body->sections->getValue());
  }

  /**
   * Test setting a html document that gets parsed.
   */
  public function testSetHTMLDocument() {
    $doc = [
      '__type' => 'section:page',
      'sections' => [
        [
          '__type' => 'section:text',
          'headline' => 'X',
          'content' => 'Y',
        ],
      ],
    ];

    $html = <<<XML
<ck-section class="page" itemtype="page">
  <ck-container class="page__container" itemprop="sections">
    <ck-section class="text" itemtype="text">
      <h2 itemprop="headline">X</h2>
      <div class="text__content" itemprop="content">Y</div>
    </ck-section>
  </ck-container>
</ck-section>
XML;

    $this->entity->body->html = $html;
    $this->assertEquals($doc, $this->entity->body->sections->getValue());
  }
}
