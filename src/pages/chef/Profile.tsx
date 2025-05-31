import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { chefs } from '../../lib/api';
import { 
  ChefHat, 
  Star, 
  Award, 
  Clock, 
  Mail, 
  Phone, 
  MapPin, 
  Edit 
} from 'lucide-react';

const ChefProfile = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['chef-profile'],
    queryFn: () => chefs.getProfile('current'),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-48">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80"
              alt="Chef Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end">
              <div className="flex items-center space-x-6">
                <img
                  src={profile?.avatar}
                  alt={profile?.name}
                  className="h-24 w-24 rounded-full border-4 border-white"
                />
                <div className="text-white">
                  <h1 className="text-2xl font-bold">{profile?.name}</h1>
                  <p className="text-gray-200">{profile?.specialty}</p>
                </div>
              </div>
              <button className="ml-auto bg-brand-red text-white px-4 py-2 rounded-md hover:bg-brand-orange transition-colors flex items-center">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <span>{profile?.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <span>{profile?.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <span>{profile?.location}</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Certifications</h2>
              <div className="space-y-4">
                {profile?.certifications?.map((cert, index) => (
                  <div key={index} className="flex items-center">
                    <Award className="h-5 w-5 text-brand-red mr-3" />
                    <div>
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-sm text-gray-500">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Availability</h2>
              <div className="space-y-3">
                {Object.entries(profile?.availability || {}).map(([day, hours]) => (
                  <div key={day} className="flex items-center justify-between">
                    <span className="capitalize">{day}</span>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{hours}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Reviews */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <ChefHat className="h-8 w-8 text-brand-red" />
                  <span className="text-2xl font-bold">{profile?.totalMeals}</span>
                </div>
                <p className="mt-2 text-gray-600">Total Meals</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <Star className="h-8 w-8 text-brand-red" />
                  <span className="text-2xl font-bold">{profile?.rating}</span>
                </div>
                <p className="mt-2 text-gray-600">Average Rating</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <Award className="h-8 w-8 text-brand-red" />
                  <span className="text-2xl font-bold">{profile?.completedOrders}</span>
                </div>
                <p className="mt-2 text-gray-600">Completed Orders</p>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Customer Reviews</h2>
              <div className="space-y-6">
                {profile?.reviews?.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="ml-3">
                          <p className="font-medium">{review.userName}</p>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefProfile;