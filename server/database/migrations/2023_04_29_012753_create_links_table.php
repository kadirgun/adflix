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
            $table->string('name')->nullable();
            $table->integer('domain');
            $table->tinyInteger('type')->default(1);
            $table->string('target');
            $table->string('password')->nullable();
            $table->string('excluded_categories')->default('[]');
            $table->decimal('earnings', 10, 4)->default(0);
            $table->integer('clicks_count')->default(0);
            $table->decimal('cpm', 8, 2)->default(0);
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
