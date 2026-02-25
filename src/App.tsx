import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CartProvider } from '@/contexts/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Lookbook from './pages/Lookbook';
import Atelier from './pages/Atelier';
import Contact from './pages/Contact';
import Cart from './pages/Cart';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300">
          {/* Grain overlay */}
          <div className="grain-overlay" />

          {/* Toast notifications */}
          <Toaster position="bottom-right" />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="collections" element={<Collections />} />
              <Route path="lookbook" element={<Lookbook />} />
              <Route path="atelier" element={<Atelier />} />
              <Route path="contact" element={<Contact />} />
              <Route path="cart" element={<Cart />} />
            </Route>
          </Routes>
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
