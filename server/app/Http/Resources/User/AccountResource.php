<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AccountResource extends JsonResource
{
    /**
     * @var \App\Models\User $user
     */

    protected $user;

    public function __construct($resource)
    {
        parent::__construct($resource);
        $this->user = $resource;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $this->user->setHidden([...$this->user->getHidden(), 'id', 'email_verified_at', 'status', 'updated_at']);
        
        return $this->user->toArray();
    }
}
