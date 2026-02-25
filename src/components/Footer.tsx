import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const footerLinks = {
  shop: [
    { label: 'Women', href: '/collections' },
    { label: 'Men', href: '/collections' },
    { label: 'Accessories', href: '/collections' },
    { label: 'New Arrivals', href: '/collections' },
  ],
  company: [
    { label: 'Our Story', href: '/atelier' },
    { label: 'Lookbook', href: '/lookbook' },
    { label: 'Atelier', href: '/atelier' },
    { label: 'Contact', href: '/contact' },
  ],
  support: [
    { label: 'FAQs', href: '#' },
    { label: 'Shipping', href: '#' },
    { label: 'Returns', href: '#' },
    { label: 'Size Guide', href: '#' },
  ],
};

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Create email body for newsletter subscription
    const emailBody = `
Newsletter Subscription Request

Email: ${email}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

Please add this email address to the Justy Fashion newsletter mailing list.
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:justyfashion1@gmail.com?subject=${encodeURIComponent('Newsletter Subscription - ' + email)}&body=${encodeURIComponent(emailBody)}`;

    // Open email client
    window.open(mailtoLink, '_blank');

    toast.success('Subscribed!', {
      description: 'Newsletter subscription email sent to justyfashion1@gmail.com',
    });

    setEmail('');
  };

  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="w-full px-4 sm:px-6 lg:px-12 py-12 lg:py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="Justy Fashion"
                className="h-10 w-auto object-contain"
              />
              <span className="font-display font-bold text-xl">JUSTY</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm text-sm leading-relaxed">
              Tailored. Timeless. Yours. African clothing at its finest, 
              crafted with precision and passion in Accra, Ghana.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="label-mono text-[#FF6B00] mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="label-mono text-[#FF6B00] mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4 className="label-mono text-[#FF6B00] mb-4">Support</h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="font-display font-bold text-lg mb-1">
                Join the List
              </h4>
              <p className="text-muted-foreground text-sm">
                Subscribe for exclusive updates and early access to new collections.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex gap-2 w-full md:w-auto"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full md:w-64"
              />
              <Button
                type="submit"
                className="bg-[#FF6B00] hover:bg-[#E55A00] text-white px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Justy Fashion. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
