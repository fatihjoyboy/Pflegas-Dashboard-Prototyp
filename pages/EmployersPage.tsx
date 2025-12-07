import React, { useState, useMemo } from 'react';
import { Building2, Plus } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import DataTable from '../components/DataTable';
import EmployerDetailDrawer from '../components/EmployerDetailDrawer';
import { Employer, FilterOption, TableColumn } from '../types';

// Dummy Data
const dummyEmployers: Employer[] = [
  { id: '1', name: 'Klinikum Nord', location: 'Hamburg', type: 'Krankenhaus', openJobsCount: 12, priority: 'Premium', contactPerson: 'Dr. Stefan Müller', email: 's.mueller@klinikum-nord.de', phone: '040-12345678', address: 'Nordallee 1, 20251 Hamburg' },
  { id: '2', name: 'Seniorenstift Süd', location: 'München', type: 'Pflegeheim', openJobsCount: 5, priority: 'Normal', contactPerson: 'Anna Schmidt', email: 'leitung@stift-sued.de', phone: '089-98765432', address: 'Sonnenstraße 45, 80331 München' },
  { id: '3', name: 'Pflegedienst Mayer', location: 'Berlin', type: 'Ambulant', openJobsCount: 3, priority: 'Normal', contactPerson: 'Peter Mayer', email: 'info@pflegedienst-mayer.de', phone: '030-5555555', address: 'Hauptstraße 10, 10115 Berlin' },
  { id: '4', name: 'Reha-Zentrum West', location: 'Köln', type: 'Krankenhaus', openJobsCount: 8, priority: 'Premium', contactPerson: 'Lisa Wagner', email: 'personal@reha-west.de', phone: '0221-11223344', address: 'Rheinufer 5, 50667 Köln' },
  { id: '5', name: 'Intensivpflege Zuhause', location: 'Stuttgart', type: 'Intensivpflege', openJobsCount: 2, priority: 'Premium', contactPerson: 'Markus Weber', email: 'kontakt@intensiv-zuhause.de', phone: '0711-44332211', address: 'Schlossplatz 2, 70173 Stuttgart' },
  { id: '6', name: 'Caritas Pflegeheim', location: 'Frankfurt', type: 'Pflegeheim', openJobsCount: 6, priority: 'Normal', contactPerson: 'Schwester Monika', email: 'monika@caritas-ffm.de', phone: '069-99887766', address: 'Domplatz 3, 60311 Frankfurt' },
  { id: '7', name: 'Uniklinik Berlin', location: 'Berlin', type: 'Krankenhaus', openJobsCount: 25, priority: 'Premium', contactPerson: 'Prof. Dr. Klein', email: 'hr@charite-dummy.de', phone: '030-45050', address: 'Charitéplatz 1, 10117 Berlin' },
  { id: '8', name: 'Seniorenresidenz Alster', location: 'Hamburg', type: 'Pflegeheim', openJobsCount: 4, priority: 'Normal', contactPerson: 'Hans Hansen', email: 'hansen@residenz-alster.de', phone: '040-2222222', address: 'Alsterufer 10, 20354 Hamburg' },
  { id: '9', name: 'Mobile Pflege Fix', location: 'München', type: 'Ambulant', openJobsCount: 1, priority: 'Normal', contactPerson: 'Petra Flink', email: 'info@pflege-fix.de', phone: '089-1111111', address: 'Leopoldstraße 20, 80802 München' },
  { id: '10', name: 'Kinderintensiv Sonnenschein', location: 'Köln', type: 'Intensivpflege', openJobsCount: 3, priority: 'Premium', contactPerson: 'Julia Sonn', email: 'jobs@sonnenschein-pflege.de', phone: '0221-555666', address: 'Sülzburgstraße 100, 50937 Köln' },
];

const filterOptions: FilterOption[] = [
  { key: 'location', label: 'Region', options: ['Berlin', 'München', 'Hamburg', 'Köln', 'Stuttgart', 'Frankfurt'] },
  { key: 'type', label: 'Typ', options: ['Krankenhaus', 'Pflegeheim', 'Ambulant', 'Intensivpflege'] },
];

const EmployersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<{ key: keyof Employer; direction: 'asc' | 'desc' } | null>({ key: 'openJobsCount', direction: 'desc' });
  const [selectedEmployer, setSelectedEmployer] = useState<Employer | null>(null);

  // Filter & Sort Logic
  const filteredData = useMemo(() => {
    let data = [...dummyEmployers];

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
        data = data.filter(item => item[key as keyof Employer] === value);
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

  const handleSort = (key: keyof Employer) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const columns: TableColumn<Employer>[] = [
    { 
      header: 'Firmenname', 
      accessorKey: 'name', 
      sortable: true,
      cell: (value) => <span className="font-semibold text-dark">{value}</span>
    },
    { header: 'Standort', accessorKey: 'location', sortable: true },
    { 
      header: 'Typ', 
      accessorKey: 'type', 
      sortable: true,
      cell: (value: string) => {
        const colors: Record<string, string> = {
          'Krankenhaus': 'bg-blue-50 text-blue-700 border-blue-100',
          'Pflegeheim': 'bg-emerald-50 text-emerald-700 border-emerald-100',
          'Ambulant': 'bg-purple-50 text-purple-700 border-purple-100',
          'Intensivpflege': 'bg-rose-50 text-rose-700 border-rose-100'
        };
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded border text-xs font-medium ${colors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </span>
        );
      }
    },
    { 
      header: 'Offene Stellen', 
      accessorKey: 'openJobsCount', 
      sortable: true,
      cell: (value: number) => (
        <div className="flex items-center gap-2">
            <span className="font-medium">{value}</span>
            {value > 10 && <span className="w-2 h-2 rounded-full bg-rose-500" title="Hoher Bedarf"></span>}
        </div>
      )
    },
    { 
      header: 'Priorität', 
      accessorKey: 'priority', 
      sortable: true,
      cell: (value: string) => {
        if (value === 'Premium') {
          return (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
              Premium
            </span>
          );
        }
        return <span className="text-gray-500 text-xs">Normal</span>;
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-dark">Arbeitgeber</h2>
          <p className="text-gray-500 mt-1">Verwalten Sie Partner-Einrichtungen und deren Bedarf.</p>
        </div>
        <button 
            onClick={() => alert('New Employer Modal')}
            className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Neuen Arbeitgeber anlegen
        </button>
      </div>

      <FilterBar 
        onSearchChange={setSearchTerm}
        onFilterChange={handleFilterChange}
        filterOptions={filterOptions}
        placeholder="Nach Firmenname suchen..."
      />

      <DataTable 
        columns={columns}
        data={filteredData}
        sortConfig={sortConfig}
        onSort={handleSort}
        onRowClick={setSelectedEmployer}
      />
      
      <div className="flex items-center justify-between text-sm text-gray-500 px-2">
        <span>Zeige {filteredData.length} von {dummyEmployers.length} Arbeitgebern</span>
      </div>

      <EmployerDetailDrawer 
        employer={selectedEmployer}
        isOpen={!!selectedEmployer}
        onClose={() => setSelectedEmployer(null)}
      />
    </div>
  );
};

export default EmployersPage;