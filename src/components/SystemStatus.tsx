import React from 'react';
import { CheckCircle, XCircle, Clock, Database, FileText, Zap } from 'lucide-react';

const SystemStatus: React.FC = () => {
  // Mock system status - in real implementation, this would come from API
  const status = {
    vectorIndex: true,
    documentationData: true,
    apiConnection: true,
    lastUpdated: new Date().toLocaleDateString(),
    totalDocuments: 1247,
    indexSize: '45.2 MB'
  };

  const StatusItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    status: boolean;
    details?: string;
  }> = ({ icon, label, status, details }) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">{label}</p>
          {details && (
            <p className="text-xs text-gray-500">{details}</p>
          )}
        </div>
      </div>
      <div className="flex-shrink-0">
        {status ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <XCircle className="w-5 h-5 text-red-500" />
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Zap className="w-5 h-5 mr-2 text-indigo-600" />
        System Status
      </h3>
      
      <div className="space-y-3">
        <StatusItem
          icon={<Database className="w-5 h-5 text-indigo-600" />}
          label="Vector Index"
          status={status.vectorIndex}
          details={`${status.totalDocuments} documents`}
        />
        
        <StatusItem
          icon={<FileText className="w-5 h-5 text-blue-600" />}
          label="Documentation Data"
          status={status.documentationData}
          details={status.indexSize}
        />
        
        <StatusItem
          icon={<Zap className="w-5 h-5 text-green-600" />}
          label="API Connection"
          status={status.apiConnection}
          details="OpenAI GPT-4"
        />
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Last updated: {status.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;