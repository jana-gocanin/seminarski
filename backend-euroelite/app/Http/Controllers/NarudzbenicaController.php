<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Narudzbenica;
use App\Models\NacinOtpreme;
use App\Models\Dobavljac;
use App\Models\Proizvod;
use App\Services\DBBroker;

class NarudzbenicaController extends Controller
{

    private $brojNarudzbenice;
    private $listNacinOtpreme;
    private $RSDobavljaci;
    private $RSDobavljac;
    private $RSProizvodi;
    private $ukupno;
    private $dbBroker;
    private $n;

    public function __construct()
    {
        // Inicijalizacija svojstava
        // $this->brojNarudzbenice = $this->generisiSledeciBrojNarudzbenice();

        
        // Instanciranje DBBroker-a u konstruktoru
        $this->dbBroker = app(DBBroker::class);

        // $this->listNacinOtpreme = $this->vratiSveNacinOtpreme();
        $this->RSDobavljaci = $this->vratiSveDobavljace();
        $this->RSDobavljac = null;
        $this->RSProizvodi = $this->vratiSveProizvode();
        $this->ukupno = 0.0;


        $this->brojNarudzbenice = $this->vratiBrojNar();

    }

    
    public function vratiSveNacinOtpreme()
    { 
        $this->listNacinOtpreme = $this->dbBroker->vratiSveNacinOtpreme();
        // return $this->dbBroker->vratiSveNacinOtpreme();

        return $this->listNacinOtpreme;
    }

    public function vratiSveDobavljace()
    {
        // Dobavljanje svih dobavljača iz baze podataka
        $dobavljaci = Dobavljac::all();

        // Vraćanje rezultata
        return $dobavljaci;
    }

    public function vratiSveProizvode()
    {
        // Dobavljanje svih proizvoda iz baze podataka
        $proizvodi = Proizvod::all();

        // Vraćanje rezultata
        return $proizvodi;
    }


    public function vratiBrojNar()
    {
        
        return $this->dbBroker->vratiBrojNar();
    }

    public function kreirajNarudzbenicu()
    {
        $narudzbenica = new Narudzbenica();
        // $narudzbenica->save();
        $this->n = $narudzbenica;

        return response()->json(['message' => 'Uspesno kreirana narudzbenica.']);
    }

    public function postaviNacinOtpreme(Request $request)
    {
        $nacinOtpremeId = $request->input('nacinOtpreme');
        //$nacinOtpreme = NacinOtpreme::find($nacinOtpremeId);

        $narudzbenica = Narudzbenica::where('id', $this->brojNarudzbenice)->first();

        if ($narudzbenica) {
            $narudzbenica->postaviNacinOtpreme($nacinOtpremeId);
            return response()->json(['message' => 'Uspesno postavljeno.']);
            // Ostale akcije i povratna vrednost
        } else {
            return response()->json(['message' => 'Nije uspesno.']);
        }
        

    }

    public function postaviDatumNar(Request $request)
    {
        $datumNarudzbenice = $request->input('datumNarudzbenice');
        $narudzbenica = Narudzbenica::where('id', $this->brojNarudzbenice)->first();
        if ($narudzbenica) {
            $narudzbenica->postaviDatumNar($datumNarudzbenice);
            return response()->json(['message' => 'Uspesno postavljeno.']);
        } else {
            return response()->json(['message' => 'Nije uspesno.']);
        }
    }

    public function postaviRokIsporuke(Request $request)
    {
        $rokIsporuke = $request->input('rokIsporuke');
        $narudzbenica = Narudzbenica::where('id', $this->brojNarudzbenice)->first();
        if ($narudzbenica) {
            $narudzbenica->postaviRokIsporuke($rokIsporuke);
            return response()->json(['message' => 'Uspesno postavljeno.']);
        } else {
            return response()->json(['message' => 'Nije uspesno.']);
        }
    }

    public function postaviZiroRacun(Request $request)
    {
        $ziroRacun = $request->input('ziroRacun');
        $narudzbenica = Narudzbenica::where('id', $this->brojNarudzbenice)->first();
        if ($narudzbenica) {
            $narudzbenica->postaviZiroRacun($ziroRacun);
            return response()->json(['message' => 'Uspesno postavljeno.']);
        } else {
            return response()->json(['message' => 'Nije uspesno.']);
        }
    }

    public function pronadjiDobavljace(Request $request)
    {
        // Pozivanje funkcije iz DBBroker klase
        $dobavljaci = $this->dbBroker->pronadjiDobavljace($request->naziv);

        // Postavljanje rezultata na svojstvo RSDobavljaci
        $this->RSDobavljaci = $dobavljaci;

        // Vraćanje rezultata
        return $dobavljaci;
    }

    public function izaberiDobavljaca($id)
    {
        // Pozivanje funkcije iz DBBroker klase
        $dobavljac = $this->dbBroker->izaberiDobavljaca($id);

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
        $proizvodi = $this->dbBroker->pronadjiProizvode($request->nazivProiz);
        
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
        // $narudzbenica->dodajUKolekciju($stavka);

    // Izračunaj iznos stavke
    // $iznos = $proizvod->nabavna_cena * $kolicina;

    // // Dodavanje stavke narudžbenice pomoću funkcije u modelu Narudzbenica
    // $narudzbenica->dodajStavku($proizvod, $kolicina, $iznos, $brojNarudzbenice);

    // Uspesno zavrsena akcija
    return response()->json(['message' => 'Stavka uspesno dodata.']);
    }

    public function zapamtiUnos()
    {
        // Pretpostavka: Postoji kontroler sa svojstvom $brojNarudzbenice koje sadrži ID narudžbenice
        // $narudzbenica = Narudzbenica::findOrFail($this->brojNarudzbenice);

        // Pokrećemo transakciju
        $this->dbBroker->pokreniDBTransakciju();

        if ($this->n) {
            $ret = $this->dbBroker->zapamtiNarudzbenicu($narudzbenica);
        } else {
            return response()->json(['message' => 'Nije inicijalizovana narudzbenica.']);
        }
        // Čuvamo narudžbenicu i dobijamo rezultat
        

        // Proveravamo rezultat i potvrđujemo ili poništavamo transakciju
        if ($ret === true) {
            $this->dbBroker->potvrdiDBTransakciju();
            return response()->json(['message' => 'Uspešno sačuvana narudžbenica.']);
        } else {
            $this->dbBroker->ponistiDBTransakciju();
            return response()->json(['message' => 'Greška prilikom čuvanja narudžbenice.'], 500);
        }
    }


    public function pronadjiNarudzbenicu()
    {
        $narudzbenica = $this->dbBroker->pronadjiNarudzbenicu($id);

        // Provera da li je narudžbenica pronađena
        if ($narudzbenica) {
            // Ako je pronađena, vratite je kao JSON odgovor
            return response()->json($narudzbenica);
        } else {
            // Ako nije pronađena, vratite odgovarajući JSON odgovor ili izvršite odgovarajuću obradu greške
            return response()->json(['message' => 'Narudžbenica nije pronađena.'], 404);
        }
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
        $this->dbBroker->pokreniDBTransakciju();

    try {
        // Brisanje narudžbenice
        $ret = $this->dbBroker->obrisiNarudzbenicu($this->brojNarudzbenice);

        if ($ret === true) {
            $this->dbBroker->potvrdiDBTransakciju();
            return response()->json(['message' => 'Uspešno obrisana narudžbenica.']);
        } else {
            $this->dbBroker->ponistiDBTransakciju();
            return response()->json(['message' => 'Greška prilikom brisanja narudžbenice.'], 500);
        }
    } catch (\Exception $e) {
        // Poništavanje transakcije u slučaju greške
        $this->dbBroker->ponistiDBTransakciju();

        // Vraćanje greške
        return response()->json(['message' => 'Greška prilikom brisanja narudžbenice.'], 500);
    }
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
        $id = $request->sifraProizvoda; // da li je ovako??? name="sifraProizvoda" treba na frontu

        // Pozivanje funkcije iz DBBroker klase
        $proizvod = $this->dbBroker->izaberiProizvod($id);


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
