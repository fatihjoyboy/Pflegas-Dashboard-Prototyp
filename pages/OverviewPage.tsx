import React from 'react';
import { Users, Briefcase, Zap, CheckCircle, UserPlus, FileText, Settings, ArrowRight } from 'lucide-react';
import StatCard from '../components/StatCard';

const OverviewPage: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'candidate',
      text: 'Neuer Kandidat "Maria Müller" hat sich registriert.',
      time: 'Vor 2 Stunden',
      icon: UserPlus,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      type: 'job',
      text: 'Klinikum Nord hat die Stelle "Intensivpflege" aktualisiert.',
      time: 'Vor 4 Stunden',
      icon: FileText,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 3,
      type: 'match',
      text: 'Neues Match: Lukas Schmidt & Seniorenstift Süd.',
      time: 'Vor 5 Stunden',
      icon: Zap,
      color: 'bg-primary-light text-primary'
    },
    {
      id: 4,
      type: 'system',
      text: 'System-Wartung erfolgreich abgeschlossen.',
      time: 'Gestern, 14:30',
      icon: Settings,
      color: 'bg-gray-100 text-gray-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-dark">Übersicht</h2>
        <p className="text-gray-500 mt-1">Schneller Überblick über alle Aktivitäten</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard 
          title="Aktive Kandidaten" 
          value="128" 
          trend="+12 % vs. Vormonat" 
          trendDirection="up"
          icon={Users}
        />
        <StatCard 
          title="Offene Stellen" 
          value="34" 
          trend="+5 % vs. Vormonat" 
          trendDirection="up"
          icon={Briefcase}
        />
        <StatCard 
          title="Laufende Matches" 
          value="16" 
          trend="-2 % vs. Vormonat" 
          trendDirection="down"
          icon={Zap}
        />
        <StatCard 
          title="Vermittlungen diesen Monat" 
          value="7" 
          trend="+15 % vs. Vormonat" 
          trendDirection="up"
          icon={CheckCircle}
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-dark">Letzte Aktivitäten</h3>
          <button className="text-sm text-primary hover:text-primary-dark font-medium flex items-center transition-colors">
            Alle anzeigen <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="divide-y divide-gray-100">
          {activities.map((activity) => {
            const ActivityIcon = activity.icon;
            return (
              <div key={activity.id} className="px-6 py-4 flex items-start hover:bg-gray-50 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4 ${activity.color}`}>
                  <ActivityIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.text}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;