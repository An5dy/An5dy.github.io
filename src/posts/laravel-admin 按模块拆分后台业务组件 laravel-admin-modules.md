---
title: laravel-admin 按模块拆分后台业务组件 laravel-admin-modules
category:
  - PHP
tag:
  - Laravel
  - Laravel-admin
article: true
timeline: true
---

## 场景
laravel-admin 是一个可以快速帮你构建后台管理的工具，它提供的页面组件和表单元素等功能，能帮助你使用很少的代码就实现功能完善的后台管理功能。但是当后台功能不断迭代，导致原本的 Admin 目录过于庞大，不同功能模块之间如果使用相同的 Model 会导致出现一些不必要的 bug（比如访问器、修改器等对字段的修改，导致不同模块之间数据不一致），基于以上问题，利用学习[《LX2 PHP 扩展包实战教程 - 从入门到发布》](https://learnku.com/courses/creating-package "《LX2 PHP 扩展包实战教程 - 从入门到发布》")期间写了 [an5dy/laravel-admin-modules](https://packagist.org/packages/an5dy/laravel-admin-modules "an5dy/laravel-admin-modules") 这个 laravel-admin 扩展包，能够实现简单地基于业务对后台进行模块拆分。
## 需求环境
- PHP >= 7.0.0
- laravel-admin >= 1.6

## 安装
```bash
composer require an5dy/laravel-admin-modules --dev -vvv
```
💡 建议安装在 dev 下，正式线不需要安装。

## 使用
### 首先新建一个模块
```bash
php admin:module:make {name}
```
- **name**：模块名

#### 模块初始目录结构
```bash
app/{模块名}
├── Controllers
├── Models
├── Providers
│   └── {模块名}ServiceProvider.php
└── routes.php
```
- **app/{模块名}**：目录用于存放相关模块文件。
- **app/{模块名}/Controllers**：目录用于存放模块控制器文件。
- **app/{模块名}/Models**：目录用于存放模块模型文件。
- **app/{模块名}/Providers**：目录用于存放模块服务提供者文件，{模块名}ServiceProvider.php 文件是当前模块的 laravel 服务提供者类，用于加载模块路由等功能，需手动注册到 config/app.php 配置文件中。
- **app/{模块名}/routes.php**：文件用于配置模块路由。

### 创建指定模块控制器类
```bash
php artisan admin:module:controller {module} {model} {--title=} {--stub= : Path to the custom stub file. } {--output}
```
- **module**：需创建控制器的模块名。
- **model**：当前模块 **Models** 目录下的模型名，可通过以下命令来生成。
> php artisan make:model App\\{模块名}\\Models\\{模型名}
- 其它参数与 laravel-admin 创建控制器 [admin:make](https://laravel-admin.org/docs/zh/1.x/quick-start "admin:make") 一致。

### 创建指定模块表单请求类
```bash
php artisan admin:module:request {module} {name}
```
- **module**：需创建表单请求类的模块名。
- **name**：表单请求类名称。

### 创建指定模块服务提供者类
```bash
php artisan admin:module:provider {module} {name}
```
- **module**：需创建服务提供者类的模块名。
- **name**：服务提供者类名称。

### 创建指定模块 **bootstrap.php** 配置文件
```bash
php artisan admin:module:bootstrap {module}
```
- **module**：需创建 bootstrap.php 的模块名。

#### 以上命令执行后的模块目录结构
```bash
app/{模块名}
├── Controllers
├── Middleware
│   └── ModuleBootstrap.php
├── Models
├── Providers
│   └── {模块名}ServiceProvider.php
├── bootstrap.php
└── routes.php
```
- **app/{模块名}/Middleware/ModuleBootstrap.php**：当前模块的 bootstrap.php 文件重载中间件，需配置在 {模块名}ServiceProvider.php 中，具体代码如下所示。
```php
<?php
  use App\{模块名}\Middleware\ModuleBootstrap;
	.
  .
  .
	class {模块名}ServiceProvider extends ServiceProvider
  {
    public function register()
    {
      app('router')->aliasMiddleware('admin.bootstrap', ModuleBootstrap::class);
    }
		.
		.
		.
}
```

- **app/{模块名}/bootstrap.php**：当前模块 bootstrap.php 文件，不受 laravel-admin 和其他模块的 bootstrap.php 影响，功能与 laravel-admin bootstrap.php 一致，具体参考[官网](https://laravel-admin.org/docs/zh/1.x/configuration#app/Admin/bootstrap.php)。
