<?php

namespace App\Enums;

enum AdvertType: int {
  case Banner = 1;
  case VAST = 2;
  case Popunder = 3;

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
      self::Banner => 'Banner Ads',
      self::VAST => 'Vast Ads',
      self::Popunder => 'Popunder Ads'
    };
  }
}