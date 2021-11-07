<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
	protected $fillable = [
		'description',
		'user_id',
		'report_id',
		'ip_address'
	];

	public function user() {
		return $this->belongsTo('app\User');
	}
}
