import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  { text: "博客首页", icon: "home", link: "/" },
  { 
    text: "代码笔记", 
    icon: "code", 
    link: "/codes/",
    activeMatch: "^/codes/$",
  },
  {
    text: "常用扩展",
    icon: "folder",
    prefix: "/packages/",
    children: [
      {
        text: "Laravel",
        link: "laravel/",
      },
      {
        text: "Golang",
        link: "golang/",
      },
    ],
  },
  { 
    text: "开源软件", 
    icon: "software", 
    link: "/softwares/",
    activeMatch: "^/softwares/$",
  },
]);
