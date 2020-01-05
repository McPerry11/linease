<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('login', 'IndexController@login')->name('login');
Route::post('login', 'LoginController@login');

Route::get('register', 'IndexController@register');
Route::post('register', 'UsersController@store');

Route::prefix('users')->group(function() {
	Route::post('', 'UsersController@index');
});

Route::group(['middleware' => 'auth'], function() {
	Route::get('', 'IndexController@dashboard');
	Route::post('', 'LoginController@logout');
});

// Route::fallback(function() {
// 	return 'Excuse me';
// });