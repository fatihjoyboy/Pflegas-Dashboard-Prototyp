import React, { useState, useMemo } from 'react';
import { UserPlus } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import DataTable from '../components/DataTable';
import CandidateDetailDrawer from '../components/CandidateDetailDrawer';
import { Candidate, FilterOption, TableColumn } from '../types';

// Dummy Data Generation
const dummyCandidates: Candidate[] = [
  { id: '1', name: 'Maria Müller', qualification: 'Altenpflege', location: 'Berlin', availability: 'Vollzeit', matchScore: 95, status: 'Neu' },
  { id: '2', name: 'Thomas Weber', qualification: 'Intensivpflege', location: 'München', availability: 'Teilzeit', matchScore: 88, status: 'Interview' },
  { id: '3', name: 'Sarah Schulz', qualification: 'Krankenpflege', location: 'Hamburg', availability: 'Vollzeit', matchScore: 72, status: 'Vorgeschlagen' },
  { id: '4', name: 'Kevin Becker', qualification: 'Altenpflege', location: 'Berlin', availability: 'Flexibel', matchScore: 65, status: 'Neu' },
  { id: '5', name: 'Julia Wagner', qualification: 'Intensivpflege', location: 'Köln', availability: 'Vollzeit', matchScore: 92, status: 'Eingestellt' },
  { id: '6', name: 'Michael Schmidt', qualification: 'Krankenpflege', location: 'Berlin', availability: 'Teilzeit', matchScore: 81, status: 'Interview' },
  { id: '7', name: 'Lisa Fischer', qualification: 'Altenpflege', location: 'München', availability: 'Flexibel', matchScore: 55, status: 'Neu' },
  { id: '8', name: 'David Meyer', qualification: 'Intensivpflege', location: 'Hamburg', availability: 'Vollzeit', matchScore: 78, status: 'Vorgeschlagen' },
  { id: '9', name: 'Anna Koch', qualification: 'Krankenpflege', location: 'Stuttgart', availability: 'Teilzeit', matchScore: 89, status: 'Interview' },
  { id: '10', name: 'Patrick Hoffmann', qualification: 'Altenpflege', location: 'Berlin', availability: 'Vollzeit', matchScore: 98, status: 'Neu' },
  { id: '11', name: 'Laura Richter', qualification: 'Krankenpflege', location: 'München', availability: 'Flexibel', matchScore: 60, status: 'Vorgeschlagen' },
  { id: '12', name: 'Christian Wolf', qualification: 'Intensivpflege', location: 'Hamburg', availability: 'Vollzeit', matchScore: 85, status: 'Eingestellt' },
  { id: '13', name: 'Sandra Neumann', qualification: 'Altenpflege', location: 'Köln', availability: 'Teilzeit', matchScore: 74, status: 'Neu' },
  { id: '14', name: 'Dennis Schwarz', qualification: 'Krankenpflege', location: 'Berlin', availability: 'Vollzeit', matchScore: 91, status: 'Interview' },
  { id: '15', name: 'Jessica Zimmermann', qualification: 'Intensivpflege', location: 'Frankfurt', availability: 'Flexibel', matchScore: 68, status: 'Vorgeschlagen' },
];

const filterOptions: FilterOption[] = [
  { key: 'qualification', label: 'Qualifikation', options: ['Altenpflege', 'Krankenpflege', 'Intensivpflege'] },
  { key: 'location', label: 'Standort', options: ['Berlin', 'München', 'Hamburg', 'Köln', 'Stuttgart', 'Frankfurt'] },
  { key: 'availability', label: 'Verfügbarkeit', options: ['Vollzeit', 'Teilzeit', 'Flexibel'] },
];

const CandidatesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<{ key: keyof Candidate; direction: 'asc' | 'desc' } | null>({ key: 'matchScore', direction: 'desc' });
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // Filter & Sort Logic
  const filteredData = useMemo(() => {
    let data = [...dummyCandidates];

    // Search
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      data = data.filter(item => 
        item.name.toLowerCase().includes(lowerTerm) ||
        item.location.toLowerCase().includes(lowerTerm)
      );
    }

    // Dropdown Filters
    Object.keys(activeFilters).forEach(key => {
      const value = activeFilters[key];
      if (value) {
        data = data.filter(item => item[key as keyof Candidate] === value);
      }
    });

    // Sorting
    if (sortConfig) {
      data.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [searchTerm, activeFilters, sortConfig]);

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSort = (key: keyof Candidate) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Actions
  const handleSendProfile = (id: string) => {
    console.log('Sending profile for candidate:', id);
    alert('Profil wurde an den Arbeitgeber gesendet (Simulation).');
  };

  const handleScheduleInterview = (id: string) => {
    console.log('Scheduling interview for candidate:', id);
    alert('Interview-Kalender geöffnet (Simulation).');
  };

  // Column Definitions
  const columns: TableColumn<Candidate>[] = [
    { 
      header: 'Name', 
      accessorKey: 'name', 
      sortable: true,
      cell: (value) => <span className="font-medium text-dark">{value}</span>
    },
    { header: 'Qualifikation', accessorKey: 'qualification', sortable: false },
    { header: 'Standort', accessorKey: 'location', sortable: true },
    { header: 'Verfügbarkeit', accessorKey: 'availability', sortable: false },
    { 
      header: 'Match-Score', 
      accessorKey: 'matchScore', 
      sortable: true,
      cell: (value: number) => {
        let colorClass = 'bg-red-100 text-red-700';
        if (value >= 90) colorClass = 'bg-emerald-100 text-emerald-700';
        else if (value >= 75) colorClass = 'bg-primary-light text-primary-dark';
        else if (value >= 50) colorClass = 'bg-orange-100 text-orange-700';
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
            {value}%
          </span>
        );
      }
    },
    { 
      header: 'Status', 
      accessorKey: 'status', 
      sortable: true,
      cell: (value: string) => {
        const colors: Record<string, string> = {
          'Neu': 'bg-blue-100 text-blue-700',
          'Vorgeschlagen': 'bg-purple-100 text-purple-700',
          'Interview': 'bg-amber-100 text-amber-700',
          'Eingestellt': 'bg-emerald-100 text-emerald-700'
        };
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </span>
        );
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-dark">Kandidaten</h2>
          <p className="text-gray-500 mt-1">Verwalten und filtern Sie qualifizierte Pflegekräfte.</p>
        </div>
        <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
          <UserPlus className="w-5 h-5" />
          Neuen Kandidaten anlegen
        </button>
      </div>

      <FilterBar 
        onSearchChange={setSearchTerm}
        onFilterChange={handleFilterChange}
        filterOptions={filterOptions}
        placeholder="Nach Name oder Ort suchen..."
      />

      <DataTable 
        columns={columns}
        data={filteredData}
        sortConfig={sortConfig}
        onSort={handleSort}
        onRowClick={setSelectedCandidate}
      />
      
      <div className="flex items-center justify-between text-sm text-gray-500 px-2">
        <span>Zeige {filteredData.length} von {dummyCandidates.length} Kandidaten</span>
      </div>

      <CandidateDetailDrawer 
        candidate={selectedCandidate}
        isOpen={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onSendProfile={handleSendProfile}
        onScheduleInterview={handleScheduleInterview}
      />
    </div>
  );
};

export default CandidatesPage;