import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Scissors, Ruler, Palette, Award, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    icon: Users,
    title: 'Consultation',
    description: 'We begin with a personal consultation to understand your style, preferences, and requirements.',
  },
  {
    icon: Ruler,
    title: 'Measurement',
    description: 'Precise measurements are taken to ensure a perfect fit tailored to your body.',
  },
  {
    icon: Palette,
    title: 'Design',
    description: 'Our designers create a custom design that reflects your personality and vision.',
  },
  {
    icon: Scissors,
    title: 'Crafting',
    description: 'Skilled artisans bring the design to life with meticulous attention to detail.',
  },
  {
    icon: Award,
    title: 'Quality Check',
    description: 'Every piece undergoes rigorous quality checks before delivery.',
  },
];

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '5000+', label: 'Happy Clients' },
  { value: '50+', label: 'Expert Artisans' },
  { value: '100%', label: 'Satisfaction' },
];

const Atelier = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate sections on scroll
      sectionRefs.current.forEach((section) => {
        if (!section) return;
        
        gsap.fromTo(
          section.querySelectorAll('.animate-in'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/quality_detail.jpg"
            alt="Atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
        </div>
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-[#FF6B00] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Atelier</span>
          </nav>
          
          <div className="max-w-2xl">
            <span className="label-mono text-[#FF6B00] mb-4 block">Our Story</span>
            <h1 className="headline-lg mb-6">
              Where Craftsmanship<br />
              <span className="text-[#FF6B00]">Meets Passion</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              For over 15 years, Justy Fashion has been at the forefront of African 
              fashion, blending traditional techniques with contemporary design to create 
              pieces that tell a story.
            </p>
            <Link to="/contact">
              <Button className="bg-[#FF6B00] hover:bg-[#E55A00] text-white px-8 py-6 text-sm font-semibold uppercase tracking-wider">
                Book a Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={(el) => { sectionRefs.current[0] = el; }}
        className="py-16 lg:py-24 bg-[#FF6B00]"
      >
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="animate-in text-center">
                <span className="font-display font-bold text-4xl lg:text-5xl text-white">
                  {stat.value}
                </span>
                <p className="text-white/80 mt-2 text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section 
        ref={(el) => { sectionRefs.current[1] = el; }}
        className="py-16 lg:py-24"
      >
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="animate-in">
              <span className="label-mono text-[#FF6B00] mb-4 block">About Us</span>
              <h2 className="headline-md mb-6">
                Preserving Heritage,<br />
                Creating Future
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2010 in Accra, Ghana, Justy Fashion began with a simple mission: 
                  to celebrate African heritage through contemporary fashion. What started as 
                  a small tailoring shop has grown into a renowned fashion house, serving clients 
                  across the globe.
                </p>
                <p>
                  Our atelier is home to over 50 skilled artisans, each bringing decades of 
                  experience in traditional African textile techniques. From Kente weaving to 
                  intricate embroidery, we preserve these time-honored crafts while infusing 
                  them with modern sensibilities.
                </p>
                <p>
                  Every piece that leaves our atelier is a testament to our commitment to 
                  quality, authenticity, and innovation. We believe that fashion should not 
                  only make you look good but also tell a story—your story.
                </p>
              </div>
            </div>
            
            <div className="animate-in grid grid-cols-2 gap-4">
              <img
                src="/hero_fabric.jpg"
                alt="Fabric"
                className="w-full aspect-[3/4] object-cover"
              />
              <img
                src="/materials_fabric.jpg"
                alt="Materials"
                className="w-full aspect-[3/4] object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section 
        ref={(el) => { sectionRefs.current[2] = el; }}
        className="py-16 lg:py-24 bg-secondary/20"
      >
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12 lg:mb-16">
            <span className="label-mono text-[#FF6B00] mb-4 block">Our Process</span>
            <h2 className="headline-md">How We Create</h2>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="animate-in text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-[#FF6B00]/10 rounded-full flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-[#FF6B00]" />
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 left-full w-full h-px bg-border -translate-y-1/2" />
                  )}
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#FF6B00] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-display font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        ref={(el) => { sectionRefs.current[3] = el; }}
        className="py-16 lg:py-24"
      >
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="label-mono text-[#FF6B00] mb-4 block">Our Team</span>
            <h2 className="headline-md">Meet the Artisans</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Justina Mensah',
                role: 'Founder & Creative Director',
                image: '/lookbook_01.jpg',
              },
              {
                name: 'Kwame Asante',
                role: 'Head Tailor',
                image: '/lookbook_02.jpg',
              },
              {
                name: 'Abena Osei',
                role: 'Lead Designer',
                image: '/lookbook_05.jpg',
              },
            ].map((member, index) => (
              <div key={index} className="animate-in group">
                <div className="relative aspect-[3/4] overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-display font-semibold text-lg">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-secondary/20">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="relative overflow-hidden bg-foreground text-background py-16 lg:py-24 px-8 lg:px-16">
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <Clock className="w-10 h-10 mx-auto text-[#FF6B00] mb-4" />
              <h2 className="headline-md mb-4">
                Visit Our Atelier
              </h2>
              <p className="text-background/70 mb-8">
                Experience the art of African fashion firsthand. Book a consultation 
                and let our experts guide you through our collections.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <Button className="bg-[#FF6B00] hover:bg-[#E55A00] text-white px-8 py-6 text-sm font-semibold uppercase tracking-wider">
                    Book Appointment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Atelier;
