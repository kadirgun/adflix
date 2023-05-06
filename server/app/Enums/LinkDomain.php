<?php

namespace App\Enums;

class LinkDomain {
  public static function list(){
    return [
      'bwk.pw' => 1,
      'bwk.fr' => 2,
      'bwk.io' => 3,
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

  public static function getDomains(){
    $domains = [];
    foreach (self::list() as $domain => $id) {
      $domains[] = [
        'id' => $id,
        'name' => $domain
      ];
    }

    return $domains;
  }
}