import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { Search, Download, MapIcon as WhatsappIcon, CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

interface Student {
  name: string;
  email: string;
  phone: string;
  hasPaid: boolean; // Managed locally
}

const AdminUsersPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/v1/students');
      // Add hasPaid locally with default value false
      const studentsWithPayment = response.data.students.map(student => ({
        ...student,
        hasPaid: false, // Default to unpaid
      }));
      setStudents(studentsWithPayment);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to fetch students');
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchStudents();
    setRefreshing(false);
    toast.success('Data refreshed successfully');
  };

  const updateRentStatus = async (studentName: string, hasPaid: boolean) => {
    try {
      setUpdating(studentName); // Use name as identifier since _id isn't fetched
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.name === studentName ? { ...student, hasPaid } : student
        )
      );
      toast.success(`Rent status updated for ${studentName}`);
    } catch (err) {
      toast.error('Failed to update rent status');
    } finally {
      setUpdating(null);
    }
  };

  const sendWhatsAppReminder = (student: Student) => {
    const message = encodeURIComponent(
      `Dear ${student.name},\n\nThis is a reminder that your rent payment is pending. Kindly clear the dues at your earliest convenience.\n\nRegards,\nMother Homes`
    );
    window.open(`https://wa.me/${student.phone.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.phone.includes(searchTerm) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paidStudents = filteredStudents.filter(student => student.hasPaid);
  const unpaidStudents = filteredStudents.filter(student => !student.hasPaid);

  const StudentList = ({ students, title, isPaid }: { students: Student[], title: string, isPaid: boolean }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center">
            {isPaid ? (
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            )}
            {title}
          </h3>
          <span className={`px-3 py-1 rounded-full text-sm ${
            isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {students.length} students
          </span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room & PG
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rent Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Paid
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.name}> {/* Using name as key since _id isn't fetched */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* Leave blank since roomNumber and pgName aren't fetched */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.phone}</div>
                  <div className="text-sm text-gray-500">{student.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* Leave blank since rentAmount isn't fetched */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* Leave blank since lastPaid isn't fetched */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center space-x-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={student.hasPaid}
                        onChange={() => updateRentStatus(student.name, !student.hasPaid)}
                        disabled={updating === student.name}
                        className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                      />
                      <span className="ml-2">Paid</span>
                    </label>
                    
                    {!student.hasPaid && (
                      <button
                        onClick={() => sendWhatsAppReminder(student)}
                        className="text-green-600 hover:text-green-900"
                        title="Send WhatsApp reminder"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <Toaster position="top-right" />
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Student Rent Management</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="ml-2">Refresh</span>
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md flex items-center"
              onClick={() => {
                toast.success('Export started');
              }}
            >
              <Download size={18} className="mr-2" />
              Export Data
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, roll number, or phone"
              className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm text-gray-500 mb-1">Total Students</div>
            <div className="text-2xl font-semibold">{students.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm text-gray-500 mb-1">Paid Rent</div>
            <div className="text-2xl font-semibold text-green-600">{paidStudents.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm text-gray-500 mb-1">Pending Rent</div>
            <div className="text-2xl font-semibold text-red-600">{unpaidStudents.length}</div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading student data...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <StudentList
              students={paidStudents}
              title="Paid Rent"
              isPaid={true}
            />
            <StudentList
              students={unpaidStudents}
              title="Unpaid Rent"
              isPaid={false}
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;