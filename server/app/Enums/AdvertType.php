<?php

namespace App\Enums;

enum AdvertType: int {
  case Banner = 1;
  case VAST = 2;
  case Popunder = 3;
  case Direct = 4;
  case Software = 5;

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
      self::Popunder => 'Popunder Ads',
      self::Direct => 'Direct Link Ads',
      self::Software => 'Software Ads'
    };
  }
}