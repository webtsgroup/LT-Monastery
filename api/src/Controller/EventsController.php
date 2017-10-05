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
class EventsController extends ApiController
{

  public function index()
  {
      $this->request->allowMethod('get');
      $result = $this->Events->find('all')->toArray();
      $this->apiResponse = $result;
  }

  public function view($id, $pageUpdate = 1)
  {
      $this->request->allowMethod('get');
      $result = $this->Events->get($id, [
        'contain' => [
          'Users',
          'Users.Avatar'
        ]
      ]);

      $this->apiResponse['event'] = $this->_parseDate($result);
      if ($pageUpdate) {
        $this->getMetadata();
      }

  }

  public function getMetadata() {
    $userTable = TableRegistry::get('Users');
    $users = $userTable->find('all')->select(['id', 'fullname', 'avatar'])->toArray();
    $this->apiResponse['users'] = $users;
  }

  public function create()
  {
    $this->request->allowMethod('post');
    $_data = $this->request->data;
    $_data['start_date'] = strtotime($this->_formatDate($_data['start_date']));
    if ($_data['end_date']) {
      $_data['end_date'] = strtotime($this->_formatDate($_data['end_date']));
    }
    $users = $_data['users'];
    unset($_data['users']);
    $item = $this->Events->newEntity($_data);
    if ($this->Events->save($item)) {
        $this->_processUsers($users, $item->id);
        $this->apiResponse = $item;
    }
  }

  public function update($id)
  {
    $this->request->allowMethod('post');
    $_data = $this->request->data;
    $_data['start_date'] = strtotime($this->_formatDate($_data['start_date']));
    if ($_data['end_date']) {
      $_data['end_date'] = strtotime($this->_formatDate($_data['end_date']));
    }
    $users = $_data['users'];
    unset($_data['users']);
    $item = $this->Events->newEntity($_data);
    $item->id = $id;
    if ($this->Events->save($item)) {
        $this->_processUsers($users, $item->id);
        $this->apiResponse = $item;
    }
  }

  public function usersExcludeMembers($event_id, $type) {
    $eventGroupTable = TableRegistry::get('EventsUsers');
    $members = $eventGroupTable->find('all')->select(['user_id'])->where(['event_id' => $event_id])->toArray();
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

    $result = $userTable->find('all')->contain(['Avatar', 'Provinces', 'Districts', 'Jobs', 'Groups'])->where($where)->map(function ($row) { // map() is a collection method, it executes the query
        $row->birthday = $row->birthday ? date('d/m/Y', $row->birthday) : '';
        $row->job = $row->job ? $row->job['name'] : '';
        $row->group = $row->group ? $row->group['name'] : '';
        $row->province = $row->province ? $row->province['name'] : '';
        $row->district = $row->district ? $row->district['name'] : '';
        return $row;
    })->toArray();
    $this->apiResponse = $result;
  }

  public function pushMembers($event_id) {
    $this->request->allowMethod('post');
    $users = $this->request->data;
    if ($users) {
      $userEventTable = TableRegistry::get('EventsUsers');
      //$userEventTable->deleteAll(['event_id' => $event_id]);
      $data = [];
      foreach ($users as $key => $value) {
        $obj = [];
        $obj['user_id'] = $value['id'];
        $obj['event_id'] = $event_id;
        array_push($data, $obj);

        $item = $userEventTable->newEntity($obj);
        if ($userEventTable->save($item)) {

        }
      }
    }
    $event = $this->Events->get($event_id, [
      'contain' => [
        'Users',
        'Users.Avatar'
      ]
    ]);
    $this->apiResponse['event'] = $event;
  }

  public function deleteMembers($user_id, $event_id) {
    $userEventTable = TableRegistry::get('EventsUsers');
    $userEventTable->deleteAll(['event_id' => $event_id, 'user_id' => $user_id]);
    $event = $this->Events->get($event_id, [
      'contain' => [
        'Users',
        'Users.Avatar'
      ]
    ]);
    $this->apiResponse['event'] = $event;
  }

  private function _processUsers($users, $event_id) {
    if ($users) {
      $userEventTable = TableRegistry::get('EventsUsers');
      $userEventTable->deleteAll(['event_id' => $event_id]);
      $data = [];
      foreach ($users as $key => $value) {
        $obj = [];
        $obj['user_id'] = $value['id'];
        $obj['event_id'] = $event_id;
        array_push($data, $obj);

        $item = $userEventTable->newEntity($obj);
        if ($userEventTable->save($item)) {

        }
      }
    }
  }

  private function _parseDate($data)
  {
      $data['start_date'] = date('d/m/Y', $data['start_date']);
      if ($data['end_date']) {
        $data['end_date'] = date('d/m/Y', $data['end_date']);
      }
      return $data;
  }

  private function _formatDate($date)
  {
    $arr = explode('/', $date);
    return $arr[1] . '/' . $arr[0] . '/' . $arr[2];
  }

  public function delete($id)
  {
    $this->request->allowMethod('get');
    $entity = $this->Events->get($id);
    $this->Events->delete($entity);
    $result = $this->Events->find('all')->toArray();
    $this->apiResponse = $result;
  }

}
