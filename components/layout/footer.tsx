import Link from 'next/link';
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: 'About S.C.E.A.R.',
      links: [
        { label: 'Our Mission', href: '/about#mission' },
        { label: 'History', href: '/about#history' },
        { label: 'Team', href: '/about#team' },
        { label: 'Testimonials', href: '/about#testimonials' },
      ],
    },
    {
      title: 'Members',
      links: [
        { label: 'Join Us', href: '/join' },
        { label: 'Member Benefits', href: '/join#benefits' },
        { label: 'Login', href: '/login' },
        { label: 'Resources', href: '/resources' },
      ],
    },
    {
      title: 'Events',
      links: [
        { label: 'Calendar', href: '/events' },
        { label: 'Past Events', href: '/events/past' },
        { label: 'Host an Event', href: '/events/host' },
        { label: 'Galleries', href: '/gallery' },
      ],
    },
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 border-2 border-primary rounded-full flex items-center justify-center">
                <span className="font-display text-lg font-bold">SR</span>
              </div>
              <span className="font-display text-xl font-bold">S.C.E.A.R.</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Societas civilis exercitus auxiliorumque Romanorum - Dedicated to the authentic reenactment and education of Roman military history.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Facebook className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://youtube.com" target="_blank" aria-label="YouTube">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Youtube className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Twitter className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-display text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-border my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} S.C.E.A.R. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;