<?php

namespace App\Controller;

use RestApi\Controller\ApiController;
use Cake\ORM\Table;
use Cake\ORM\TableRegistry;

/**
 * Account Controller
 *
 */
class UsersController extends ApiController
{

    public function index($type = 'internal')
    {
        $isInternal = $type === 'internal' ? 1 : 0;
        $this->request->allowMethod('get');
        $result = $this->Users->find('all')
        ->where(['Users.is_internal' => $isInternal])
        ->contain(['Avatar', 'Provinces', 'Districts', 'Jobs', 'Groups'])
        ->map(function ($row) { // map() is a collection method, it executes the query
            $row->birthday = $row->birthday ? date('d/m/Y', $row->birthday) : '';
            $row->job = $row->job ? $row->job['name'] : '';
            $row->group = $row->group ? $row->group['name'] : '';
            $row->province = $row->province ? $row->province['name'] : '';
            $row->district = $row->district ? $row->district['name'] : '';
            return $row;
        })->toArray();
        //debug($this->Users->find('all')->contain(['Events']));
        $this->apiResponse['users'] = $result;
        $this->getMetadata($isInternal);
    }

    public function view($id, $pageUpdate = 0, $type = 'internal')
    {
        $this->request->allowMethod('get');
        $user = $this->Users->get($id,  [
            'contain' => [
              'Events',
              'Provinces',
              'Districts',
              'Jobs',
              'Groups',
              'Avatar',
              'Images'
            ]
        ]);
        if ($pageUpdate == 1) {
          $this->getMetadata($type);
        }
        $user = $this->_parseData($user);
        $this->apiResponse['user'] = $user;
    }

    public function getMetadata($type = 'internal')
    {
      $isInternal = ($type === 'internal' || $type === 1) ? 1 : 0;
      $provinceTable = TableRegistry::get('Provinces');
      $provinces = $provinceTable->find('all')->toArray();
      $this->apiResponse['provinces'] = $provinces;

      $jobTable = TableRegistry::get('Jobs');
      $jobs = $jobTable->find('all')->where(['Jobs.is_internal' => $isInternal])->toArray();
      $this->apiResponse['jobs'] = $jobs;

      $groupTable = TableRegistry::get('Groups');
      $groups = $groupTable->find('all')->toArray();
      $this->apiResponse['groups'] = $groups;

      $districtTable = TableRegistry::get('Districts');
      $districts = $districtTable->find('all')->toArray();
      $this->apiResponse['districts'] = $districts;
    }

    public function create()
    {
      $this->request->allowMethod('post');
      $_data = $this->request->data;
      // debug($_data['fullname']);
      if ($_data['fullname']) {
        $_data['fullname'] = mb_strtoupper($_data['fullname'], 'UTF-8');
      }
      if ($_data['birthday']) {
        $_data['birthday'] = strtotime($this->_formatDate($_data['birthday']));
      }
      $item = $this->Users->newEntity($_data);
      if ($this->Users->save($item)) {
          $this->apiResponse = $item;
      }
    }

    public function update($id)
    {
      $this->request->allowMethod('post');
      $_data = $this->request->data;
      if ($_data['fullname']) {
        $_data['fullname'] = mb_strtoupper($_data['fullname'], 'UTF-8');
      }
      if ($_data['birthday']) {
        $_data['birthday'] = strtotime($this->_formatDate($_data['birthday']));
      }
      $item = $this->Users->newEntity($_data);
      $item->id = $id;
      //$item = $this->Users->get($id);
      if ($this->Users->save($item)) {
          $this->apiResponse = $item;
      }
    }

    public function delete($id, $type = 'internal')
    {
      $this->request->allowMethod('get');
      $entity = $this->Users->get($id);
      $this->Users->delete($entity);
      $isInternal = $type === 'internal' ? 1 : 0;
      $result = $this->Users->find('all')->where(['is_internal' => $isInternal])->contain(['Avatar'])->toArray();
      $this->apiResponse = $result;
    }

    private function _parseData($data)
    {
        if ($data['birthday']) {
          $data['birthday'] = date('d/m/Y', $data['birthday']);
        }
        return $data;
    }

    private function _formatDate($date)
    {
      $arr = explode('/', $date);
      return $arr[1] . '/' . $arr[0] . '/' . $arr[2];
    }

}
