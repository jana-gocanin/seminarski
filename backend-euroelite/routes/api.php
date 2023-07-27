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

Route::group(['prefix' => 'dobavljaci'], function () {
    // Pretraga dobavljača po nazivu
    Route::get('/pronadji/{naziv}', [NarudzbenicaController::class, 'pronadjiDobavljace']);

    // Prikaz odabranog dobavljača po ID-u
    Route::get('/izaberi/{id}', [NarudzbenicaController::class, 'izaberiDobavljaca']);

    // Postavljanje dobavljača na narudžbenicu
    Route::post('/postavi', [NarudzbenicaController::class, 'postaviDobavljaca']);
});

Route::group(['prefix' => 'proizvodi'], function () {
    Route::get('pronadji/{nazivProiz}',  [NarudzbenicaController::class, 'pronadjiProizvode']);
    Route::get('izaberi/{sifraProizvoda}',  [NarudzbenicaController::class, 'izaberiProizvod']);
    Route::post('dodaj-stavku',  [NarudzbenicaController::class, 'dodajStavku']);
});

Route::post('/narudzbenice/pronadji', [NarudzbenicaController::class, 'pronadjiNarudzbenicu']);
Route::post('/stavka/obrisi', [NarudzbenicaController::class, 'obrisi']);
Route::post('/stavka/izmeni', [NarudzbenicaController::class, 'izmeni']);
Route::delete('/narudzbenice/obrisi-narudzbenicu', [NarudzbenicaController::class, 'obrisiNarudzbenicu']);

Route::post('/narudzbenice/zapamtiUnos', [NarudzbenicaController::class, 'zapamtiUnos']);