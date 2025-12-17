import { useState } from 'react';
import { SignInSignUp } from './components/SignInSignUp';
import { CheckoutLowFi } from './components/CheckoutLowFi';
import { CustomizeDrink } from './components/CustomizeDrink';
import { OrderTracker } from './components/OrderTracker';
import { Cart } from './components/Cart';

interface CartItem {
  id: string;
  item: any;
  size?: string;
  milk?: string;
  sweetness?: string;
  ice?: string;
  temp?: string;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'customize' | 'checkout' | 'tracker' | 'cart'>('home');
  const [selectedDrink, setSelectedDrink] = useState<any>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Limited drink options for low-fi
  const drinks = [
    { id: 1, name: 'Latte', price: 4.50, img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop' },
    { id: 2, name: 'Cappuccino', price: 4.00, img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=200&fit=crop' },
    { id: 3, name: 'Americano', price: 3.50, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&h=200&fit=crop' },
    { id: 4, name: 'Cold Brew', price: 4.25, img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=300&h=200&fit=crop' },
  ];

  // Limited snack options for low-fi
  const snacks = [
    { id: 5, name: 'Croissant', price: 3.00, img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=200&fit=crop' },
    { id: 6, name: 'Muffin', price: 2.50, img: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300&h=200&fit=crop' },
    { id: 7, name: 'Cookie', price: 2.00, img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=200&fit=crop' },
  ];

  const handleDrinkSelect = (drink: any) => {
    setSelectedDrink(drink);
    setCurrentView('customize');
  };

  const handleSnackSelect = (snack: any) => {
    // Add snack directly to cart
    const cartItem: CartItem = {
      id: `${snack.id}-${Date.now()}`,
      item: snack,
    };
    setCart([...cart, cartItem]);
  };

  const addToCart = (item: any, customization: any) => {
    const cartItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      item: item,
      ...customization,
    };
    setCart([...cart, cartItem]);
    setCurrentView('home');
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setCart([]);
    setCurrentView('tracker');
  };

  if (!isLoggedIn) {
    return <SignInSignUp onSignIn={() => setIsLoggedIn(true)} />;
  }

  if (currentView === 'tracker') {
    return <OrderTracker onBack={() => setCurrentView('home')} orderPlaced={orderPlaced} />;
  }

  if (currentView === 'cart') {
    return (
      <Cart 
        cart={cart}
        onBack={() => setCurrentView('home')}
        onRemove={removeFromCart}
        onCheckout={() => setCurrentView('checkout')}
      />
    );
  }

  if (currentView === 'checkout') {
    return (
      <CheckoutLowFi 
        onBack={() => setCurrentView('cart')}
        cart={cart}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  }

  if (currentView === 'customize') {
    return (
      <CustomizeDrink 
        drink={selectedDrink}
        onBack={() => setCurrentView('home')}
        onAddToCart={addToCart}
      />
    );
  }

  // Home page with poor design
  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* Poor header design with hidden loyalty info */}
      <div className="bg-white p-2 mb-3">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-lg">Coffee Order</h1>
            <div className="text-xs text-gray-400">pts: 150</div>
          </div>
          {/* Poor navigation buttons */}
          <div className="flex gap-1">
            <button 
              onClick={() => setCurrentView('tracker')}
              className="text-xs bg-gray-200 px-2 py-1"
            >
              Trck
            </button>
            <button 
              onClick={() => setCurrentView('cart')}
              className="text-xs bg-gray-200 px-2 py-1"
            >
              Crt ({cart.length})
            </button>
          </div>
        </div>
      </div>

      <div className="p-3">
        {/* Unclear category label */}
        <div className="mb-3">
          <h2 className="text-xs text-gray-600 mb-2">Drnks</h2>
          <div className="grid grid-cols-2 gap-2">
            {drinks.map((drink) => (
              <button
                key={drink.id}
                onClick={() => handleDrinkSelect(drink)}
                className="bg-white p-2 text-left"
              >
                <img 
                  src={drink.img}
                  alt={drink.name}
                  className="w-full h-24 object-cover mb-1"
                />
                <div className="text-xs">{drink.name}</div>
                <div className="text-xs text-gray-500">${drink.price}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Unclear category label */}
        <div>
          <h2 className="text-xs text-gray-600 mb-2">Snks</h2>
          <div className="grid grid-cols-2 gap-2">
            {snacks.map((snack) => (
              <button
                key={snack.id}
                onClick={() => handleSnackSelect(snack)}
                className="bg-white p-2 text-left"
              >
                <img 
                  src={snack.img}
                  alt={snack.name}
                  className="w-full h-24 object-cover mb-1"
                />
                <div className="text-xs">{snack.name}</div>
                <div className="text-xs text-gray-500">${snack.price}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Poor cart indicator at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-2 border-t">
        <button 
          onClick={() => setCurrentView('cart')}
          className="w-full text-center"
        >
          <div className="text-xs text-gray-600">Cart: {cart.length} items</div>
        </button>
      </div>
    </div>
  );
}
