<?php

namespace App\Enums;

enum UserStatus: int {
  case Active = 1;
  case Suspended = 2;

  public static function labels(){
    return [
      self::Active => 'Active',
      self::Suspended => 'Suspended',
    ];
  }
}