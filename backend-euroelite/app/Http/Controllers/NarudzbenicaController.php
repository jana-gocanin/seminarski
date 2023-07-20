<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Narudzbenica;
use App\Models\NacinOtpreme;
use App\Models\Dobavljac;
use App\Models\Proizvod;

class NarudzbenicaController extends Controller
{

    private $brojNarudzbenice;
    private $listNacinOtpreme;
    private $RSDobavljaci;
    private $RSDobavljac;
    private $RSProizvodi;
    private $ukupno;

    public function __construct()
    {
        // Inicijalizacija svojstava
        $this->brojNarudzbenice = $this->generisiSledeciBrojNarudzbenice();
        $this->listNacinOtpreme = $this->vratiSveNacinOtpreme();
        $this->RSDobavljaci = $this->vratiSveDobavljace();
        $this->RSDobavljac = null;
        $this->RSProizvodi = $this->vratiSveProizvode();
        $this->ukupno = 0.0;

    }

    private function generisiSledeciBrojNarudzbenice()
    {
        // Pronalaženje poslednjeg broja narudžbenice iz baze
        $poslednjiBrojNarudzbenice = Narudzbenica::max('broj_narudzbenice');

        // Generisanje sledećeg broja narudžbenice
        $sledeciBrojNarudzbenice = $poslednjiBrojNarudzbenice + 1;

        return $sledeciBrojNarudzbenice;
    }
    private function vratiSveNacinOtpreme()
    { 
        $nacinOtpreme = NacinOtpreme::all();
        
        // Vraćanje rezultata
        return $nacinOtpreme;
    }

    private function vratiSveDobavljace()
    {
        // Dobavljanje svih dobavljača iz baze podataka
        $dobavljaci = Dobavljac::all();

        // Vraćanje rezultata
        return $dobavljaci;
    }

    private function vratiSveProizvode()
    {
        // Dobavljanje svih proizvoda iz baze podataka
        $proizvodi = Proizvod::all();

        // Vraćanje rezultata
        return $proizvodi;
    }


    public function vratiBrojNar()
    {
        return $this->brojNarudzbenice;
    }
    // public function new()
    // {
    //     // Dobijanje vrednosti broja narudžbenice iz svojstva kontrolera
    //     $brojNarudzbenice = $this->brojNarudzbenice;

    //     // Kreiranje nove instance narudžbenice sa zadatim brojem narudžbenice
    //     $narudzbenica = new Narudzbenica();
    //     $narudzbenica->brojNar = $brojNarudzbenice;

    //     // Ostale inicijalizacije
    //     $narudzbenica->save();

    //     // Vraćanje instance nove narudžbenice
    //     //return $narudzbenica;
    // }

    public function kreirajNarudzbenicu()
    {
        $narudzbenica = new Narudzbenica(['brojNar' => $this->brojNarudzbenice]);
        $narudzbenica->save();
    }

    public function postaviNacinOtpreme(Request $request)
    {
        $nacinOtpremeId = $request->input('nacinOtpreme');
        //$nacinOtpreme = NacinOtpreme::find($nacinOtpremeId);

        $narudzbenica = Narudzbenica::where('id', $this->brojNarudzbenice)->first();

        if ($narudzbenica) {
            $narudzbenica->postaviNacinOtpreme($nacinOtpremeId);
            // Ostale akcije i povratna vrednost
        } else {
            // Prikazivanje greške ili odgovarajuća obrada
        }
        //$narudzbenica->nacinOtpreme()->associate($nacinOtpreme);
        //$narudzbenica->save();
        // $narudzbenica = Narudzbenica::findOrFail($request->narudzbenica_id);
        // $nacinOtpreme = NacinOtpreme::findOrFail($request->nacin_otpreme_id);
        
        // // Postavljanje nacina otpreme narudzbenice
        // $narudzbenica->nacinOtpreme()->associate($nacinOtpreme);
        // $narudzbenica->save();
        
        // // Uspesno zavrsena akcija
        // return response()->json(['message' => 'Nacin otpreme uspesno postavljen.']);

        
    // $nacinOtpreme = $request->input('nacinOtpreme');
    // $narudzbenica = Narudzbenica::find($this->brojNarudzbenice); // Promenite $this->brojNarudzbenice na odgovarajuće svojstvo koje sadrži broj narudžbenice
    // $narudzbenica->nacin_otpreme_id = $nacinOtpreme;
    // $narudzbenica->save();
    
    // Vraćanje potvrde ili nekog rezultata po potrebi


    }

    public function postaviDatumNar(Request $request)
    {
        $datumNarudzbenice = $request->input('datumNarudzbenice');
        $narudzbenica = Narudzbenica::where('id', $this->brojNarudzbenice)->first();
        if ($narudzbenica) {
            $narudzbenica->postaviDatumNar($datumNarudzbenice);
        } else {
            // Prikazivanje greške ili odgovarajuća obrada
        }
    }

    public function postaviRokIsporuke(Request $request)
    {
        $rokIsporuke = $request->input('rokIsporuke');
        $narudzbenica = Narudzbenica::where('id', $this->brojNarudzbenice)->first();
        if ($narudzbenica) {
            $narudzbenica->postaviRokIsporuke($rokIsporuke);
        } else {
            // Prikazivanje greške ili odgovarajuća obrada
        }
    }

    public function postaviZiroRacun(Request $request)
    {
        $ziroRacun = $request->input('ziroRacun');
        $narudzbenica = Narudzbenica::where('id', $this->brojNarudzbenice)->first();
        if ($narudzbenica) {
            $narudzbenica->postaviZiroRacun($ziroRacun);
        } else {
            // Prikazivanje greške ili odgovarajuća obrada
        }
    }

    public function pronadjiDobavljace(Request $request)
    {
        $dobavljaci = Dobavljac::where('naziv_dobavljaca', 'LIKE', '%' . $request->naziv . '%')->get();
        
        $this->RSDobavljaci = $dobavljaci;
        // Vraćanje rezultata
        return $dobavljaci;
    }

    public function izaberiDobavljaca($id)
    {
        // Pronalaženje dobavljača na osnovu ID-ja
        $dobavljac = Dobavljac::find($id);

        // Postavljanje svojstva $RSDobavljac na izabranog dobavljača
        $this->RSDobavljac = $dobavljac;

        // Vraćanje izabranog dobavljača
        return $dobavljac;

        //eloquent orm svakako instancira dobavljaca
    }

    public function postaviDobavljaca(Request $request)
    {
        $dobavljacId = $request->input('dobavljacId');
        $dobavljac = Dobavljac::find($dobavljacId);
    
        $narudzbenica = Narudzbenica::where('id', $this->brojNarudzbenice)->first();
        
        if ($dobavljac && $narudzbenica) {
            $narudzbenica->postaviDobavljaca($dobavljac);
        } else {
            // Obrada greške, dobavljač i/ili narudžbenica su null
        }
    }

    public function pronadjiProizvode(Request $request)
    {
        $proizvodi = Proizvod::where('naziv_proizvoda', 'LIKE', '%' . $request->nazivProiz . '%')->get();
        
        $this->RSProizvodi = $proizvodi;
        // Vraćanje rezultata
        return $proizvodi;
    }

    public function dodajStavku(Request $request)
    {
        $narudzbenica = Narudzbenica::findOrFail($request->narudzbenica_id);
        $proizvod = Proizvod::findOrFail($request->proizvod_id);
        
        $kolicina = $request->kolicina;

        $stavka = $narudzbenica->kreirajStavku($proizvod, $kolicina);

    // Izračunaj iznos stavke
    // $iznos = $proizvod->nabavna_cena * $kolicina;

    // // Dodavanje stavke narudžbenice pomoću funkcije u modelu Narudzbenica
    // $narudzbenica->dodajStavku($proizvod, $kolicina, $iznos, $brojNarudzbenice);

    // Uspesno zavrsena akcija
    return response()->json(['message' => 'Stavka uspesno dodata.']);
    }

    public function zapamtiNarudzbenicu(Request $request)
    {
        // Implementacija za čuvanje/nos narudžbenice
    }


    public function pronadjiNarudzbenicu()
    {
        $narudzbenica = Narudzbenica::findOrFail($this->brojNarudzbenice);
        
        // Vraćanje rezultata
        return $narudzbenica;
    }

    public function obrisi(Request $request)
    {
        $redniBroj = $request->input('id');

        $narudzbenica = Narudzbenica::where('id', $this->brojNarudzbenice)->first();
        

        if ($narudzbenica) {
            $narudzbenica->obrisi($redniBroj);
        }else{
            return response()->json(['message' => 'greska']);
        }
    }

    public function izmeni(Request $request)
    {
        $redniBroj = $request->input('id');
        $novaKolicina = $request->input('novaKolicina');

        $narudzbenica = Narudzbenica::where('id', $this->brojNarudzbenice)->first();
        // $stavkaNarudzbenice = $narudzbenica->stavke()->where('id', $redniBroj)->first();

        if ($narudzbenica) {
            $narudzbenica->izmeni($redniBroj, $novaKolicina);
        }else{
            return response()->json(['message' => 'greska']);
        }
    }
    public function obrisiNarudzbenicu()
    {
        $narudzbenica = Narudzbenica::findOrFail($this->brojNarudzbenice);
        
        // Brisanje narudžbenice
        $narudzbenica->delete();
        
        // Uspesno zavrsena akcija
        return response()->json(['message' => 'Narudzbenica uspesno obrisana.']);
    }

    public function dajUkupanIznos(Request $request)
    {
        $narudzbenica = Narudzbenica::where('id', $this->brojNarudzbenice)->first();

        $ukupanIznos = $narudzbenica->dajUkupanIznos();
        $narudzbenica->ukupno = $ukupanIznos;
        $narudzbenica->save();
    
        return response()->json(['ukupan_iznos' => $ukupanIznos]);
    }

    public function izaberiProizvod(Request $request)
    {
        $proizvod = Proizvod::find($id);


        // Vraćanje izabranog dobavljača
        return $proizvod;
    }

    public function azurirajRedneBrojeve()
    {
        // Uzimamo sve stavke narudžbenice sortirane po rednom broju
        $stavke = $this->stavke->sortBy('redni_broj');

        // Postavljamo redne brojeve stavki po redu
        $redniBroj = 1;
        foreach ($stavke as $stavka) {
            $stavka->redni_broj = $redniBroj;
            $stavka->save();
            $redniBroj++;
        }
    }
}
