<?php

namespace App\Helpers;

use DiDom\Document;
use Illuminate\Support\Facades\Http;

class ScrapeHelper {
  public static $userAgent = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

  public static function fetch(string $url) {
    $data = (object)[
      'title' => null,
    ];

    try {
      $response = Http::withUserAgent(self::$userAgent)->timeout(5)->get($url);

      if ($response->failed()) {
        return $data;
      }

      $html = $response->body();
      $document = new Document($html);

      $data->title = $document->find('title')[0]->text();
    } catch (\Throwable $th) {
      return $data;
    }

    return $data;
  }
}
