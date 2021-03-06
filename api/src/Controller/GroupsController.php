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
            'Users',
            'Users.Avatar'
            // 'Users' => function ($q) {
            //   return $q->autoFields(false)->contain(['Avatar']);
            // }
          ]
        ]);
        // if ($pageUpdate == 1) {
        //   //$this->getMetadata();
        // }
        $this->apiResponse['group'] = $group;
        $this->getMetadata();
        //$this->getListSelect();
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

    public function usersExcludeMembers($group_id, $type) {
      $userGroupTable = TableRegistry::get('GroupsUsers');
      $members = $userGroupTable->find('all')->select(['user_id'])->where(['group_id' => $group_id])->toArray();
      $members = Hash::extract($members, '{n}.user_id');
      $userTable = TableRegistry::get('Users');
      $where = [
        'Users.fullname !=' => ''
      ];
      if ($type === 'all') {
        //
      } else {
        array_push($where, array('Users.is_internal' => $type === 'internal' ? 1 : 0));
      }
      if ($members && count($members)) {
        array_push($where, array('Users.id NOT IN' => $members));
      }
      $result = $userTable->find('all')->where($where)->contain(['Avatar', 'Provinces', 'Districts', 'Jobs'])->map(function ($row) { // map() is a collection method, it executes the query
          $row->birthday = $row->birthday ? date('d/m/Y', $row->birthday) : '';
          $row->job = $row->job ? $row->job['name'] : '';
          $row->province = $row->province ? $row->province['name'] : '';
          $row->district = $row->district ? $row->district['name'] : '';
          return $row;
      })->toArray();
      // if ($members && count($members)) {
      //   $result = $userTable->find('all')->where(['Users.id NOT IN' => $members])->contain(['Avatar', 'Provinces', 'Districts', 'Jobs'])->map(function ($row) { // map() is a collection method, it executes the query
      //       $row->birthday = $row->birthday ? date('d/m/Y', $row->birthday) : '';
      //       $row->job = $row->job ? $row->job['name'] : '';
      //       $row->province = $row->province ? $row->province['name'] : '';
      //       $row->district = $row->district ? $row->district['name'] : '';
      //       return $row;
      //   })->toArray();
      // } else {
      //   $result = $userTable->find('all')->contain(['Avatar', 'Provinces', 'Districts', 'Jobs'])->map(function ($row) { // map() is a collection method, it executes the query
      //       $row->birthday = $row->birthday ? date('d/m/Y', $row->birthday) : '';
      //       $row->job = $row->job ? $row->job['name'] : '';
      //       $row->province = $row->province ? $row->province['name'] : '';
      //       $row->district = $row->district ? $row->district['name'] : '';
      //       return $row;
      //   })->toArray();
      // }
      $this->apiResponse = $result;
    }

    public function getListSelect()
    {
      $provinceTable = TableRegistry::get('Provinces');
      $provinces = $provinceTable->find('all')->toArray();
      $this->apiResponse['provinces'] = $provinces;

      $jobTable = TableRegistry::get('Jobs');
      $jobs = $jobTable->find('all')->toArray();
      $this->apiResponse['jobs'] = $jobs;

      $districtTable = TableRegistry::get('Districts');
      $districts = $districtTable->find('all')->toArray();
      $this->apiResponse['districts'] = $districts;
    }

    public function pushMembers($group_id) {
      $this->request->allowMethod('post');
      $users = $this->request->data;
      if ($users) {
        $userGroupTable = TableRegistry::get('GroupsUsers');
        //$userGroupTable->deleteAll(['group_id' => $group_id]);
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
      $group = $this->Groups->get($group_id, [
        'contain' => [
          'Users'
        ]
      ]);
      $this->apiResponse['group'] = $group;
    }

    public function deleteMembers($user_id, $group_id) {
      $userGroupTable = TableRegistry::get('GroupsUsers');
      $userGroupTable->deleteAll(['group_id' => $group_id, 'user_id' => $user_id]);
      $group = $this->Groups->get($group_id, [
        'contain' => [
          'Users'
        ]
      ]);
      $this->apiResponse['group'] = $group;
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
