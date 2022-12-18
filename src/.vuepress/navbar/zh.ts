import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  { text: "首页", icon: "home", link: "/" },
  { 
    text: "代码笔记", 
    icon: "code", 
    link: "/codes/",
    activeMatch: "^/codes/$",
  },
  {
    text: "扩展包",
    icon: "folder",
    prefix: "/packages/",
    children: [
      {
        text: "Laravel",
        icon: "edit",
        link: "laravel/",
      },
      {
        text: "Golang",
        icon: "edit",
        link: "golang/",
      },
    ],
  },
  { text: "开源软件", icon: "software", link: "/software/" },
]);
