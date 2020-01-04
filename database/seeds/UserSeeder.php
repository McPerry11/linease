<?php

use Illuminate\Database\Seeder;
use App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$user = new User;

    	$user->username = 'rndunit';
    	$user->firstname = 'Research';
    	$user->middlename = 'and';
    	$user->lastname = 'Development';
    	$user->email = 'rndccss.ue@gmail.com';
    	$user->type = 'SUPER';
    	$user->password = 'rndccss2008';
    	$user->avatar_id = NULL;

    	$user->save();
    }
  }
