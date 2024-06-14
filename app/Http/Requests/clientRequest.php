<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class clientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

           if(request()->isMethod('post')){
            return[
                'numero_marche' =>'required',
                'nature' =>'required|string|',
                'objet' =>'required|string|',
                'montant_marche' =>'required|string|',
                'financement' =>'required|string|',
                'mode_passation' =>'required|string|',
                'type_marche' =>'required|string|',
                //'fournisseur' =>'required|string|',
                //'nif_fournisseur' =>'required',

                'dure_validite' =>'required',
                'statut' =>'required|string|',
            ];
           }else{
            return[
                'numero_marche' =>'required|string|',
                'nature' =>'required|string|',
                'objet' =>'required|string|',
                'montant_marche' =>'required|string|',
                'financement' =>'required|string|',
                'mode_passation' =>'required|string|',
                'type_marche' =>'required|string|',
                //'fournisseur' =>'required|string|',
                'date_approbation' =>'required|string|',
                'dure_validite' =>'required|string|',
            ];
           }
    }

    public function messages()
    {
        if(request()->isMethod('post')){
            return[
                'numero_marche' =>'Numero obligatoire',
                'nature' =>'Nature Obligatoire',
                'objet' =>'objet Obligatoire',
                'montant_marche' =>'montant obligatoire',
                'financement' =>'financement obligatoire',
                'mode_passation' =>'passation obligatoire',
                'type_marche' =>'type de marche obligatoire',
                //'fournisseur' =>'fournissuer obligatoire',
                'dure_validite' =>'duree de validite obligatoire',
            ];
           }else{
            return[
                'numero_marche' =>'Numero obligatoire',
                'nature' =>'Nature Obligatoire',
                'objet' =>'objet Obligatoire',
                'montant_marche' =>'montant obligatoire',
                'financement' =>'financement obligatoire',
                'mode_passation' =>'passation obligatoire',
                'type_marche' =>'type de marche obligatoire',
                //'fournisseur' =>'fournissuer obligatoire',
                'dure_validite' =>'duree de validite obligatoire',
            ];
           }
    }
}
