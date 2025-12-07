import React from 'react';
import { X, MapPin, Building2, Phone, Mail, User, Briefcase, Plus, Edit } from 'lucide-react';
import { Employer } from '../types';

interface EmployerDetailDrawerProps {
  employer: Employer | null;
  isOpen: boolean;
  onClose: () => void;
}

const EmployerDetailDrawer: React.FC<EmployerDetailDrawerProps> = ({
  employer,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !employer) return null;

  // Dummy open jobs for this employer
  const openJobs = [
    { id: 101, title: 'Pflegefachkraft (m/w/d)', department: 'Station 3', status: 'Aktiv' },
    { id: 102, title: 'Wohnbereichsleitung', department: 'Allgemein', status: 'Entwurf' },
    { id: 103, title: 'Pflegehelfer', department: 'Ambulant', status: 'Aktiv' },
  ].slice(0, Math.max(1, employer.openJobsCount > 3 ? 3 : employer.openJobsCount));

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
          <h2 className="text-lg font-semibold text-dark">Arbeitgeberprofil</h2>
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
            <div className="w-20 h-20 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-2xl flex-shrink-0 border border-indigo-100">
              <Building2 className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-dark">{employer.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                    {employer.type}
                </span>
                {employer.priority === 'Premium' && (
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-medium border border-amber-200">
                    Premium Partner
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4" /> {employer.location}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-md font-semibold text-dark mb-3">Kontaktdaten</h3>
            <div className="bg-surface rounded-xl p-4 border border-gray-100 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 font-medium">{employer.contactPerson}</span>
                <span className="text-gray-500">(Ansprechpartner)</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <a href={`mailto:${employer.email}`} className="text-primary hover:underline">{employer.email}</a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{employer.phone}</span>
              </div>
              <div className="flex items-start gap-3 text-sm border-t border-gray-200 pt-3 mt-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <span className="text-gray-700">{employer.address}</span>
              </div>
            </div>
          </div>

          {/* Open Jobs Preview */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-md font-semibold text-dark">
                Offene Stellen <span className="text-gray-400 font-normal">({employer.openJobsCount})</span>
              </h3>
            </div>
            
            {openJobs.length > 0 ? (
              <div className="space-y-3">
                {openJobs.map((job) => (
                  <div key={job.id} className="p-3 border border-gray-200 rounded-lg flex items-center justify-between hover:border-primary/30 hover:bg-surface transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Briefcase className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="font-medium text-dark text-sm">{job.title}</div>
                            <div className="text-xs text-gray-500">{job.department}</div>
                        </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                        job.status === 'Aktiv' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                ))}
                {employer.openJobsCount > 3 && (
                    <div className="text-center pt-2">
                        <span className="text-xs text-gray-400 italic">...und {employer.openJobsCount - 3} weitere</span>
                    </div>
                )}
              </div>
            ) : (
                <div className="p-6 text-center border-2 border-dashed border-gray-100 rounded-xl">
                    <p className="text-sm text-gray-400">Keine offenen Stellen gelistet.</p>
                </div>
            )}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-white flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => alert('Edit mode')}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 text-dark font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Bearbeiten
          </button>
          <button 
            onClick={() => alert('New Job')}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Stelle anlegen
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployerDetailDrawer;