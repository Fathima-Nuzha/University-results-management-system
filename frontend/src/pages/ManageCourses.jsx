import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit } from "lucide-react";
import './ManageCourses.css';

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ courseName: '' });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem('token');

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data);
    } catch {
      alert("Failed to fetch courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8080/api/courses/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Course updated successfully");
      } else {
        await axios.post("http://localhost:8080/api/courses", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Course added successfully");
      }
      setForm({ courseName: "" });
      setEditingId(null);
      fetchCourses();
    } catch (err) {
      alert(err.response?.data || "Error saving course");
    }
  };

  const handleEdit = (course) => {
    setForm({ courseName: course.courseName });
    setEditingId(course.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Course deleted");
      fetchCourses();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="manage-page">
      <h2 className="manage-title">Manage Courses</h2>

      <form onSubmit={handleSubmit} className="course-form">
        <input
          name="courseName"
          value={form.courseName}
          onChange={handleChange}
          placeholder="Course Name"
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"} Course</button>
      </form>

      <table className="course-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.courseName}</td>
              <td>
                <button onClick={() => handleEdit(course)}>
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(course.id)}>
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

export default ManageCourses;
