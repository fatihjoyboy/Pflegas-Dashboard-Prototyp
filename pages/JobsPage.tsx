import React, { useState, useMemo } from 'react';
import { Briefcase, Plus } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import DataTable from '../components/DataTable';
import JobDetailDrawer from '../components/JobDetailDrawer';
import { Job, FilterOption, TableColumn } from '../types';

// Dummy Data
const dummyJobs: Job[] = [
  { 
    id: '1', 
    title: 'Pflegefachkraft (m/w/d)', 
    employerId: '1', 
    employerName: 'Klinikum Nord', 
    location: 'Hamburg', 
    type: 'Vollzeit', 
    qualification: 'Krankenpflege', 
    status: 'Offen',
    postedDate: '12.10.2023',
    description: 'Wir suchen für unsere kardiologische Station eine engagierte Pflegefachkraft. Wir bieten Tarifbezahlung, flexible Arbeitszeiten und ein tolles Team.',
    requirements: ['Abgeschlossene Ausbildung', 'Bereitschaft zum Schichtdienst', 'Teamfähigkeit', 'Erfahrung in der Kardiologie von Vorteil']
  },
  { 
    id: '2', 
    title: 'Wohnbereichsleitung', 
    employerId: '2', 
    employerName: 'Seniorenstift Süd', 
    location: 'München', 
    type: 'Vollzeit', 
    qualification: 'Altenpflege', 
    status: 'Offen',
    postedDate: '10.10.2023',
    description: 'Für unseren Wohnbereich "Alpenblick" suchen wir eine erfahrene Leitungspersönlichkeit. Sie koordinieren das Team und sichern die Pflegequalität.',
    requirements: ['Weiterbildung zur WBL', 'Mind. 2 Jahre Führungserfahrung', 'Empathie und Durchsetzungsvermögen']
  },
  { 
    id: '3', 
    title: 'Pflegehelfer (m/w/d)', 
    employerId: '3', 
    employerName: 'Pflegedienst Mayer', 
    location: 'Berlin', 
    type: 'Teilzeit', 
    qualification: 'Pflegehelfer', 
    status: 'Offen',
    postedDate: '14.10.2023',
    description: 'Unterstützen Sie unser ambulantes Team bei der Grundpflege unserer Klienten in Berlin-Mitte. Führerschein Klasse B ist erforderlich.',
    requirements: ['Pflegebasiskurs', 'Führerschein Klasse B', 'Zuverlässigkeit']
  },
  { 
    id: '4', 
    title: 'Intensivpflegekraft', 
    employerId: '5', 
    employerName: 'Intensivpflege Zuhause', 
    location: 'Stuttgart', 
    type: 'Vollzeit', 
    qualification: 'Intensivpflege', 
    status: 'Besetzt',
    postedDate: '01.09.2023',
    description: '1-zu-1 Betreuung eines Beatmungspatienten in häuslicher Umgebung. Tag- und Nachtdienste im Wechsel.',
    requirements: ['Fachweiterbildung Anästhesie/Intensiv', 'Erfahrung mit Beatmungsgeräten']
  },
  { 
    id: '5', 
    title: 'Pflegefachkraft Chirurgie', 
    employerId: '7', 
    employerName: 'Uniklinik Berlin', 
    location: 'Berlin', 
    type: 'Vollzeit', 
    qualification: 'Krankenpflege', 
    status: 'Offen',
    postedDate: '15.10.2023',
    description: 'Arbeiten Sie an der Spitze der Medizin in unserer chirurgischen Abteilung. Modernste Ausstattung und Forschungsumfeld.',
    requirements: ['Examen Gesundheits- und Krankenpflege', 'Belastbarkeit', 'Interesse an Fortbildung']
  },
  { 
    id: '6', 
    title: 'Aushilfe Pflege', 
    employerId: '8', 
    employerName: 'Seniorenresidenz Alster', 
    location: 'Hamburg', 
    type: 'Minijob', 
    qualification: 'Pflegehelfer', 
    status: 'Pausiert',
    postedDate: '20.09.2023',
    description: 'Wir suchen Aushilfen für Wochenenddienste. Ideal für Studenten oder Rentner.',
    requirements: ['Erste Erfahrung in der Pflege', 'Freundliches Auftreten']
  },
  { 
    id: '7', 
    title: 'Nachtwache', 
    employerId: '6', 
    employerName: 'Caritas Pflegeheim', 
    location: 'Frankfurt', 
    type: 'Teilzeit', 
    qualification: 'Altenpflege', 
    status: 'Offen',
    postedDate: '11.10.2023',
    description: 'Dauernachtwache für unser Haus St. Martin. 7 Nächte arbeiten, 7 Tage frei.',
    requirements: ['Examen Altenpflege', 'Selbstständige Arbeitsweise']
  },
  { 
    id: '8', 
    title: 'Kinderkrankenpfleger/in', 
    employerId: '10', 
    employerName: 'Kinderintensiv Sonnenschein', 
    location: 'Köln', 
    type: 'Vollzeit', 
    qualification: 'Intensivpflege', 
    status: 'Offen',
    postedDate: '13.10.2023',
    description: 'Liebevolle Betreuung unserer kleinsten Patienten in unserer spezialisierten Wohngruppe.',
    requirements: ['Ausbildung Kinderkrankenpflege', 'Großes Herz für Kinder']
  },
  { 
    id: '9', 
    title: 'Stationsleitung', 
    employerId: '4', 
    employerName: 'Reha-Zentrum West', 
    location: 'Köln', 
    type: 'Vollzeit', 
    qualification: 'Krankenpflege', 
    status: 'Besetzt',
    postedDate: '05.09.2023',
    description: 'Leitung einer orthopädischen Reha-Station.',
    requirements: ['Führungserfahrung', 'Organisationstalent']
  },
  { 
    id: '10', 
    title: 'Pflegefachkraft Ambulant', 
    employerId: '9', 
    employerName: 'Mobile Pflege Fix', 
    location: 'München', 
    type: 'Vollzeit', 
    qualification: 'Altenpflege', 
    status: 'Offen',
    postedDate: '16.10.2023',
    description: 'Touren im Münchener Norden. Dienstwagen wird gestellt (auch privat nutzbar).',
    requirements: ['Führerschein Klasse B', 'Ortskenntnisse München Nord']
  }
];

const filterOptions: FilterOption[] = [
  { key: 'employerName', label: 'Arbeitgeber', options: ['Klinikum Nord', 'Seniorenstift Süd', 'Pflegedienst Mayer', 'Uniklinik Berlin', 'Caritas Pflegeheim'] },
  { key: 'location', label: 'Standort', options: ['Berlin', 'München', 'Hamburg', 'Köln', 'Stuttgart', 'Frankfurt'] },
  { key: 'status', label: 'Status', options: ['Offen', 'Pausiert', 'Besetzt'] },
];

const JobsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<{ key: keyof Job; direction: 'asc' | 'desc' } | null>({ key: 'postedDate', direction: 'desc' });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Filter & Sort Logic
  const filteredData = useMemo(() => {
    let data = [...dummyJobs];

    // Search
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      data = data.filter(item => 
        item.title.toLowerCase().includes(lowerTerm) ||
        item.employerName.toLowerCase().includes(lowerTerm)
      );
    }

    // Dropdown Filters
    Object.keys(activeFilters).forEach(key => {
      const value = activeFilters[key];
      if (value) {
        data = data.filter(item => item[key as keyof Job] === value);
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

  const handleSort = (key: keyof Job) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const columns: TableColumn<Job>[] = [
    { 
      header: 'Stellentitel', 
      accessorKey: 'title', 
      sortable: true,
      cell: (value) => <span className="font-semibold text-dark">{value}</span>
    },
    { header: 'Arbeitgeber', accessorKey: 'employerName', sortable: true },
    { header: 'Standort', accessorKey: 'location', sortable: true },
    { header: 'Art', accessorKey: 'type', sortable: false },
    { header: 'Qualifikation', accessorKey: 'qualification', sortable: false },
    { 
      header: 'Status', 
      accessorKey: 'status', 
      sortable: true,
      cell: (value: string) => {
        const colors: Record<string, string> = {
          'Offen': 'bg-emerald-50 text-emerald-700 border-emerald-100',
          'Pausiert': 'bg-amber-50 text-amber-700 border-amber-100',
          'Besetzt': 'bg-gray-100 text-gray-600 border-gray-200',
        };
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium ${colors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </span>
        );
      }
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-dark">Stellen</h2>
          <p className="text-gray-500 mt-1">Verwalten Sie Stellenausschreibungen und deren Besetzung.</p>
        </div>
        <button 
            onClick={() => alert('New Job Modal')}
            className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Neue Stelle anlegen
        </button>
      </div>

      <FilterBar 
        onSearchChange={setSearchTerm}
        onFilterChange={handleFilterChange}
        filterOptions={filterOptions}
        placeholder="Nach Titel oder Arbeitgeber suchen..."
      />

      <DataTable 
        columns={columns}
        data={filteredData}
        sortConfig={sortConfig}
        onSort={handleSort}
        onRowClick={setSelectedJob}
      />
      
      <div className="flex items-center justify-between text-sm text-gray-500 px-2">
        <span>Zeige {filteredData.length} von {dummyJobs.length} Stellen</span>
      </div>

      <JobDetailDrawer 
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  );
};

export default JobsPage;