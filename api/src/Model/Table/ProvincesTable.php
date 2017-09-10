<?php
namespace App\Model\Table;
use App\Model\Entity\Provinces;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\Event\Event;
/**
 * Users Model
 *
 */
class ProvincesTable extends Table
{
    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);
        $this->table('provinces');
        $this->displayField('id');
        $this->primaryKey('id');
    }

    // public function beforeFind(Event $event, Query $query, array $options, $primary) {
    //   return [];
    //     // $query['conditions'] = array('name' => 'Da Nang');
    //     // return $query;
    // }
}
