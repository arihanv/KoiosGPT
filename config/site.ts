export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "KoiosGPT",
  description:
    "Welcome to my first Next JS Website",
  mainNav: [
    {
      title: "Search",
      href: "/search",
    },
    {
      title: "Files",
      href: "/myfiles",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
