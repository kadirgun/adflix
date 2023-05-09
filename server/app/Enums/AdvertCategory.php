<?php

namespace App\Enums;

enum AdvertCategory: int {
  case Erotic = 1;
  case Gambling = 2;
  case Software = 3;

  public static function labels(){
    $labels = [];
    foreach (self::cases() as $case) {
      $labels[] = [
        'id' => $case->value,
        'label' => self::label($case)
      ];
    }

    return $labels;
  }

  public static function label($value){
    return match($value){
      self::Erotic => 'Erotic Ads',
      self::Gambling => 'Gambling Ads',
      self::Software => 'Software Ads'
    };
  }
}