import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, Users } from 'lucide-react';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Student Result Management System</h1>
          <Button onClick={() => navigate('/login')} size="sm">
            Login
          </Button>
        </div>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Your Academic Success Tracker
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              A comprehensive platform to manage and track student performance across faculties and courses.
            </p>
            <div className="mt-8">
              <Button onClick={() => navigate('/login')} size="lg">
                Get Started
              </Button>
            </div>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                      <GraduationCap className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">For Students</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-600">
                      Access your academic records, view semester results, and track your progress over time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">For Administrators</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-600">
                      Manage students, faculties, courses, and results all in one intuitive platform.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <BookOpen className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Comprehensive Analytics</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-600">
                      Get insights into student performance with detailed analytics and reporting tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-extrabold text-white">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Login to access your dashboard and start managing your academic journey.
            </p>
            <div className="mt-8">
              <Button
                variant="outline"
                onClick={() => navigate('/login')}
                className="bg-white text-blue-700 hover:bg-blue-50"
              >
                Login Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Student Result Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;