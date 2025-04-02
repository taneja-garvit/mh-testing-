// import React, { useState, useEffect } from 'react';
// import AdminLayout from './AdminLayout';
// import { Search, Download, Calendar, DollarSign, CheckCircle, XCircle } from 'lucide-react';
// import axios from 'axios';

// interface PaymentRecord {
//   month: string;
//   amount: number;
//   status: 'paid' | 'pending' | 'late';
//   paidOn?: string;
// }

// interface User {
//   id: string;
//   name: string;
//   pgName: string;
//   phoneNumber: string;
//   email: string;
//   joinDate: string;
// //   roomNumber: string;
//   payments: PaymentRecord[];
// }

// const AdminUsersPage: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [showPaymentHistory, setShowPaymentHistory] = useState(false);
//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         // In a real app, this would fetch from Google Sheets API
//         // const response = await axios.get(`${BACKEND_URL}/api/users`);
//         // setUsers(response.data);

//         // For demo purposes, using sample data
//         const sampleUsers: User[] = [
//           {
//             id: '1',
//             name: 'Rahul Sharma',
//             pgName: 'Mother Homes Deluxe',
//             phoneNumber: '+91 9876543210',
//             email: 'rahul.s@gmail.com',
//             joinDate: '2023-01-15',
//             // roomNumber: 'A-101',
//             payments: [
//               {
//                 month: '2024-03',
//                 amount: 8000,
//                 status: 'paid',
//                 paidOn: '2024-03-02'
//               },
//               {
//                 month: '2024-02',
//                 amount: 8000,
//                 status: 'paid',
//                 paidOn: '2024-02-01'
//               },
//               {
//                 month: '2024-01',
//                 amount: 8000,
//                 status: 'paid',
//                 paidOn: '2024-01-03'
//               }
//             ]
//           },
//           {
//             id: '2',
//             name: 'Priya Patel',
//             pgName: 'Mother Homes Premium',
//             phoneNumber: '+91 9876543211',
//             email: 'priya.p@gmail.com',
//             joinDate: '2023-02-01',
//             // roomNumber: 'B-205',
//             payments: [
//               {
//                 month: '2024-03',
//                 amount: 10000,
//                 status: 'pending'
//               },
//               {
//                 month: '2024-02',
//                 amount: 10000,
//                 status: 'late',
//                 paidOn: '2024-02-15'
//               },
//               {
//                 month: '2024-01',
//                 amount: 10000,
//                 status: 'paid',
//                 paidOn: '2024-01-02'
//               }
//             ]
//           }
//         ];

//         setUsers(sampleUsers);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch user data');
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.pgName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.phoneNumber.includes(searchTerm)
//   );

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const formatMonth = (monthString: string) => {
//     return new Date(monthString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long'
//     });
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'paid':
//         return 'bg-green-100 text-green-800';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'late':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const PaymentHistoryModal = ({ user }: { user: User }) => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
//         <div className="p-6 border-b">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-semibold">Payment History</h3>
//             <button
//               onClick={() => setShowPaymentHistory(false)}
//               className="text-gray-400 hover:text-gray-600 text-2xl"
//             >
//               ×
//             </button>
//           </div>
//           <div className="mt-2">
//             <p className="text-gray-600">User: {user.name}</p>
//             <p className="text-gray-600">PG: {user.pgName}</p>
//             {/* <p className="text-gray-600">Room: {user.roomNumber}</p> */}
//           </div>
//         </div>
        
//         <div className="p-6">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Month
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Amount
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Paid On
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {user.payments.map((payment, index) => (
//                   <tr key={index}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {formatMonth(payment.month)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       ₹{payment.amount}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)}`}>
//                         {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                       {payment.paidOn ? formatDate(payment.paidOn) : '-'}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
        
//         <div className="p-6 border-t bg-gray-50">
//           <button
//             onClick={() => setShowPaymentHistory(false)}
//             className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <AdminLayout>
//       <div className="py-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-semibold">User Management</h1>
//           <button
//             className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md flex items-center"
//             onClick={() => {
//               // Handle export functionality
//               alert('Export functionality will be implemented here');
//             }}
//           >
//             <Download size={18} className="mr-2" />
//             Export Data
//           </button>
//         </div>

//         {/* Search Bar */}
//         <div className="mb-6">
//           <div className="relative">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search by name, PG, or phone number"
//               className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             />
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//           </div>
//         </div>

//         {/* Users List */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           {loading ? (
//             <div className="p-6 text-center">
//               <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent"></div>
//               <p className="mt-4 text-gray-600">Loading user data...</p>
//             </div>
//           ) : error ? (
//             <div className="p-6 text-center text-red-500">{error}</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       User Details
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       PG & Room
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Contact
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Join Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Current Month
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredUsers.map((user) => (
//                     <tr key={user.id}>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">{user.name}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{user.pgName}</div>
//                         {/* <div className="text-sm text-gray-500">Room {user.roomNumber}</div> */}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{user.phoneNumber}</div>
//                         <div className="text-sm text-gray-500">{user.email}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{formatDate(user.joinDate)}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.payments[0].status)}`}>
//                           {user.payments[0].status === 'paid' ? (
//                             <CheckCircle size={16} className="mr-1" />
//                           ) : user.payments[0].status === 'pending' ? (
//                             <Calendar size={16} className="mr-1" />
//                           ) : (
//                             <XCircle size={16} className="mr-1" />
//                           )}
//                           {user.payments[0].status.charAt(0).toUpperCase() + user.payments[0].status.slice(1)}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <button
//                           onClick={() => {
//                             setSelectedUser(user);
//                             setShowPaymentHistory(true);
//                           }}
//                           className="text-blue-600 hover:text-blue-900"
//                         >
//                           View History
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {showPaymentHistory && selectedUser && (
//         <PaymentHistoryModal user={selectedUser} />
//       )}
//     </AdminLayout>
//   );
// };

// export default AdminUsersPage;