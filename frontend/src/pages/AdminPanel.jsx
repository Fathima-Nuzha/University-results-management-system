import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

function AdminPanel() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="admin-page">
      <button className="logout-button" onClick={handleLogout}>Logout</button>

      <div className="admin-container">
        <h2 className="admin-title">Admin Dashboard</h2>

        <div className="admin-cards">
          <div className="admin-card">
            <h4>Manage Students</h4>
            <button onClick={() => navigate('/admin/students')}>View Students</button>
          </div>
          <div className="admin-card">
            <h4>Manage Results</h4>
            <button onClick={() => navigate('/admin/results')}>Add Results</button>
          </div>
          <div className="admin-card">
            <h4>Manage Modules</h4>
            <button onClick={() => navigate('/admin/modules')}>View Modules</button>
          </div>
          <div className="admin-card">
            <h4>Manage Courses</h4>
            <button onClick={() => navigate('/admin/courses')}>View Courses</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
