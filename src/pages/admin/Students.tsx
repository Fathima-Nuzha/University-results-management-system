import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { Student } from '../../types';
import { mockStudents, mockFaculties } from '../../data/mockData';
import { generateId, getFacultyById } from '../../utils/helpers';

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form state
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [currentSemester, setCurrentSemester] = useState<number>(1);
  const [enrollmentYear, setEnrollmentYear] = useState<number>(new Date().getFullYear());
  const [profileImage, setProfileImage] = useState('');

  const resetForm = () => {
    setName('');
    setStudentId('');
    setEmail('');
    setFacultyId('');
    setCurrentSemester(1);
    setEnrollmentYear(new Date().getFullYear());
    setProfileImage('');
  };

  const handleAddStudent = () => {
    setCurrentStudent(null);
    resetForm();
    setIsModalOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setCurrentStudent(student);
    setName(student.name);
    setStudentId(student.studentId);
    setEmail(student.email);
    setFacultyId(student.facultyId);
    setCurrentSemester(student.currentSemester);
    setEnrollmentYear(student.enrollmentYear);
    setProfileImage(student.profileImage || '');
    setIsModalOpen(true);
  };

  const handleDeleteClick = (student: Student) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  const handleSaveStudent = () => {
    if (!name.trim() || !studentId.trim() || !email.trim() || !facultyId) return;

    if (currentStudent) {
      // Edit existing student
      setStudents(
        students.map((s) =>
          s.id === currentStudent.id
            ? {
                ...s,
                name,
                studentId,
                email,
                facultyId,
                currentSemester,
                enrollmentYear,
                profileImage: profileImage || undefined,
              }
            : s
        )
      );
    } else {
      // Add new student
      const newStudent: Student = {
        id: generateId(),
        name,
        studentId,
        email,
        facultyId,
        currentSemester,
        enrollmentYear,
        profileImage: profileImage || undefined,
      };
      setStudents([...students, newStudent]);
    }

    setIsModalOpen(false);
    setCurrentStudent(null);
    resetForm();
  };

  const handleDeleteStudent = () => {
    if (studentToDelete) {
      setStudents(students.filter((s) => s.id !== studentToDelete.id));
      setIsDeleteModalOpen(false);
      setStudentToDelete(null);
    }
  };

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { 
      header: 'Student', 
      accessor: (student: Student) => (
        <div className="flex items-center">
          {student.profileImage && (
            <img
              src={student.profileImage}
              alt={student.name}
              className="h-10 w-10 rounded-full mr-3 object-cover"
            />
          )}
          <div>
            <div className="font-medium text-gray-900">{student.name}</div>
            <div className="text-gray-500 text-xs">{student.studentId}</div>
          </div>
        </div>
      )
    },
    { header: 'Email', accessor: 'email' },
    { 
      header: 'Faculty', 
      accessor: (student: Student) => {
        const faculty = getFacultyById(student.facultyId);
        return faculty ? faculty.name : 'Unknown';
      } 
    },
    { header: 'Semester', accessor: 'currentSemester' },
    { header: 'Enrollment Year', accessor: 'enrollmentYear' },
    {
      header: 'Actions',
      accessor: (student: Student) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditStudent(student);
            }}
            className="p-1 text-blue-600 hover:text-blue-800"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(student);
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
        <h1 className="text-2xl font-bold text-gray-900">Manage Students</h1>
        <Button onClick={handleAddStudent} className="flex items-center">
          <Plus size={16} className="mr-2" />
          Add Student
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search students by name, ID, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          data={filteredStudents}
          keyExtractor={(student) => student.id}
        />
      </Card>

      {/* Add/Edit Student Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentStudent ? 'Edit Student' : 'Add Student'}
      >
        <div className="space-y-4">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter student's full name"
            fullWidth
          />
          
          <Input
            label="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="e.g., STU001"
            fullWidth
          />
          
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter student's email"
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
              label="Current Semester"
              type="number"
              value={currentSemester.toString()}
              onChange={(e) => setCurrentSemester(parseInt(e.target.value) || 1)}
              min={1}
              max={8}
              fullWidth
            />
            
            <Input
              label="Enrollment Year"
              type="number"
              value={enrollmentYear.toString()}
              onChange={(e) => setEnrollmentYear(parseInt(e.target.value) || new Date().getFullYear())}
              min={2000}
              max={new Date().getFullYear()}
              fullWidth
            />
          </div>
          
          <Input
            label="Profile Image URL (optional)"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            placeholder="Enter image URL"
            fullWidth
          />
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveStudent}>Save</Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Student"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to delete the student "{studentToDelete?.name}"? This action
            cannot be undone.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteStudent}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentsPage;