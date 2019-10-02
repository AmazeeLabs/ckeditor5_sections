<?php

namespace Drupal\ckeditor5_sections\Controller;

use Drupal\ckeditor5_sections\MentionProviderPluginManager;
use Drupal\Component\Plugin\Exception\PluginException;
use Drupal\Core\Access\AccessResult;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Session\AccountInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Class providing mention query url endpoint.
 */
class MentionProviderController extends ControllerBase {
  /**
   * Mention Provider plugin manager.
   *
   * @var \Drupal\ckeditor5_sections\MentionProviderPluginManager
   */
  protected $mentionProviderPluginManager;

  /**
   * MentionProviderController constructor.
   *
   * @param \Drupal\ckeditor5_sections\MentionProviderPluginManager $mentionProviderPluginManager
   *   MentionProviderPluginManager.
   */
  public function __construct(MentionProviderPluginManager $mentionProviderPluginManager) {
    $this->mentionProviderPluginManager = $mentionProviderPluginManager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('plugin.manager.ckeditor5_sections.mention_provider')
    );
  }

  /**
   * Access callback for query access.
   *
   * @param \Drupal\Core\Session\AccountInterface $account
   *   Run access checks for this account.
   * @param string $mention_provider_id
   *   Mention provider id in route.
   *
   * @return \Drupal\Core\Access\AccessResultInterface
   *   The access result.
   */
  public function access(AccountInterface $account, $mention_provider_id) {
    return AccessResult::allowedIf(
      $account->hasPermission('access ckeditor5 sections mention provider ' . $mention_provider_id)
    );

  }

  /**
   * Returns a JSON response representing the matched mention items.
   *
   * @param string $mention_provider_id
   *   Mention provider plugin id.
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   Request object.
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   JSON Response of matched mention items.
   */
  public function query($mention_provider_id, Request $request) {
    try {
      /** @var \Drupal\ckeditor5_sections\MentionProvider\MentionProviderInterface $plugin */
      $plugin = $this->mentionProviderPluginManager->createInstance($mention_provider_id);
    }
    catch (PluginException $exception) {
      throw new BadRequestHttpException($this->t('Invalid plugin id provided'));
    }

    $queryText = $request->query->get('q');
    $result = $plugin->query($queryText);
    // @todo: add an alter hook?

    return new JsonResponse($result);
  }

}
