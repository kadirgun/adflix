<?php

namespace App\Enums;

enum DomainStatus: int {
  case Active = 1;
  case Inactive = 2;

  public static function labels(){
    return [
      self::Active => 'Active',
      self::Inactive => 'Inactive'
    ];
  }
}