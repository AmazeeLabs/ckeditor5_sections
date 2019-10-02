<?php

namespace Drupal\ckeditor5_sections\Plugin\Editor;

use Drupal\ckeditor5_sections\SectionsCollectorInterface;
use Drupal\Component\Plugin\Exception\PluginNotFoundException;
use Drupal\Component\Utility\NestedArray;
use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Language\LanguageManagerInterface;
use Drupal\Core\Render\RendererInterface;
use Drupal\editor\Plugin\EditorBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\editor\Entity\Editor;
use Symfony\Component\DependencyInjection\ContainerInterface;

// TODO: Apply linkit conditionally.
// TODO: Make the default root work.
// TODO: Remove all unused services from this file.

/**
 * Defines a CKEditor5-based text editor for Drupal.
 *
 * @Editor(
 *   id = "ckeditor5_sections",
 *   label = @Translation("CKEditor5 Sections"),
 *   supports_content_filtering = FALSE,
 *   supports_inline_editing = FALSE,
 *   is_xss_safe = TRUE,
 *   supported_element_types = {
 *     "textarea",
 *   }
 * )
 */
class CKEditor5Sections extends EditorBase implements ContainerFactoryPluginInterface {

  /**
   * Instance counter to track instances on a specific page request.
   */
  static $instances = 0;

  /**
   * The module handler to invoke hooks on.
   *
   * @var \Drupal\Core\Extension\ModuleHandlerInterface
   */
  protected $moduleHandler;

  /**
   * The language manager.
   *
   * @var \Drupal\Core\Language\LanguageManagerInterface
   */
  protected $languageManager;

  /**
   * The renderer.
   *
   * @var \Drupal\Core\Render\RendererInterface
   */
  protected $renderer;

  /**
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  protected $linkitProfileStorage;

  /**
   * @var \Drupal\Core\Cache\CacheBackendInterface
   */
  protected $cache;

  /**
   * @var \Drupal\ckeditor5_sections\SectionsCollectorInterface
   */
  protected $sectionsCollector;

  /**
   * Constructs a \Drupal\ckeditor\Plugin\Editor\CKEditor object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\ckeditor\CKEditorPluginManager $ckeditor_plugin_manager
   *   The CKEditor plugin manager.
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   *   The module handler to invoke hooks on.
   * @param \Drupal\Core\Language\LanguageManagerInterface $language_manager
   *   The language manager.
   * @param \Drupal\Core\Render\RendererInterface $renderer
   *   The renderer.
   * @param \Drupal\Core\Cache\CacheBackendInterface $cacheBackend
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   *
   * @param \Drupal\Core\Asset\LibraryDiscoveryInterface $libraryDiscovery
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    ModuleHandlerInterface $module_handler,
    LanguageManagerInterface $language_manager,
    RendererInterface $renderer,
    CacheBackendInterface $cacheBackend,
    EntityTypeManagerInterface $entityTypeManager,
    SectionsCollectorInterface $sections_collector
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->moduleHandler = $module_handler;
    $this->languageManager = $language_manager;
    $this->renderer = $renderer;
    $this->cache = $cacheBackend;
    $this->sectionsCollector = $sections_collector;
    try {
      $this->linkitProfileStorage = $entityTypeManager->getStorage('linkit_profile');
    }
    catch (PluginNotFoundException $exc) {
      // Ignore this case. LinkIt is probably not be installed.
    }
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('module_handler'),
      $container->get('language_manager'),
      $container->get('renderer'),
      $container->get('cache.config'),
      $container->get('entity_type.manager'),
      $container->get('ckeditor5_sections.sections_collector')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getDefaultSettings() {
    return [
      'editorBuild' => 'ckeditor5_sections/editor_build',
      'plugins' => [
        'drupallink' => [
          'linkit_enabled' => TRUE,
          'linkit_profile' => 'default',
        ],
      ],
      'advanced' => '{}',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state, Editor $editor) {
    $settings = $editor->getSettings();

    $builds = [];
    foreach (system_get_info('module') as $module) {
      if (array_key_exists('ckeditor5_sections_builds', $module)) {
        foreach ($module['ckeditor5_sections_builds'] as $library) {
          $builds[$library] = $library;
        }
      }
    }

    $form['editorBuild'] = [
      '#type' => 'select',
      '#title' => $this->t('Editor build'),
      '#description' => $this->t('Choose one of the available builds.'),
      '#default_value' => $settings['editorBuild'],
      '#options' => $builds,
    ];

    if ($this->linkitProfileStorage) {
      $all_profiles = $this->linkitProfileStorage->loadMultiple();

      $options = [];
      foreach ($all_profiles as $profile) {
        $options[$profile->id()] = $profile->label();
      }

      $form['plugins']['drupallink'] = [
        '#type' => 'fieldset',
        '#title' => $this->t('LinkIt integration'),
      ];

      $linkit = &$form['plugins']['drupallink'];

      $linkit['linkit_enabled'] = [
        '#type' => 'checkbox',
        '#title' => $this->t('Linkit enabled'),
        '#default_value' => isset($settings['plugins']['drupallink']['linkit_enabled']) ? $settings['plugins']['drupallink']['linkit_enabled'] : '',
        '#description' => $this->t('Enable Linkit for this text format.'),
      ];

      $linkit['linkit_profile'] = [
        '#type' => 'select',
        '#title' => $this->t('Linkit profile'),
        '#options' => $options,
        '#default_value' => isset($settings['plugins']['drupallink']['linkit_profile']) ? $settings['plugins']['drupallink']['linkit_profile'] : '',
        '#empty_option' => $this->t('- Select -'),
        '#description' => $this->t('Select the Linkit profile you wish to use with this text format.'),
        '#states' => [
          'invisible' => [
            'input[data-drupal-selector="edit-editor-settings-plugins-drupallink-linkit-enabled"]' => ['checked' => FALSE],
          ],
        ],
        '#element_validate' => [
          [$this, 'validateLinkitProfileSelection'],
        ],
      ];
    }

    $form['advanced'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Advanced configuration'),
      '#description' => $this->t('JSON configuration object that will be passed to the editor instance. See: <a href="https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/configuration.html">CKEditor5 Documentation</a>'),
      '#default_value' => $settings['advanced'],
    ];

    return $form;
  }

  /**
   * {@inheritDoc}
   */
  public function settingsFormValidate(array $form, FormStateInterface $form_state) {
    parent::settingsFormValidate($form, $form_state);
    $advanced = $form_state->getValue(['editor', 'settings', 'advanced']);
    if (is_null(json_decode($advanced))) {
      $form_state->setErrorByName('editor][settings][advanced', $this->t('Advanced configuration is not valid JSON.'));
    }
  }

  /**
   * {@inheritdoc}
   */
  public function getLibraries(Editor $editor) {
    $settings = $editor->getSettings();
    return ['ckeditor5_sections/editor', $settings['editorBuild']];
  }

  /**
   * {@inheritdoc}
   */
  public function getJSSettings(Editor $editor) {
    $settings = $editor->getSettings();
    $sections = $this->sectionsCollector->getSections();

    /** @var \Drupal\Core\Extension\ModuleHandlerInterface $moduleHandler */
    $moduleHandler = \Drupal::service('module_handler');
    $moduleHandler->alter('ckeditor5_sections_attributes', $templateAttributes);

    $settings['templates'] = $sections;
    $settings['templateAttributes'] = $templateAttributes;
    $settings['templateSession'] = implode(':', [session_id(), time(), static::$instances++]);
    $settings['enabled_drupal_modules'] = array_keys($moduleHandler->getModuleList());

    $moduleHandler->alter('ckeditor5_sections_editor_settings', $settings);
    $settings['advanced'] = isset($settings['advanced']) ? json_decode($settings['advanced'], TRUE) : [];

    return $settings;
  }

  /**
   * Linkit profile select validation.
   *
   * #element_validate callback for the "linkit_profile" element.
   *
   * @param array $element
   *   An associative array containing the properties and children of the
   *   generic form element.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form for the form this element belongs to.
   *
   * @see \Drupal\Core\Render\Element\FormElement::processPattern()
   */
  public function validateLinkitProfileSelection(array $element, FormStateInterface $form_state) {
    $values = $form_state->getValue([
      'editor',
      'settings',
      'plugins',
      'drupallink',
    ]);
    $enabled = isset($values['linkit_enabled']) && $values['linkit_enabled'] === 1;
    if ($enabled && empty(trim($values['linkit_profile']))) {
      $form_state->setError($element, $this->t('Please select the Linkit profile you wish to use.'));
    }
  }

}
