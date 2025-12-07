import React from 'react';
import { X, MapPin, Clock, Star, Briefcase, Mail, Calendar, ExternalLink } from 'lucide-react';
import { Candidate } from '../types';

interface CandidateDetailDrawerProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
  onSendProfile: (id: string) => void;
  onScheduleInterview: (id: string) => void;
}

const CandidateDetailDrawer: React.FC<CandidateDetailDrawerProps> = ({
  candidate,
  isOpen,
  onClose,
  onSendProfile,
  onScheduleInterview,
}) => {
  if (!isOpen || !candidate) return null;

  // Dummy data for linked jobs
  const linkedJobs = [
    { id: 1, title: 'Pflegefachkraft (m/w/d)', facility: 'Seniorenstift Süd', date: '12.10.2023', status: 'Vorgeschlagen' },
    { id: 2, title: 'Intensivpflege', facility: 'Klinikum Nord', date: '05.10.2023', status: 'Abgelehnt' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-surface">
          <h2 className="text-lg font-semibold text-dark">Kandidatenprofil</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-dark hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Main Info Header */}
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-2xl flex-shrink-0">
              {candidate.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-dark">{candidate.name}</h1>
              <p className="text-lg text-primary font-medium">{candidate.qualification}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {candidate.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {candidate.availability}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-surface rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Star className="w-4 h-4 text-primary" /> Match-Score
              </div>
              <div className="text-2xl font-bold text-dark">{candidate.matchScore}%</div>
            </div>
            <div className="p-4 bg-surface rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Briefcase className="w-4 h-4 text-primary" /> Status
              </div>
              <div className="text-xl font-semibold text-dark">{candidate.status}</div>
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <h3 className="text-md font-semibold text-dark mb-3">Notizen</h3>
            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-sm text-gray-700 leading-relaxed">
              Kandidat hat 5 Jahre Erfahrung in der Intensivpflege. Sehr freundliches Auftreten beim ersten Telefonat. 
              Präferiert Nachtschichten, ist aber flexibel. Führerschein Klasse B vorhanden.
            </div>
          </div>

          {/* Linked Jobs */}
          <div>
            <h3 className="text-md font-semibold text-dark mb-3">Verknüpfte Stellen</h3>
            <div className="space-y-3">
              {linkedJobs.map((job) => (
                <div key={job.id} className="p-3 border border-gray-200 rounded-lg flex items-center justify-between hover:border-primary/30 hover:bg-surface transition-colors">
                  <div>
                    <div className="font-medium text-dark">{job.title}</div>
                    <div className="text-sm text-gray-500">{job.facility} • {job.date}</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600`}>
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-white flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => onSendProfile(candidate.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 text-dark font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Profil senden
          </button>
          <button 
            onClick={() => onScheduleInterview(candidate.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            Interview planen
          </button>
        </div>
      </div>
    </>
  );
};

export default CandidateDetailDrawer;