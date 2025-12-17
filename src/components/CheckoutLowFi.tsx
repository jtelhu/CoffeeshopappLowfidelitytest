import { useState } from 'react';

interface CartItem {
  id: string;
  item: any;
  size?: string;
  milk?: string;
  sweetness?: string;
  ice?: string;
  temp?: string;
}

interface CheckoutLowFiProps {
  onBack: () => void;
  cart: CartItem[];
  onPlaceOrder: () => void;
}

export function CheckoutLowFi({ onBack, cart, onPlaceOrder }: CheckoutLowFiProps) {
  const [orderType, setOrderType] = useState('Pickup');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [usePoints, setUsePoints] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.item.price, 0);
  const discount = usePoints ? 1.50 : 0;
  const total = subtotal - discount;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Poor header */}
      <div className="bg-white p-2 mb-4">
        <button onClick={onBack} className="text-xs text-gray-500 mb-2">
          &lt; Back
        </button>
        <h1 className="text-lg">Checkout</h1>
      </div>

      {/* Main checkout content */}
      <div className="bg-white p-3 mb-4 space-y-4">
        {/* Order Type */}
        <div>
          <label className="text-xs text-gray-600">Order Type</label>
          <div className="flex gap-2 mt-1">
            {['Pickup', 'Delivery'].map((type) => (
              <button
                key={type}
                onClick={() => setOrderType(type)}
                className={`px-3 py-1 text-xs border ${
                  orderType === type ? 'bg-gray-300' : 'bg-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Order Summary - minimal */}
        <div className="border-t pt-3">
          <div className="text-xs text-gray-600 mb-2">Order</div>
          {cart.map((cartItem) => (
            <div key={cartItem.id} className="text-xs mb-1">
              {cartItem.size ? `${cartItem.size} ` : ''}{cartItem.item.name}
              {cartItem.milk && (
                <span className="text-gray-500"> - {cartItem.milk}</span>
              )}
            </div>
          ))}
        </div>

        {/* Payment Method */}
        <div className="border-t pt-3">
          <label className="text-xs text-gray-600">Payment Methods</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full mt-1 p-1 text-xs border bg-gray-50"
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        {/* Loyalty points HIDDEN at the very bottom with poor visibility */}
        <div className="border-t pt-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={usePoints}
              onChange={(e) => setUsePoints(e.target.checked)}
              className="w-3 h-3"
            />
            <span style={{ fontSize: '8px' }} className="text-gray-500">
              Use pts (150 avail)
            </span>
          </label>
        </div>

        {/* Total - poor formatting */}
        <div className="border-t pt-3">
          <div className="text-xs">
            Subtotal: ${subtotal.toFixed(2)}
          </div>
          {usePoints && (
            <div className="text-xs text-gray-500">
              Points discount: -$1.50
            </div>
          )}
          <div className="text-sm mt-1">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Poor button design */}
      <button 
        onClick={onPlaceOrder}
        className="w-full bg-gray-400 text-white p-2 text-sm"
      >
        Place Order
      </button>

      {/* Additional spacing issues */}
      <div className="mt-2 text-xs text-center text-gray-400">
        Order will be ready in 10-15 min
      </div>
    </div>
  );
}
