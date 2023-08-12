import type { Site, SocialObjects } from "./types";


export const SITE = {
  website: "https://mteam88.github.io",
  author: "Matthew (mteam88)",
  desc: "I'm a MEV searcher, blockchain enthusiast, and CS student. I write about MEV, crypto, and leak too much alpha. I love visitors!",
  title: "mteam88's Writings",
  ogImage: "fur-orange.jpg",
  lightAndDarkMode: true,
  postPerPage: 99,
};

export const LOCALE = ["en-EN"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: true,
  svg: true,
  width: 64,
  height: 64,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/mteam88",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/mteamisloading",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
  {
    name: "Discord",
    href: "https://discordapp.com/users/751534981733679166",
    linkTitle: `${SITE.title} on Discord`,
    active: true,
  },
  {
    name: "Telegram",
    href: "https://t.me/mteam888",
    linkTitle: `${SITE.title} on Telegram`,
    active: true,
  }
];