import React from 'react';
import { X, MapPin, Building2, Clock, FileText, CheckCircle, Edit, Archive, User } from 'lucide-react';
import { Job } from '../types';

interface JobDetailDrawerProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const JobDetailDrawer: React.FC<JobDetailDrawerProps> = ({
  job,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !job) return null;

  // Dummy Candidates for this job
  const matchingCandidates = [
    { id: 1, name: 'Maria Müller', matchScore: 95, status: 'Vorgeschlagen' },
    { id: 2, name: 'Thomas Weber', matchScore: 82, status: 'Neu' },
    { id: 3, name: 'Sarah Schulz', matchScore: 78, status: 'Neu' },
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
          <h2 className="text-lg font-semibold text-dark">Stellendetails</h2>
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
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                 job.status === 'Offen' ? 'bg-emerald-100 text-emerald-700' :
                 job.status === 'Pausiert' ? 'bg-amber-100 text-amber-700' :
                 'bg-gray-100 text-gray-700'
               }`}>
                 {job.status}
               </span>
               <span className="text-xs text-gray-500">Veröffentlicht am {job.postedDate}</span>
            </div>
            <h1 className="text-2xl font-bold text-dark mb-2">{job.title}</h1>
            <div className="flex items-center gap-2 text-primary font-medium text-lg">
                <Building2 className="w-5 h-5" />
                {job.employerName}
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <MapPin className="w-4 h-4 text-gray-400" /> {job.location}
                </div>
                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <Clock className="w-4 h-4 text-gray-400" /> {job.type}
                </div>
                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <CheckCircle className="w-4 h-4 text-gray-400" /> {job.qualification}
                </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-md font-semibold text-dark mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Beschreibung
            </h3>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {job.description}
            </div>
          </div>

          {/* Requirements */}
          <div>
             <h3 className="text-md font-semibold text-dark mb-3">Anforderungen</h3>
             <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                        <span>{req}</span>
                    </li>
                ))}
             </ul>
          </div>

          {/* Linked Candidates / Applicants */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-md font-semibold text-dark">
                Vorgeschlagene Kandidaten
              </h3>
            </div>
            
            <div className="space-y-3">
              {matchingCandidates.map((c) => (
                <div key={c.id} className="p-3 border border-gray-200 rounded-lg flex items-center justify-between hover:border-primary/30 hover:bg-surface transition-colors">
                  <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary text-xs font-bold">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                          <div className="font-medium text-dark text-sm">{c.name}</div>
                          <div className="text-xs text-emerald-600 font-medium">{c.matchScore}% Match</div>
                      </div>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-white flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => alert('Edit Job')}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 text-dark font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Bearbeiten
          </button>
          <button 
            onClick={() => alert('Archive Job')}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-rose-200 text-rose-600 font-medium rounded-lg hover:bg-rose-50 transition-colors"
          >
            <Archive className="w-4 h-4" />
            Archivieren
          </button>
        </div>
      </div>
    </>
  );
};

export default JobDetailDrawer;