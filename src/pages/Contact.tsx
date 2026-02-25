import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    content: 'justyfashion1@gmail.com',
    href: 'mailto:justyfashion1@gmail.com',
  },
  {
    icon: Phone,
    title: 'Phone',
    content: '+233 54 216 0772',
    href: 'tel:+233542160772',
  },
  {
    icon: MapPin,
    title: 'Address',
    content: 'Hatso Atomic Road, Opposite Madam Block Factory, Accra, Ghana',
    href: '#',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    content: 'Mon - Sat: 9:00 AM - 6:00 PM',
    href: null,
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create email body
    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Subject: ${formData.subject}

Message:
${formData.message}
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:justyfashion1@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message after a short delay
    setTimeout(() => {
      toast.success('Email Client Opened!', {
        description: 'Please send the email from your email client.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      {/* Page Header */}
      <div className="bg-secondary/30 border-b border-border">
        <div className="w-full px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-[#FF6B00] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Contact</span>
          </nav>
          <h1 className="headline-lg">Get in Touch</h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Have a question or want to book a consultation? We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-12 lg:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div>
              <span className="label-mono text-[#FF6B00] mb-4 block">Send a Message</span>
              <h2 className="headline-md mb-8">Let's Talk</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="label-mono mb-2 block">Name *</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Your name"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="label-mono mb-2 block">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="your@email.com"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="label-mono mb-2 block">Phone</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+233 ..."
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="label-mono mb-2 block">Subject *</label>
                    <Input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      placeholder="How can we help?"
                      className="h-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="label-mono mb-2 block">Message *</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    placeholder="Tell us about your project..."
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FF6B00] hover:bg-[#E55A00] text-white h-12 text-sm font-semibold uppercase tracking-wider"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <span className="label-mono text-[#FF6B00] mb-4 block">Contact Information</span>
              <h2 className="headline-md mb-8">Visit Us</h2>

              <div className="space-y-6 mb-12">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#FF6B00]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#FF6B00]" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold mb-1">{item.title}</h4>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-muted-foreground hover:text-[#FF6B00] transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="border-t border-border pt-8">
                <h4 className="font-display font-semibold mb-4">Follow Us</h4>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border border-border flex items-center justify-center hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border border-border flex items-center justify-center hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border border-border flex items-center justify-center hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 lg:py-20 bg-secondary/20">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-8">
            <span className="label-mono text-[#FF6B00] mb-2 block">Find Us</span>
            <h2 className="headline-md">Our Location</h2>
          </div>
          
          {/* Map placeholder - in production, use Google Maps or similar */}
          <div className="relative aspect-[21/9] bg-secondary overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto text-[#FF6B00] mb-4" />
                <p className="font-display font-semibold text-lg">Justy Fashion Atelier</p>
                <p className="text-muted-foreground">Hatso Atomic Road, Accra, Ghana</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-[#FF6B00] hover:underline"
                >
                  Open in Google Maps
                  <Send className="w-4 h-4" />
                </a>
              </div>
            </div>
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
