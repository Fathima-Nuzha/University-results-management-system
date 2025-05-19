import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Upload } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { Result } from '../../types';
import { mockResults, mockStudents, mockCourses } from '../../data/mockData';
import { generateId, getCourseById, getGradeLetter, getStudentById } from '../../utils/helpers';

const ResultsPage: React.FC = () => {
  const [results, setResults] = useState<Result[]>(mockResults);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResult, setCurrentResult] = useState<Result | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [resultToDelete, setResultToDelete] = useState<Result | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form state
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [semester, setSemester] = useState<number>(1);
  const [marks, setMarks] = useState<number>(0);
  const [academicYear, setAcademicYear] = useState(
    `${new Date().getFullYear() - 1}-${new Date().getFullYear()}`
  );

  const resetForm = () => {
    setStudentId('');
    setCourseId('');
    setSemester(1);
    setMarks(0);
    setAcademicYear(`${new Date().getFullYear() - 1}-${new Date().getFullYear()}`);
  };

  const handleAddResult = () => {
    setCurrentResult(null);
    resetForm();
    setIsModalOpen(true);
  };

  const handleEditResult = (result: Result) => {
    setCurrentResult(result);
    setStudentId(result.studentId);
    setCourseId(result.courseId);
    setSemester(result.semester);
    setMarks(result.marks);
    setAcademicYear(result.academicYear);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (result: Result) => {
    setResultToDelete(result);
    setIsDeleteModalOpen(true);
  };

  const handleSaveResult = () => {
    if (!studentId || !courseId || marks < 0 || marks > 100) return;

    const grade = getGradeLetter(marks);

    if (currentResult) {
      // Edit existing result
      setResults(
        results.map((r) =>
          r.id === currentResult.id
            ? {
                ...r,
                studentId,
                courseId,
                semester,
                marks,
                grade,
                academicYear,
              }
            : r
        )
      );
    } else {
      // Add new result
      const newResult: Result = {
        id: generateId(),
        studentId,
        courseId,
        semester,
        marks,
        grade,
        academicYear,
      };
      setResults([...results, newResult]);
    }

    setIsModalOpen(false);
    setCurrentResult(null);
    resetForm();
  };

  const handleDeleteResult = () => {
    if (resultToDelete) {
      setResults(results.filter((r) => r.id !== resultToDelete.id));
      setIsDeleteModalOpen(false);
      setResultToDelete(null);
    }
  };

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleUpload = () => {
    // This would be replaced with actual file upload and processing logic
    setTimeout(() => {
      setIsUploadModalOpen(false);
      // Show success message or update results
    }, 1500);
  };

  // Filter results based on search term
  const filteredResults = results.filter((result) => {
    const student = getStudentById(result.studentId);
    const course = getCourseById(result.courseId);
    const searchString = [
      student?.name || '',
      student?.studentId || '',
      course?.name || '',
      course?.code || '',
      result.grade,
      result.academicYear,
    ]
      .join(' ')
      .toLowerCase();
    
    return searchString.includes(searchTerm.toLowerCase());
  });

  const columns = [
    { 
      header: 'Student', 
      accessor: (result: Result) => {
        const student = getStudentById(result.studentId);
        return student ? (
          <div>
            <div className="font-medium text-gray-900">{student.name}</div>
            <div className="text-gray-500 text-xs">{student.studentId}</div>
          </div>
        ) : 'Unknown Student';
      } 
    },
    { 
      header: 'Course', 
      accessor: (result: Result) => {
        const course = getCourseById(result.courseId);
        return course ? (
          <div>
            <div className="font-medium text-gray-900">{course.name}</div>
            <div className="text-gray-500 text-xs">{course.code}</div>
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
    {
      header: 'Actions',
      accessor: (result: Result) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditResult(result);
            }}
            className="p-1 text-blue-600 hover:text-blue-800"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(result);
            }}
            className="p-1 text-red-600 hover:text-red-800"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Results</h1>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleUploadClick} className="flex items-center">
            <Upload size={16} className="mr-2" />
            Upload Results
          </Button>
          <Button onClick={handleAddResult} className="flex items-center">
            <Plus size={16} className="mr-2" />
            Add Result
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by student name, student ID, course name, or course code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          data={filteredResults}
          keyExtractor={(result) => result.id}
        />
      </Card>

      {/* Add/Edit Result Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentResult ? 'Edit Result' : 'Add Result'}
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="student" className="block text-sm font-medium text-gray-700 mb-1">
              Student
            </label>
            <select
              id="student"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 w-full text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Student</option>
              {mockStudents.map((student) => (
                <option key={student.id} value={student.studentId}>
                  {student.name} ({student.studentId})
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
              Course
            </label>
            <select
              id="course"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 w-full text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Course</option>
              {mockCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code}: {course.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Semester"
              type="number"
              value={semester.toString()}
              onChange={(e) => setSemester(parseInt(e.target.value) || 1)}
              min={1}
              max={8}
              fullWidth
            />
            
            <Input
              label="Academic Year"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              placeholder="e.g., 2023-2024"
              fullWidth
            />
          </div>
          
          <div>
            <label htmlFor="marks" className="block text-sm font-medium text-gray-700 mb-1">
              Marks (out of 100)
            </label>
            <input
              type="range"
              id="marks"
              min="0"
              max="100"
              value={marks}
              onChange={(e) => setMarks(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">0</span>
              <span className="text-lg font-medium">{marks}</span>
              <span className="text-sm text-gray-500">100</span>
            </div>
            <div className="text-center mt-1">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                Grade: {getGradeLetter(marks)}
              </span>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveResult}>Save</Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Result"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to delete this result? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteResult}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      {/* Upload Results Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Results"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Upload a CSV or Excel file containing student results. The file should have the following columns:
            Student ID, Course Code, Semester, Marks, Academic Year.
          </p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="mb-3">
              <Upload size={36} className="mx-auto text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 mb-2">
              Drag and drop your file here, or click to browse
            </p>
            <input
              type="file"
              className="hidden"
              accept=".csv,.xlsx,.xls"
              id="file-upload"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('file-upload')?.click()}
              className="text-sm"
            >
              Browse Files
            </Button>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload}>Upload</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ResultsPage;