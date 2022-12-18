import{_ as n,W as e,X as a,a0 as s}from"./framework-8a0a3771.js";const i={},r=s(`<p>当访问以 <strong>Nginx</strong> 为 web 服务器，<strong>PHP</strong> 为脚本的网站时，默认会在 header 头中显示 <strong>Nginx</strong> 和 <strong>PHP</strong> 的版本号，这些暴露出来的信息在一定程度上存在安全隐患（当黑客攻击服务器时，会收集服务器相关信息，比如软件的版本等，然后利用这些信息，挖掘相关漏洞来对服务进行攻击），所以在一定程度上隐藏这些信息是十分有必要的。</p><p>通过请求可以获取如下信息：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-i</span> http://test.it

HTTP/1.1 <span class="token number">200</span> OK
Server: nginx/1.15.8
<span class="token punctuation">..</span>.
X-Powered-By: PHP/7.2.19
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> Nginx</h2><h3 id="_1、修改-nginx-conf-配置文件" tabindex="-1"><a class="header-anchor" href="#_1、修改-nginx-conf-配置文件" aria-hidden="true">#</a> 1、修改 nginx.conf 配置文件</h3><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token comment"># ...省略一些配置</span>
    <span class="token directive"><span class="token keyword">server_tokens</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、重启-nginx" tabindex="-1"><a class="header-anchor" href="#_2、重启-nginx" aria-hidden="true">#</a> 2、重启 Nginx</h3><blockquote><p>nginx -s reload</p></blockquote><h2 id="php" tabindex="-1"><a class="header-anchor" href="#php" aria-hidden="true">#</a> PHP</h2><h3 id="_1、修改-php-ini-配置文件" tabindex="-1"><a class="header-anchor" href="#_1、修改-php-ini-配置文件" aria-hidden="true">#</a> 1、修改 php.ini 配置文件</h3><blockquote><p>expose_php = Off # 原配置为 On</p></blockquote><h3 id="_2、重启-nginx-1" tabindex="-1"><a class="header-anchor" href="#_2、重启-nginx-1" aria-hidden="true">#</a> 2、重启 Nginx</h3><blockquote><p>nginx -s reload</p></blockquote><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>再次访问服务器，请求返回的 header 将会隐藏 Nginx 的版本信息和 PHP 脚本信息。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-i</span> http://test.it

HTTP/1.1 <span class="token number">200</span> OK
Server: nginx
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),d=[r];function t(c,l){return e(),a("div",null,d)}const p=n(i,[["render",t],["__file","隐藏Nginx和PHP版本号.html.vue"]]);export{p as default};
