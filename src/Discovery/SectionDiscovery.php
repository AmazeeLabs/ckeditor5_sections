<?php

namespace Drupal\ckeditor5_sections\Discovery;

use Drupal\ckeditor5_sections\Plugin\Context\DocumentSectionContext;
use Drupal\ckeditor5_sections\Plugin\SectionPlugin\SectionPlugin;
use Drupal\Component\Discovery\DiscoveryException;
use Drupal\Component\Plugin\Discovery\DiscoveryInterface;
use Drupal\Component\Plugin\Discovery\DiscoveryTrait;
use Drupal\Component\Serialization\Exception\InvalidDataTypeException;
use Drupal\Component\Serialization\Yaml;
use Drupal\Core\Plugin\Context\Context;
use Drupal\Core\Plugin\Context\ContextDefinition;

class SectionDiscovery implements DiscoveryInterface {

  use DiscoveryTrait;

  /**
   * An array of directories to scan, keyed by the provider.
   *
   * The value can either be a string or an array of strings. The string values
   * should be the path of a directory to scan.
   *
   * @var array
   */
  protected $directories = [];

  /**
   * Constructs a HelpTopicDiscovery object.
   *
   * @param array $directories
   *   An array of directories to scan, keyed by the provider. The value can
   *   either be a string or an array of strings. The string values should be
   *   the path of a directory to scan.
   */
  public function __construct(array $directories) {
    $this->directories = $directories;
  }

  /**
   * {@inheritdoc}
   */
  public function getDefinitions() {
    $plugins = $this->findAll();

    // Flatten definitions into what's expected from plugins.
    $definitions = [];
    foreach ($plugins as $list) {
      foreach ($list as $id => $definition) {
        $definitions[$id] = $definition;
      }
    }

    return $definitions;
  }

  /**
   * Returns an array of discoverable items.
   *
   * @return array
   *   An array of discovered data keyed by provider.
   *
   * @throws \Drupal\Component\Discovery\DiscoveryException
   *   Exception thrown if there is a problem during discovery.
   */
  public function findAll() {
    $all = [];

    // @todo: add FileCache again.

    $files = $this->findFiles();

    // If there are files left that were not returned from the cache, load and
    // parse them now. This list was flipped above and is keyed by filename.
    if ($files) {
      foreach ($files as $definition_file_name => $provider) {
        try {
          $definition = Yaml::decode(file_get_contents($definition_file_name));
        } catch (InvalidDataTypeException $e) {
          throw new DiscoveryException('Error parsing file: ' . $definition_file_name);
        }

        $basename_without_extension = basename($definition_file_name, '.yml');

        if (isset($definition['id'])) {
          $id = $definition['id'];
        }
        else {
          $id = $basename_without_extension;
        }

        if (!empty($definiton['class'])) {
          if (!class_exists($definition['class'])) {
            throw new DiscoveryException('Section Plugin ' . $id . ' (' . $definition_file_name . ') references undefined class: ' . $definition['class']);
          }
          $class = $definiton['class'];
        }
        else {
          // @todo: use \Drupal\ckeditor5_sections\Annotation\SectionPlugin::$class?
          $class = SectionPlugin::class;
        }

        $directory = dirname($definition_file_name);
        // @todo: also allow a 'template' key in the YML file?
        // If there is a Twig file, use that as template.
        if (is_file($directory . '/' . $basename_without_extension . '.html.twig')) {
          $template = $directory . '/' . $basename_without_extension . '.html.twig';
        }
        elseif (is_file($directory . '/' . $basename_without_extension . '.html')) {
          $template = $directory . '/' . $basename_without_extension . '.html';
        }
        else {
          throw new DiscoveryException('Template file missing: ' . $directory . '/' . $basename_without_extension . '.html[.twig]');
        }

        if (is_file($directory . '/' . $basename_without_extension . '.css')) {
          $stylesheet = $directory . '/' . $basename_without_extension . '.css';
        }
        else {
          $stylesheet = NULL;
        }

        $data = [
          'id' => $id,
          'provider' => $provider,
          'template' => $template,
          'stylesheet' => $stylesheet,
          'directory' => $directory,
          'class' => $class,
          'context_definitions' => [
            'document_section' => new DocumentSectionContext(),
          ]
        ];

        $all[$provider][$data['id']] = $data;
      }
    }

    return $all;
  }

  /**
   * Returns an array of providers keyed by file path.
   *
   * @return array
   *   An array of providers keyed by file path.
   */
  protected function findFiles() {
    $file_list = [];
    foreach ($this->directories as $provider => $directories) {
      $directories = (array) $directories;
      foreach ($directories as $section_base_directory) {
        if (is_dir($section_base_directory)) {
          $section_files = file_scan_directory($section_base_directory . '/',  '/\.yml$/i', [
            'recurse' => TRUE,
            // We have the structure {SECTION}/{SECTION}.yml.
            'min_depth' => 1,
          ]);
          foreach ($section_files as $section_file) {
            $file_list[$section_file->uri] = $provider;
          }
        }
      }
    }
    return $file_list;
  }

}
