<?php

namespace App\Enums;

enum LinkType: int {
  case Url = 1;
  case File = 2;
  case Video = 3;
}