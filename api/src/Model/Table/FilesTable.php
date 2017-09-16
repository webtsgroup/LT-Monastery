<?php
namespace App\Model\Table;
use App\Model\Entity\User;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
/**
 * Files Model
 *
 */
class FilesTable extends Table
{
    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        // parent::initialize($config);
        // $this->table('users');
        // $this->displayField('id');
        // $this->primaryKey('id');
        // $this->addBehavior('Timestamp');
        // $this->belongsToMany('EventsFiles', [
        //   'className' => 'EventsFiles',
        //   'foreignKey' => 'user_id'
        // ]);
    }
}
