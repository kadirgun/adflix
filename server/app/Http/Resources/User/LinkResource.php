<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LinkResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'key' => $this->key,
            'name' => $this->name,
            'favicon' => $this->favicon,
            'domain' => $this->domain,
            'type' => $this->type,
            'target' => $this->target,
            'password' => $this->password,
            'earnings' => $this->earnings,
            'clicks' => $this->clicks,
            'cpm' => $this->cpm,
            'excludes' => $this->excludes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
