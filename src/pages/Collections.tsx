import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Filter, Grid3X3, LayoutList, Heart, Eye, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

// Product categories
const categories = [
  { id: 'all', label: 'All' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'couples', label: 'Couples' },
];

// Sort options
const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
];

// Products data
const products = [
  // Women Collection (10 photos)
  {
    id: 1,
    name: 'Elegant Evening Gown - Signature Collection',
    price: 320,
    originalPrice: 400,
    image: '/jfcouturefemme/f1.jpg',
    category: 'women',
    badge: 'Best Seller',
    rating: 4.9,
    reviews: 28,
  },
  {
    id: 2,
    name: 'Designer Cocktail Dress - Premium',
    price: 280,
    image: '/jfcouturefemme/im1.jpg',
    category: 'women',
    badge: 'New',
    rating: 5.0,
    reviews: 15,
  },
  {
    id: 3,
    name: 'African Print Maxi Dress - Royal',
    price: 250,
    originalPrice: 320,
    image: '/jfcouturefemme/im3.jpg',
    category: 'women',
    badge: 'Sale',
    rating: 4.7,
    reviews: 42,
  },
  {
    id: 4,
    name: 'Luxury Formal Wear - Exclusive',
    price: 380,
    image: '/jfcouturefemme/im9.jpg',
    category: 'women',
    badge: 'Premium',
    rating: 4.8,
    reviews: 22,
  },
  {
    id: 5,
    name: 'Embroidered Traditional Dress',
    price: 290,
    image: '/jfcouturefemme/im10.jpg',
    category: 'women',
    badge: null,
    rating: 4.9,
    reviews: 35,
  },
  {
    id: 6,
    name: 'Contemporary Evening Gown',
    price: 350,
    image: '/jfcouturefemme/imf11.jpg',
    category: 'women',
    badge: 'New',
    rating: 4.6,
    reviews: 18,
  },
  {
    id: 7,
    name: 'Sophisticated Party Dress',
    price: 260,
    image: '/jfcouturefemme/imf14.jpg',
    category: 'women',
    badge: null,
    rating: 5.0,
    reviews: 12,
  },
  {
    id: 8,
    name: 'Designer Casual Wear',
    price: 180,
    originalPrice: 230,
    image: '/jfcouturefemme/imf17.jpg',
    category: 'women',
    badge: 'Sale',
    rating: 4.8,
    reviews: 56,
  },
  {
    id: 9,
    name: 'Luxury Formal Collection',
    price: 420,
    image: '/jfcouturefemme/imf20.jpg',
    category: 'women',
    badge: 'Premium',
    rating: 4.7,
    reviews: 25,
  },
  {
    id: 10,
    name: 'Exclusive Evening Wear',
    price: 380,
    image: '/jfcouturefemme/imf23.jpg',
    category: 'women',
    badge: 'New',
    rating: 4.9,
    reviews: 19,
  },
  // Men Collection (10 photos)
  {
    id: 11,
    name: 'Executive Business Suit - Premium',
    price: 450,
    originalPrice: 550,
    image: '/jfcouture homme/h1.jpg',
    category: 'men',
    badge: 'Best Seller',
    rating: 4.9,
    reviews: 34,
  },
  {
    id: 12,
    name: 'Classic Tailored Suit',
    price: 380,
    image: '/jfcouture homme/h2.jpg',
    category: 'men',
    badge: 'New',
    rating: 5.0,
    reviews: 22,
  },
  {
    id: 13,
    name: 'Formal Wedding Attire',
    price: 520,
    image: '/jfcouture homme/h4.jpg',
    category: 'men',
    badge: 'Premium',
    rating: 4.8,
    reviews: 28,
  },
  {
    id: 14,
    name: 'Contemporary Business Wear',
    price: 350,
    originalPrice: 420,
    image: '/jfcouture homme/im2.jpg',
    category: 'men',
    badge: 'Sale',
    rating: 4.7,
    reviews: 31,
  },
  {
    id: 15,
    name: 'Designer Casual Suit',
    price: 280,
    image: '/jfcouture homme/imh5.jpg',
    category: 'men',
    badge: null,
    rating: 4.6,
    reviews: 18,
  },
  {
    id: 16,
    name: 'Luxury Formal Collection',
    price: 480,
    image: '/jfcouture homme/imh12.jpg',
    category: 'men',
    badge: 'Premium',
    rating: 4.9,
    reviews: 26,
  },
  {
    id: 17,
    name: 'Executive Style Blazer',
    price: 320,
    image: '/jfcouture homme/imh13.jpg',
    category: 'men',
    badge: 'New',
    rating: 4.8,
    reviews: 20,
  },
  {
    id: 18,
    name: 'Traditional Formal Wear',
    price: 400,
    image: '/jfcouture homme/imh15.jpg',
    category: 'men',
    badge: null,
    rating: 4.7,
    reviews: 24,
  },
  {
    id: 19,
    name: 'Modern Business Attire',
    price: 360,
    originalPrice: 450,
    image: '/jfcouture homme/imh16.jpg',
    category: 'men',
    badge: 'Sale',
    rating: 4.8,
    reviews: 32,
  },
  {
    id: 20,
    name: 'Sophisticated Evening Wear',
    price: 420,
    image: '/jfcouture homme/imh18.jpg',
    category: 'men',
    badge: 'New',
    rating: 5.0,
    reviews: 15,
  },
  // Couples Collection (2 photos)
  {
    id: 21,
    name: 'Romantic Couple Set - Wedding Collection',
    price: 850,
    originalPrice: 1000,
    image: '/couple/couple.jpg',
    category: 'couples',
    badge: 'Best Seller',
    rating: 5.0,
    reviews: 45,
  },
  {
    id: 22,
    name: 'Matching Formal Attire - Special Edition',
    price: 720,
    image: '/couple/couple1.jpg',
    category: 'couples',
    badge: 'Premium',
    rating: 4.9,
    reviews: 38,
  },
];

const Collections = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [viewCounts, setViewCounts] = useState<Record<number, number>>({});
  const { addItem } = useCart();
  const navigate = useNavigate();

  // Load view counts from localStorage on mount
  useEffect(() => {
    const savedViews = localStorage.getItem('justyfashion_product_views');
    if (savedViews) {
      try {
        setViewCounts(JSON.parse(savedViews));
      } catch (error) {
        console.error('Error loading view counts:', error);
      }
    }
  }, []);

  // Save view counts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('justyfashion_product_views', JSON.stringify(viewCounts));
  }, [viewCounts]);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const toggleWishlist = (id: number) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleViewProduct = (product: typeof products[0]) => {
    // Increment view count
    setViewCounts(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));

    // Show toast with view count
    const newViewCount = (viewCounts[product.id] || 0) + 1;
    toast.success('Product Viewed!', {
      description: `${product.name} - ${newViewCount} view${newViewCount !== 1 ? 's' : ''}`,
    });
  };

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: 'M', // Default size
      color: 'Standard', // Default color
      category: product.category,
    });

    // Show success notification and redirect to cart
    toast.success('Added to Cart!', {
      description: `${product.name} has been added to your cart. Redirecting...`,
    });

    // Redirect to cart page after short delay
    setTimeout(() => {
      navigate('/cart');
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      {/* Page Header */}
      <div className="bg-secondary/30 border-b border-border">
        <div className="w-full px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-[#FF6B00] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Collections</span>
          </nav>
          <h1 className="headline-lg">Our Collections</h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Discover our curated selection of premium African-inspired fashion, 
            crafted with precision and passion.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="sticky top-16 lg:top-20 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="w-full px-4 sm:px-6 lg:px-12 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[#FF6B00] text-white'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort & View */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 transition-colors text-sm"
                >
                  <span>Sort by: {sortOptions.find(o => o.id === sortBy)?.label}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showSortDropdown && (
                  <div className="absolute right-0 top-full mt-1 bg-background border border-border shadow-lg z-50 min-w-[180px]">
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          setSortBy(option.id);
                          setShowSortDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${
                          sortBy === option.id ? 'text-[#FF6B00]' : ''
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* View Mode */}
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#FF6B00] text-white' : 'hover:bg-secondary'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[#FF6B00] text-white' : 'hover:bg-secondary'}`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>

              {/* Results count */}
              <span className="text-sm text-muted-foreground hidden lg:block">
                {sortedProducts.length} products
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
        <div className={`grid gap-4 lg:gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {sortedProducts.map((product) => (
            <div 
              key={product.id} 
              className={`group ${viewMode === 'list' ? 'flex gap-6' : ''}`}
            >
              {/* Image */}
              <div className={`relative overflow-hidden bg-secondary ${
                viewMode === 'list' ? 'w-48 lg:w-64 flex-shrink-0' : 'aspect-[3/4]'
              }`}>
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
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`w-9 h-9 flex items-center justify-center transition-colors ${
                      wishlist.includes(product.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 hover:bg-white text-foreground'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => handleViewProduct(product)}
                    className="w-9 h-9 bg-white/90 hover:bg-white flex items-center justify-center transition-colors relative"
                  >
                    <Eye className="w-4 h-4" />
                    {viewCounts[product.id] && (
                      <span className="absolute -top-1 -right-1 bg-[#FF6B00] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {viewCounts[product.id] > 9 ? '9+' : viewCounts[product.id]}
                      </span>
                    )}
                  </button>
                </div>

                {/* Add to cart - Grid view only */}
                {viewMode === 'grid' && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-[#FF6B00] hover:bg-[#E55A00] text-white text-xs uppercase"
                    >
                      Add to Cart
                    </Button>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className={`${viewMode === 'list' ? 'flex-1 py-2' : 'mt-4'}`}>
                <span className="label-mono text-muted-foreground">{product.category}</span>
                <h3 className="font-display font-semibold mt-1 group-hover:text-[#FF6B00] transition-colors">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-[#FF6B00]' : 'text-muted-foreground/30'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mt-3">
                  <span className="font-semibold text-lg">GHC {product.price}</span>
                  {product.originalPrice && (
                    <span className="text-muted-foreground line-through">
                      GHC {product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Add to cart - List view */}
                {viewMode === 'list' && (
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 bg-[#FF6B00] hover:bg-[#E55A00] text-white"
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <Filter className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-display font-semibold text-xl mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
