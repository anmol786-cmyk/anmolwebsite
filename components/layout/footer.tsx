import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { siteConfig } from '@/site.config';
import { restaurantConfig } from '@/config/restaurant.config';
import { brandConfig } from '@/config/brand.config';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock, Youtube, ExternalLink } from 'lucide-react';
import { getSiteSettings } from '@/lib/site-settings';
import { getOnSaleProducts } from '@/lib/woocommerce/products-direct';

export async function Footer() {
  const settings = await getSiteSettings();
  const siteName = settings?.site?.name || siteConfig.site_name;
  const siteDesc = settings?.site?.description || siteConfig.site_description;

  // Use WooCommerce store address if available, otherwise fallback to config
  const address = settings?.woocommerce?.store_address;
  const displayAddress = address?.address_1
    ? `${address.address_1}, ${address.city}, ${address.postcode}`
    : `${restaurantConfig.address.street}, ${restaurantConfig.address.city}, ${restaurantConfig.address.state} ${restaurantConfig.address.postcode}`;

  const saleProducts = await getOnSaleProducts(3);

  return (
    <footer className="w-full bg-background border-t border-border/10 pt-16 pb-8">
      <div className="w-full px-5 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-6 mb-16">
          {/* Left Column: Brand Info */}
          <div className="md:col-span-12 lg:col-span-3 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3">
              {/* Logo */}
              <div className="relative h-12 w-12 flex-shrink-0">
                <Image
                  src="https://anmolsweets.se/wp-content/uploads/2021/01/logo.png"
                  alt="Anmol Sweets"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Brand Name */}
              <div className="flex flex-col justify-center">
                <h3 className="font-heading text-lg font-bold uppercase tracking-[0.15em] leading-none">Anmol Sweets</h3>
                <span className="font-heading text-[0.8rem] text-primary uppercase tracking-[0.37em] leading-[1.0] font-medium">& Restaurant</span>
              </div>
            </Link>

            <div className="space-y-4 text-xs text-muted-foreground leading-relaxed">
              <div>
                <p>{restaurantConfig.address.street}</p>
                <p>{restaurantConfig.address.postcode} . {restaurantConfig.address.city} . {restaurantConfig.address.country}</p>
              </div>

              <div>
                <p>T. {restaurantConfig.phone}</p>
                <p>{restaurantConfig.email}</p>
              </div>
            </div>
          </div>

          {/* Column 2: Reviews */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest mb-4 text-foreground">Rate Us</h4>
            <div className="flex flex-col gap-3 items-start">
              {/* Google Reviews */}
              <a
                href={brandConfig.contact.googleBusinessProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="https://anmolsweets.se/wp-content/uploads/2025/01/Review-us-on-Google.png"
                  alt="Review us on Google"
                  width={112}
                  height={40}
                  className="h-auto w-28 object-contain"
                />
              </a>

              {/* TripAdvisor */}
              <a
                href="https://www.tripadvisor.com/Restaurant_Review-g189852-d19905368-Reviews-Anmol_Sweets_Restaurant-Stockholm.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="https://anmolsweets.se/wp-content/uploads/2025/01/TripAdvisor-Write-A-Review-www.tripadvisor.com_UserReviewEdit-d19905368_m68676.png"
                  alt="Review us on TripAdvisor"
                  width={112}
                  height={40}
                  className="h-auto w-28 object-contain"
                />
              </a>
            </div>
          </div>

          {/* Column 3: Products on Sale */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest mb-4 text-foreground">On Sale</h4>
            <div className="space-y-3">
              {saleProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/product/${product.slug}`}
                  className="flex gap-3 group items-start"
                >
                  <div className="relative w-10 h-10 rounded-sm overflow-hidden bg-muted flex-shrink-0 border border-border/50">
                    {product.images && product.images[0] ? (
                      <Image
                        src={product.images[0].src}
                        alt={product.images[0].alt || product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="40px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[8px] text-muted-foreground">
                        No Img
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <h5 className="text-xs font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1 truncate">
                      {product.name}
                    </h5>
                    <div
                      className="text-[10px] text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: product.price_html || '' }}
                    />
                  </div>
                </Link>
              ))}
              {saleProducts.length === 0 && (
                <p className="text-xs text-muted-foreground">No sale items currently.</p>
              )}
            </div>
          </div>

          {/* Column 4: Links */}
          <div className="md:col-span-4 lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8">
            {/* Places */}
            <div>
              <h4 className="font-heading text-xs font-bold uppercase tracking-widest mb-4 text-foreground">Places</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>Spånga - Stockholm</li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="font-heading text-xs font-bold uppercase tracking-widest mb-4 text-foreground">Follow Us</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {brandConfig.social.instagram && (
                  <li>
                    <Link href={brandConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                      <Instagram className="h-3 w-3" />
                      Instagram
                    </Link>
                  </li>
                )}
                {brandConfig.social.facebook && (
                  <li>
                    <Link href={brandConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                      <Facebook className="h-3 w-3" />
                      Facebook
                    </Link>
                  </li>
                )}
                {brandConfig.social.tiktok && (
                  <li>
                    <Link href={brandConfig.social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                      TikTok
                    </Link>
                  </li>
                )}
                {brandConfig.social.youtube && (
                  <li>
                    <Link href={brandConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                      <Youtube className="h-3 w-3" />
                      YouTube
                    </Link>
                  </li>
                )}
                {brandConfig.social.twitter && (
                  <li>
                    <Link href={brandConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                      <Twitter className="h-3 w-3" />
                      X (Twitter)
                    </Link>
                  </li>
                )}
                {brandConfig.contact.googleBusinessProfile && (
                  <li>
                    <Link href={brandConfig.contact.googleBusinessProfile} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                      <ExternalLink className="h-3 w-3" />
                      Google Business
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            {/* Useful Links */}
            <div>
              <h4 className="font-heading text-xs font-bold uppercase tracking-widest mb-4 text-foreground">Useful Links</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <Link href="/privacy-policy#privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/privacy-policy#gdpr" className="hover:text-primary transition-colors">GDPR</Link>
                </li>
                <li>
                  <Link href="/privacy-policy#returns" className="hover:text-primary transition-colors">Returns & Refunds</Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-primary transition-colors">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/10 pt-6 flex flex-col items-center justify-center text-[10px] text-muted-foreground/60 uppercase tracking-widest font-medium">
          <p>© {new Date().getFullYear()} Anmol Sweets & Restaurant. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
