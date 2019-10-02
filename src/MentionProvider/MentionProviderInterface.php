<?php

namespace Drupal\ckeditor5_sections\MentionProvider;

use Drupal\Component\Plugin\DerivativeInspectionInterface;
use Drupal\Component\Plugin\PluginInspectionInterface;

/**
 * Interface for all mention provider plugins.
 */
interface MentionProviderInterface extends PluginInspectionInterface, DerivativeInspectionInterface {

  /**
   * Array representation of this plugin to be passed to ckeditor5-mention.
   *
   * @return array
   *   Array of mention provider to be passed to ckeditor5-mention plugin.
   */
  public function getMentionFeedDefinition();

  /**
   * Provide URL to controller responding to the mention entered in the editor.
   *
   * @return \Drupal\Core\Url
   *   URL to the query endpoint.
   */
  public function getQueryUrl();

  /**
   * Return matching mentions.
   *
   * @param string $queryText
   *   Query text to match.
   *
   * @return \Drupal\ckeditor5_sections\MentionProvider\MentionProviderItem[]
   *   Array of mention items.
   */
  public function query($queryText);

  /**
   * Process callback for MentionFilter.
   *
   * @param string $text
   *   Text to process.
   * @param string $langcode
   *   Langcode to process.
   *
   * @return \Drupal\filter\FilterProcessResult
   *   Processed filter result.
   */
  public function process($text, $langcode);

  /**
   * Returns a string containing a regex for valid characters of this mention.
   *
   * @return string
   *   Valid characters (e.g. `a-Z` corresponds to [a-Z]*-regex).
   */
  public function getValidMentionCharacters();

  /**
   * Returns a template to use in a mention item templates.
   *
   * Note this should probably be refactored into a more generic ItemRenderer
   * plugin that then deals with this on the server and client.
   *
   * @return string|null
   *   Template string to be passed to Drupal.t() or null to use default.
   */
  public function getMentionProviderItemTemplate();

}
