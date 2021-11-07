<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class DirectMessage extends Model
{
    use UUID, HasFactory;

    protected $table = 'direct_messages';

    protected $fillables = [
        'from_user',
        'to_user',
        'content'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function setCreatedAt($value)
    {
        $this->attributes['created_at'] = Carbon::createFromTimestamp($this->attributes['created_at'])->toDateString();
    }
}
