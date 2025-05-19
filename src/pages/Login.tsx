import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Lock, Mail, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const success = await login(username, password);
      
      if (success) {
        const isAdmin = username === 'admin@example.com';
        navigate(isAdmin ? '/admin' : '/student');
      } else {
        setError('Invalid credentials. For demo: use "admin@example.com" for admin or "john.doe@example.com" for student, with password "password"');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-blue-600">
          Student Result Management System
        </h1>
        <h2 className="mt-2 text-center text-xl font-bold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center">
              <AlertCircle size={20} className="mr-2 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Input
                label="Email or Student ID"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your email or student ID"
                fullWidth
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                fullWidth
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <Button
                type="submit"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo access</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <div className="border border-gray-300 rounded-md p-3">
                <h3 className="text-sm font-medium flex items-center text-gray-700 mb-2">
                  <User size={16} className="mr-1" />
                  Admin Access
                </h3>
                <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                  <div className="flex items-center mb-1">
                    <Mail size={14} className="mr-1 text-gray-500" />
                    <span>admin@example.com</span>
                  </div>
                  <div className="flex items-center">
                    <Lock size={14} className="mr-1 text-gray-500" />
                    <span>password</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-300 rounded-md p-3">
                <h3 className="text-sm font-medium flex items-center text-gray-700 mb-2">
                  <User size={16} className="mr-1" />
                  Student Access
                </h3>
                <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                  <div className="flex items-center mb-1">
                    <Mail size={14} className="mr-1 text-gray-500" />
                    <span>john.doe@example.com</span>
                  </div>
                  <div className="flex items-center">
                    <Lock size={14} className="mr-1 text-gray-500" />
                    <span>password</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;