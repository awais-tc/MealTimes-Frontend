import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { auth } from '../lib/api';
import { Building2, ChefHat, User } from 'lucide-react';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['corporate', 'employee', 'chef']),
});

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterForm) => auth.register(data),
    onSuccess: () => {
      navigate('/dashboard');
    },
  });

  const roles = [
    { id: 'corporate', label: 'Corporate', icon: Building2 },
    { id: 'employee', label: 'Employee', icon: User },
    { id: 'chef', label: 'Chef', icon: ChefHat },
  ];

  return (
    <div className="min-h-screen bg-brand-light flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join our corporate meal management platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit((data) => registerMutation.mutate(data))}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register('name')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-brand-red">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-brand-red">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  {...register('password')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-brand-red">{errors.password.message}</p>
                )}
              </div>

              {/* Role Selection */}
              <div className="grid grid-cols-3 gap-3">
                {roles.map(({ id, label, icon: Icon }) => (
                  <div key={id} className="relative">
                    <input
                      type="radio"
                      id={id}
                      value={id}
                      {...register('role')}
                      className="sr-only peer"
                    />
                    <label
                      htmlFor={id}
                      className="flex flex-col items-center justify-center p-4 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-brand-red peer-checked:text-brand-red hover:text-gray-600 hover:bg-gray-50"
                    >
                      <Icon className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium">{label}</span>
                    </label>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-red hover:bg-brand-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red transition-colors disabled:opacity-50"
              >
                {registerMutation.isPending ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;