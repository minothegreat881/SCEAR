"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Facebook, Instagram, Youtube, Twitter, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/history', label: 'History' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/join', label: 'Join Us' },
    { href: '/services', label: 'Our Services' },
    { href: '/events', label: 'Events' },
    { href: '/contact', label: 'Contact' },
  ];

  const activeLink = (href: string) => pathname === href;

  return (
    <>
      <header
        className={cn(
          'fixed w-full top-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/95 backdrop-blur-sm shadow-md py-2'
            : 'bg-transparent py-4'
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 border-2 border-primary rounded-full flex items-center justify-center">
              <span className="font-display text-lg font-bold">SR</span>
            </div>
            <span className="font-display text-xl font-bold hidden sm:inline-block">S.C.E.A.R.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink 
                        className={cn(
                          navigationMenuTriggerStyle(),
                          activeLink(link.href) && "bg-accent/20 text-accent-foreground"
                        )}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="flex items-center gap-4">
              <Link href="/admin/login" className="text-muted-foreground hover:text-primary transition-colors">
                <Shield className="h-5 w-5" />
              </Link>
              <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="https://youtube.com" target="_blank" aria-label="YouTube">
                <Youtube className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="lg:hidden"
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 bg-background/95 z-40 lg:hidden pt-20">
          <nav className="container mx-auto px-4 py-8">
            <ul className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={cn(
                      "text-xl font-display block py-2 border-b border-border",
                      activeLink(link.href) 
                        ? "text-primary border-primary" 
                        : "hover:text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/admin/login"
                  onClick={() => setMobileNavOpen(false)}
                  className="text-xl font-display block py-2 border-b border-border hover:text-primary"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
            
            <div className="flex items-center gap-6 mt-8 justify-center">
              <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="https://youtube.com" target="_blank" aria-label="YouTube">
                <Youtube className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;