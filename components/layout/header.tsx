import Link from 'next/link';
import Image from 'next/image';
import { UserNav } from '@/components/layout/user-nav';
import { CartIcon } from '@/components/cart/cart-icon';
import { WishlistIcon } from '@/components/wishlist/wishlist-icon';
import { SearchModal } from '@/components/search/search-modal';
import { MobileMenu } from '@/components/layout/mobile-menu';
import { MenuNavDropdown } from '@/components/layout/menu-nav-dropdown';
import { cn } from '@/lib/utils';
import { Phone, MapPin, MessageCircle } from 'lucide-react';
import { getSiteSettings } from '@/lib/site-settings';
import { getProductCategories } from '@/lib/woocommerce';
import { brandConfig } from '@/config/brand.config';
import { AiChatWidget, useAIChat } from '@/components/ai/ai-chat-widget';

interface HeaderProps {
  className?: string;
  categories?: any[];
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="group relative text-[0.70rem] xl:text-xs font-medium uppercase tracking-wider xl:tracking-widest text-foreground transition-colors hover:text-primary whitespace-nowrap"
  >
    {children}
    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
  </Link>
);

export function Header({ className, categories = [] }: HeaderProps) {
  // Use requested logo or fallback to settings
  const logoUrl = 'https://anmolsweets.se/wp-content/uploads/2021/01/logo.png';
  
  // Chat functionality
  const { isOpen, openChat, closeChat, ChatWidget } = useAIChat();

  return (
    <>
      <header className={cn("w-full bg-background/95 backdrop-blur-md sticky top-0 z-50 border-b border-border/10 transition-all duration-300 shadow-sm", className)}>
        <div className="w-full px-3 xl:px-5 py-[3px]">
          {/* Desktop Header Layout - Only show on XL screens (1280px+) */}
          <div className="hidden xl:flex flex-col gap-2">
            <div className="grid grid-cols-12 items-center h-24 gap-3">

              {/* Extreme Left: Location & AI Assistant */}
              <div className="col-span-1 flex justify-start gap-2">
                <a
                  href={brandConfig.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-full"
                  aria-label="Location"
                >
                  <MapPin className="h-5 w-5" />
                </a>
                <button
                  onClick={openChat}
                  className="text-foreground hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-full"
                  aria-label="AI Anmol Assistant"
                  title="AI Anmol Assistant"
                >
                  <MessageCircle className="h-5 w-5" />
                </button>
              </div>

              {/* Left Navigation - Spread Out */}
              <div className="col-span-4 flex justify-between items-center px-2">
                <NavLink href="/special-order">Catering</NavLink>
                <NavLink href="/lunch-buffet-in-stockholm">Lunch Buffet</NavLink>
                <NavLink href="/weekend-brunch-buffet">Weekend Brunch</NavLink>
                <MenuNavDropdown categories={categories} />
              </div>

              {/* Center: Logo & Brand */}
              <div className="col-span-2 flex flex-col items-center justify-center">
                <Link href="/" className="flex flex-col items-center group">
                  <div className="relative h-12 w-12 mb-1 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Image
                      src={logoUrl}
                      alt="Anmol Sweets"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-heading text-lg font-bold text-foreground uppercase tracking-[0.15em] leading-none group-hover:text-primary transition-colors">Anmol Sweets</span>
                    <span className="font-heading text-[0.8rem] text-primary uppercase tracking-[0.37em] leading-[1.0] mt-1">& Restaurant</span>
                  </div>
                </Link>
              </div>

              {/* Right Navigation - Spread Out */}
              <div className="col-span-4 flex justify-between items-center px-2">
                <NavLink href="/shop">Shop</NavLink>
                <NavLink href="/blog">Blog</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/contact">Contact</NavLink>
                <NavLink href="/bookings">Reservations</NavLink>
              </div>

              {/* Extreme Right: Shop/Cart/Wishlist */}
              <div className="col-span-1 flex justify-end items-center gap-3">
                <UserNav />
                <WishlistIcon />
                <CartIcon />
              </div>
            </div>

            {/* Search Bar Row */}
            <div className="pb-3">
              <div className="max-w-2xl mx-auto">
                <SearchModal />
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Header Layout - Show below XL (below 1280px) */}
          <div className="xl:hidden flex flex-col gap-3">
            <div className="flex h-20 items-center justify-between">
              {/* Mobile Menu & AI Assistant */}
              <div className="flex items-center gap-2">
                <MobileMenu />
                <button
                  onClick={openChat}
                  className="text-foreground hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-full"
                  aria-label="AI Anmol Assistant"
                  title="AI Anmol Assistant"
                >
                  <MessageCircle className="h-5 w-5" />
                </button>
              </div>

              {/* Center Logo - Symbol Only */}
              <Link href="/" className="flex items-center">
                <div className="relative h-12 w-12 transition-transform duration-300 active:scale-95">
                  <Image
                    src={logoUrl}
                    alt="Anmol Sweets"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>

              {/* Right Actions */}
              <div className="flex items-center gap-3">
                <WishlistIcon />
                <CartIcon />
              </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="pb-3">
              <SearchModal />
            </div>
          </div>
        </div>
      </header>
      
      {/* Chat Widget */}
      <ChatWidget />
    </>
  );
}
