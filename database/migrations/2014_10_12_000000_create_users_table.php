<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username')->unique()->collation('utf8_bin');
            $table->string('firstname')->nullable();
            $table->string('middlename')->nullable();
            $table->string('lastname')->nullable();
            $table->string('email')->unique();
            $table->string('city')->nullable();
            $table->date('birthdate')->nullable();
            $table->enum('type', [
                'USER',
                'FACIL',
                'ADMIN',
                'SUPER',
            ]);
            $table->string('password');
            $table->string('avatar')->nullable();
            $table->boolean('verified')->default(false);
            $table->boolean('ob_dashboard')->default(false);
            $table->boolean('ob_profile')->default(false);
            $table->boolean('ob_logs')->default(false);
            $table->boolean('ob_accounts')->default(false);
            $table->boolean('ob_camera')->default(false);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
