import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Edit } from 'lucide-react';
import './ManageResults.css';

function ManageResults() {
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [modules, setModules] = useState([]);
  const [form, setForm] = useState({ studentId: '', moduleId: '', marks: '', grade: '' });
  const [editingId, setEditingId] = useState(null);
  const [file, setFile] = useState(null);

  const token = localStorage.getItem('token');

  // Fetch all results
  const fetchResults = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/results', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResults(res.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching results');
    }
  };

  // Fetch students for dropdown
  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/students', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching students');
    }
  };

  // Fetch modules for dropdown
  const fetchModules = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/modules', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setModules(res.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching modules');
    }
  };

  useEffect(() => {
    fetchResults();
    fetchStudents();
    fetchModules();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.studentId || !form.moduleId || !form.marks || !form.grade) {
      alert('All fields are required');
      return;
    }

    const payload = {
      studentId: Number(form.studentId),
      moduleId: Number(form.moduleId),
      marks: parseFloat(form.marks),
      grade: form.grade,
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:8080/api/results/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Result updated successfully');
      } else {
        await axios.post('http://localhost:8080/api/results', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Result added successfully');
      }
      setForm({ studentId: '', moduleId: '', marks: '', grade: '' });
      setEditingId(null);
      fetchResults();
    } catch (error) {
      console.error(error);
      alert('Error saving result');
    }
  };

  const handleEdit = (result) => {
    setForm({
      studentId: String(result.studentId),
      moduleId: String(result.moduleId),
      marks: result.marks,
      grade: result.grade,
    });
    setEditingId(result.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this result?')) return;
    try {
      await axios.delete(`http://localhost:8080/api/results/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Result deleted');
      fetchResults();
    } catch (error) {
      console.error(error);
      alert('Error deleting result');
    }
  };

  const handleFileUpload = async () => {
    if (!file) return alert('Select a CSV file first');
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('http://localhost:8080/api/results/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Bulk upload successful');
      setFile(null);
      fetchResults();
    } catch (error) {
      console.error(error);
      alert('Bulk upload failed');
    }
  };

  return (
    <div className="manage-page">
      <h2 className="manage-title">Manage Results</h2>

      <form onSubmit={handleSubmit} className="result-form">
        <select name="studentId" value={form.studentId} onChange={handleChange} required>
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.regNo || s.id})
            </option>
          ))}
        </select>

        <select name="moduleId" value={form.moduleId} onChange={handleChange} required>
          <option value="">Select Module</option>
          {modules.map((m) => (
            <option key={m.id} value={m.id}>
              {m.moduleCode} - {m.moduleName}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="marks"
          value={form.marks}
          onChange={handleChange}
          placeholder="Marks"
          min="0"
          max="100"
          step="0.01"
          required
        />
        <input
          name="grade"
          value={form.grade}
          onChange={handleChange}
          placeholder="Grade"
          required
        />

        <button type="submit">{editingId ? 'Update' : 'Add'} Result</button>
      </form>

      <div className="upload-section">
        <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleFileUpload} disabled={!file}>
          Bulk Upload CSV
        </button>
      </div>

      <table className="result-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Module</th>
            <th>Marks</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {results.length > 0 ? (
                results.map((result) => (
                <tr key={result.id}>
                    <td>{result.studentId}</td>         {/* Or map to student name if needed */}
                    <td>{result.moduleCode}</td>        {/* Showing moduleCode */}
                    <td>{result.marks}</td>             {/* Showing marks */}
                    <td>{result.grade}</td>             {/* Showing grade */}
                    <td>
                    <button onClick={() => handleEdit(result)}><Edit size={16} /></button>
                    <button onClick={() => handleDelete(result.id)}><Trash2 size={16} /></button>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                    No results found.
                </td>
                </tr>
            )}
            </tbody>


      </table>
    </div>
  );
}

export default ManageResults;
