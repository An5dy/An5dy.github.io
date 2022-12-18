import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    {
      text: "文章列表",
      prefix: "posts/",
      children: "structure",
    },
  ],
  "/codes/": [
    "",
    {
      text: "PHP",
      prefix: "php/",
      children: "structure",
    },
    {
      text: "MySQL",
      prefix: "mysql/",
      children: "structure",
    },
  ],
  "/softwares/": [
    "",
    {
      text: "Nginx",
      prefix: "nginx/",
      children: "structure",
    }
  ],
});
