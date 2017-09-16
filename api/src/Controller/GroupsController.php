<?php

namespace App\Controller;

use RestApi\Controller\ApiController;
use Cake\ORM\Table;
use Cake\ORM\TableRegistry;

/**
 * Account Controller
 *
 */
class GroupsController extends ApiController
{

    public function index()
    {
        $this->request->allowMethod('get');
        $result = $this->Groups->find('all')->toArray();
        $this->apiResponse = $result;
    }

    public function view($id, $pageUpdate = 0)
    {
        $this->request->allowMethod('get');
        $group = $this->Groups->get($id, [
          'contain' => [
            'Users' => function ($q) {
                  return $q->autoFields(false)->select(['id', 'fullname', 'avatar']);
            }
          ]
        ]);
        // if ($pageUpdate == 1) {
        //   //$this->getMetadata();
        // }
        $this->apiResponse['group'] = $group;
        $this->getMetadata();
    }

    public function getMetadata()
    {
      $userTable = TableRegistry::get('Users');
      $users = $userTable->find('all')->select(['id', 'fullname', 'avatar'])->toArray();
      $this->apiResponse['users'] = $users;
    }

    public function create()
    {
      $this->request->allowMethod('post');
      $_data = $this->request->data;
      $users = $_data['users'];
      unset($_data['users']);
      $item = $this->Groups->newEntity($_data);
      if ($this->Groups->save($item)) {
          $this->_processUsers($users, $item->id);
          $this->apiResponse = $item;
      }
    }

    public function update($id)
    {
      $this->request->allowMethod('post');
      $_data = $this->request->data;
      $users = $_data['users'];
      unset($_data['users']);
      $item = $this->Groups->newEntity($_data);
      $item->id = $id;
      //$item = $this->Groups->get($id);
      if ($this->Groups->save($item)) {
          $this->_processUsers($users, $item->id);
          $this->apiResponse = $item;
      }
    }

    public function delete($id)
    {
      $this->request->allowMethod('get');
      $entity = $this->Groups->get($id);
      $this->Groups->delete($entity);
      $result = $this->Groups->find('all')->toArray();
      $this->apiResponse = $result;
    }

    private function _processUsers($users, $group_id) {
      if ($users) {
        $userGroupTable = TableRegistry::get('GroupsUsers');
        $userGroupTable->deleteAll(['group_id' => $group_id]);
        $data = [];
        foreach ($users as $key => $value) {
          $obj = [];
          $obj['user_id'] = $value['id'];
          $obj['group_id'] = $group_id;
          array_push($data, $obj);

          $item = $userGroupTable->newEntity($obj);
          if ($userGroupTable->save($item)) {

          }
        }
      }
    }

}
