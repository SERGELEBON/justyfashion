import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Grid3X3, LayoutList, Heart, Eye, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Product categories
const categories = [
  { id: 'all', label: 'All' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'couples', label: 'Couples' },
  { id: 'accessories', label: 'Accessories' },
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
  {
    id: 1,
    name: 'African Print Maxi Dress - Royal Collection',
    price: 180,
    originalPrice: 250,
    image: '/lookbook_01.jpg',
    category: 'women',
    badge: 'Best Seller',
    rating: 4.9,
    reviews: 28,
  },
  {
    id: 2,
    name: 'Heritage Kente Suit - Premium Edition',
    price: 320,
    image: '/lookbook_02.jpg',
    category: 'men',
    badge: 'New',
    rating: 5.0,
    reviews: 15,
  },
  {
    id: 3,
    name: 'Luxury Accessory Set - Gold Collection',
    price: 150,
    originalPrice: 200,
    image: '/lookbook_03.jpg',
    category: 'accessories',
    badge: 'Sale',
    rating: 4.7,
    reviews: 42,
  },
  {
    id: 4,
    name: 'Couple Matching Outfit - Special Edition',
    price: 450,
    image: '/lookbook_04.jpg',
    category: 'couples',
    badge: null,
    rating: 4.8,
    reviews: 22,
  },
  {
    id: 5,
    name: 'Embroidered Evening Gown - Deluxe',
    price: 280,
    image: '/lookbook_05.jpg',
    category: 'women',
    badge: 'Premium',
    rating: 4.9,
    reviews: 35,
  },
  {
    id: 6,
    name: 'Patterned Blazer - Executive Style',
    price: 220,
    image: '/lookbook_06.jpg',
    category: 'men',
    badge: null,
    rating: 4.6,
    reviews: 18,
  },
  {
    id: 7,
    name: 'Golden Silk Evening Dress',
    price: 350,
    image: '/lookbook_07.jpg',
    category: 'women',
    badge: 'New',
    rating: 5.0,
    reviews: 12,
  },
  {
    id: 8,
    name: 'Traditional Kente Textile - Authentic',
    price: 120,
    image: '/lookbook_08.jpg',
    category: 'accessories',
    badge: null,
    rating: 4.8,
    reviews: 56,
  },
];

const Collections = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

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
                  <button className="w-9 h-9 bg-white/90 hover:bg-white flex items-center justify-center transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to cart - Grid view only */}
                {viewMode === 'grid' && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Button className="w-full bg-[#FF6B00] hover:bg-[#E55A00] text-white text-xs uppercase">
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
                  <Button className="mt-4 bg-[#FF6B00] hover:bg-[#E55A00] text-white">
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
