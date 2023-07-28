<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

use App\Models\Narudzbenica;
use App\Models\Dobavljac;
use App\Models\Proizvod;
use App\Models\NacinOtpreme;

class DBBroker
{
    public function vratiBrojNar()
    {
        // Pronalaženje poslednjeg broja narudžbenice iz baze
        $poslednjiBrojNarudzbenice = Narudzbenica::max('id');

        // Generisanje sledećeg broja narudžbenice
        // $sledeciBrojNarudzbenice = $poslednjiBrojNarudzbenice + 1;

        return $poslednjiBrojNarudzbenice;
    }

    public function vratiSveNacinOtpreme()
    {
        // Dobavljanje svih načina otpreme iz baze podataka
        return NacinOtpreme::all();
    }

    public function pronadjiDobavljace(string $naziv)
    {
        // Dobavljanje dobavljača iz baze podataka prema zadatom nazivu
        return Dobavljac::where('naziv_dobavljaca', 'LIKE', '%' . $naziv . '%')->get();
    }

    public function izaberiDobavljaca($id)
    {
        $dobavljac = Dobavljac::find($id);

        // Ako je dobavljač pronađen, vraćamo novu instancu dobavljača
        if ($dobavljac) {
            return new Dobavljac([
                'id' => $dobavljac->id,
                'naziv_dobavljaca' => $dobavljac->naziv_dobavljaca,
                'email_dobavljaca' => $dobavljac->email_dobavljaca,
                // Dodajte ovde ostale atribute dobavljača ako je potrebno
            ]);
        }

        // Ako dobavljač nije pronađen, vraćamo null
        return null;
    }

    public function pronadjiProizvode($nazivProiz)
    {
        // Pronalaženje proizvoda na osnovu naziva
        return Proizvod::where('naziv_proizvoda', 'LIKE', '%' . $nazivProiz . '%')->get();
    }

    public function izaberiProizvod($id)
    {
        // Pronalaženje proizvoda na osnovu ID-ja
        $proizvod = Proizvod::find($id);

        // Ako je proizvod pronađen, vraćamo novu instancu proizvoda
        if ($proizvod) {
            // return new Proizvod([
            //     'id' => $proizvod->id,
            //     'naziv_proizvoda' => $proizvod->naziv_proizvoda,
            //     'nabavna_cena' => $proizvod->nabavna_cena,
            //     'opis' => $proizvod->opis,
            //     // Dodajte ovde ostale atribute proizvoda ako je potrebno
            // ]);5           
            return $proizvod;
        } 

        // Ako proizvod nije pronađen, vraćamo null
        return null;
    }
    
    public function pokreniDBTransakciju()
    {
        DB::beginTransaction();
    }

    public function zapamtiNarudzbenicu(Narudzbenica $narudzbenica)
    {
        try {
            // Čuvamo narudžbenicu
            $narudzbenica->save();

            foreach ($narudzbenica->stavke as $stavka) {
                $stavka->save();
            }

            // Ako je čuvanje uspešno, vraćamo true
            return true;
        } catch (\Exception $e) {
            // Ako se dogodi greška prilikom čuvanja, vraćamo false
            return false;
        }
    }

    public function potvrdiDBTransakciju()
    {
        DB::commit();
    }

    public function ponistiDBTransakciju()
    {
        DB::rollback();
    }


    public function pronadjiNarudzbenicu($id)
    {
        // Pronalaženje narudžbenice na osnovu ID-ja
        $narudzbenica = Narudzbenica::find($id);

        if ($narudzbenica) {
            return new Narudzbenica([
                'id' => $narudzbenica->id,
                'nacin_otpreme_id' => $narudzbenica->nacin_otpreme_id,
                'datum' => $narudzbenica->datum,
                'rok' => $narudzbenica->rok,
                'ziro_racun' => $narudzbenica->ziro_racun,
                'ukupno' => $narudzbenica->ukupno,
                'dobavljac_id' => $narudzbenica->dobavljac_id,
                // Dodajte ovde ostale atribute narudžbenice ako je potrebno
            ]);
        }
    
        // Ako narudžbenica nije pronađena, vraćamo null
        return null;
    }

    public function obrisiNarudzbenicu($id)
    {
        // Pronalaženje narudžbenice na osnovu ID-ja
        $narudzbenica = Narudzbenica::find($id);

        if ($narudzbenica) {
            // Ako je pronađena narudžbenica, obriši je i njene stavke
            $narudzbenica->stavke()->delete();
            $narudzbenica->delete();
            return true; // Uspesno obrisana narudžbenica
        } else {
            return false; // Narudžbenica sa datim ID-jem nije pronađena
        }
    }

    //nacin otpreme
    public function vratiBrojNacOtp()
    {
        $poslednjiBroj = NacinOtpreme::max('id');

        return $poslednjiBroj;
    }

    public function izmeniNacinOtpreme(int $id, string $naziv)
    {
        try {
            // Assuming you have a table named 'nacin_otpremes' for storing NacinOtpreme records
            // Replace 'nacin_otpremes' with your actual table name if different
            $nacin = NacinOtpreme::find($id);

            if($nacin){
                $nacin->naziv_nacina = $naziv;
                $nacin->save();
                return true;
            }
            // $affectedRows = DB::table('nacin_otpremes')
            //     ->where('id', $id)
            //     ->update(['naziv' => $naziv]);

            // return $affectedRows > 0;
        } catch (\Exception $e) {
            // Handle the exception if needed
            // For example, log the error: \Log::error($e->getMessage());
            return false;
        }
    }

    public function obrisiNacinOtpreme($id)
    {
        $nacin = NacinOtpreme::find($id);

        if ($nacin) {
            
            $nacin->delete();
            return true; 
        } else {
            return false; 
        }
    }
}
