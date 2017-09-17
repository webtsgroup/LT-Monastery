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
class UsersTable extends Table
{
    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        $this->belongsToMany('Events', [
            'through' => 'EventsUsers',
        ]);
        $this->belongsToMany('Groups', [
            'through' => 'GroupsUsers',
        ]);
        $this->belongsTo('Jobs', [
          'className' => 'Jobs',
          'foreignKey' => 'job_id'
        ]);
        $this->belongsTo('Provinces', [
          'className' => 'Provinces',
          'foreignKey' => 'province_id'
        ]);
        $this->belongsTo('Districts', [
          'className' => 'Districts',
          'foreignKey' => 'district_id'
        ]);
        $this->belongsTo('Groups', [
          'className' => 'Groups',
          'foreignKey' => 'group_id'
        ]);
        $this->hasOne('Files', [
          'className' => 'Files',
          'propertyName' => 'avatar',
          'foreignKey' => 'refer_id'
        ])->setConditions(['refer_type' => 'avatar']);
        // $this->hasMany('Files', [
        //   'className' => 'Files',
        //   'propertyName' => 'images',
        //   'foreignKey' => 'refer_id'
        // ])->setConditions(['refer_type' => 'image']);
    }
}
