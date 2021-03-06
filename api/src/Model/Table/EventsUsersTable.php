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
class EventsUsersTable extends Table
{
    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
      $this->belongsTo('Events', [
        'className' => 'Events',
        'foreignKey' => 'event_id'
      ]);
      $this->belongsTo('Users', [
        'className' => 'Users',
        'foreignKey' => 'user_id'
      ]);
      $this->hasOne('Files', [
        'className' => 'Files',
        'propertyName' => 'avatar',
        'foreignKey' => 'refer_id'
      ])->setConditions(['refer_type' => 'avatar']);
    }
}
