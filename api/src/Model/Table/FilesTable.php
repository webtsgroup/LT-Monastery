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
        $this->setDisplayField('mod');
        $this->addBehavior('Josegonzalez/Upload.Upload', [
            // You can configure as many upload fields as possible,
            // where the pattern is `field` => `config`
            //
            // Keep in mind that while this plugin does not have any limits in terms of
            // number of files uploaded per request, you should keep this down in order
            // to decrease the ability of your users to block other requests.
            'file' => [
              'fields' => [
                    // if these fields or their defaults exist
                    // the values will be set.
                    'dir' => 'dir'
              ]
            ],
        ]);
    }
}
