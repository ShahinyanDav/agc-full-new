import React, { useState } from 'react';
import { Check, RotateCcw } from 'lucide-react';

type Item = {
  id: string;
  value: string | number;
  checked: boolean;
  blueCheck?: boolean;
};

type Category = {
  name: string;
  color: string;
  items: Item[];
};

function App() {
  const [categories, setCategories] = useState<Category[]>([
    {
      name: 'Adidas',
      color: 'black',
      items: [50, 40, 36, 26, 20, 12, 10, 6, 2, 'half', 'double'].map(value => ({
        id: `adidas-${value}`,
        value,
        checked: false
      }))
    },
    {
      name: 'Busy',
      color: 'red',
      items: ['delete', 40, 32, 30, 22, 18, 12, 10, 4, 1, 'double'].map(value => ({
        id: `busy-${value}`,
        value,
        checked: false,
        blueCheck: value === 'delete' || value === 1
      }))
    },
    {
      name: 'Pepsi',
      color: 'blue',
      items: [70, 40, 30, 20, 14, 10, 3, 2, 'double', 'half'].map(value => ({
        id: `pepsi-${value}`,
        value,
        checked: false,
        blueCheck: value === 70 || value === 3
      }))
    },
    {
      name: 'ElitShin',
      color: 'gray',
      items: [40, 30, 20, 20, 10, 1].map((value, index) => ({
        id: `elitshin-${value}-${index}`,
        value,
        checked: false,
        blueCheck: value === 40 || (value === 20 && index === 0)
      }))
    },
    {
      name: 'PEPSI',
      color: 'blue',
      items: [500, 100, 50].map(value => ({
        id: `pepsi-big-${value}`,
        value,
        checked: false,
        blueCheck: true
      }))
    }
  ]);

  const handleCheck = (categoryIndex: number, itemId: string) => {
    setCategories(prev => prev.map((category, idx) => {
      if (idx === categoryIndex) {
        return {
          ...category,
          items: category.items.map(item => {
            if (item.id === itemId) {
              return { ...item, checked: !item.checked };
            }
            return item;
          })
        };
      }
      return category;
    }));
  };

  const handleReset = (type?: 'all' | 'green' | 'blue') => {
    setCategories(prev => prev.map(category => ({
      ...category,
      items: category.items.map(item => {
        if (type === 'all' || 
            (type === 'blue' && item.blueCheck) || 
            (type === 'green' && !item.blueCheck)) {
          return { ...item, checked: false };
        }
        return item;
      })
    })));
  };

  const sortItems = (items: Item[]) => {
    const specialValues = ['double', 'half', 'delete'];
    const numbers = items.filter(item => typeof item.value === 'number');
    const special = items.filter(item => specialValues.includes(item.value.toString()));
    
    return [
      ...numbers.sort((a, b) => Number(b.value) - Number(a.value)),
      ...special
    ];
  };

  const formatValue = (value: string | number) => {
    if (typeof value === 'string') {
      return value;
    }
    return `$${value}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-lg mx-auto">
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleReset('all')}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              <RotateCcw size={18} />
              Reset All
            </button>
            <button
              onClick={() => handleReset('green')}
              className="flex items-center gap-2 px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
            >
              <RotateCcw size={18} />
              Reset Green
            </button>
            <button
              onClick={() => handleReset('blue')}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
            >
              <RotateCcw size={18} />
              Reset Blue
            </button>
          </div>
        </div>
        
        <div className="grid gap-2">
          {categories.map((category, categoryIndex) => (
            <div
              key={category.name}
              className="bg-white rounded-lg shadow-md p-3"
            >
              <h2 
                className="text-lg font-semibold mb-2"
                style={{ color: category.color }}
              >
                {category.name}
              </h2>
              <div className="flex flex-wrap gap-3">
                {sortItems(category.items).map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <button
                      onClick={() => handleCheck(categoryIndex, item.id)}
                      className={`
                        relative flex items-center justify-center
                        w-6 h-6 rounded border-2 transition-all
                        ${item.blueCheck 
                          ? 'border-blue-500'
                          : 'border-green-500'
                        }
                      `}
                    >
                      {item.checked && (
                        <Check 
                          className={`${
                            item.blueCheck ? 'text-blue-500' : 'text-green-500'
                          }`}
                          size={14}
                        />
                      )}
                    </button>
                    <span className="text-sm font-medium">
                      {formatValue(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;