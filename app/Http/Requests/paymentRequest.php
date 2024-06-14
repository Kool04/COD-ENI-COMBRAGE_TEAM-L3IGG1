<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class paymentRequest extends FormRequest
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
        if (request()->isMethod('post')){
            return [
                'numero_payment' =>'required|string|',
                'nif' =>'string',
                'numero_marche' =>'string',
                'compte_exp' =>'required|string|',
                'compte_dest' =>'required|string|',
                'montant' =>'required|string|',
                'banque' =>'required|string|',
                'code_etablisement' =>'required|string|',
                'code_guichet' =>'required|string|',
                'RIB' =>'required|string|',
                'motif' =>'required|string|',
            ];
        }else{
            return[
                'numero_payment' =>'required|string|',
                'compte_exp' =>'required|string|',
                'compte_dest' =>'required|string|',
                'montant' =>'required|string|',
            ];
        }

    }

    public function messages()
    {
        if (request()->isMethod('post')){
            return [
                'numero_payment' =>'numero obligatoire',
                'nif' =>'nif obligatoire',
                'numero_marche' =>'numero marche obligatoire',
                'compte_exp' =>'compte expediteur obligatoire',
                'compte_dest' =>'compte destinataire obligatoire',
                'montant' =>'montant obligatoire',
                'banque' =>'banque obligatoire',
                'code_etablisement' =>'code etablissement obligatoire',
                'code_guichet' =>'code guichet obligatoire',
                'RIB' =>'RIB obligatoire',
                'motif' =>'motif obligatoire',
            ];
        }else{
            return[
                'numero_payment' =>'numero obligatoire',
                'compte_exp' =>'compte expediteur obligatoire',
                'compte_dest' =>'compte destinataire obligatoire',
                'montant' =>'montant obligatoire',

            ];
        }
    }
}
