<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\MarcheController;
use App\Http\Controllers\PaymentController;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

            /************route Admi***********/
Route::post('/login', [AuthController::class, 'login']);
Route::post('/sendnotif', [ClientController::class, 'sendNotification']);
Route::post('/sendmail', [ClientController::class, 'sendMail']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('marche', [MarcheController::class, 'index']);
            /************route Admi***********/


            /************route Client***********/
Route::post('/loginClient', [ClientController::class, 'loginClient']);
Route::get('/search', [ClientController::class, 'search']);
Route::get('/liste/{nif}', [MarcheController::class, 'indexClient']);
Route::get('/payment/{nif}', [PaymentController::class, 'affichepayment']);
Route::get('/notification/{nif}', [ClientController::class, 'affichenotif']);
Route::put('/modifnotif/{id}', [ClientController::class, 'modifNotif']);
Route::get('marche/{numero}', [MarcheController::class, 'show']);
Route::get('payment/{numero}', [MarcheController::class, 'showpayment']);

Route::post('/ajouter', [MarcheController::class, 'store']);
Route::put('/modifier/{numero}', [MarcheController::class, 'modifier']);
Route::delete('/supprimer/{numero}', [MarcheController::class, 'supprimer']);
Route::delete('/supprimernotif/{id}', [ClientController::class, 'supprimer']);
Route::get('/recupdf', [MarcheController::class, 'recupdf']);
Route::get('/recupayment', [MarcheController::class, 'recupayment']);
Route::post('/payer', [PaymentController::class, 'payer']);
Route::get('/count_marche/{nif}', [ClientController::class, 'count_marche']);
Route::get('/count_paye/{nif}', [AuthController::class, 'count_paye']);
           /************route Client***********/


