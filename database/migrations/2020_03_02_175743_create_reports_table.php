<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('latitude');
            $table->string('longitude');
            $table->longText('address')->nullable();
            $table->enum('severity', [
                'CRITICAL',
                'MAJOR',
                'MODERATE',
                'LIGHT',
                'RESOLVED'
            ]);
            $table->longText('description')->nullable();
            $table->string('picture');
            $table->boolean('verified')->default(false);
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
        Schema::dropIfExists('reports');
    }
}
