<?php

namespace App\Controller;

use RestApi\Controller\ApiController;
use Cake\ORM\Table;
use Cake\ORM\TableRegistry;

/**
 * Account Controller
 *
 */
class FilesController extends ApiController
{

  public function upload()
  {
    $this->request->allowMethod('post');
    $_data = $this->request->data;
    debug($_data);
    // if ($_data['birthday']) {
    //   $_data['birthday'] = strtotime($this->_formatDate($_data['birthday']));
    // }
    // $item = $this->Files->newEntity($_data);
    // if ($this->Files->save($item)) {
    //     $this->apiResponse = $item;
    // }
  }

}
