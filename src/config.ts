import type { Site, SocialObjects } from "./types";


export const SITE = {
  website: "",
  author: "Matthew (mteam88)",
  desc: "MEV alpha, blockchain insights, and CS fun",
  title: "mteam88",
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
  }
];