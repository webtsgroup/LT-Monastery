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

  public function upload($refer_type = 'avatar', $refer_id = 0)
  {
    $this->request->allowMethod('post');
    $_data = $this->request->data;
    if (is_array($_data[$refer_type]) && isset($_data[$refer_type]['tmp_name'])) {
      $this->Files->deleteAll([
        'refer_type' => $refer_type,
        'refer_id' => $refer_id]
      );
      $_data['file'] = $_data[$refer_type];
      $_data['refer_type'] = $refer_type;
      $_data['refer_id'] = $refer_id;
      unset($_data[$refer_type]);
      $item = $this->Files->newEntity($_data);
      if ($this->Files->save($item)) {
          $this->apiResponse = $item;
      }
    } else {
      $response = [];
      foreach ($_data[$refer_type] as $image) {
        $_image['file'] = $image;
        $_image['refer_type'] = $refer_type;
        $_image['refer_id'] = $refer_id;
        $_item = $this->Files->newEntity($_image);
        if ($this->Files->save($_item)) {
          array_push($response, $_item);
        }
      }
      $this->apiResponse = $response;
    }
  }

  public function delete($id, $refer_type = 'images', $refer_id = 0)
  {
    $this->request->allowMethod('get');
    $entity = $this->Files->get($id);
    $this->Files->delete($entity);
    $result = $this->Files->find('all')->where(['refer_type' => $refer_type, 'refer_id' => $refer_id])->toArray();
    $this->apiResponse = $result;
  }

}
