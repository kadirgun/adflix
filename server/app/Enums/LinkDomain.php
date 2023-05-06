<?php

namespace App\Enums;

class LinkDomain {
  public static function list(){
    return [
      'bwk.pw' => 1,
    ];
  }

  public static function getID($domain){
    $list = self::list();
    return $list[$domain] ?? null;
  }

  public static function getDomain($id){
    $list = self::list();
    return array_search($id, $list);
  }
}