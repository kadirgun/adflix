<?php

namespace App\Enums;

enum ClickStatus: int {
  case Pending = 0;
  case Approved = 1;
  case Rejected = 2;

  public static function labels(){
    return [
      self::Pending => 'Pending',
      self::Approved => 'Approved',
      self::Rejected => 'Rejected',
    ];
  }
}