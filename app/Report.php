<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
	protected $fillable = [
		'user_id',
		'latitude',
		'longitude',
		'address',
		'severity',
		'description',
		'picture',
		'verified',
	];
}
