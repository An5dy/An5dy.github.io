---
title: Laravel6 修改 User 模型命名空间
category: PHP
tag:
  - Laravel
  - Laravel6
article: true
timeline: true
---

Laravel6 默认 User 模型在 App\User 命名空间下，为了利于项目管理，故将 User 模型移动到 Models 目录下，需修改模型命名空间，即 App\\Models\\User 命名空间，移动 User 模型后，同时需要修改几处引用到原模型的文件。



## 修改 User 模型命名空间

修改 **app/Models/User.php** 文件
```php
<?php

// namespace App;
namespace App\Models;
```


## 修改 auth 配置文件

修改 **app/config/auth.php** 文件
```php
<?php
...
'providers' => [
        'user' => [
            'driver' => 'eloquent',
	    //'model' => App\User::class,
            'model' => App\Models\User::class,
        ]
    ],
...
```


## 修改 Register 控制器

修改 **app/Http/Controllers/Auth/RegisterController.php** 文件
```php
<?php

namespace App\Http\Controllers\Auth;

// use App\User;
use App\Models\User;
```
## 修改 UserFactory 模型工厂

修改 **database/factories/UserFactory.php** 文件
```php
<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

// use App\User;
use App\Models\User;
use Faker\Generator as Faker;
```
修改以上4处即可。