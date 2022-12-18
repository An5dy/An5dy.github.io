---
title: 使用 Docker 部署 Nuxt.js 项目
category:
  - Docker
tag:
  - Ducker
  - Next.js
article: true
timeline: true
---

## Nuxt.js

[Nuxt.js](https://zh.nuxtjs.org/) 是 [Vue.js](https://cn.vuejs.org/) 的通用应用框架，采用服务器端渲染（SSR 渲染），使得基于 Vue 的单页 Web 应用 (single page web application，SPA) 也能够拥有良好的 SEO (Search Engine Optimization)支持。


## Docker

> Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的镜像中，然后发布到任何流行的 Linux或Windows 机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口。



## 使用 docker 部署 nuxt.js 项目

### 1、构建 node 镜像

> FROM node:alpine

为啥使用 **alpine** 版本？
> 相比于其他 Docker 镜像，它的容量非常小，仅仅只有 5 MB 左右（对比 Ubuntu 系列镜像接近 200 MB），且拥有非常友好的包管理机制。官方镜像来自 docker-alpine 项目。
> 目前 Docker 官方已开始推荐使用 Alpine 替代之前的 Ubuntu 做为基础镜像环境。这样会带来多个好处。包括镜像下载速度加快，镜像安全性提高，主机之间的切换更方便，占用更少磁盘空间等。



### 2、设置项目保存目录

> RUN mkdir -p /app/src



### 3、复制项目代码到镜像

> COPY ./src /app/src



### 4、指定命令执行的目录

> WORKDIR /app/src



### 5、设置 host

> ENV HOST 0.0.0.0



### 6、执行项目安装及编译

> RUN npm install
> RUN npm run build
> RUN npm cache clean --force



### 7、设置外部访问端口

> EXPOSE 3000



### 8、执行 nuxt 项目运行命令

> CMD ["npm", "start"]



## 完整的 Dockerfile 文件

```docker
FROM node:alpine

RUN mkdir -p /app/src
COPY ./src /app/src
WORKDIR /app/src

ENV HOST "0.0.0.0"

RUN sed -i "s/dl-cdn.alpinelinux.org/${ALPINE_REPOSITORIES}/g" /etc/apk/repositories

RUN apk add --no-cache make gcc g++ python

RUN npm install
RUN npm run build
RUN npm cache clean --force

RUN apk del make gcc g++ python

EXPOSE 3000
CMD ["npm", "start"]
```
当在项目中使用 sass 或者 scss 时，需依赖 python 环境，所以需要安装 python，当然在编译相关资源后，可以删除相应的依赖以减小镜像体积。



## 运行 Docker

### 1、构建镜像

> docker build -t nuxt-demo



### 2、启动容器

> docker run -dt -p 3000:3000 nuxt-demo



### 3、访问

打开浏览器，访问 127.0.0.1:3000



## 后记

- 1、可以用 [Docker Compose](https://docs.docker.com/compose/) 对容器进行编排，快速的部署多容器应用。
- 2、可以用 nginx 对容器进行代理，避免直接以端口的形式访问容器。