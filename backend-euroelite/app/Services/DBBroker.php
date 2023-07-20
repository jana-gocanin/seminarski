<?php

namespace App\Services;

use App\Models\Narudzbenica;
use App\Models\Dobavljac;
use App\Models\Proizvod;

class DBBroker
{
    public function vratiBrojNar()
    {
        // Pronalaženje poslednjeg broja narudžbenice iz baze
        $poslednjiBrojNarudzbenice = Narudzbenica::max('broj_narudzbenice');

        // Generisanje sledećeg broja narudžbenice
        $sledeciBrojNarudzbenice = $poslednjiBrojNarudzbenice + 1;

        return $sledeciBrojNarudzbenice;
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
        // Pronalaženje dobavljača na osnovu ID-ja
        return Dobavljac::find($id);
    }

    public function pronadjiProizvode($nazivProiz)
    {
        // Pronalaženje proizvoda na osnovu naziva
        return Proizvod::where('naziv_proizvoda', 'LIKE', '%' . $nazivProiz . '%')->get();
    }

    public function izaberiProizvod($id)
    {
        // Pronalaženje proizvoda na osnovu ID-ja
        return Proizvod::find($id);
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

        // Vraćanje pronađene narudžbenice
        return $narudzbenica;
    }

    public function obrisiNarudzbenicu($id)
    {
        // Pronalaženje narudžbenice na osnovu ID-ja
        $narudzbenica = Narudzbenica::find($id);

        if ($narudzbenica) {
            // Ako je pronađena narudžbenica, obriši je
            $narudzbenica->delete();
            return true; // Uspesno obrisana narudžbenica
        } else {
            return false; // Narudžbenica sa datim ID-jem nije pronađena
        }
    }
}
