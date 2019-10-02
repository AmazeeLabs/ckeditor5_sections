<?php

namespace Drupal\ckeditor5_sections_token\Plugin\MentionProvider;

use Drupal\ckeditor5_sections\Annotation\MentionProvider;
use Drupal\ckeditor5_sections\MentionProvider\BaseMentionProvider;
use Drupal\ckeditor5_sections\MentionProvider\MentionProviderItem;
use Drupal\Component\Utility\Html;
use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Render\BubbleableMetadata;
use Drupal\Core\Utility\Token;
use Drupal\filter\FilterProcessResult;
use Drupal\token\TokenEntityMapperInterface;
use Drupal\token\TreeBuilderInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a filter to render media elements.
 *
 * @MentionProvider(
 *   id = "token",
 *   prefix = "@",
 *   title = @Translation("Token mentions provider"),
 *   description = @Translation("Provides tokens."),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_TRANSFORM_REVERSIBLE
 * )
 */
class TokenMentionProvider extends BaseMentionProvider implements ContainerFactoryPluginInterface {
  /**
   * Token.
   *
   * @var \Drupal\token\Token
   */
  protected $token;

  /**
   * Token entity mapper.
   *
   * @var \Drupal\token\TokenEntityMapperInterface
   */
  protected $tokenEntityMapper;

  /**
   * @var \Drupal\token\TreeBuilderInterface
   */
  protected $treeBuilder;

  /**
   * @var \Drupal\Core\Extension\ModuleHandlerInterface
   */
  protected $moduleHandler;

  /**
   * {@inheritdoc}
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    Token $token,
    TokenEntityMapperInterface $token_entity_mapper,
    TreeBuilderInterface $treeBuilder,
    ModuleHandlerInterface $moduleHandler
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->token = $token;
    $this->tokenEntityMapper = $token_entity_mapper;
    $this->treeBuilder = $treeBuilder;
    $this->moduleHandler = $moduleHandler;
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
      $container->get('token.entity_mapper'),
      $container->get('token.tree_builder'),
      $container->get('module_handler')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function query($queryText) {
    $queryText = mb_strtolower($queryText);
    $querySegments = explode(':', $queryText);
    $queryGroup = array_shift($querySegments);
    $queryToken = array_shift($querySegments);
    $queryChildren = $querySegments ? implode(':', $querySegments) : FALSE;

    $info = $this->token->getInfo();
    $results = [];
    $prefix = $this->getPluginDefinition()['prefix'];
    $this->moduleHandler->alter('mention_token_info', $info);
    foreach ($info['tokens'] as $group => $tokens) {
      if (mb_strpos($group, $queryGroup) !== FALSE) {
        foreach ($tokens as $token_key => $token) {
          if (!$queryToken || mb_strpos($token_key, $queryToken) !== FALSE) {
            $id = $prefix . $group . ':' . $token_key;
            if (array_key_exists('type', $token)) {
              $tree = $this->treeBuilder->buildTree($token['type']);
              $flattened = $this->treeBuilder->flattenTree($tree);
              $leaves = array_filter($flattened, function ($node) {
                return !array_key_exists('children', $node);
              });
              foreach ($leaves as $lid => $leaf) {
                if (
                  !$queryChildren ||
                  substr($leaf['token'], 0, strlen($queryChildren)) === $queryChildren
                ) {
                  $ltid = '@' . $group . ':' . $token_key . ':' . $leaf['token'];
                  $results[$ltid] = new MentionProviderItem($ltid, (string) $leaf['name']);
                }
              }
            }
            else {
              $results[$id] = new MentionProviderItem($id, (string) $token['name']);
            }
          }
        }
      }
    }
    // @todo: sort and make sure only the most relevant (10?) are returned.
    return array_slice(array_values($results), 0, 20);
  }

  /**
   * {@inheritdoc}
   */
  public function getValidMentionCharacters() {
    return ':-_a-zA-Z0-9À-ž';
  }

  /**
   * Returns the drupal token for mention value.
   *
   * @param string $mention
   *   Mention (e.g. "@example-token")
   *
   * @return string
   *   Token (e.g. "[example-token]").
   */
  public function getTokenFromMentionValue($mention) {
    if (substr($mention, 0, 1) === $this->getMentionPrefix()) {
      $mentionValue = substr($mention, 1);
    }
    else {
      $mentionValue = $mention;
    }

    return '[' . $mentionValue . ']';
  }

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode) {
    $regex = '/<span class=\\\\"mention\\\\" data-mention=\\\\"(@[^"]+)">(?<mention>@[^<]+)<\\\\\/span>/m';
    return new FilterProcessResult(preg_replace_callback($regex, function ($match) {
      return $this->getTokenFromMentionValue($match['mention']);
    }, $text));
  }

  /**
   * {@inheritdoc}
   */
  public function getMentionProviderItemTemplate() {
    return '@id (%label)';
  }

}
