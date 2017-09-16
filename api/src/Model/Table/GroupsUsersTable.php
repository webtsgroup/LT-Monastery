<?php
namespace App\Model\Table;
use App\Model\Entity\User;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
/**
 * Users Model
 *
 */
class GroupsUsersTable extends Table
{
    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
      $this->belongsTo('Groups', [
        'className' => 'Groups',
        'foreignKey' => 'group_id'
      ]);
      $this->belongsTo('Users', [
        'className' => 'Users',
        'foreignKey' => 'user_id'
      ]);
    }
}
