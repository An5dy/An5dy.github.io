import { searchPlugin } from "@vuepress/plugin-search";
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  // 多语言设置
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Andy's Home",
      description: "记录工作、生活和学习以及一些人生感悟。",
    },
  },

  // 主题设置
  theme,

  // 插件设置
  plugins: [
    // 搜索插件
    searchPlugin({
      // 多语言支持
      locales: {
        "/": {
          placeholder: "搜索...",
        }
      },
      // 热键支持
      hotKeys: ["command", "k"],
      // 最大推荐个数
      maxSuggestions: 8,
      // 排除首页
      isSearchable: (page) => page.path !== "/",
    })
  ],

  shouldPrefetch: false,
});
