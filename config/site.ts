export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Heart Disease Prediction",
  description: "A web application to predict heart disease risk based on user input.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Predict",
      href: "/predict",
    }
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Predict",
      href: "/predict",
    }
  ],
  links: {
    github: "https://github.com/FjrREPO",
    twitter: "https://x.com/ifajaarrr",
    docs: "#",
    discord: "#",
    sponsor: "https://github.com/FjrREPO",
  },
};
