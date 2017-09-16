<?php

namespace App\Controller;

use RestApi\Controller\ApiController;
use Cake\ORM\Table;
use Cake\ORM\TableRegistry;

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

  public function view($id)
  {
      $this->request->allowMethod('get');
      $result = $this->Events->get($id, [
        'contain' => [
          'Users' => function ($q) {
                return $q->autoFields(false)->select(['id', 'fullname', 'avatar']);
          }
        ]
      ]);

      $this->apiResponse['event'] = $this->_parseDate($result);
      $this->getMetadata();

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
