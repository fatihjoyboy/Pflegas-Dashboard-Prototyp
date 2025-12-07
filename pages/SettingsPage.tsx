import React, { useState } from 'react';
import { Save, Globe, Building, Sliders, Bell, Check, Loader2 } from 'lucide-react';
import { UserSettings } from '../types';

const SettingsPage: React.FC = () => {
  // Initial State
  const [settings, setSettings] = useState<UserSettings>({
    general: {
      companyName: 'Pflegas GmbH',
      defaultRegion: 'Berlin',
      language: 'Deutsch',
    },
    matching: {
      weightQualification: 50,
      weightLocation: 30,
      weightAvailability: 20,
    },
    notifications: {
      email: true,
      inApp: true,
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handlers
  const handleGeneralChange = (field: keyof UserSettings['general'], value: string) => {
    setSettings(prev => ({
      ...prev,
      general: { ...prev.general, [field]: value }
    }));
  };

  const handleMatchingChange = (field: keyof UserSettings['matching'], value: number) => {
    setSettings(prev => ({
      ...prev,
      matching: { ...prev.matching, [field]: value }
    }));
  };

  const handleNotificationChange = (field: keyof UserSettings['notifications']) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: !prev.notifications[field] }
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Settings Saved:', settings);
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-dark">Einstellungen</h2>
          <p className="text-gray-500 mt-1">Konfigurieren Sie Ihr Pflegas Dashboard.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`
            flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm
            ${saveSuccess 
              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
              : 'bg-primary hover:bg-primary-dark text-white'
            }
          `}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Speichere...
            </>
          ) : saveSuccess ? (
            <>
              <Check className="w-4 h-4" />
              Gespeichert!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Änderungen speichern
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* General Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-dark">Allgemein</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Firmenname</label>
              <input 
                type="text" 
                value={settings.general.companyName}
                onChange={(e) => handleGeneralChange('companyName', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white text-dark placeholder-gray-400"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Standard-Region</label>
                <select 
                  value={settings.general.defaultRegion}
                  onChange={(e) => handleGeneralChange('defaultRegion', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white text-dark"
                >
                  <option value="Berlin">Berlin</option>
                  <option value="Hamburg">Hamburg</option>
                  <option value="München">München</option>
                  <option value="Köln">Köln</option>
                  <option value="Deutschlandweit">Deutschlandweit</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sprache</label>
                <div className="relative">
                    <Globe className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <select 
                      value={settings.general.language}
                      onChange={(e) => handleGeneralChange('language', e.target.value as any)}
                      className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white text-dark"
                    >
                      <option value="Deutsch">Deutsch</option>
                      <option value="English">English</option>
                    </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
             <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
               <Bell className="w-5 h-5" />
             </div>
             <h3 className="text-lg font-semibold text-dark">Benachrichtigungen</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-dark">E-Mail-Benachrichtigungen</h4>
                <p className="text-xs text-gray-500">Erhalten Sie Updates zu neuen Kandidaten per Mail.</p>
              </div>
              <button 
                onClick={() => handleNotificationChange('email')}
                className={`
                  relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
                  ${settings.notifications.email ? 'bg-primary' : 'bg-gray-200'}
                `}
              >
                <span 
                  className={`
                    pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                    ${settings.notifications.email ? 'translate-x-5' : 'translate-x-0'}
                  `} 
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-dark">In-App-Benachrichtigungen</h4>
                <p className="text-xs text-gray-500">Push-Nachrichten im Browser bei neuen Matches.</p>
              </div>
              <button 
                onClick={() => handleNotificationChange('inApp')}
                className={`
                  relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
                  ${settings.notifications.inApp ? 'bg-primary' : 'bg-gray-200'}
                `}
              >
                <span 
                  className={`
                    pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                    ${settings.notifications.inApp ? 'translate-x-5' : 'translate-x-0'}
                  `} 
                />
              </button>
            </div>
          </div>
        </div>

        {/* Matching Parameters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
             <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
               <Sliders className="w-5 h-5" />
             </div>
             <div>
               <h3 className="text-lg font-semibold text-dark">Matching-Parameter</h3>
               <p className="text-xs text-gray-500">Definieren Sie, wie der Matching-Score berechnet wird.</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Qualification */}
            <div className="space-y-3">
               <div className="flex justify-between items-center">
                 <label className="text-sm font-medium text-dark">Qualifikation</label>
                 <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded">{settings.matching.weightQualification}%</span>
               </div>
               <input 
                 type="range" 
                 min="0" 
                 max="100" 
                 value={settings.matching.weightQualification}
                 onChange={(e) => handleMatchingChange('weightQualification', parseInt(e.target.value))}
                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
               />
               <p className="text-xs text-gray-500">Wie wichtig ist die exakte Übereinstimmung der Ausbildung?</p>
            </div>

            {/* Location */}
            <div className="space-y-3">
               <div className="flex justify-between items-center">
                 <label className="text-sm font-medium text-dark">Standortnähe</label>
                 <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded">{settings.matching.weightLocation}%</span>
               </div>
               <input 
                 type="range" 
                 min="0" 
                 max="100" 
                 value={settings.matching.weightLocation}
                 onChange={(e) => handleMatchingChange('weightLocation', parseInt(e.target.value))}
                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
               />
               <p className="text-xs text-gray-500">Einfluss der Entfernung zum Arbeitsort auf den Score.</p>
            </div>

            {/* Availability */}
            <div className="space-y-3">
               <div className="flex justify-between items-center">
                 <label className="text-sm font-medium text-dark">Verfügbarkeit</label>
                 <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded">{settings.matching.weightAvailability}%</span>
               </div>
               <input 
                 type="range" 
                 min="0" 
                 max="100" 
                 value={settings.matching.weightAvailability}
                 onChange={(e) => handleMatchingChange('weightAvailability', parseInt(e.target.value))}
                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
               />
               <p className="text-xs text-gray-500">Gewichtung des Eintrittstermins und der Arbeitszeit.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;