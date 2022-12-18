import { hopeTheme } from "vuepress-theme-hope";
import { zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  // 当前网站部署到的域名
  hostname: "https://an5dy.github.io",

  // 设置夜间模式切换
  darkmode: "toggle",

  // 文章显示的默认作者
  author: {
    name: "An5dy",
    url: "https://an5dy.github.io",
  },

  // 设置字体
  iconAssets: "iconfont",

  // 设置 logo
  logo: "/logo.svg",

  // 设置导航栏上 git 导航
  repo: "An5dy/An5dy.github.io",

  docsDir: "docs",

  pageInfo: ["Author", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    medias: {
      Email: "mailto:846562014@qq.com",
      GitHub: "https://github.com/An5dy",
      Gmail: "mailto:zhangze846562014@gmail.com",
    },
  },

  locales: {
    "/": {
      // 导航栏
      navbar: zhNavbar,

      // 侧边栏
      sidebar: zhSidebar,

      footer: '使用 <a href="https://vuepress-theme-hope.github.io/v2/" target="_blank">VuePress Theme Hope</a> 主题',

      displayFooter: true,

      blog: {
        description: "活着就意味着必须要做点什么，请好好努力！",
        // intro: "/zh/intro.html",
      },

      // page meta
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },
  },

  plugins: {
    // 开启 blog 模块
    blog: true,

    // Disable features you don’t want here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imageLazyload: true,
      imageSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
  },
});
