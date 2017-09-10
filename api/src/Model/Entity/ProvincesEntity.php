<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

class Provinces extends Entity {

    protected $_virtual = ['text'];

    protected function _getText() {
        return $this->_properties['name'];
    }
}
