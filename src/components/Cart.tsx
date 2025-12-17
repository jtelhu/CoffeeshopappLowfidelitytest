interface CartItem {
  id: string;
  item: any;
  size?: string;
  milk?: string;
  sweetness?: string;
  ice?: string;
  temp?: string;
}

interface CartProps {
  cart: CartItem[];
  onBack: () => void;
  onRemove: (itemId: string) => void;
  onCheckout: () => void;
}

export function Cart({ cart, onBack, onRemove, onCheckout }: CartProps) {
  const total = cart.reduce((sum, item) => sum + item.item.price, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Poor header */}
      <div className="bg-white p-2 mb-4">
        <button onClick={onBack} className="text-xs text-gray-500 mb-2">
          &lt; Back
        </button>
        <h1 className="text-lg">Cart</h1>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white p-3">
          <div className="text-xs text-gray-500">Cart is empty</div>
        </div>
      ) : (
        <>
          {/* Cart items with poor formatting */}
          <div className="space-y-2 mb-4">
            {cart.map((cartItem) => (
              <div key={cartItem.id} className="bg-white p-2">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex-1">
                    <div className="text-xs">
                      {cartItem.size ? `${cartItem.size} ` : ''}{cartItem.item.name}
                    </div>
                    {cartItem.milk && (
                      <div className="text-xs text-gray-500">
                        {cartItem.milk}, {cartItem.sweetness} sweet, {cartItem.ice} ice
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-600 ml-2">
                    ${cartItem.item.price.toFixed(2)}
                  </div>
                </div>
                {/* Poor remove button design */}
                <button
                  onClick={() => onRemove(cartItem.id)}
                  className="text-xs text-gray-400 underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total with poor formatting */}
          <div className="bg-white p-3 mb-4">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-gray-600">Tax</span>
              <span>${(total * 0.08).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mt-2 pt-2 border-t">
              <span>Total</span>
              <span>${(total * 1.08).toFixed(2)}</span>
            </div>
          </div>

          {/* Poor button design */}
          <button
            onClick={onCheckout}
            className="w-full bg-gray-400 text-white p-2 text-sm"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
