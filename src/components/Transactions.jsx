import React, { useState } from "react";
import { 
  DollarSign, Search, Download, Filter, 
  CheckCircle, Clock, XCircle, Eye,
  ChevronDown
} from "lucide-react";

const ACCENT_COLOR = "#094D4E";
const LIGHT_BACKGROUND = "bg-white";

// Simple transactions data
const transactionsData = [
  { id: 'T001', date: 'Oct 5, 2025', customer: 'John Smith', type: 'Subscription', amount: 49.99, status: 'Completed' },
  { id: 'T002', date: 'Oct 4, 2025', customer: 'Sarah Johnson', type: 'Product', amount: 129.00, status: 'Pending' },
  { id: 'T003', date: 'Oct 3, 2025', customer: 'Mike Davis', type: 'Service', amount: 250.50, status: 'Completed' },
  { id: 'T004', date: 'Oct 2, 2025', customer: 'Emily Wilson', type: 'Refund', amount: 75.00, status: 'Failed' },
  { id: 'T005', date: 'Oct 1, 2025', customer: 'Alex Brown', type: 'Subscription', amount: 99.99, status: 'Completed' },
];

const Transactions = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  // Filter transactions based on search and status filter
  const filteredTransactions = transactionsData.filter(transaction => {
    const matchesSearch = transaction.customer.toLowerCase().includes(search.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || transaction.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch (status) {
      case 'Completed':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' };
      case 'Pending':
        return { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' };
      case 'Failed':
        return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' };
      default:
        return { icon: Clock, color: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };

  // Calculate totals
  const totalRevenue = filteredTransactions
    .filter(t => t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalTransactions = filteredTransactions.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600">Manage and view all transactions</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <p className="text-gray-600 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <p className="text-gray-600 text-sm">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-900">{totalTransactions}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <p className="text-gray-600 text-sm">Completed</p>
          <p className="text-2xl font-bold text-green-600">
            {filteredTransactions.filter(t => t.status === 'Completed').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <p className="text-gray-600 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {filteredTransactions.filter(t => t.status === 'Pending').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          
          {/* Status Filter */}
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => {
                const StatusIcon = getStatusInfo(transaction.status).icon;
                const statusColor = getStatusInfo(transaction.status).color;
                const statusBg = getStatusInfo(transaction.status).bg;
                
                return (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {transaction.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {transaction.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-green-600">
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusBg} ${statusColor}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {transaction.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <DollarSign className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-600">No transactions found</p>
            <p className="text-sm text-gray-500">Try changing your search or filters</p>
          </div>
        )}
      </div>

      {/* Simple Pagination */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow border">
        <p className="text-sm text-gray-600">
          Showing {filteredTransactions.length} of {transactionsData.length} transactions
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 bg-teal-600 text-white rounded text-sm hover:bg-teal-700">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;