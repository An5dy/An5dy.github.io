---
title: 部署 Laravel 和 Vue 前后端分离项目
category: Nginx
tag:
  - Nginx
article: true
timeline: true
---

## Nginx 配置

主要利用 Nginx 的反向代理功能，前后端项目通过代理到不同的端口号，来区分 Laravel 和 Vue 单页面项目。 

#### Nginx 配置文件

```nginx
server {
  listen 8282;# 后端端口号
  root /www/laravel/public;
  index index.php;
  server_name localhost;
  charset utf-8;

  add_header X-Frame-Options "SAMEORIGIN";
  add_header X-Content-Type-Options "nosniff";

  location / {
    try_files $uri $uri/ /index.php?$query_string;
  }

  location = /favicon.ico { access_log off; log_not_found off; }
  location = /robots.txt  { access_log off; log_not_found off; }

  # access_log  /var/log/nginx/nginx.zb-evaluation.access.log  main;
  error_log  /var/log/nginx/nginx.zb-evaluation.error.log warn;

  error_page 404 /index.php;

  location ~ \.php$ {
    fastcgi_pass        127.0.0.1:9000;
    fastcgi_buffers     16 16k;
    fastcgi_buffer_size 32k;
    include             fastcgi-php.conf;
    include             fastcgi_params;
  }
}
```

#### 部署 Vue 单页面项目

Nginx 配置文件

```nginx
server {
  listen 8181;
  root /www/zb-evaluation-front;
  index /wwww/dist/index.html;
  server_name localhost;

  location / {
    try_files $uri $uri/ @rewrites;
  }

  location @rewrites {
    rewrite ^(.+)$ /index.html last;
  }

  location ~* \.(?:ico|css|js|gif|jpe?g|png)$ {
    # Some basic cache-control for static files to be sent to the browser
    expires max;
    add_header Pragma public;
    add_header Cache-Control "public, must-revalidate, proxy-revalidate";
  }
}
```

#### 部署 Nginx 反向代理

分别代理 Laravel 和 Vue 项目，以端口来区分

```nginx
server {
  listen       80;
  server_name  域名.local;

  # gzip 相关配置
  # gzip on;
  # gzip_buffers 16 8k;
  # gzip_comp_level 6;
  # gzip_http_version 1.1;
  # gzip_min_length 256;
  # gzip_proxied any;
  # gzip_vary on;
  # gzip_types
  #   text/xml application/xml application/atom+xml application/rss+xml application/xhtml+xml image/svg+xml
  #   text/javascript application/javascript application/x-javascript
  #   text/x-json application/json application/x-web-app-manifest+json
  #   text/css text/plain text/x-component
  #   font/opentype application/x-font-ttf application/vnd.ms-fontobject
  #   image/x-icon;
  # gzip_disable "MSIE [1-6]\.(?!.*SV1)";

  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:8181;
  }

  location ~ ^/(api) {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:8282;
  }

  location ~ /\.(?!well-known).* {
    deny all;
  }
}
```

