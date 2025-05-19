import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, BarChart3, Users } from 'lucide-react';
import Card from '../../components/ui/Card';
import { mockStats } from '../../data/mockData';

const AdminDashboard: React.FC = () => {
  const stats = mockStats;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-blue-50 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-500 text-white">
              <Users size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-500">Total Students</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalStudents}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              to="/admin/students"
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              View all students &rarr;
            </Link>
          </div>
        </Card>

        <Card className="bg-purple-50 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-500 text-white">
              <BookOpen size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-500">Total Faculties</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalFaculties}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              to="/admin/faculties"
              className="text-sm font-medium text-purple-600 hover:text-purple-800"
            >
              View all faculties &rarr;
            </Link>
          </div>
        </Card>

        <Card className="bg-green-50 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-500 text-white">
              <BarChart3 size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-500">Total Courses</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalCourses}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              to="/admin/courses"
              className="text-sm font-medium text-green-600 hover:text-green-800"
            >
              View all courses &rarr;
            </Link>
          </div>
        </Card>

        <Card className="bg-amber-50 border-l-4 border-amber-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-500 text-white">
              <GraduationCap size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-amber-500">Total Results</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalResults}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              to="/admin/results"
              className="text-sm font-medium text-amber-600 hover:text-amber-800"
            >
              View all results &rarr;
            </Link>
          </div>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Recent Activities">
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Users size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Added 3 new students</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <BarChart3 size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Added new course: Advanced Database Systems</p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <GraduationCap size={16} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Updated results for Spring 2023</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-full">
                <Users size={16} className="text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Removed inactive student accounts</p>
                <p className="text-xs text-gray-500">1 week ago</p>
              </div>
            </li>
          </ul>
        </Card>

        <Card title="System Overview">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Database Storage</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">User Accounts</span>
                <span className="text-sm font-medium">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Result Processing</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div className="pt-2">
              <h4 className="text-sm font-medium mb-2">System Status</h4>
              <div className="flex gap-2">
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  All Systems Operational
                </span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  Last Backup: Today
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;