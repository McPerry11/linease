<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
	protected $fillable = [
		'latitude',
		'longitude',
		'severity',
		'description',
		'picture',
	];
}
