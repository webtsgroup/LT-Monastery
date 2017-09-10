<?php

namespace App\Controller;

use Cake\Network\Exception\NotFoundException;
use RestApi\Controller\ApiController;

/**
 * Foo Controller
 *
 */
class TestController extends ApiController
{

  /**
   * index method
   *
   */
  public function index()
  {
      //$articles = $this->Articles->find('all')->select(['id', 'title'])->toArray();
      $this->apiResponse['articles'] = [];
  }
}
