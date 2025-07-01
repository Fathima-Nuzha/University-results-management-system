// src/pages/Results.jsx
import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Results.css';

function Results() {
  const [studentResults, setStudentResults] = useState(null);
  const [regNo, setRegNo] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultRef = useRef();

  const fetchResults = async (regNoParam) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:8080/api/students/me/results?regNo=${encodeURIComponent(regNoParam)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error(`Failed to fetch results: ${response.statusText}`);

      const data = await response.json();
      setStudentResults(data);
    } catch (err) {
      setError(err.message || 'Error fetching results');
      setStudentResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!regNo.trim()) {
      setError('Please enter a registration number');
      return;
    }
    setIsSubmitted(true);
    fetchResults(regNo.trim());
  };

  const handleDownloadPDF = async () => {
            if (!resultRef.current) return;

            // Hide buttons before rendering
            const buttons = resultRef.current.querySelectorAll('.hide-on-pdf');
            buttons.forEach(btn => (btn.style.visibility = 'hidden'));

            const canvas = await html2canvas(resultRef.current);
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('Result_Sheet.pdf');

            // Restore buttons after rendering
            buttons.forEach(btn => btn.style.visibility = 'visible');
          };


  return (
    <div className="results-page">
      <nav className="results-nav">
        <h2>🎓 Results Management System</h2>
        <p>Welcome, Student</p>
      </nav>

      <div className="results-container">
        <form onSubmit={handleSubmit} className="results-form">
          <input
            type="text"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            placeholder="Enter Registration Number"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'View Results'}
          </button>
        </form>

        {isSubmitted && (
          <>
            {error && <p className="error-message">{error}</p>}

            {studentResults && (
              <div ref={resultRef}>
                <h3>
                  Results for {studentResults.name} ({studentResults.regNo})
                </h3>

                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Module Code</th>
                      <th>Marks</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentResults.results && studentResults.results.length > 0 ? (
                      studentResults.results.map((result) => (
                        <tr key={result.id}>
                          <td>{result.moduleCode}</td>
                          <td>{result.marks}</td>
                          <td>{result.grade}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" style={{ textAlign: 'center' }}>
                          No results found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div className="results-footer">
                  <button onClick={handleDownloadPDF} className="hide-on-pdf">
                    Download PDF
                  </button>
                  {/* <div className="cgpa">CGPA: {studentResults.cgpa.toFixed(2)}</div> */}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Results;
