import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Eye,
  FileText,
  Calendar,
  Mail,
  User,
  CheckCircle2,
  AlertCircle,
  X,
  Users as UsersIcon,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { initialAdminUsers, AdminUserRecord } from '../../data/adminMockData';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Input } from '../../components/common/Input';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<AdminUserRecord[]>(initialAdminUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Suspended'>('All');
  const [selectedUser, setSelectedUser] = useState<AdminUserRecord | null>(null);

  // Filter users by search query (name, email) and status
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [users, searchQuery, statusFilter]);

  // Toggle status for a user (Active <-> Suspended)
  const handleToggleStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );

    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser((prev) =>
        prev ? { ...prev, status: prev.status === 'Active' ? 'Suspended' : 'Active' } : null
      );
    }
  };

  // Reset filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
  };

  // Counts for summary metrics
  const totalCount = users.length;
  const activeCount = users.filter((u) => u.status === 'Active').length;
  const suspendedCount = users.filter((u) => u.status === 'Suspended').length;
  const totalResumes = users.reduce((acc, curr) => acc + (curr.resumesCount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            User Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            View, search, and manage registered candidates and resume activity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="brand" size="md">
            {totalCount} Total Accounts
          </Badge>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Users</span>
            <UsersIcon className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{totalCount}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Registered accounts</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-emerald-600 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Active Status</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">{activeCount}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">In good standing</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-rose-600 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Suspended</span>
            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="text-2xl font-bold text-rose-600">{suspendedCount}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Access restricted</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-indigo-600 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Resumes</span>
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-indigo-600">{totalResumes}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Created across accounts</p>
        </div>
      </div>

      {/* Search and Status Filter Bar */}
      <Card className="p-4 border border-slate-200/80 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* User Search */}
          <div className="w-full sm:w-80">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user by name or email..."
              leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center justify-between sm:justify-end gap-2">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
              {(['All', 'Active', 'Suspended'] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                    statusFilter === status
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {status === 'All' ? 'All Users' : status}
                </button>
              ))}
            </div>

            {(searchQuery || statusFilter !== 'All') && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs font-medium text-slate-500 hover:text-slate-800 px-2 py-1 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Filter Feedback */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800">{filteredUsers.length}</strong> of{' '}
            <strong className="text-slate-800">{users.length}</strong> users
          </span>
          {searchQuery && (
            <span className="text-slate-400 italic">
              Filtered by &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>
      </Card>

      {/* Clean Users Table */}
      <Card className="overflow-hidden border border-slate-200/80 shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500 select-none">
              <tr>
                <th scope="col" className="px-5 py-3.5">Name</th>
                <th scope="col" className="px-5 py-3.5">Email</th>
                <th scope="col" className="px-5 py-3.5 text-center">Resume Count</th>
                <th scope="col" className="px-5 py-3.5">Join Date</th>
                <th scope="col" className="px-5 py-3.5">Status</th>
                <th scope="col" className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    <div className="max-w-xs mx-auto space-y-2">
                      <UsersIcon className="w-8 h-8 mx-auto text-slate-300" />
                      <p className="font-semibold text-slate-600">No users found</p>
                      <p className="text-[11px] text-slate-400">
                        No candidate accounts match your search or status filter.
                      </p>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleClearFilters}
                        className="mt-2 text-xs"
                      >
                        Reset Search & Filters
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const initials = user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2);

                  const isActive = user.status === 'Active';

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => setSelectedUser(user)}
                    >
                      {/* Name */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                            {initials}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {user.name}
                            </div>
                            <div className="text-[10px] text-slate-400 md:hidden">{user.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-medium text-slate-700 select-all">{user.email}</span>
                        </div>
                      </td>

                      {/* Resume Count */}
                      <td className="px-5 py-3.5 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-200/60">
                          <FileText className="w-3 h-3 text-slate-500" />
                          {user.resumesCount}
                        </span>
                      </td>

                      {/* Join Date */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{user.joinedDate}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                            isActive
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                          />
                          {user.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedUser(user);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-lg transition-all cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Simple User Details View (Modal) */}
      {selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-5 relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 flex items-center justify-center font-extrabold text-base">
                  {selectedUser.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedUser.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Mail className="w-3 h-3 text-slate-400" />
                    {selectedUser.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Details Grid */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                <div>
                  <span className="text-slate-400 block text-[11px]">Account Status</span>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                        selectedUser.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          selectedUser.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                      />
                      {selectedUser.status}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Resumes Created</span>
                  <span className="font-bold text-slate-900 text-sm mt-1 block">
                    {selectedUser.resumesCount}{' '}
                    <span className="text-xs font-normal text-slate-500">
                      {selectedUser.resumesCount === 1 ? 'resume' : 'resumes'}
                    </span>
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Join Date</span>
                  <span className="font-semibold text-slate-800 mt-1 block">
                    {selectedUser.joinedDate}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Last Active</span>
                  <span className="font-semibold text-slate-800 mt-1 block">
                    {selectedUser.lastActive}
                  </span>
                </div>
              </div>

              {/* Account Meta Info */}
              <div className="p-3 rounded-lg border border-slate-100 bg-white space-y-2 text-[11px]">
                <div className="flex justify-between text-slate-600">
                  <span className="text-slate-400">User Identifier:</span>
                  <span className="font-mono text-slate-700">{selectedUser.id}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="text-slate-400">Authentication:</span>
                  <span className="font-medium text-slate-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Verified Email
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-2.5 pt-2 border-t border-slate-100">
              <Button
                variant={selectedUser.status === 'Active' ? 'danger' : 'brand'}
                size="sm"
                className="flex-1 text-xs"
                onClick={() => handleToggleStatus(selectedUser.id)}
              >
                {selectedUser.status === 'Active' ? 'Suspend Account' : 'Reactivate Account'}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => setSelectedUser(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
