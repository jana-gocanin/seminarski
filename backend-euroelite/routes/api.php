<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\NarudzbenicaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/vratiBrojNar', [NarudzbenicaController::class, 'vratiBrojNar']);
Route::get('/kreirajNarudzbenicu', [NarudzbenicaController::class, 'kreirajNarudzbenicu']);


Route::get('/vratiSveNacinOtpreme', [NarudzbenicaController::class, 'vratiSveNacinOtpreme']);

Route::post('/postaviNacinOtpreme', [NarudzbenicaController::class, 'postaviNacinOtpreme']);
Route::post('/postaviDatumNar', [NarudzbenicaController::class, 'postaviDatumNar']);
Route::post('/postaviRokIsporuke', [NarudzbenicaController::class, 'postaviRokIsporuke']);
Route::post('/postaviZiroRacun', [NarudzbenicaController::class, 'postaviZiroRacun']);