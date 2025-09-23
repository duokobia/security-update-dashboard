'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { conflictData, ConflictData } from '../../../lib/mockData';
import Layout from '@/components/layout/Layout';

export default function AllConflictsPage() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('All');
  const [selectedIntensity, setSelectedIntensity] = useState('All');
  const [sortField, setSortField] = useState<keyof ConflictData>('country');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setIsClient(true);
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) router.push('/login');
  }, [router]);

  // Get unique zones and intensities for filters
  const zones = useMemo(() => {
    const uniqueZones = Array.from(new Set(conflictData.map(conflict => conflict.zone)));
    return ['All', ...uniqueZones];
  }, []);

  const intensities = useMemo(() => {
    const uniqueIntensities = Array.from(new Set(conflictData.map(conflict => conflict.intensity)));
    return ['All', ...uniqueIntensities];
  }, []);

  // Helper function to get sortable value with proper type handling
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSortableValue = (conflict: ConflictData, field: keyof ConflictData): number | string => {
    const value = conflict[field];
    
    if (value === undefined || value === null) {
      return sortDirection === 'asc' ? 
        (field === 'casualties' ? Infinity : '\uffff') : 
        (field === 'casualties' ? -Infinity : '');
    }

    switch (field) {
      case 'startDate':
        return new Date(value as string).getTime();
      case 'casualties':
        return value as number;
      default:
        return value as string;
    }
  };

  // Filter and sort conflicts
  const filteredConflicts = useMemo(() => {
    return conflictData.filter(conflict => {
      const matchesSearch = conflict.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          conflict.conflictType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          conflict.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesZone = selectedZone === 'All' || conflict.zone === selectedZone;
      const matchesIntensity = selectedIntensity === 'All' || conflict.intensity === selectedIntensity;

      return matchesSearch && matchesZone && matchesIntensity;
    }).sort((a, b) => {
      const aValue = getSortableValue(a, sortField);
      const bValue = getSortableValue(b, sortField);

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [searchTerm, selectedZone, selectedIntensity, getSortableValue, sortField, sortDirection]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredConflicts.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentConflicts = filteredConflicts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedZone, selectedIntensity, sortField, sortDirection]);

  const handleSort = (field: keyof ConflictData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: keyof ConflictData) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const getIntensityBadge = (intensity: ConflictData['intensity']) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    switch (intensity) {
      case 'Critical':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'High':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'Medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Low':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getZoneColor = (zone: string) => {
    const colors = {
      'Middle East': 'bg-blue-50 text-blue-700 border-blue-200',
      'Europe': 'bg-green-50 text-green-700 border-green-200',
      'Asia Pacific': 'bg-orange-50 text-orange-700 border-orange-200',
      'Africa': 'bg-red-50 text-red-700 border-red-200',
      'Americas': 'bg-purple-50 text-purple-700 border-purple-200',
    };
    return colors[zone as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  // Pagination controls
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => goToPage(1)}
          className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1" className="px-2">...</span>);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-1 border rounded-md ${
            currentPage === i
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="ellipsis2" className="px-2">...</span>);
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Global Conflicts Dashboard</h1>
            <p className="text-gray-600">Monitor and analyze conflicts across all regions</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="rounded-full bg-blue-100 p-3">
                  <span className="text-blue-600 text-2xl">🌍</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Conflicts</p>
                  <p className="text-2xl font-bold text-gray-900">{conflictData.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="rounded-full bg-red-100 p-3">
                  <span className="text-red-600 text-2xl">🔥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">High Intensity</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {conflictData.filter(c => c.intensity === 'High' || c.intensity === 'Critical').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="rounded-full bg-green-100 p-3">
                  <span className="text-green-600 text-2xl">⚠️</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Regions</p>
                  <p className="text-2xl font-bold text-gray-900">{zones.length - 1}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="rounded-full bg-purple-100 p-3">
                  <span className="text-purple-600 text-2xl">💀</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Casualties</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {conflictData.reduce((sum, conflict) => sum + (conflict.casualties || 0), 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                    Search Conflicts
                  </label>
                  <input
                    type="text"
                    id="search"
                    placeholder="Search by country, type, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Zone Filter */}
                <div>
                  <label htmlFor="zone" className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Region
                  </label>
                  <select
                    id="zone"
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {zones.map(zone => (
                      <option key={zone} value={zone}>{zone}</option>
                    ))}
                  </select>
                </div>

                {/* Intensity Filter */}
                <div>
                  <label htmlFor="intensity" className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Intensity
                  </label>
                  <select
                    id="intensity"
                    value={selectedIntensity}
                    onChange={(e) => setSelectedIntensity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {intensities.map(intensity => (
                      <option key={intensity} value={intensity}>{intensity}</option>
                    ))}
                  </select>
                </div>

                {/* Reset Filters */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedZone('All');
                      setSelectedIntensity('All');
                    }}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count and Controls */}
          <div className="mb-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredConflicts.length)} of {filteredConflicts.length} conflicts
              </p>
              
              {/* Rows per page selector */}
              <div className="flex items-center space-x-2">
                <label htmlFor="rowsPerPage" className="text-sm text-gray-600">Rows per page:</label>
                <select
                  id="rowsPerPage"
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortField}
                onChange={(e) => handleSort(e.target.value as keyof ConflictData)}
                className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="country">Country</option>
                <option value="zone">Region</option>
                <option value="intensity">Intensity</option>
                <option value="startDate">Start Date</option>
                <option value="casualties">Casualties</option>
              </select>
            </div>
          </div>

          {/* Conflicts Table */}
          <div className="bg-white shadow overflow-hidden rounded-lg mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('country')}
                    >
                      <div className="flex items-center">
                        Country {getSortIcon('country')}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('zone')}
                    >
                      <div className="flex items-center">
                        Region {getSortIcon('zone')}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('conflictType')}
                    >
                      <div className="flex items-center">
                        Type {getSortIcon('conflictType')}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('intensity')}
                    >
                      <div className="flex items-center">
                        Intensity {getSortIcon('intensity')}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('startDate')}
                    >
                      <div className="flex items-center">
                        Start Date {getSortIcon('startDate')}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('casualties')}
                    >
                      <div className="flex items-center">
                        Casualties {getSortIcon('casualties')}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentConflicts.map((conflict) => (
                    <tr key={conflict.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{conflict.country}</div>
                        <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">{conflict.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getZoneColor(conflict.zone)}`}>
                          {conflict.zone}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {conflict.conflictType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getIntensityBadge(conflict.intensity)}>
                          {conflict.intensity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(conflict.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {conflict.casualties ? conflict.casualties.toLocaleString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredConflicts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No conflicts found</h3>
                <p className="text-gray-500">Try adjusting your search terms or filters</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {filteredConflicts.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <div className="flex space-x-1">
                  {renderPaginationButtons()}
                </div>
                
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}