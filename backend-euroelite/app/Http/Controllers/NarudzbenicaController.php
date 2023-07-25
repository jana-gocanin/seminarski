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


        // $this->brojNarudzbenice = $this->vratiBrojNar();

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
          $narudzbenica->save();
        //   $this->brojNarudzbenice = $this->vratiBrojNar();
        $this->brojNarudzbenice = $this->vratiBrojNar();
        $this->n = $narudzbenica;

        return response()->json(['message' => 'Uspesno kreirana narudzbenica.', 'brojNarudzbenice' => $this->brojNarudzbenice]);
    }

    public function postaviNacinOtpreme(Request $request)
    {
        $nacinOtpremeId = $request->input('nacinOtpreme');
        $brojNarudzbenice = $request->input('brojNarudzbenice');
        //$nacinOtpreme = NacinOtpreme::find($nacinOtpremeId);
        $narudzbenica = Narudzbenica::where('id', $brojNarudzbenice)->first();
// dd($this->brojNarudzbenice);
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
        //godina mesec dan
        $datumNarudzbenice = $request->input('datumNarudzbenice');
        $brojNarudzbenice = $request->input('brojNarudzbenice');
        $narudzbenica = Narudzbenica::where('id', $brojNarudzbenice)->first();
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
        $brojNarudzbenice = $request->input('brojNarudzbenice');
        $narudzbenica = Narudzbenica::where('id', $brojNarudzbenice)->first();
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
        $brojNarudzbenice = $request->input('brojNarudzbenice');
        $narudzbenica = Narudzbenica::where('id', $brojNarudzbenice)->first();
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
        $brojNarudzbenice = $request->input('brojNarudzbenice');
        $dobavljac = Dobavljac::find($dobavljacId);
    
        $narudzbenica = Narudzbenica::where('id', $brojNarudzbenice)->first();
        
        if ($dobavljac && $narudzbenica) {
            $narudzbenica->postaviDobavljaca($dobavljac);
            return response()->json(['message' => 'Uspesno postavljeno.']);

        } else {
            return response()->json(['message' => 'Neuspesno.']);
    }}

    public function pronadjiProizvode(Request $request)
    {
        $proizvodi = $this->dbBroker->pronadjiProizvode($request->nazivProiz);
        
        $this->RSProizvodi = $proizvodi;
        // Vraćanje rezultata
        return $proizvodi;
    }

    public function izaberiProizvod(Request $request)
    {
        $id = $request->sifraProizvoda; // da li je ovako??? name="sifraProizvoda" treba na frontu

        // Pozivanje funkcije iz DBBroker klase
        $proizvod = $this->dbBroker->izaberiProizvod($id);


        // Vraćanje izabranog dobavljača
        return $proizvod;
    }

    public function dodajStavku(Request $request)
    {
        $brojNarudzbenice = $request->input('brojNarudzbenice');
        $narudzbenica = Narudzbenica::findOrFail($brojNarudzbenice);
        $proizvod = Proizvod::findOrFail($request->proizvod_id);
        
        // $kolicina = $request->kolicina;

        // $stavka = $narudzbenica->kreirajStavku($proizvod, $kolicina);

         // Provera da li je pronađen proizvod
    if ($proizvod) {
        // Ako postoji proizvod, možete nastaviti sa kreiranjem stavke
        $kolicina = $request->kolicina;
        $stavka = $narudzbenica->kreirajStavku($proizvod, $kolicina, $brojNarudzbenice);

        $this->dajUkupanIznos($brojNarudzbenice);

        // Uspesno zavrsena akcija
        return response()->json(['message' => 'Stavka uspesno dodata.']);
    } else {
        // Ako proizvod nije pronađen, vratite grešku
        return response()->json(['message' => 'Proizvod nije pronađen.'], 404);
    }
        // $narudzbenica->dodajUKolekciju($stavka);

    }

    public function zapamtiUnos(Request $request)
    {
        // Pretpostavka: Postoji kontroler sa svojstvom $brojNarudzbenice koje sadrži ID narudžbenice
        $brojNarudzbenice = $request->input('brojNarudzbenice');
         $narudzbenica = Narudzbenica::findOrFail($brojNarudzbenice);

        // Pokrećemo transakciju
        $this->dbBroker->pokreniDBTransakciju();

        if ($narudzbenica) {
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


    public function pronadjiNarudzbenicu(Request $request)
    {
        $brojNarudzbenice = $request->input('brojNarudzbenice');
        $narudzbenica = $this->dbBroker->pronadjiNarudzbenicu($brojNarudzbenice);

        // Provera da li je narudžbenica pronađena
        if ($narudzbenica) {
            $narudzbenica = Narudzbenica::with('stavke')->find($brojNarudzbenice); //da bih u odg dobila i sve stavke
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
        $brojNarudzbenice = $request->input('brojNarudzbenice');

        $narudzbenica = Narudzbenica::where('id', $brojNarudzbenice)->first();
        

        if ($narudzbenica) {
            $narudzbenica->obrisi($redniBroj);
            $this->dajUkupanIznos($brojNarudzbenice);

            return response()->json(['message' => 'Uspešno obrisana stavka.']);

        }else{
            return response()->json(['message' => 'greska']);
        }
    }

    public function izmeni(Request $request)
    {
        $redniBroj = $request->input('id');
        $brojNarudzbenice = $request->input('brojNarudzbenice');
        $novaKolicina = $request->input('novaKolicina');

        $narudzbenica = Narudzbenica::where('id', $brojNarudzbenice)->first();
        // $stavkaNarudzbenice = $narudzbenica->stavke()->where('id', $redniBroj)->first();

        if ($narudzbenica) {
            $narudzbenica->izmeni($redniBroj, $novaKolicina);
            $this->dajUkupanIznos($brojNarudzbenice);

            return response()->json(['message' => 'Uspešno izmenjena stavka.']);
        }else{
            return response()->json(['message' => 'greska']);
        }
    }
    public function obrisiNarudzbenicu(Request $request)
    {
        $brojNarudzbenice = $request->input('brojNarudzbenice');
        $this->dbBroker->pokreniDBTransakciju();

    try {
        // Brisanje narudžbenice
        $ret = $this->dbBroker->obrisiNarudzbenicu($brojNarudzbenice);

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

    public function dajUkupanIznos($brojNarudzbenice)
    {
        // $brojNarudzbenice = $request->input('brojNarudzbenice');
        $narudzbenica = Narudzbenica::where('id', $brojNarudzbenice)->first();

        $ukupanIznos = $narudzbenica->dajUkupanIznos();
        $narudzbenica->ukupno = $ukupanIznos;
        $narudzbenica->save();
    
        return response()->json(['ukupan_iznos' => $ukupanIznos]);
    }

    

    
}
