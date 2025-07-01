import { useNavigate } from 'react-router-dom';
import '../App.css'; // go one folder up to reach App.css



function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-box">
        <h1>🎓 Results Management System</h1>
        <p>University of Vavuniya</p>
        <button onClick={() => navigate('/login')}>Login Here</button>
      </div>
    </div>
  );
}

export default Home;
