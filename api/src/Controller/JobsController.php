<?php

namespace App\Controller;

use RestApi\Controller\ApiController;
use Cake\ORM\Table;
use Cake\ORM\TableRegistry;
use Cake\Utility\Hash;

/**
 * Account Controller
 *
 */
class JobsController extends ApiController
{

    public function index()
    {
        $this->request->allowMethod('get');
        $result = $this->Jobs->find('all')->toArray();
        $this->apiResponse = $result;
    }

    public function create()
    {
      $this->request->allowMethod('post');
      $_data = $this->request->data;
      $item = $this->Jobs->newEntity($_data);
      if ($this->Jobs->save($item)) {
          $this->apiResponse = $item;
      }
    }

    public function update($id)
    {
      $this->request->allowMethod('post');
      $_data = $this->request->data;
      $item = $this->Jobs->newEntity($_data);
      $item->id = $id;
      //$item = $this->Jobs->get($id);
      if ($this->Jobs->save($item)) {
        $this->apiResponse = $item;
      }
    }

    public function delete($id)
    {
      $this->request->allowMethod('get');
      $entity = $this->Jobs->get($id);
      $this->Jobs->delete($entity);
      $result = $this->Jobs->find('all')->toArray();
      $this->apiResponse = $result;
    }

}
