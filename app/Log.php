<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
	protected $fillable = [
		'description',
		'user_id',
		'reports_id',
		'ip_address'
	];
}
