<?php

namespace App\Enums;

enum ClickStatus: int {
  case Pending = 0;
  case Completed = 1;
  case Rejected = 2;

  public static function labels(){
    return [
      self::Pending => 'Pending',
      self::Completed => 'Completed',
      self::Rejected => 'Rejected',
    ];
  }
}