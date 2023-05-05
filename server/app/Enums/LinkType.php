<?php

namespace App\Enums;

enum LinkType: int {
  case Url = 1;
  case File = 2;
  case Video = 3;

  public static function labels(){
    return [
      self::Url => 'Url',
      self::File => 'File',
      self::Video => 'Video',
    ];
  }
}