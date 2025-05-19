import React, { useState } from 'react';
import { Search, Download, BookOpen } from 'lucide-react';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import { useAuth } from '../../context/AuthContext';
import { getStudentResults, getCourseById, calculateGPA } from '../../utils/helpers';
import { Result } from '../../types';

const StudentResults: React.FC = () => {
  const { currentUser } = useAuth();
  const studentId = currentUser?.studentId;
  
  const allResults = studentId ? getStudentResults(studentId) : [];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');
  
  // Get unique semesters from results
  const semesters = Array.from(new Set(allResults.map(result => result.semester))).sort();
  
  // Filter results based on search and semester
  const filteredResults = allResults.filter(result => {
    const course = getCourseById(result.courseId);
    const searchMatch = course 
      ? (course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
         course.code.toLowerCase().includes(searchTerm.toLowerCase()))
      : false;
    
    const semesterMatch = selectedSemester === 'all' || result.semester === selectedSemester;
    
    return searchMatch && semesterMatch;
  });

  // Calculate GPA for filtered results
  const gpa = calculateGPA(
    selectedSemester === 'all' 
      ? allResults 
      : allResults.filter(result => result.semester === selectedSemester)
  );

  const columns = [
    { 
      header: 'Course', 
      accessor: (result: Result) => {
        const course = getCourseById(result.courseId);
        return course ? (
          <div className="flex items-center">
            <div className="p-2 mr-3 rounded-full bg-blue-100">
              <BookOpen size={16} className="text-blue-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">{course.name}</div>
              <div className="text-gray-500 text-xs">{course.code}</div>
            </div>
          </div>
        ) : 'Unknown Course';
      } 
    },
    { header: 'Semester', accessor: 'semester' },
    { 
      header: 'Marks', 
      accessor: (result: Result) => (
        <div className="font-medium">{result.marks}/100</div>
      )
    },
    { 
      header: 'Grade', 
      accessor: (result: Result) => {
        const gradeColors: Record<string, string> = {
          'A+': 'bg-green-100 text-green-800',
          'A': 'bg-green-100 text-green-800',
          'A-': 'bg-green-100 text-green-800',
          'B+': 'bg-blue-100 text-blue-800',
          'B': 'bg-blue-100 text-blue-800',
          'B-': 'bg-blue-100 text-blue-800',
          'C+': 'bg-yellow-100 text-yellow-800',
          'C': 'bg-yellow-100 text-yellow-800',
          'C-': 'bg-yellow-100 text-yellow-800',
          'D+': 'bg-orange-100 text-orange-800',
          'D': 'bg-orange-100 text-orange-800',
          'F': 'bg-red-100 text-red-800',
        };

        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${gradeColors[result.grade] || 'bg-gray-100'}`}>
            {result.grade}
          </span>
        );
      }
    },
    { header: 'Academic Year', accessor: 'academicYear' },
  ];

  if (!studentId) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-gray-700">Student information not found</h2>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Results</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 flex-1">
          <h3 className="text-lg font-medium mb-1">Overall GPA</h3>
          <p className="text-3xl font-bold">{gpa.toFixed(2)}</p>
          <p className="text-sm opacity-80 mt-1">
            Based on {allResults.length} course{allResults.length !== 1 ? 's' : ''}
          </p>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 flex-1">
          <h3 className="text-lg font-medium mb-1">Courses Completed</h3>
          <p className="text-3xl font-bold">{allResults.length}</p>
          <p className="text-sm opacity-80 mt-1">
            Across {semesters.length} semester{semesters.length !== 1 ? 's' : ''}
          </p>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 flex-1">
          <h3 className="text-lg font-medium mb-1">
            {selectedSemester === 'all' ? 'All Semesters' : `Semester ${selectedSemester}`}
          </h3>
          <p className="text-3xl font-bold">{filteredResults.length}</p>
          <p className="text-sm opacity-80 mt-1">
            Courses displayed in current view
          </p>
        </Card>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="w-full sm:w-48">
          <select
            value={selectedSemester === 'all' ? 'all' : selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          >
            <option value="all">All Semesters</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>

        <button
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Download size={16} />
          <span>Export PDF</span>
        </button>
      </div>

      <Card>
        <Table
          columns={columns}
          data={filteredResults}
          keyExtractor={(result) => result.id}
        />

        {filteredResults.length === 0 && (
          <div className="text-center py-8">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No Results Found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search or filter criteria' : 'No course results available for this selection'}
            </p>
          </div>
        )}
      </Card>

      {filteredResults.length > 0 && (
        <div className="mt-6">
          <Card className="bg-blue-50 p-4">
            <h3 className="text-lg font-medium text-blue-800 mb-2">GPA Summary</h3>
            <div className="flex flex-wrap gap-4">
              <div>
                <p className="text-sm text-blue-600">Current View GPA</p>
                <p className="text-2xl font-bold text-blue-800">{gpa.toFixed(2)}</p>
              </div>
              <div className="border-l border-blue-200 pl-4">
                <p className="text-sm text-blue-600">Courses in View</p>
                <p className="text-2xl font-bold text-blue-800">{filteredResults.length}</p>
              </div>
              <div className="border-l border-blue-200 pl-4">
                <p className="text-sm text-blue-600">Best Grade</p>
                <p className="text-2xl font-bold text-blue-800">
                  {filteredResults.length > 0
                    ? filteredResults.sort((a, b) => b.marks - a.marks)[0].grade
                    : 'N/A'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StudentResults;