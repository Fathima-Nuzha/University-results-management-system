import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Edit } from 'lucide-react';
import './ManageModules.css';

function ManageModules() {
  const [modules, setModules] = useState([]);
  const [form, setForm] = useState({ moduleCode: '', moduleName: '', semester: '', courseId: '' });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');

  const fetchModules = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/modules', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setModules(res.data);
    } catch {
      alert('Error fetching modules');
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8080/api/modules/${editingId}`, {
          ...form,
          course: { id: form.courseId },
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Module updated successfully');
      } else {
        await axios.post('http://localhost:8080/api/modules', {
          ...form,
          course: { id: form.courseId },
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Module added successfully');
      }
      setForm({ moduleCode: '', moduleName: '', semester: '', courseId: '' });
      setEditingId(null);
      fetchModules();
    } catch {
      alert('Error saving module');
    }
  };

  const handleEdit = (module) => {
    setForm({
      moduleCode: module.moduleCode,
      moduleName: module.moduleName,
      semester: module.semester,
      courseId: module.course.id,
    });
    setEditingId(module.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this module?')) return;
    try {
      await axios.delete(`http://localhost:8080/api/modules/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Module deleted');
      fetchModules();
    } catch {
      alert('Error deleting module');
    }
  };

  return (
    <div className="manage-page">
      <h2 className="manage-title">Manage Modules</h2>

      <form onSubmit={handleSubmit} className="module-form">
        <input name="moduleCode" value={form.moduleCode} onChange={handleChange} placeholder="Module Code" required />
        <input name="moduleName" value={form.moduleName} onChange={handleChange} placeholder="Module Name" required />
        <input name="semester" value={form.semester} onChange={handleChange} placeholder="Semester (e.g. Y1S1)" required />
        <input name="courseId" value={form.courseId} onChange={handleChange} placeholder="Course ID" required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Module</button>
      </form>

      <table className="module-table">
        <thead>
          <tr>
            <th>Module Code</th>
            <th>Module Name</th>
            <th>Semester</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((m) => (
            <tr key={m.id}>
              <td>{m.moduleCode}</td>
              <td>{m.moduleName}</td>
              <td>{m.semester}</td>
              <td>{m.course.courseName}</td>
              <td>
                <button onClick={() => handleEdit(m)}>
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(m.id)}>
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageModules;
