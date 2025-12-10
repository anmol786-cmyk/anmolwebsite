"use client";

// React and Next Imports
import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

// Utility Imports
import { Menu, ArrowRightSquare } from "lucide-react";
import { cn } from "@/lib/utils";

// Component Imports
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import { mainMenu, contentMenu } from "@/menu.config";
import { siteConfig } from "@/site.config";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 border w-10 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader>
          <SheetTitle className="text-left">
            <MobileLink
              href="/"
              className="flex items-center font-heading text-xl font-bold text-primary-950 dark:text-primary-50"
              onOpenChange={setOpen}
            >
              <ArrowRightSquare className="mr-2 h-4 w-4 text-secondary-500" />
              <span>{siteConfig.site_name}</span>
            </MobileLink>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <h3 className="mt-6 font-heading text-lg font-semibold text-primary-900 dark:text-primary-100">Menu</h3>
            <Separator className="bg-secondary-500/20" />
            {Object.entries(mainMenu).map(([key, href]) => (
              <MobileLink key={key} href={href} onOpenChange={setOpen} className="text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </MobileLink>
            ))}
            <h3 className="pt-6 font-heading text-lg font-semibold text-primary-900 dark:text-primary-100">Blog Menu</h3>
            <Separator className="bg-secondary-500/20" />
            {Object.entries(contentMenu).map(([key, href]) => (
              <MobileLink key={key} href={href} onOpenChange={setOpen} className="text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </MobileLink>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn("text-lg", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
