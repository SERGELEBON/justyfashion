import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Heart } from 'lucide-react';

const lookbookImages = [
  { id: 1, src: '/lookbook_01.jpg', title: 'Royal Elegance', category: 'Women', likes: 234 },
  { id: 2, src: '/lookbook_02.jpg', title: 'Heritage Suit', category: 'Men', likes: 189 },
  { id: 3, src: '/lookbook_03.jpg', title: 'Luxury Collection', category: 'Accessories', likes: 156 },
  { id: 4, src: '/lookbook_04.jpg', title: 'Couple Set', category: 'Couples', likes: 312 },
  { id: 5, src: '/lookbook_05.jpg', title: 'Embroidered Gown', category: 'Women', likes: 278 },
  { id: 6, src: '/lookbook_06.jpg', title: 'Patterned Blazer', category: 'Men', likes: 145 },
  { id: 7, src: '/lookbook_07.jpg', title: 'Evening Silk', category: 'Women', likes: 201 },
  { id: 8, src: '/lookbook_08.jpg', title: 'Kente Textile', category: 'Accessories', likes: 167 },
];

const filters = [
  { id: 'all', label: 'All' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'couples', label: 'Couples' },
  { id: 'accessories', label: 'Accessories' },
];

const Lookbook = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [likedImages, setLikedImages] = useState<number[]>([]);

  const filteredImages = activeFilter === 'all'
    ? lookbookImages
    : lookbookImages.filter(img => img.category.toLowerCase() === activeFilter);

  const toggleLike = (id: number) => {
    setLikedImages(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      {/* Page Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/lookbook_04.jpg"
            alt="Lookbook"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-[#FF6B00] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Lookbook</span>
          </nav>
          <h1 className="headline-lg mb-4">Lookbook</h1>
          <p className="text-muted-foreground max-w-xl text-lg">
            Explore our latest collections and get inspired by the artistry 
            of African fashion.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 lg:top-20 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="w-full px-4 sm:px-6 lg:px-12 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-all ${
                  activeFilter === filter.id
                    ? 'bg-[#FF6B00] text-white'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid - Masonry Style */}
      <div className="w-full px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="break-inside-avoid group relative overflow-hidden"
              style={{ 
                marginBottom: '1rem',
                animationDelay: `${index * 50}ms`
              }}
            >
              <div className={`relative ${index % 3 === 0 ? 'aspect-[3/4]' : index % 3 === 1 ? 'aspect-square' : 'aspect-[4/5]'}`}>
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="label-mono text-white/70 mb-1">{image.category}</span>
                  <h3 className="font-display font-bold text-white text-lg">{image.title}</h3>
                  
                  <div className="flex items-center justify-between mt-4">
                    <Link 
                      to="/collections"
                      className="text-white text-sm font-medium flex items-center gap-1 hover:text-[#FF6B00] transition-colors"
                    >
                      Shop Now <ArrowRight className="w-4 h-4" />
                    </Link>
                    
                    <button
                      onClick={() => toggleLike(image.id)}
                      className="flex items-center gap-1 text-white"
                    >
                      <Heart className={`w-5 h-5 ${likedImages.includes(image.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      <span className="text-sm">
                        {image.likes + (likedImages.includes(image.id) ? 1 : 0)}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instagram CTA */}
      <section className="py-16 lg:py-24 bg-secondary/20">
        <div className="w-full px-4 sm:px-6 lg:px-12 text-center">
          <Instagram className="w-10 h-10 mx-auto text-[#FF6B00] mb-4" />
          <h2 className="headline-md mb-4">Follow Us on Instagram</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Stay updated with our latest designs, behind-the-scenes content, 
            and style inspiration.
          </p>
          <a
            href="https://instagram.com/justyfashion"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FF6B00] hover:bg-[#E55A00] text-white px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-colors"
          >
            <Instagram className="w-4 h-4" />
            @justyfashion
          </a>
        </div>
      </section>
    </div>
  );
};

export default Lookbook;
