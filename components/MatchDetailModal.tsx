import React from 'react';
import { X, User, Briefcase, Zap, ExternalLink, Building2 } from 'lucide-react';
import { Match } from '../types';

interface MatchDetailModalProps {
  match: Match | null;
  isOpen: boolean;
  onClose: () => void;
}

const MatchDetailModal: React.FC<MatchDetailModalProps> = ({ match, isOpen, onClose }) => {
  if (!isOpen || !match) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md pointer-events-auto transform transition-all scale-100">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-dark flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Match Details
            </h3>
            <button 
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-dark hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            
            {/* Match Score Badge */}
            <div className="flex justify-center">
              <div className={`
                flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 
                ${match.matchScore >= 90 ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 
                  match.matchScore >= 75 ? 'border-primary bg-primary-light text-primary-dark' : 
                  'border-amber-500 bg-amber-50 text-amber-700'}
              `}>
                <span className="text-2xl font-bold">{match.matchScore}%</span>
                <span className="text-xs font-medium uppercase tracking-wide">Match</span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Candidate Info */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-gray-600">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium uppercase">Kandidat</div>
                    <div className="font-semibold text-dark">{match.candidateName}</div>
                    <div className="text-sm text-gray-600">{match.candidateQualification}</div>
                  </div>
                </div>
              </div>

              {/* Job Info */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-gray-600">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium uppercase">Stelle</div>
                    <div className="font-semibold text-dark">{match.jobTitle}</div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {match.employerName}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
                <div className="text-center text-xs text-gray-400 mb-4">
                    Status: <span className="font-medium text-dark">{match.status}</span> • Aktualisiert: {match.lastUpdated}
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => alert('Navigate to Candidate')} className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-dark transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        Kandidat
                    </button>
                    <button onClick={() => alert('Navigate to Job')} className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-dark transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        Stelle
                    </button>
                </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default MatchDetailModal;