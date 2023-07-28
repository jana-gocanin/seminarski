<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\DBBroker;
use App\Models\NacinOtpreme;

class NacinOtpremeController extends Controller
{

    private $brojNacOtp;
    private $dbBroker;


    public function __construct()
    {
        
        // Instanciranje DBBroker-a u konstruktoru
        $this->dbBroker = app(DBBroker::class);

    

    }
    public function vratiBrojNacOtp()
    {
        
        return $this->dbBroker->vratiBrojNacOtp();
    }

    public function kreirajNacinOtpreme(Request $request)
    {

        $naziv = $request->input('naziv');

        $nacin = new NacinOtpreme(['naziv' => $naziv]);
        $nacin->save();
        //   $this->brojNarudzbenice = $this->vratiBrojNar();
        $this->brojNacOtp = $this->vratiBrojNacOtp();
      

        return response()->json(['message' => 'Uspesno kreiran nacin otpreme.', 'brojNacOtp' => $this->brojNacOtp]);
    }

    public function izmeniNacinOtpreme(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|integer',
            'naziv' => 'required|string',
            // Add other validation rules for your fields
        ]);

        $id = $validatedData['id'];
        $naziv = $validatedData['naziv'];

        $this->dbBroker->pokreniDBTransakciju();

        try {
            // Brisanje narudžbenice
            $ret = $this->dbBroker->izmeniNacinOtpreme($id, $naziv);
    
            if ($ret === true) {
                $this->dbBroker->potvrdiDBTransakciju();
                return response()->json(['message' => 'Uspešno izmenjen nacin otpreme.']);
            } else {
                $this->dbBroker->ponistiDBTransakciju();
                return response()->json(['message' => 'Greška prilikom izmene nacina otpreme.'], 500);
            }
        } catch (\Exception $e) {
            // Poništavanje transakcije u slučaju greške
            $this->dbBroker->ponistiDBTransakciju();
    
            // Vraćanje greške
            return response()->json(['message' => 'Greška prilikom izmene nacina otpreme. Ponistavam'], 500);
        }
    }

    public function obrisiNacinOtpreme(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|integer',
            
            // Add other validation rules for your fields
        ]);

        $id = $validatedData['id'];
        

        $this->dbBroker->pokreniDBTransakciju();

        try {
            // Brisanje narudžbenice
            $ret = $this->dbBroker->obrisiNacinOtpreme($id);
    
            if ($ret === true) {
                $this->dbBroker->potvrdiDBTransakciju();
                return response()->json(['message' => 'Uspešno obrisan nacin otpreme.']);
            } else {
                $this->dbBroker->ponistiDBTransakciju();
                return response()->json(['message' => 'Greška prilikom brisanja nacina otpreme.'], 500);
            }
        } catch (\Exception $e) {
            // Poništavanje transakcije u slučaju greške
            $this->dbBroker->ponistiDBTransakciju();
    
            // Vraćanje greške
            return response()->json(['message' => 'Greška prilikom brisanja nacina otpreme.'], 500);
        }
    }
}
