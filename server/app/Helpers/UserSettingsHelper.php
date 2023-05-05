<?php

namespace App\Helpers;

use App\Enums\AdsType;

class UserSettingsHelper {
  public static function parse($settings) {
    $settings = (object) $settings;

    if (isset($settings->excludes)) {
      $settings->excludes = array_unique($settings->excludes);
      $settings->excludes = array_map(function($exclude) {
        return AdsType::tryFrom(intval($exclude));
      }, $settings->excludes);
      $settings->excludes = array_filter($settings->excludes, function($exclude) {
        return $exclude !== null;
      });
    }

    return $settings;
  }
}
