import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Edit } from 'lucide-react';
import './ManageStudents.css';

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', regNo: '', email: '', password: '', courseId: '' });
  const [editingId, setEditingId] = useState(null);
  const [file, setFile] = useState(null);
  const token = localStorage.getItem('token');

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/students', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(res.data);
    } catch (error) {
      alert('Failed to fetch students');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      course: { id: parseInt(form.courseId) }
    };
    try {
      if (editingId) {
        await axios.put(`http://localhost:8080/api/students/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Student updated successfully');
      } else {
        await axios.post(`http://localhost:8080/api/students`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Student added successfully');
      }
      setForm({ name: '', regNo: '', email: '', password: '', courseId: '' });
      setEditingId(null);
      fetchStudents();
    } catch (err) {
      alert(err.response?.data || 'Error saving student');
    }
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      regNo: student.regNo,
      email: student.email,
      password: '',
      courseId: student.courseId.toString()
    });
    setEditingId(student.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete this student?')) return;
    try {
      await axios.delete(`http://localhost:8080/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Deleted successfully');
      fetchStudents();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleFileUpload = async () => {
    if (!file) return alert('Please select a file first.');
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:8080/api/students/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('CSV uploaded');
      setFile(null);
      fetchStudents();
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div className="manage-page">
      <h2 className="manage-title">Manage Students</h2>

      <form onSubmit={handleSubmit} className="student-form">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="regNo" value={form.regNo} onChange={handleChange} placeholder="Reg No" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" required={!editingId} />
        <input name="courseId" value={form.courseId} onChange={handleChange} placeholder="Course ID" required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Student</button>
      </form>

      <div className="upload-section">
        <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
        <button type="button" onClick={handleFileUpload}>Bulk Upload CSV</button>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Reg No</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.regNo}</td>
              <td>{s.email}</td>
              <td>{s.courseName}</td>
              <td>
                <button onClick={() => handleEdit(s)}><Edit size={16} /></button>
                <button onClick={() => handleDelete(s.id)}><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageStudents;
