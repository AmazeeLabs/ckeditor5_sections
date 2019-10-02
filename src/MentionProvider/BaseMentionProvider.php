<?php

namespace Drupal\ckeditor5_sections\MentionProvider;

use Drupal\Core\Plugin\PluginBase;
use Drupal\Core\Url;
use Drupal\filter\FilterProcessResult;

/**
 * Abstract class implementing some base functionality shared by providers.
 */
abstract class BaseMentionProvider extends PluginBase implements MentionProviderInterface {

  /**
   * {@inheritdoc}
   */
  public function getMentionFeedDefinition() {
    return [
      'marker' => $this->getMentionPrefix(),
      'feed' => $this->getQueryUrl()->toString(),
      'validCharacters' => $this->getValidMentionCharacters(),
      'template' => $this->getMentionProviderItemTemplate(),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getQueryUrl() {
    return Url::fromRoute('ckeditor5_sections.mention.feed', [
      'mention_provider_id' => $this->getBaseId(),
    ]);
  }

  /**
   * Returns prefix of this mention provider plugin.
   *
   * @return string
   *   Mention provider prefix.
   */
  protected function getMentionPrefix() {
    return $this->getPluginDefinition()['prefix'];
  }

  /**
   * Returns the XPath query need to query all mention elements of this plugin.
   *
   * @return string
   *   Xpath query string.
   */
  protected function getXpathQueryForMentionElements() {
    return '//span[starts-with(@data-mention,\'' . $this->getMentionPrefix() . '\')]';
  }

  /**
   * {@inheritdoc}
   */
  public function getValidMentionCharacters() {
    return '_a-zA-Z0-9À-ž';
  }

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode) {
    return new FilterProcessResult($text);
  }

  /**
   * {@inheritdoc}
   */
  public function getMentionProviderItemTemplate() {
    return NULL;
  }

}
