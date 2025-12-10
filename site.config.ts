type SiteConfig = {
  site_domain: string;
  site_name: string;
  site_description: string;
  site_tagline?: string;
};

export const siteConfig: SiteConfig = {
  site_name: "Anmol Sweets & Restaurant",
  site_description: "Experience the authentic flavors of Pakistan & India in Stockholm. Famous for our Halwa Puri, fresh Mithai, and traditional curries.",
  site_domain: process.env.NEXT_PUBLIC_SITE_URL || "https://anmolsweets.se",
  site_tagline: "Share the Sweetness",
};
