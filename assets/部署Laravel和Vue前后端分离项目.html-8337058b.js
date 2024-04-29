import{_ as n,W as s,X as a,a0 as e}from"./framework-8a0a3771.js";const i={},p=e(`<p>##Nginx 配置</p><p>主要利用 Nginx 的反向代理功能，前后端项目通过代理到不同的端口号，来区分 Laravel 和 Vue 单页面项目。</p><h4 id="nginx-配置文件" tabindex="-1"><a class="header-anchor" href="#nginx-配置文件" aria-hidden="true">#</a> Nginx 配置文件</h4><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">8282</span></span><span class="token punctuation">;</span><span class="token comment"># 后端端口号</span>
  <span class="token directive"><span class="token keyword">root</span> /www/laravel/public</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">index</span> index.php</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">charset</span> utf-8</span><span class="token punctuation">;</span>

  <span class="token directive"><span class="token keyword">add_header</span> X-Frame-Options <span class="token string">&quot;SAMEORIGIN&quot;</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">add_header</span> X-Content-Type-Options <span class="token string">&quot;nosniff&quot;</span></span><span class="token punctuation">;</span>

  <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.php?<span class="token variable">$query_string</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token directive"><span class="token keyword">location</span> = /favicon.ico</span> <span class="token punctuation">{</span> <span class="token directive"><span class="token keyword">access_log</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span> <span class="token directive"><span class="token keyword">log_not_found</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
  <span class="token directive"><span class="token keyword">location</span> = /robots.txt</span>  <span class="token punctuation">{</span> <span class="token directive"><span class="token keyword">access_log</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span> <span class="token directive"><span class="token keyword">log_not_found</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

  <span class="token comment"># access_log  /var/log/nginx/nginx.zb-evaluation.access.log  main;</span>
  <span class="token directive"><span class="token keyword">error_log</span>  /var/log/nginx/nginx.zb-evaluation.error.log warn</span><span class="token punctuation">;</span>

  <span class="token directive"><span class="token keyword">error_page</span> <span class="token number">404</span> /index.php</span><span class="token punctuation">;</span>

  <span class="token directive"><span class="token keyword">location</span> ~ \\.php$</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">fastcgi_pass</span>        127.0.0.1:9000</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">fastcgi_buffers</span>     <span class="token number">16</span> <span class="token number">16k</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">fastcgi_buffer_size</span> <span class="token number">32k</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">include</span>             fastcgi-php.conf</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">include</span>             fastcgi_params</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>####部署 Vue 单页面项目</p><p>Nginx 配置文件</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">8181</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">root</span> /www/zb-evaluation-front</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">index</span> /wwww/dist/index.html</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>

  <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ @rewrites</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token directive"><span class="token keyword">location</span> @rewrites</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">rewrite</span> ^(.+)$ /index.html last</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token directive"><span class="token keyword">location</span> ~* \\.(?:ico|css|js|gif|jpe?g|png)$</span> <span class="token punctuation">{</span>
    <span class="token comment"># Some basic cache-control for static files to be sent to the browser</span>
    <span class="token directive"><span class="token keyword">expires</span> max</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">add_header</span> Pragma public</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">add_header</span> Cache-Control <span class="token string">&quot;public, must-revalidate, proxy-revalidate&quot;</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>####部署 Nginx 反向代理</p><p>分别代理 Laravel 和 Vue 项目，以端口来区分</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span>  域名.local</span><span class="token punctuation">;</span>

  <span class="token comment"># gzip 相关配置</span>
  <span class="token comment"># gzip on;</span>
  <span class="token comment"># gzip_buffers 16 8k;</span>
  <span class="token comment"># gzip_comp_level 6;</span>
  <span class="token comment"># gzip_http_version 1.1;</span>
  <span class="token comment"># gzip_min_length 256;</span>
  <span class="token comment"># gzip_proxied any;</span>
  <span class="token comment"># gzip_vary on;</span>
  <span class="token comment"># gzip_types</span>
  <span class="token comment">#   text/xml application/xml application/atom+xml application/rss+xml application/xhtml+xml image/svg+xml</span>
  <span class="token comment">#   text/javascript application/javascript application/x-javascript</span>
  <span class="token comment">#   text/x-json application/json application/x-web-app-manifest+json</span>
  <span class="token comment">#   text/css text/plain text/x-component</span>
  <span class="token comment">#   font/opentype application/x-font-ttf application/vnd.ms-fontobject</span>
  <span class="token comment">#   image/x-icon;</span>
  <span class="token comment"># gzip_disable &quot;MSIE [1-6]\\.(?!.*SV1)&quot;;</span>

  <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_pass</span> http://127.0.0.1:8181</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token directive"><span class="token keyword">location</span> ~ ^/(api)</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_pass</span> http://127.0.0.1:8282</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token directive"><span class="token keyword">location</span> ~ /\\.(?!well-known).*</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">deny</span> all</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),t=[p];function c(l,o){return s(),a("div",null,t)}const r=n(i,[["render",c],["__file","部署Laravel和Vue前后端分离项目.html.vue"]]);export{r as default};
