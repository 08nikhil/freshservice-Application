import React from 'react';
import { Database, Zap, Globe } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Freshservice API Assistant
                </h1>
                <p className="text-sm text-gray-600">
                  RAG-powered documentation search
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Zap className="w-4 h-4 text-green-500" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Globe className="w-4 h-4 text-blue-500" />
              <span>Live Documentation</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;