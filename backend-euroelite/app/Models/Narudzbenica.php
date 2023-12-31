<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Narudzbenica extends Model
{
    protected $fillable = ['redniBroj','nacin_otpreme_id', 'datum', 'rok', 'ziro_racun', 'ukupno', 'dobavljac_id'];

    public function nacinOtpreme()
    {
        return $this->belongsTo(NacinOtpreme::class);
    }

    public function dobavljac()
    {
        return $this->belongsTo(Dobavljac::class);
    }

    public function stavke()
    {
        return $this->hasMany(StavkaNarudzbenice::class);
    }

    

    
//metode
    public function izmeni($redniBroj, $novaKolicina)
    {
        $stavka = $this->stavke->firstWhere('id', $redniBroj);
        
        if ($stavka) {
            $stavka->kolicina = $novaKolicina;

            $stavka->iznos = $stavka->izracunajIznosStavke();

            $stavka->save();
        }
        return $stavka->iznos;
    }

    public function obrisi($redniBroj)
    {
        $stavka = $this->stavke->firstWhere('id', $redniBroj);
        
        if ($stavka) {
            $stavka->delete();
            // Uzimamo narudzbenicu povezanu sa stavkom
            $narudzbenica = $stavka->narudzbenica;

            // Ažuriramo redne brojeve stavki nakon brisanja
            $narudzbenica->azurirajRedneBrojeve();
            $this->dajUkupanIznos();
        }           
        return response()->json(['message' => 'Stavka uspešno obrisana.']);
    }

    public function postaviNacinOtpreme($nacinOtpremeId)
    {
        $nacinOtpreme = NacinOtpreme::find($nacinOtpremeId);
        
        if ($nacinOtpreme) {
            $this->nacinOtpreme()->associate($nacinOtpreme);
            $this->save();
        }
    }

    public function postaviZiroRacun($ziroRacun)
    {
        $this->ziro_racun = $ziroRacun;
        $this->save();
    }


    public function postaviDatumNar($datum)
    {
        $this->datum = $datum;
        $this->save();
    }

    public function postaviRokIsporuke($rokIsporuke)
    {
        $this->rok = $rokIsporuke;
        $this->save();
    }

    public function postaviDobavljaca($dobavljac)
    {
        if ($dobavljac) {
            $this->dobavljac()->associate($dobavljac);
            $this->save();
        } else {
            // Obrada greške, dobavljač ne sme biti null
        }
    }

    public function dodajStavku($proizvod, $kolicina, $iznos, $brojNarudzbenice) {
        $this->stavke()->create([
            'proizvod_id' => $proizvod->id,
            'kolicina' => $kolicina,
            'iznos' => $iznos,
            'narudzbenica_id'=>$brojNarudzbenice
        ]);
    }

    public function dajUkupanIznos()
    {
        $ukupanIznos = 0.0;

        foreach ($this->stavke as $stavka) {
            $ukupanIznos += $stavka->iznos;
        }

        return $ukupanIznos;
    }

    public function dajNoviRedniBr()
    {
        // Pronađi poslednju stavku narudžbenice (ako postoji)
        $poslednjaStavka = $this->stavke()->latest('id')->first();

        if ($poslednjaStavka) {
            // Ako postoji poslednja stavka, uzmi njen redni broj i uvećaj za 1
            $noviRedniBroj = $poslednjaStavka->id + 1;
        } else {
            // Ako ne postoji nijedna stavka, postavi redni broj na 1
            $noviRedniBroj = 1;
        }

        $this->redniBroj = $noviRedniBroj;
        return $noviRedniBroj;
    }

    public function kreirajStavku(Proizvod $proizvod, $kolicina, $brojNarudzbenice)
    {
        $rb = $this->dajNoviRedniBr();
        // Kreiranje nove stavke narudžbenice
        $novaStavka = new StavkaNarudzbenice([
            'proizvod_id' => $proizvod->id,
            'kolicina' => $kolicina,
            'narudzbenica_id' => $brojNarudzbenice,
            'id'=>$rb
        ]);

        $novaStavka->save();
        $this->dodajUKolekciju($novaStavka);
        // Vraćanje nove stavke
        return $novaStavka;
    }

    public function dodajUKolekciju(StavkaNarudzbenice $stavka)
    {
        $this->stavke->push($stavka);
    }

    public function azurirajRedneBrojeve()
    {
        // Uzimamo sve stavke narudžbenice sortirane po rednom broju
        $stavke = $this->stavke->sortBy('id');

        // Postavljamo redne brojeve stavki po redu
        $redniBroj = 1;
        foreach ($stavke as $stavka) {
            $stavka->id = $redniBroj;
            $stavka->save();
            $redniBroj++;
        }
    }
}

