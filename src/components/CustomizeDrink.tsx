import { useState } from 'react';

interface CustomizeDrinkProps {
  drink: any;
  onBack: () => void;
  onAddToCart: (item: any, customization: any) => void;
}

export function CustomizeDrink({ drink, onBack, onAddToCart }: CustomizeDrinkProps) {
  const [size, setSize] = useState('M');
  const [milk, setMilk] = useState('Whole Milk');
  const [sweetness, setSweetness] = useState('Regular');
  const [ice, setIce] = useState('Regular');
  const [temp, setTemp] = useState('Hot');

  const milkOptions = ['Whole Milk', '2% Milk', 'Oat Milk'];
  const sizeOptions = ['S', 'M', 'L'];
  const sweetnessOptions = ['None', 'Light', 'Regular', 'Extra'];
  const iceOptions = ['None', 'Light', 'Regular', 'Extra'];
  const tempOptions = ['Hot', 'Iced'];

  const handleAddToCart = () => {
    onAddToCart(drink, { size, milk, sweetness, ice, temp });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Poor header design with hidden loyalty info */}
      <div className="bg-white p-2 mb-4">
        <button onClick={onBack} className="text-xs text-gray-500 mb-2">
          &lt; Back
        </button>
        <h1 className="text-lg">Coffee Order</h1>
        <div className="text-xs text-gray-400">pts: 150</div>
      </div>

      {/* Main content in gray box with poor spacing */}
      <div className="bg-white p-3 mb-4">
        <div className="mb-3">
          <img 
            src={drink.img}
            alt={drink.name}
            className="w-full h-32 object-cover"
          />
          <div className="mt-2 text-sm">{drink.name} - ${drink.price}</div>
        </div>

        {/* Unclear abbreviated labels */}
        <div className="space-y-3">
          {/* Size */}
          <div>
            <label className="text-xs text-gray-600">Sz</label>
            <div className="flex gap-2 mt-1">
              {sizeOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-1 text-xs border ${
                    size === s ? 'bg-gray-300' : 'bg-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Milk Type - Limited to only 3 options */}
          <div>
            <label className="text-xs text-gray-600">Mlk Type</label>
            <select
              value={milk}
              onChange={(e) => setMilk(e.target.value)}
              className="w-full mt-1 p-1 text-xs border bg-gray-50"
            >
              {milkOptions.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Sweetness */}
          <div>
            <label className="text-xs text-gray-600">Swt</label>
            <select
              value={sweetness}
              onChange={(e) => setSweetness(e.target.value)}
              className="w-full mt-1 p-1 text-xs border bg-gray-50"
            >
              {sweetnessOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Ice Level */}
          <div>
            <label className="text-xs text-gray-600">Ice Lvl</label>
            <select
              value={ice}
              onChange={(e) => setIce(e.target.value)}
              className="w-full mt-1 p-1 text-xs border bg-gray-50"
            >
              {iceOptions.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>

          {/* Temperature */}
          <div>
            <label className="text-xs text-gray-600">Temp</label>
            <div className="flex gap-2 mt-1">
              {tempOptions.map((t) => (
                <button
                  key={t}
                  onClick={() => setTemp(t)}
                  className={`px-3 py-1 text-xs border ${
                    temp === t ? 'bg-gray-300' : 'bg-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* No flavor, topping, drizzle, or coffee strength options - reduced customization */}
      </div>

      {/* Poor button design */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-gray-400 text-white p-2 text-sm"
      >
        Add to Cart
      </button>

      {/* Order summary with poor formatting */}
      <div className="mt-4 bg-white p-2">
        <div className="text-xs text-gray-600">Order Summary</div>
        <div className="text-xs mt-1">
          {size} {drink.name}, {milk}, {sweetness} sweet, {ice} ice, {temp}
        </div>
        <div className="text-xs mt-1">Price: ${drink.price}</div>
      </div>
    </div>
  );
}
