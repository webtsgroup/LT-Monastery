<?php

namespace App\Controller;

use RestApi\Controller\ApiController;
use Cake\ORM\Table;
use Cake\ORM\TableRegistry;

/**
 * Account Controller
 *
 */
class DashboardController extends ApiController
{

  public function index()
  {
      $this->request->allowMethod('get');
      $userTable = TableRegistry::get('Users');
      $NOW = strtotime(date('m/d/Y'));

      $result = [];
      $result['member_count'] = [];
      $result['member_count']['internal'] = $userTable->find()->where(['is_internal' => 1])->count();
      $result['member_count']['external'] = $userTable->find()->where(['is_internal' => 0])->count();

      $result['birthday'] = [];
      $thisMonth = date('m');
      $result['birthday']['this_month'] = $userTable->find()
                                          ->where([
                                            'MONTH(FROM_UNIXTIME(birthday))' => $thisMonth
                                          ])->order(['birthday' => 'ASC'])->toArray();
      $nextMonth = date('m', strtotime('+1 month', $NOW));
      $result['birthday']['next_month'] = $userTable->find()
                                          ->where([
                                            'MONTH(FROM_UNIXTIME(birthday))' => $nextMonth
                                          ])->order(['birthday' => 'ASC'])->toArray();

      $eventTable = TableRegistry::get('Events');
      $result['events'] = $eventTable->find()->where(['start_date > ' => $NOW])->order(['start_date' => 'ASC'])->toArray();
      $this->apiResponse = $result;
  }

}
