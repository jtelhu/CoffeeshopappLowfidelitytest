import { useState, useEffect } from 'react';

interface OrderTrackerProps {
  onBack: () => void;
  orderPlaced: boolean;
}

export function OrderTracker({ onBack, orderPlaced }: OrderTrackerProps) {
  const [orderStatus, setOrderStatus] = useState('Preparing');

  useEffect(() => {
    if (orderPlaced) {
      // Simulate order status updates
      const timer1 = setTimeout(() => setOrderStatus('Ready'), 5000);
      return () => clearTimeout(timer1);
    }
  }, [orderPlaced]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Poor header */}
      <div className="bg-white p-2 mb-4">
        <button onClick={onBack} className="text-xs text-gray-500 mb-2">
          &lt; Back
        </button>
        <h1 className="text-lg">Order Tracker</h1>
      </div>

      {!orderPlaced ? (
        <div className="bg-white p-3">
          <div className="text-xs text-gray-500">No active orders</div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Order status with poor design */}
          <div className="bg-white p-3">
            <div className="text-xs text-gray-600 mb-2">Ord Status</div>
            <div className="text-sm mb-2">{orderStatus}</div>
            
            {/* Poor progress indicator */}
            <div className="flex gap-1 mt-2">
              <div className="flex-1 h-1 bg-gray-300"></div>
              <div className={`flex-1 h-1 ${orderStatus === 'Ready' ? 'bg-gray-300' : 'bg-gray-200'}`}></div>
            </div>
            
            <div className="text-xs text-gray-500 mt-2">
              Est time: {orderStatus === 'Preparing' ? '10-15 min' : 'Ready now'}
            </div>
          </div>

          {/* Order details with poor formatting */}
          <div className="bg-white p-3">
            <div className="text-xs text-gray-600 mb-2">Ord Details</div>
            <div className="text-xs">Order #12345</div>
            <div className="text-xs text-gray-500">M Latte, Whole Milk</div>
            <div className="text-xs mt-1">Total: $4.50</div>
          </div>

          {/* Pickup instructions buried and hard to find */}
          <div className="bg-white p-3">
            <div className="text-xs text-gray-600 mb-2">Pckup Info</div>
            <div className="text-xs text-gray-500 mb-1">123 Main St</div>
            <div className="text-xs text-gray-500 mb-1">Counter pickup</div>
            <div className="text-xs text-gray-500">Show order # at counter</div>
            
            {/* Map would be here in high-fi, but missing in low-fi */}
            <div className="mt-2 bg-gray-200 h-32 flex items-center justify-center">
              <div className="text-xs text-gray-400">Map unavailable</div>
            </div>
          </div>

          {/* Contact section with poor design */}
          <div className="bg-white p-3">
            <div className="text-xs text-gray-600 mb-2">Contact</div>
            <button className="text-xs text-gray-500 underline">
              Call store
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
