<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;
use App\Http\Requests\clientRequest;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Log;
//use Barryvdh\DomPDF\Facade as PDF;



class MarcheController extends Controller
{
    public function index()
    {
        $marches = DB::table('marche_public')->get();

        return response()->json([
            'results'=> $marches
        ],200);
    }

    public function indexClient($nif)
    {
        $nif = intval($nif);
        $marches = DB::table('marche_public')->where('nif_fournisseur', $nif)->get();
        return response()->json([
            'results'=> $marches
        ],200);

        if (!$marches) {
            return response()->json([
                'code' => 404,
                'message' => 'Le marché public avec le numéro ' . $nif . ' n\'existe pas.'

            ], 404);
        }

        return response()->json([
            'marches' => $marches
        ], 200);
    }


    public function show($numero)
    {
        $numero = intval($numero);

        $marches = DB::table('marche_public')->where('numero_marche', $numero)->get()->first();

        if (!$marches) {
            return response()->json([
                'code' => 404,
                'message' => 'Le marché public avec le numéro ' . $numero . ' n\'existe pas.'

            ], 404);
        }

        return response()->json([
            'marches' => $marches
        ], 200);
    }

    public function showpayment($numero)
    {
        $numero = intval($numero);

        $marches = DB::table('payment')->where('numero_payment', $numero)->get()->first();

        if (!$marches) {
            return response()->json([
                'code' => 404,
                'message' => 'Le marché public avec le numéro ' . $numero . ' n\'existe pas.'

            ], 404);
        }

        return response()->json([
            'marches' => $marches
        ], 200);
    }

    public function store(clientRequest $request)
    {
       try{
        $montant = $request->montant_marche;
        $pourcentage = ($request->type_marche === 'Marche payes par le comptable public') ? 0 : $montant * 0.08;
        $statut = ($request->type_marche === 'Marche payes par les bailleurds de Fond') ? 'non payé' : 'payé';
        $date_enregistrement = now();

        $dateSignature = Carbon::parse($request->date_signature);
        $dateApprobation = Carbon::parse($request->date_approbation);
        $dateNotification = Carbon::parse($request->date_notification);

        if ($dateSignature->isFuture() || $dateApprobation->isFuture() || $dateNotification->isFuture()) {
            return response()->json([
                'message' => "Les dates futures ne sont pas autorisées."
            ], 400);
        }
        DB::table('marche_public')->insert([
            'numero_marche' =>$request->numero_marche,
            'numero_convention'=>$request->numero_convention,
            'titulaire_marche' =>$request->titulaire_marche,
            'nature' =>$request->nature,
            'objet' =>$request->objet,
            'montant_marche' =>$request->montant_marche,
            'financement' =>$request->financement,
            'imputation_budgetaire' =>$request->imputation_budgetaire,
            'compte' =>$request->compte,
            'mode_passation' =>$request->mode_passation,
            'type_marche' =>$request->type_marche,
            'fournisseur' =>$request->fournisseur,
            'nom_fournisseur' =>$request->nom_fournisseur,
            'nif_fournisseur' => $request->nif_fournisseur,
            'lieu' =>$request->lieu,
            'date_signature' =>$request->date_signature,
            'date_approbation' =>$request ->date_approbation,
            'date_notification' =>$request->date_notification,
            'date_enregistrement' =>$date_enregistrement,
            'dure_validite' =>$request->dure_validite,
            'statut' =>$statut,
            'pourcentage' =>$pourcentage,
        ]);

        return response ()->json([
            'message'=>"Marche ajouter avec succes."
        ],200);

       }catch(\Exception $e){
        return response()->json([
            'message' => "Errrreurrrrr". $e->getMessage()
        ],500);
       }
    }

    public function modifier(clientRequest $request, $numero)
    {
        try{
            $numero = intval($numero);
            $marches = DB::table('marche_public')->where('numero_marche', $numero)->get()->first();

            if (!$marches) {
                return response()->json([
                    'message' => 'Le marché public avec le numéro ' . $numero . ' n\'existe pas.'

                ],404);
            }

            DB::table('marche_public')->where('numero_marche', $numero)->update([
                'numero_marche' =>$request->numero_marche,
                'numero_convention'=>$request->numero_convention,
                'titulaire_marche'=>$request->titulaire_marche,
                'nature' =>$request->nature,
                'objet' =>$request->objet,
                'montant_marche' =>$request->montant_marche,
                'financement' =>$request->financement,
                'mode_passation' =>$request->mode_passation,
                'type_marche' =>$request->type_marche,
                'fournisseur' =>$request->fournisseur,
                'nif_fournisseur' => $request->nif_fournisseur,
                'lieu' =>$request->lieu,
                'date_signature' =>$request->date_signature,
                'date_approbation' =>$request->date_approbation,
                'date_notification' =>$request->date_notification,
                'date_enregistrement' =>$request->date_enregistrement,
                'dure_validite' =>$request->dure_validite,
                'statut' =>$request->statut,
                'pourcentage' =>$request->pourcentage,
            ]);


           return response ()->json([
            'message'=>"Marche modifier avec succes."
           ],200);

        }catch(\Exception $e){
         return response()->json([
            'message' => "Errrreurrrrr"
        ],500);
        }
    }

    public function supprimer($numero){

        try {
            $numero = intval($numero);
            $marches = DB::table('marche_public')->where('numero_marche', $numero)->first();

            if (!$marches) {
                return response()->json([
                    'message' => 'Le marché public avec le numéro ' . $numero . ' n\'existe pas.'
                ], 404);
            }

            DB::table('marche_public')->where('numero_marche', $numero)->delete();

            return response()->json([
                'message' => "Marché supprimé avec succès."
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Erreur lors de la suppression du marché."
            ], 500);
        }
    }

    public function recupdf(){

    try {
        // Génère un PDF à partir du code HTML suivant
        $html = '<html><body><h1>Hello, world!</h1></body></html>';

        // Utilisez la facade PDF pour charger le HTML et générer le PDF
        $pdf = PDF::loadHtml($html, [
            'paper' => 'A4',
            'margin' => [10, 10, 10, 10],
            'font' => 'Helvetica',
        ]);

        // Enregistre le PDF dans un fichier ou renvoie-le en tant que réponse HTTP
        return $pdf->stream('hello_world.pdf');
    } catch (\Exception $e) {
        return response()->json([
            'message' => "Erreur lors de la génération du PDF : " . $e->getMessage(),
        ], 500);
    }
}

}

