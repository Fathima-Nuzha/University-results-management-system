import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { Faculty } from '../../types';
import { mockFaculties } from '../../data/mockData';
import { generateId } from '../../utils/helpers';

const FacultiesPage: React.FC = () => {
  const [faculties, setFaculties] = useState<Faculty[]>(mockFaculties);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFaculty, setCurrentFaculty] = useState<Faculty | null>(null);
  const [facultyName, setFacultyName] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState<Faculty | null>(null);

  const handleAddFaculty = () => {
    setCurrentFaculty(null);
    setFacultyName('');
    setIsModalOpen(true);
  };

  const handleEditFaculty = (faculty: Faculty) => {
    setCurrentFaculty(faculty);
    setFacultyName(faculty.name);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (faculty: Faculty) => {
    setFacultyToDelete(faculty);
    setIsDeleteModalOpen(true);
  };

  const handleSaveFaculty = () => {
    if (!facultyName.trim()) return;

    if (currentFaculty) {
      // Edit existing faculty
      setFaculties(
        faculties.map((f) => (f.id === currentFaculty.id ? { ...f, name: facultyName } : f))
      );
    } else {
      // Add new faculty
      const newFaculty: Faculty = {
        id: generateId(),
        name: facultyName,
      };
      setFaculties([...faculties, newFaculty]);
    }

    setIsModalOpen(false);
    setCurrentFaculty(null);
    setFacultyName('');
  };

  const handleDeleteFaculty = () => {
    if (facultyToDelete) {
      setFaculties(faculties.filter((f) => f.id !== facultyToDelete.id));
      setIsDeleteModalOpen(false);
      setFacultyToDelete(null);
    }
  };

  const columns = [
    { header: 'ID', accessor: (faculty: Faculty) => faculty.id },
    { header: 'Faculty Name', accessor: (faculty: Faculty) => faculty.name },
    {
      header: 'Actions',
      accessor: (faculty: Faculty) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditFaculty(faculty);
            }}
            className="p-1 text-blue-600 hover:text-blue-800"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(faculty);
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
        <h1 className="text-2xl font-bold text-gray-900">Manage Faculties</h1>
        <Button onClick={handleAddFaculty} className="flex items-center">
          <Plus size={16} className="mr-2" />
          Add Faculty
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          data={faculties}
          keyExtractor={(faculty) => faculty.id}
        />
      </Card>

      {/* Add/Edit Faculty Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentFaculty ? 'Edit Faculty' : 'Add Faculty'}
      >
        <div className="space-y-4">
          <Input
            label="Faculty Name"
            value={facultyName}
            onChange={(e) => setFacultyName(e.target.value)}
            placeholder="Enter faculty name"
            fullWidth
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveFaculty}>Save</Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Faculty"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to delete the faculty "{facultyToDelete?.name}"? This action
            cannot be undone.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteFaculty}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FacultiesPage;