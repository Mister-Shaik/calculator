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

Route::get('/', function () {
    return view('welcome');
});
Route::get('/pdfGen', function () {
    return view('pdfGenerator');
});


Route::get('/addReport', 'Api\JsonController@AddReport');
Route::get('/addCalculation', 'Api\JsonController@AddCalculation');
Route::get('/delReport', 'Api\JsonController@DelReport');
Route::get('/delCalculation', 'Api\JsonController@DelCalculation');