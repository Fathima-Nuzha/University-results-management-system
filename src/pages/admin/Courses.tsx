import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { Course } from '../../types';
import { mockCourses, mockFaculties } from '../../data/mockData';
import { generateId, getFacultyById } from '../../utils/helpers';

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  
  // Form state
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [semester, setSemester] = useState<number>(1);
  const [creditHours, setCreditHours] = useState<number>(3);

  const resetForm = () => {
    setCourseName('');
    setCourseCode('');
    setFacultyId('');
    setSemester(1);
    setCreditHours(3);
  };

  const handleAddCourse = () => {
    setCurrentCourse(null);
    resetForm();
    setIsModalOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setCurrentCourse(course);
    setCourseName(course.name);
    setCourseCode(course.code);
    setFacultyId(course.facultyId);
    setSemester(course.semester);
    setCreditHours(course.creditHours);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (course: Course) => {
    setCourseToDelete(course);
    setIsDeleteModalOpen(true);
  };

  const handleSaveCourse = () => {
    if (!courseName.trim() || !courseCode.trim() || !facultyId) return;

    if (currentCourse) {
      // Edit existing course
      setCourses(
        courses.map((c) =>
          c.id === currentCourse.id
            ? {
                ...c,
                name: courseName,
                code: courseCode,
                facultyId,
                semester,
                creditHours,
              }
            : c
        )
      );
    } else {
      // Add new course
      const newCourse: Course = {
        id: generateId(),
        name: courseName,
        code: courseCode,
        facultyId,
        semester,
        creditHours,
      };
      setCourses([...courses, newCourse]);
    }

    setIsModalOpen(false);
    setCurrentCourse(null);
    resetForm();
  };

  const handleDeleteCourse = () => {
    if (courseToDelete) {
      setCourses(courses.filter((c) => c.id !== courseToDelete.id));
      setIsDeleteModalOpen(false);
      setCourseToDelete(null);
    }
  };

  const columns = [
    { header: 'Course Code', accessor: 'code' },
    { header: 'Course Name', accessor: 'name' },
    { 
      header: 'Faculty', 
      accessor: (course: Course) => {
        const faculty = getFacultyById(course.facultyId);
        return faculty ? faculty.name : 'Unknown';
      } 
    },
    { header: 'Semester', accessor: 'semester' },
    { header: 'Credit Hours', accessor: 'creditHours' },
    {
      header: 'Actions',
      accessor: (course: Course) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditCourse(course);
            }}
            className="p-1 text-blue-600 hover:text-blue-800"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(course);
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
        <h1 className="text-2xl font-bold text-gray-900">Manage Courses</h1>
        <Button onClick={handleAddCourse} className="flex items-center">
          <Plus size={16} className="mr-2" />
          Add Course
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          data={courses}
          keyExtractor={(course) => course.id}
        />
      </Card>

      {/* Add/Edit Course Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentCourse ? 'Edit Course' : 'Add Course'}
      >
        <div className="space-y-4">
          <Input
            label="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter course name"
            fullWidth
          />
          
          <Input
            label="Course Code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            placeholder="e.g., CS101"
            fullWidth
          />
          
          <div>
            <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">
              Faculty
            </label>
            <select
              id="faculty"
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 w-full text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Faculty</option>
              {mockFaculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.name}
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
              label="Credit Hours"
              type="number"
              value={creditHours.toString()}
              onChange={(e) => setCreditHours(parseInt(e.target.value) || 3)}
              min={1}
              max={6}
              fullWidth
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCourse}>Save</Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Course"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to delete the course "{courseToDelete?.name}"? This action
            cannot be undone.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteCourse}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CoursesPage;