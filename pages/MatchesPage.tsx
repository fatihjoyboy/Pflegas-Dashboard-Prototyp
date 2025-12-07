import React, { useState } from 'react';
import { Match, MatchStatus } from '../types';
import { User, Building2, GripVertical, CheckCircle2, Info, X } from 'lucide-react';
import MatchDetailModal from '../components/MatchDetailModal';

// Dummy Data
const initialMatches: Match[] = [
  { id: 'm1', candidateId: '1', candidateName: 'Maria Müller', candidateQualification: 'Altenpflege', jobId: 'j1', jobTitle: 'Pflegefachkraft', employerName: 'Klinikum Nord', matchScore: 95, status: 'Neu', lastUpdated: '12.10.2023' },
  { id: 'm2', candidateId: '2', candidateName: 'Thomas Weber', candidateQualification: 'Intensivpflege', jobId: 'j2', jobTitle: 'Wohnbereichsleitung', employerName: 'Seniorenstift Süd', matchScore: 88, status: 'Interview', lastUpdated: '10.10.2023' },
  { id: 'm3', candidateId: '3', candidateName: 'Sarah Schulz', candidateQualification: 'Krankenpflege', jobId: 'j3', jobTitle: 'Pflegehelfer', employerName: 'Pflegedienst Mayer', matchScore: 72, status: 'Vorgeschlagen', lastUpdated: '14.10.2023' },
  { id: 'm4', candidateId: '4', candidateName: 'Kevin Becker', candidateQualification: 'Altenpflege', jobId: 'j4', jobTitle: 'Aushilfe Pflege', employerName: 'Seniorenresidenz Alster', matchScore: 65, status: 'Neu', lastUpdated: '15.10.2023' },
  { id: 'm5', candidateId: '5', candidateName: 'Julia Wagner', candidateQualification: 'Intensivpflege', jobId: 'j5', jobTitle: 'Intensivpflegekraft', employerName: 'Intensivpflege Zuhause', matchScore: 92, status: 'Eingestellt', lastUpdated: '01.10.2023' },
  { id: 'm6', candidateId: '6', candidateName: 'Michael Schmidt', candidateQualification: 'Krankenpflege', jobId: 'j6', jobTitle: 'Pflegefachkraft Chirurgie', employerName: 'Uniklinik Berlin', matchScore: 81, status: 'Interview', lastUpdated: '13.10.2023' },
  { id: 'm7', candidateId: '7', candidateName: 'Lisa Fischer', candidateQualification: 'Altenpflege', jobId: 'j7', jobTitle: 'Nachtwache', employerName: 'Caritas Pflegeheim', matchScore: 55, status: 'Neu', lastUpdated: '16.10.2023' },
  { id: 'm8', candidateId: '8', candidateName: 'David Meyer', candidateQualification: 'Intensivpflege', jobId: 'j8', jobTitle: 'Kinderkrankenpfleger/in', employerName: 'Kinderintensiv Sonnenschein', matchScore: 78, status: 'Vorgeschlagen', lastUpdated: '11.10.2023' },
  { id: 'm9', candidateId: '9', candidateName: 'Anna Koch', candidateQualification: 'Krankenpflege', jobId: 'j9', jobTitle: 'Pflegefachkraft', employerName: 'Klinikum Nord', matchScore: 89, status: 'Angebot', lastUpdated: '09.10.2023' },
  { id: 'm10', candidateId: '10', candidateName: 'Patrick Hoffmann', candidateQualification: 'Altenpflege', jobId: 'j10', jobTitle: 'Pflegefachkraft Ambulant', employerName: 'Mobile Pflege Fix', matchScore: 98, status: 'Neu', lastUpdated: '17.10.2023' },
  { id: 'm11', candidateId: '11', candidateName: 'Laura Richter', candidateQualification: 'Krankenpflege', jobId: 'j1', jobTitle: 'Pflegefachkraft', employerName: 'Klinikum Nord', matchScore: 60, status: 'Vorgeschlagen', lastUpdated: '12.10.2023' },
  { id: 'm12', candidateId: '12', candidateName: 'Christian Wolf', candidateQualification: 'Intensivpflege', jobId: 'j5', jobTitle: 'Intensivpflegekraft', employerName: 'Intensivpflege Zuhause', matchScore: 85, status: 'Eingestellt', lastUpdated: '02.10.2023' },
  { id: 'm13', candidateId: '13', candidateName: 'Sandra Neumann', candidateQualification: 'Altenpflege', jobId: 'j2', jobTitle: 'Wohnbereichsleitung', employerName: 'Seniorenstift Süd', matchScore: 74, status: 'Neu', lastUpdated: '15.10.2023' },
];

const COLUMNS: MatchStatus[] = ['Neu', 'Vorgeschlagen', 'Interview', 'Angebot', 'Eingestellt'];

const MatchesPage: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [draggedMatchId, setDraggedMatchId] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [showInfoHint, setShowInfoHint] = useState(true);

  // Drag & Drop Handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedMatchId(id);
    e.dataTransfer.effectAllowed = 'move';
    // Small timeout to allow the element to be dragged but style change to apply to original
    setTimeout(() => {
        const el = (e.target as HTMLElement);
        el.classList.add('opacity-50');
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedMatchId(null);
    const el = (e.target as HTMLElement);
    el.classList.remove('opacity-50');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e: React.DragEvent, targetStatus: MatchStatus) => {
    e.preventDefault();
    if (!draggedMatchId) return;

    setMatches((prevMatches) => 
      prevMatches.map((match) => 
        match.id === draggedMatchId ? { ...match, status: targetStatus } : match
      )
    );
  };

  const handleInfoClick = () => {
    setIsInfoOpen(true);
    setShowInfoHint(false);
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (score >= 75) return 'text-primary-dark bg-primary-light border-primary/20';
    return 'text-amber-600 bg-amber-50 border-amber-100';
  };

  return (
    <div className="h-full flex flex-col overflow-hidden relative">
      <div className="mb-6 flex-shrink-0 flex items-start justify-between">
        <div>
           <h2 className="text-2xl font-bold text-dark">Matches Board</h2>
           <p className="text-gray-500 mt-1">Verwalten Sie den Status Ihrer Vermittlungen per Drag & Drop.</p>
        </div>
        
        <div className="relative">
            {showInfoHint && (
                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 z-20">
                    <div className="bg-dark text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl relative animate-bounce whitespace-nowrap">
                        Klick hier!
                        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2.5 h-2.5 bg-dark rotate-45"></div>
                    </div>
                </div>
            )}
            <button 
              onClick={handleInfoClick}
              className={`
                p-2 rounded-full transition-all shadow-sm relative z-10
                ${showInfoHint ? 'bg-primary ring-4 ring-primary/30' : 'bg-primary hover:bg-primary-dark'}
                text-white
              `}
              title="Info zum Board"
            >
              <Info className="w-5 h-5" />
            </button>
        </div>
      </div>
      
      {/* Info Popup Modal */}
      {isInfoOpen && (
        <>
            <div 
                className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40" 
                onClick={() => setIsInfoOpen(false)}
            />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl z-50 max-w-lg w-[90%] p-6 border border-gray-100 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-dark flex items-center gap-2">
                        Warum gibt es hier ein Kanban-Board für Matches?
                    </h3>
                    <button 
                        onClick={() => setIsInfoOpen(false)}
                        className="text-gray-400 hover:text-dark transition-colors p-1 rounded-full hover:bg-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="space-y-5 text-sm text-gray-700 leading-relaxed">
                    <p>
                        Dieses Board zeigt alle laufenden Vermittlungen zwischen Pflegekräften und Arbeitgebern – Schritt für Schritt.
                        Dadurch sieht man sofort, wo eine Vermittlung gerade feststeckt und was als Nächstes getan werden sollte.
                    </p>

                    <div>
                        <h4 className="font-semibold text-primary mb-2">Vorteile für dein Team:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600 marker:text-primary">
                            <li>Du erkennst schnell, welche Kandidaten gerade vorgeschlagen, im Interview oder bereits kurz vor der Einstellung stehen.</li>
                            <li>Keine losen Zettel oder Excel-Listen mehr – alles ist sauber strukturiert.</li>
                            <li>Weniger manuelle Nachverfolgung, weil der Status immer klar sichtbar ist.</li>
                            <li>Jede Verschiebung im Board (z. B. „Interview → Angebot“) kann später automatisiert werden.</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-primary mb-2">Was wir damit später automatisieren können:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600 marker:text-primary">
                            <li>Automatische Erinnerungen an Arbeitgeber, wenn ein Vorschlag offen bleibt</li>
                            <li>Automatische Infos an Kandidaten bei Interview- oder Angebotsstatus</li>
                            <li>Interne Aufgaben, wenn ein Angebot erstellt werden soll</li>
                            <li>Automatische Abrechnung, sobald eine Einstellung markiert ist</li>
                        </ul>
                    </div>

                    <div className="bg-primary-light p-4 rounded-lg border border-primary/10 text-primary-dark font-medium mt-2 shadow-sm">
                        Dieses Kanban-System macht den gesamten Vermittlungsprozess transparenter, schneller und skalierbarer – besonders wenn viele Matches gleichzeitig laufen.
                    </div>
                </div>
            </div>
        </>
      )}
      
      {/* Kanban Board Container */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full gap-6 min-w-[1200px] pb-4">
          
          {COLUMNS.map((status) => {
            const columnMatches = matches.filter(m => m.status === status);
            
            return (
              <div 
                key={status} 
                className="flex-1 min-w-[280px] max-w-xs flex flex-col bg-gray-50/80 rounded-xl border border-gray-200"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, status)}
              >
                {/* Column Header */}
                <div className="p-3 border-b border-gray-200 bg-gray-100/50 rounded-t-xl flex items-center justify-between">
                  <span className="font-semibold text-gray-700 text-sm">{status}</span>
                  <span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold text-gray-500 border border-gray-200 shadow-sm">
                    {columnMatches.length}
                  </span>
                </div>

                {/* Column Content */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {columnMatches.map((match) => (
                    <div
                      key={match.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, match.id)}
                      onDragEnd={handleDragEnd}
                      onClick={() => setSelectedMatch(match)}
                      className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-primary/30 transition-all group"
                    >
                      {/* Card Header: Score & Drag Handle */}
                      <div className="flex items-center justify-between mb-2">
                        <div className={`px-2 py-0.5 rounded text-xs font-bold border ${getMatchScoreColor(match.matchScore)}`}>
                          {match.matchScore}% Match
                        </div>
                        <GripVertical className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Card Body */}
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <User className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-semibold text-dark leading-tight">{match.candidateName}</div>
                            <div className="text-xs text-gray-500">{match.candidateQualification}</div>
                          </div>
                        </div>

                        <div className="w-full h-px bg-gray-50"></div>

                        <div className="flex items-start gap-2">
                          <Building2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-gray-800 leading-tight">{match.employerName}</div>
                            <div className="text-xs text-gray-500">{match.jobTitle}</div>
                          </div>
                        </div>
                      </div>
                      
                      {status === 'Eingestellt' && (
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Erfolgreich vermittelt
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {columnMatches.length === 0 && (
                     <div className="h-24 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs italic">
                        Leer
                     </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <MatchDetailModal 
        match={selectedMatch}
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />
    </div>
  );
};

export default MatchesPage;