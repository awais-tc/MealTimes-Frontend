import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { meals } from '../lib/api';
import { Search, Filter, UtensilsCrossed, Leaf, Clock } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';

const Meals = () => {
  const { formatPrice } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDiet, setSelectedDiet] = useState('all');

  const { data: mealPackages, isLoading } = useQuery({
    queryKey: ['meals'],
    queryFn: meals.getAll,
  });

  const filteredMeals = mealPackages?.filter((meal: any) => {
    const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || meal.type === selectedType;
    const matchesDiet = selectedDiet === 'all' || meal.dietaryOptions.includes(selectedDiet);
    return matchesSearch && matchesType && matchesDiet;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-900">Loading meals...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Hero Section */}
      <div className="relative bg-kitchen bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Explore Our Meals
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-100">
            Discover a wide variety of delicious meals prepared by expert chefs
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-brand-red focus:border-brand-red sm:text-sm"
              placeholder="Search meals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-red focus:border-brand-red sm:text-sm rounded-md"
            >
              <option value="all">All Types</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>

            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-red focus:border-brand-red sm:text-sm rounded-md"
            >
              <option value="all">All Diets</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten Free</option>
            </select>
          </div>
        </div>
      </div>

      {/* Meals Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMeals?.map((meal: any) => (
            <div key={meal._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-brand-red">
                    {formatPrice(meal.price)}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">{meal.name}</h2>
                  <span className="px-2 py-1 bg-brand-light text-brand-red text-xs font-semibold rounded">
                    {meal.type}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{meal.description}</p>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center text-gray-500">
                    <UtensilsCrossed className="h-4 w-4 mr-1" />
                    <span className="text-sm">{meal.nutritionalInfo.calories} cal</span>
                  </div>
                  {meal.dietaryOptions?.map((diet: string) => (
                    <div key={diet} className="flex items-center text-green-600">
                      <Leaf className="h-4 w-4 mr-1" />
                      <span className="text-sm">{diet}</span>
                    </div>
                  ))}
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">20-30 min</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    By Chef {meal.chef.name}
                  </div>
                  <button className="px-4 py-2 bg-brand-red text-white rounded-md hover:bg-brand-orange transition-colors">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Meals;