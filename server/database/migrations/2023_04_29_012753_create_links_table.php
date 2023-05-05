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
        Schema::create('links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('key')->unique()->index();
            $table->tinyInteger('type')->default(1);
            $table->string('target');
            $table->string('password')->nullable();
            $table->decimal('earnings', 10, 4)->default(0);
            $table->integer('clicks')->default(0);
            $table->string('excludes')->default('[]');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('links');
    }
};
