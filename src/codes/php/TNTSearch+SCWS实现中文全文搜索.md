---
title: TNTSearch + SCWS 实现中文全文搜索
category: PHP
tag:
  - Lumen
  - SCWS
article: true
timeline: true
---



前段时间，我一直想给自己的博客加个全文搜索功能，用 ElasticSearch、Sphinx 等功能强大的全文搜索引擎总有种杀鸡焉用牛刀的感觉，正好在逛 [Laravel-China](https://learnku.com/laravel) 社区时，有大神推荐 [TNTSearch](http://tnt.studio/blog/solving-the-search-problem-with-laravel-and-tntsearch) 这个纯 PHP 编写的轻量级全文检索引擎，性能不错且安装便捷，非常符合我的需求。参考了 [《TNTSearch - PHP 实现的全文索引引擎》](https://learnku.com/articles/3702/full-text-indexing-engine-implemented-in-tntsearch-php)和[《轻量级全文检索引擎 TNTSearch 和中文分词》](https://learnku.com/articles/6207/lightweight-full-text-retrieval-engine-tntsearch-and-chinese-word-segmentation)等文章后，利用 Lumen + TNTSearch 实现了全文搜索功能。



## TNTSearch

因为用了 Lumen 这个 Laravel 微框架，所以可以使用官方提供的 Laravel Scout 驱动 [teamtnt/laravel-scout-tntsearch-driver](https://github.com/teamtnt/laravel-scout-tntsearch-driver)，当然前提是你已经安装了 [Scout](https://laravel.com/docs/5.8/scout) 驱动，但是该驱动对 Lumen 不能直接适用，需要修改一部分代码，同时 TNTSearch 默认的分词器对中文支持不够（以标点符号、特殊符号和空格为分隔符进行分词），为了解决这个问题，采用了 [SCWS](http://www.xunsearch.com/scws/) 这个纯 C 语言开发的分词系统来进行中文分词。



## Laravel Scout



### 1、安装扩展包

>composer require laravel/scout

Lumen 没有发布配置文件这个命令，所以需要修改 ScoutServiceProvider 这个服务提供者，我们可以新建一个适用于 Lumen 的服务提供者。
> php artisan make:provider LumenScoutServiceProvider

参考代码如下：
```php
use Laravel\Scout\EngineManager;
use Laravel\Scout\ScoutServiceProvider;
use Laravel\Scout\Console\FlushCommand;
use Laravel\Scout\Console\ImportCommand;

class LumenScoutServiceProvider extends ScoutServiceProvider
{
    protected $defer = true;

    public function register()
    {
        $this->app->singleton(EngineManager::class, function ($app) {
            return new EngineManager($app);
        });

        if ($this->app->runningInConsole()) {
            $this->commands([
                ImportCommand::class,
                FlushCommand::class,
            ]);
        }
    }

    public function provides()
    {
        return [EngineManager::class];
    }
}
```


### 2、发布配置文件

> cp ./vendor/laravel/scout/config/scout.php ./config/scout.php


### 3、注册服务提供者 bootstrap/app.php

>$app->register(App\Providers\LumenScoutServiceProvider::class);


## 安装 TNTSearch



### 1、安装扩展包

>composer require teamtnt/laravel-scout-tntsearch-driver


### 2、配置 config/scout.php

```php
'driver' => env('SCOUT_DRIVER', 'algolia'),// 设置默认驱动
.
.
.
'tntsearch' => [
        'storage'       => storage_path(),//必须有可写权限
        'fuzziness'     => env('TNTSEARCH_FUZZINESS', false),// 模糊匹配
        'fuzzy'         => [
            'prefix_length'     => 2,
            'max_expansions'    => 50,
            'distance'          => 2,
        ],
        'asYouType'     => false,
        'searchBoolean' => env('TNTSEARCH_BOOLEAN', false),
        'tokenizer'     => '',// 分词器
        // 禁止索引词语
        'stopwords'     => [
            '的',
            '了',
            '而是',
        ],

    ],
```


### 3、注册服务提供者 bootstrap/app.php

> $app->register(TeamTNT\Scout\TNTSearchScoutServiceProvider::class);



## SCWS 中文分词系统



### 简介

> SCWS 是 Simple Chinese Word Segmentation 的首字母缩写（即：简易中文分词系统）。
> 这是一套基于词频词典的机械式中文分词引擎，它能将一整段的中文文本基本正确地切分成词。 词是中文的最小语素单位，但在书写时并不像英语会在词之间用空格分开， 所以如何准确并快速分词一直是中文分词的攻关难点。
> SCWS 采用纯 C 语言开发，不依赖任何外部库函数，可直接使用动态链接库嵌入应用程序， 支持的中文编码包括 GBK、UTF-8 等。此外还提供了 PHP 扩展模块， 可在 PHP 中快速而方便地使用分词功能。
> 分词算法上并无太多创新成分，采用的是自己采集的词频词典，并辅以一定的专有名称，人名，地名， 数字年代等规则识别来达到基本分词，经小范围测试准确率在 90% ~ 95% 之间， 基本上能满足一些小型搜索引擎、关键字提取等场合运用。首次雏形版本发布于 2005 年底。
> SCWS 由 hightman 开发， 并以 BSD 许可协议开源发布，源码托管在 github。


### 安装

下载及安装在 [官网](http://www.xunsearch.com/scws/download.php) 有详细的文档，这里就不详细说明。



### 编写分词器



#### 1、编写分词类

```php
use Illuminate\Support\Str;

class Scws
{
    protected $scws;

    /**
     * Scws constructor.
     * @param array $config scws 配置文件，详情参考官网 php 代码
     */
    public function __construct(array $config)
    {
        $this->init($config);
    }

    /**
     * @use      [设置分词文本]
     * @Author   ze <846562014@qq.com>
     * @date     2019-06-21 16:57
     * @param string $text
     * @return $this
     */
    public function sendText(string $text): self
    {
        $this->scws->{Str::snake(__FUNCTION__)}($text);

        return $this;
    }

    protected function init(array $config)
    {
        $this->scws = scws_new();
        foreach ($config as $key => $value) {
            $this->scws->{'set_' . $key}($value);
        }
    }

    public function __call($name, $arguments)
    {
        return call_user_func_array([
            $this->scws,
            Str::snake($name),
        ], $arguments);
    }
}
```


#### 2、编写分词器

```php
use App\Extensions\Scws\Scws;

class ScwsTokenizer extends Tokenizers
{
    protected $scws;

    public function __construct()
    {
        $this->scws = new Scws('scws 配置文件');// 可以把 scws 注册到容器中
    }

    /**
     * @use      [获取分词]
     * @Author   ze  <846562014@qq.com>
     * @date     2019-07-17 11:04
     * @param string $text
     * @return array
     */
    public function getTokens(string $text): array
    {
        $this->scws->sendText($text);
        $tokens = [];
        while ($result = $this->scws->getResult()) {
            $tokens = array_merge($tokens, array_column($result, 'word'));
        }

        return $tokens;
    }

    public function getScws()
    {
        return $this->scws;
    }
}
```


#### 3、配置 config/scout.php

>'tokenizer'     => App\Extensions\TNTSearch\Tokenizers\ScwsTokenizer::class,


## 用法



#### 1、配置 Model

```php
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Post extends Model
{
    use Searchable;

    public $asYouType = true;

    /**
     * Get the indexable data array for the model.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        $array = $this->toArray();

        // Customize array...

        return $array;
    }
}
```


#### 2、同步数据到搜索服务

> php artisan scout:import App\\\Post
> 或
> php artisan tntsearch:import App\\\Post



#### 3、使用 Model 进行搜索

> Post::search('Bugs Bunny')->get();


## 参考

1. [《TNTSearch - PHP 实现的全文索引引擎》](https://learnku.com/articles/3702/full-text-indexing-engine-implemented-in-tntsearch-php)
2. [《轻量级全文检索引擎 TNTSearch 和中文分词》](https://learnku.com/articles/6207/lightweight-full-text-retrieval-engine-tntsearch-and-chinese-word-segmentation)
3. [《Solving the search problem with Laravel and TNTSearch》](http://tnt.studio/blog/solving-the-search-problem-with-laravel-and-tntsearch)