import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { UtensilsCrossed, Upload, Clock, DollarSign, Tag, FileImage } from 'lucide-react';
import { meals } from '../../lib/api';

const mealSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  type: z.enum(['breakfast', 'lunch', 'dinner']),
  dietaryOptions: z.array(z.string()),
  nutritionalInfo: z.object({
    calories: z.number().min(0),
    protein: z.number().min(0),
    carbs: z.number().min(0),
    fat: z.number().min(0),
  }),
  availability: z.object({
    daysAvailable: z.array(z.string()),
    maxOrdersPerDay: z.number().min(1),
  }),
});

type MealForm = z.infer<typeof mealSchema>;

const UploadMeal = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<MealForm>({
    resolver: zodResolver(mealSchema),
  });

  const uploadMutation = useMutation({
    mutationFn: (data: MealForm) => meals.create(data),
  });

  const dietaryOptions = [
    'vegetarian',
    'vegan',
    'gluten-free',
    'dairy-free',
    'nut-free',
  ];

  const daysOfWeek = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-8">
            <UtensilsCrossed className="h-8 w-8 text-brand-red mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Upload New Meal</h1>
          </div>

          <form onSubmit={handleSubmit((data) => uploadMutation.mutate(data))} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Meal Name</label>
                <input
                  type="text"
                  {...register('name')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      {...register('price', { valueAsNumber: true })}
                      className="pl-10 block w-full rounded-md border-gray-300 focus:border-brand-red focus:ring-brand-red"
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Meal Type</label>
                  <select
                    {...register('type')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dietary Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Options</label>
              <div className="grid grid-cols-2 gap-4">
                {dietaryOptions.map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('dietaryOptions')}
                      value={option}
                      className="rounded border-gray-300 text-brand-red focus:ring-brand-red"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Nutritional Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nutritional Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Calories</label>
                  <input
                    type="number"
                    {...register('nutritionalInfo.calories', { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Protein (g)</label>
                  <input
                    type="number"
                    {...register('nutritionalInfo.protein', { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Carbs (g)</label>
                  <input
                    type="number"
                    {...register('nutritionalInfo.carbs', { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fat (g)</label>
                  <input
                    type="number"
                    {...register('nutritionalInfo.fat', { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                  />
                </div>
              </div>
            </div>

            {/* Availability */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Availability</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Days Available</label>
                  <div className="grid grid-cols-2 gap-4">
                    {daysOfWeek.map((day) => (
                      <label key={day} className="flex items-center">
                        <input
                          type="checkbox"
                          {...register('availability.daysAvailable')}
                          value={day}
                          className="rounded border-gray-300 text-brand-red focus:ring-brand-red"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Maximum Orders Per Day
                  </label>
                  <input
                    type="number"
                    {...register('availability.maxOrdersPerDay', { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={uploadMutation.isPending}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-red hover:bg-brand-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red disabled:opacity-50"
              >
                <Upload className="h-5 w-5 mr-2" />
                {uploadMutation.isPending ? 'Uploading...' : 'Upload Meal'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadMeal;