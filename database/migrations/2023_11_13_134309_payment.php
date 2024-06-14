<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payment', function (Blueprint $table) {
            $table->string('numero_payment', 10)->primary();
            $table->string('nif', 20)->nullable();
            $table->string('numero_marche', 20)->nullable();
            $table->string('compte_exp', 20)->nullable();
            $table->string('compte_dest', 20)->nullable();
            $table->string('montant', 30)->nullable();
            $table->string('banque', 30)->nullable();
            $table->integer('code_etablisement')->nullable();
            $table->integer('code_guichet')->nullable();
            $table->string('RIB', 20)->nullable();
            $table->text('motif')->nullable();
            $table->timestamp('date_payment')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment');
    }
};
