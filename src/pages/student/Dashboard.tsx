import React from 'react';
import { GraduationCap, BookOpen, Calendar, Award } from 'lucide-react';
import Card from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import { getFacultyById, getStudentById, getStudentResults, calculateGPA, getCourseById } from '../../utils/helpers';

const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const studentId = currentUser?.studentId;
  
  const student = studentId ? getStudentById(studentId) : null;
  const faculty = student ? getFacultyById(student.facultyId) : null;
  const results = studentId ? getStudentResults(studentId) : [];
  const gpa = calculateGPA(results);
  
  const completedCourses = results.length;
  const totalCredits = results.reduce((sum, result) => {
    const course = getCourseById(result.courseId);
    return sum + (course?.creditHours || 0);
  }, 0);

  // Get the latest 5 results
  const recentResults = [...results]
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 5);

  if (!student) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-gray-700">Student information not found</h2>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
        <div className="w-full md:w-1/3">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-24 bg-gradient-to-r from-blue-500 to-purple-500" />
            <div className="relative pt-12 pb-4 px-4 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                {student.profileImage ? (
                  <img
                    src={student.profileImage}
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <GraduationCap size={40} />
                  </div>
                )}
              </div>
              <h2 className="mt-4 text-xl font-bold text-gray-900">{student.name}</h2>
              <p className="text-gray-500">{student.studentId}</p>
              <div className="w-full mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{student.email}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Faculty:</span>
                  <span className="font-medium">{faculty?.name || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Current Semester:</span>
                  <span className="font-medium">{student.currentSemester}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Enrollment Year:</span>
                  <span className="font-medium">{student.enrollmentYear}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="w-full md:w-2/3 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-blue-50 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-blue-600">Current GPA</p>
                  <p className="text-xl font-semibold">{gpa.toFixed(2)}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-purple-50 border-l-4 border-purple-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-purple-600">Courses Completed</p>
                  <p className="text-xl font-semibold">{completedCourses}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-green-50 border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-600">Credits Earned</p>
                  <p className="text-xl font-semibold">{totalCredits}</p>
                </div>
              </div>
            </Card>
          </div>

          <Card title="Recent Results">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Semester
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Marks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentResults.length > 0 ? (
                    recentResults.map((result) => {
                      const course = getCourseById(result.courseId);
                      return (
                        <tr key={result.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {course?.name || 'Unknown Course'}
                            </div>
                            <div className="text-sm text-gray-500">{course?.code || 'N/A'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.semester}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.marks}/100
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {result.grade}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                        No recent results available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;