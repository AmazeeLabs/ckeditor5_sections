<?php

namespace Drupal\ckeditor5_sections\Plugin\Filter;

use Drupal\ckeditor5_sections\MentionProviderPluginManager;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Utility\Token;
use Drupal\filter\FilterProcessResult;
use Drupal\filter\Plugin\FilterBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a filter to render media elements.
 *
 * @Filter(
 *   id = "sections_mentions",
 *   title = @Translation("Sections mentions filter"),
 *   description = @Translation("Replaces CKEditor-mentions"),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_TRANSFORM_REVERSIBLE
 * )
 */
class MentionFilter extends FilterBase implements ContainerFactoryPluginInterface {

  /**
   * Token.
   *
   * @var \Drupal\Core\Utility\Token
   */
  protected $token;

  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, Token $token, MentionProviderPluginManager $mentionProviderPluginManager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->token = $token;
    $this->mentionProviderPluginManager = $mentionProviderPluginManager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('token'),
      $container->get('plugin.manager.ckeditor5_sections.mention_provider')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode) {
    $result = new FilterProcessResult($text);

    // Use all mention providers.
    $mentionProviders = $this->mentionProviderPluginManager->getDefinitions();
    foreach ($mentionProviders as $id => $info) {
      /** @var \Drupal\ckeditor5_sections\MentionProvider\MentionProviderInterface $mentionProvider */
      $mentionProvider = $this->mentionProviderPluginManager->createInstance($id);

      $processed = $mentionProvider->process($result->getProcessedText(), $langcode);
      // Aggregegate cache relevant stuff.
      $result->merge($processed);
      $result->setProcessedText($processed->getProcessedText());
    }

    return $result;
  }

}
