---
title: 隐藏 Nginx 和 PHP 版本号
category: Nginx
tag:
  - Nginx
article: true
timeline: true
---



当访问以 **Nginx** 为 web 服务器，**PHP** 为脚本的网站时，默认会在 header 头中显示 **Nginx** 和 **PHP** 的版本号，这些暴露出来的信息在一定程度上存在安全隐患（当黑客攻击服务器时，会收集服务器相关信息，比如软件的版本等，然后利用这些信息，挖掘相关漏洞来对服务进行攻击），所以在一定程度上隐藏这些信息是十分有必要的。

通过请求可以获取如下信息：

```shell
curl -i http://test.it

HTTP/1.1 200 OK
Server: nginx/1.15.8
...
X-Powered-By: PHP/7.2.19
```



## Nginx

### 1、修改 nginx.conf 配置文件
```nginx
http {
    # ...省略一些配置
    server_tokens off;
  }
```



### 2、重启 Nginx

> nginx -s reload



## PHP

### 1、修改 php.ini 配置文件
> expose_php = Off # 原配置为 On



### 2、重启 Nginx

> nginx -s reload



## 总结

再次访问服务器，请求返回的 header 将会隐藏 Nginx 的版本信息和 PHP 脚本信息。
```shell
curl -i http://test.it

HTTP/1.1 200 OK
Server: nginx
...
```