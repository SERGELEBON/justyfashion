import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

// Featured products for slider
const featuredProducts = [
  {
    id: 1,
    name: 'Elegant Evening Dress',
    price: 280,
    originalPrice: 350,
    image: '/jfcouturefemme/imf11.jpg',
    category: 'Women',
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'Classic Tailored Suit',
    price: 420,
    image: '/jfcouture homme/imh15.jpg',
    category: 'Men',
    badge: 'New',
  },
  {
    id: 3,
    name: 'Designer Casual Wear',
    price: 180,
    originalPrice: 230,
    image: '/jfcouturefemme/imf17.jpg',
    category: 'Women',
    badge: 'Sale',
  },
  {
    id: 4,
    name: 'Romantic Couple Set',
    price: 650,
    image: '/couple/couple1.jpg',
    category: 'Couples',
    badge: 'Premium',
  },
  {
    id: 5,
    name: 'Formal Business Attire',
    price: 380,
    image: '/jfcouture homme/imh21.jpg',
    category: 'Men',
    badge: null,
  },
  {
    id: 6,
    name: 'Luxury Gown Collection',
    price: 320,
    image: '/jfcouturefemme/imf25.jpg',
    category: 'Women',
    badge: 'Premium',
  },
  {
    id: 7,
    name: 'Matching Couple Outfit',
    price: 580,
    image: '/couple/couple.jpg',
    category: 'Couples',
    badge: null,
  },
  {
    id: 8,
    name: 'Executive Style Suit',
    price: 450,
    image: '/jfcouture homme/imgh33.jpg',
    category: 'Men',
    badge: 'New',
  },
];

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Hero animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      );

      gsap.fromTo(
        '.hero-image',
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Auto-slide
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 hero-image">
          <img
            src="/lookbook_01.jpg"
            alt="Justy Fashion Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 pt-20">
          <div className="hero-content max-w-2xl">
            <span className="label-mono text-[#FF6B00] mb-4 block">
              African Fashion at Its Finest
            </span>
            <h1 className="headline-xl mb-6">
              <span className="block">Tailored.</span>
              <span className="block">Timeless.</span>
              <span className="block text-[#FF6B00]">Yours.</span>
            </h1>
            <p className="body-text text-lg mb-8 max-w-lg">
              Bespoke silhouettes, modern cuts—made for how you move. 
              Discover our collection of premium African-inspired fashion.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/collections">
                <Button className="bg-[#FF6B00] hover:bg-[#E55A00] text-white px-8 py-6 text-sm font-semibold uppercase tracking-wider">
                  Shop Collection
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/lookbook">
                <Button variant="outline" className="border-2 border-foreground/20 hover:border-[#FF6B00] hover:text-[#FF6B00] px-8 py-6 text-sm font-semibold uppercase tracking-wider">
                  View Lookbook
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="label-mono text-muted-foreground">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#FF6B00] to-transparent" />
        </div>
      </section>

      {/* Featured Products Slider - Like Laviye */}
      <section ref={sliderRef} className="py-20 lg:py-28 bg-secondary/20">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="label-mono text-[#FF6B00] mb-2 block">Trending Now</span>
              <h2 className="headline-md">Featured Products</h2>
            </div>
            <Link to="/collections" className="cta-link">
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Slider */}
          <div className="relative">
            {/* Slider Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * (100 / 4)}%)` }}
              >
                {featuredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-2"
                  >
                    <Link to="/collections" className="group block">
                      {/* Product Card */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {/* Badge */}
                        {product.badge && (
                          <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold uppercase ${
                            product.badge === 'Sale' 
                              ? 'bg-red-500 text-white' 
                              : product.badge === 'New'
                              ? 'bg-green-500 text-white'
                              : 'bg-[#FF6B00] text-white'
                          }`}>
                            {product.badge}
                          </span>
                        )}

                        {/* Quick actions */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <Button className="w-full bg-[#FF6B00] hover:bg-[#E55A00] text-white text-xs uppercase">
                            Quick View
                          </Button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div>
                        <span className="label-mono text-muted-foreground">{product.category}</span>
                        <h3 className="font-display font-semibold text-sm mt-1 group-hover:text-[#FF6B00] transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-semibold">GHC {product.price}</span>
                          {product.originalPrice && (
                            <span className="text-muted-foreground line-through text-sm">
                              GHC {product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-2 lg:-translate-x-4 w-10 h-10 lg:w-12 lg:h-12 bg-background shadow-lg flex items-center justify-center hover:bg-[#FF6B00] hover:text-white transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-2 lg:translate-x-4 w-10 h-10 lg:w-12 lg:h-12 bg-background shadow-lg flex items-center justify-center hover:bg-[#FF6B00] hover:text-white transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {featuredProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'w-8 bg-[#FF6B00]' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 lg:py-28">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="label-mono text-[#FF6B00] mb-2 block">Browse by Category</span>
            <h2 className="headline-md">Shop the Collection</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {/* Women */}
            <Link to="/collections" className="group relative aspect-[4/5] overflow-hidden">
              <img
                src="/jfcouturefemme/imf14.jpg"
                alt="Women Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="label-mono text-white/70 mb-2 block">Collection</span>
                <h3 className="font-display font-bold text-2xl text-white">Women</h3>
                <span className="cta-link text-white mt-2 !text-xs">
                  Shop Now <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            {/* Men */}
            <Link to="/collections" className="group relative aspect-[4/5] overflow-hidden">
              <img
                src="/jfcouture homme/imh16.jpg"
                alt="Men Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="label-mono text-white/70 mb-2 block">Collection</span>
                <h3 className="font-display font-bold text-2xl text-white">Men</h3>
                <span className="cta-link text-white mt-2 !text-xs">
                  Shop Now <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            {/* Couples */}
            <Link to="/collections" className="group relative aspect-[4/5] overflow-hidden">
              <img
                src="/couple/couple1.jpg"
                alt="Couples Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="label-mono text-white/70 mb-2 block">Collection</span>
                <h3 className="font-display font-bold text-2xl text-white">Couples</h3>
                <span className="cta-link text-white mt-2 !text-xs">
                  Shop Now <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28 bg-secondary/20">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Star, title: 'Premium Quality', desc: 'Finest fabrics sourced globally' },
              { icon: Star, title: 'Handcrafted', desc: 'Made by skilled artisans' },
              { icon: Star, title: 'Custom Fit', desc: 'Tailored to your measurements' },
              { icon: Star, title: 'Fast Shipping', desc: 'Worldwide delivery available' },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-[#FF6B00]/10 rounded-full flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-[#FF6B00]" />
                </div>
                <h3 className="font-display font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-28 bg-secondary/20">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="label-mono text-[#FF6B00] mb-2 block">What Our Clients Say</span>
            <h2 className="headline-md">Testimonials</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Discover why our customers love Justy Fashion and trust us with their style journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-background p-6 lg:p-8 border border-border hover:border-[#FF6B00]/30 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/testimony/testimony1.jpg"
                    alt="Customer testimonial"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FF6B00] text-[#FF6B00]" />
                    ))}
                  </div>
                  <h3 className="font-semibold">Exceptional Quality</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                "The attention to detail and quality of fabrics is outstanding. Justy Fashion delivered exactly what I envisioned for my special occasion. The fit was perfect and the craftsmanship is truly exceptional."
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-medium text-sm">Sarah Mensah</p>
                <p className="text-xs text-muted-foreground">Bride & Fashion Enthusiast</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-background p-6 lg:p-8 border border-border hover:border-[#FF6B00]/30 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/testimony/testimony2.jpg"
                    alt="Customer testimonial"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FF6B00] text-[#FF6B00]" />
                    ))}
                  </div>
                  <h3 className="font-semibold">Professional Service</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                "From consultation to final delivery, the team was professional and attentive to every detail. My custom suit fits perfectly and I receive compliments every time I wear it. Highly recommended!"
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-medium text-sm">Kwame Asante</p>
                <p className="text-xs text-muted-foreground">Business Executive</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="relative overflow-hidden bg-[#FF6B00] py-16 lg:py-24 px-8 lg:px-16">
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="headline-md text-white mb-4">
                Ready to Create Your Look?
              </h2>
              <p className="text-white/80 mb-8">
                Book a consultation with our expert stylists and let us bring your vision to life.
              </p>
              <Link to="/contact">
                <Button className="bg-white text-[#FF6B00] hover:bg-white/90 px-8 py-6 text-sm font-semibold uppercase tracking-wider">
                  Book Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
