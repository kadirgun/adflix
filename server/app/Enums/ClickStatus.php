<?php

namespace App\Enums;

enum ClickStatus: int {
  case Pending = 0;
  case Success = 1;
  case Rejected = 2;

  public static function labels(){
    return [
      self::Pending => 'Pending',
      self::Success => 'Success',
      self::Rejected => 'Rejected',
    ];
  }
}