<?php

namespace App\Controller;

use RestApi\Controller\ApiController;
use RestApi\Utility\JwtToken;
use Cake\ORM\TableRegistry;

/**
 * Account Controller
 *
 */
class AdministratorsController extends ApiController
{

    public function index()
    {
      $this->request->allowMethod('get');

      $result = $this->Administrators->find('all')->contain(['Roles'])->toArray();

      $this->apiResponse = $result;
    }

    /**
     * Login method
     *
     * Returns a token on successful authentication
     *
     * @return void|\Cake\Network\Response
     */
    public function login()
    {
        $this->request->allowMethod('post');
        $user = $this->request->data;
        /**
         * process your data and validate it against database table
         */
        $check = $this->_checkAdministrator($user['username'], $user['password']);
  			if ($check) {
          // generate token if valid user
      		$payload = [
            'username' => $check['username'],
            'fullname' => $check['fullname'],
            'latest_login' => $check['latest_login'],
            'role' => $check['role']
          ];
          $this->apiResponse = JwtToken::generateToken($payload);
  			}
    }

    private function _checkAdministrator($username, $password = null) {
  		$where = [
  			'username' => $username
  		];
  		$where['password'] = md5($password);
  		$check = $this->Administrators->find()->where($where)->contain(['Roles'])->first();
  		return $check;
  	}

    public function getMetadata()
    {
      $roleTable = TableRegistry::get('Roles');
      $roles = $roleTable->find('all')->toArray();
      $this->apiResponse['roles'] = $roles;
    }

    public function view($id)
    {
        $this->request->allowMethod('get');
        $administrator = $this->Administrators->get($id,  [
            'contain' => ['Roles']
        ]);

        $this->getMetadata();
        $this->apiResponse['administrator'] = $administrator;
    }

    public function create()
    {
      $this->request->allowMethod('post');
      $_data = $this->request->data;
      $_data['password'] = md5($_data['password']);
      $item = $this->Administrators->newEntity($_data);
      if ($this->Administrators->save($item)) {
          $this->apiResponse = $item;
      }
    }

    public function update($id)
    {
      $this->request->allowMethod('post');
      $_data = $this->request->data;
      if ($_data['password'] && $_data['password'] !== null) {
        $_data['password'] = md5($_data['password']);
      } else if ($_data['password'] === null) {
        unset($_data['password']);
      }
      $item = $this->Administrators->newEntity($_data);
      $item->id = $id;
      //$item = $this->Administrators->get($id);
      if ($this->Administrators->save($item)) {
          $this->apiResponse = $item;
      }
    }

    public function delete($id)
    {
      $this->request->allowMethod('get');
      $entity = $this->Administrators->get($id);
      $this->Administrators->delete($entity);
      $result = $this->Administrators->find('all')->toArray();
      $this->apiResponse = $result;
    }
}
