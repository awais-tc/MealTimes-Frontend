import React from 'react';
import { useForm } from 'react-hook-form';
import { ChefHat, Upload, CheckCircle, AlertCircle, Camera, FileText, Award } from 'lucide-react';

const ChefApplication = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <ChefHat className="h-16 w-16 text-brand-red mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900">Chef Application</h1>
          <p className="mt-4 text-xl text-gray-600">
            Join our network of professional chefs and grow your culinary business
          </p>
        </div>

        {/* Application Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <FileText className="h-10 w-10 text-brand-red mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">1. Application</h3>
            <p className="text-sm text-gray-600">Fill out the basic information</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Upload className="h-10 w-10 text-brand-red mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">2. Documentation</h3>
            <p className="text-sm text-gray-600">Submit required documents</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <AlertCircle className="h-10 w-10 text-brand-red mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">3. Verification</h3>
            <p className="text-sm text-gray-600">Background check process</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <CheckCircle className="h-10 w-10 text-brand-red mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">4. Approval</h3>
            <p className="text-sm text-gray-600">Final review and onboarding</p>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Application Form</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    {...register('fullName', { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    {...register('email', { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    {...register('phone', { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    {...register('location', { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                  />
                </div>
              </div>
            </div>

            {/* Professional Experience */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Professional Experience</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                  <input
                    type="number"
                    {...register('experience', { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Specialties</label>
                  <input
                    type="text"
                    {...register('specialties', { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                    placeholder="e.g., Italian Cuisine, Vegan, Pastry"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Previous Work Experience</label>
                  <textarea
                    {...register('workExperience', { required: true })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                  />
                </div>
              </div>
            </div>

            {/* Document Upload */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Required Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Food Safety Certification</label>
                  <input
                    type="file"
                    {...register('certification')}
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-brand-red file:text-white
                      hover:file:bg-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Resume/CV</label>
                  <input
                    type="file"
                    {...register('resume')}
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-brand-red file:text-white
                      hover:file:bg-brand-orange"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-red hover:bg-brand-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChefApplication;