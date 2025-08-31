import React from 'react';
import { Code, Users, Settings, Shield, Search, HelpCircle } from 'lucide-react';

interface ExampleQueriesProps {
  onSelectQuery: (query: string) => void;
}

const ExampleQueries: React.FC<ExampleQueriesProps> = ({ onSelectQuery }) => {
  const exampleCategories = [
    {
      title: 'Ticket Management',
      icon: <Code className="w-5 h-5" />,
      color: 'indigo',
      queries: [
        'Give me the curl command to create a ticket',
        'How do I update a ticket status?',
        'What are the required fields for creating a ticket?',
        'How do I search for tickets by priority?'
      ]
    },
    {
      title: 'Authentication',
      icon: <Shield className="w-5 h-5" />,
      color: 'green',
      queries: [
        'How do I authenticate with the Freshservice API?',
        'What are the API rate limits?',
        'How do I generate an API key?'
      ]
    },
    {
      title: 'User Management',
      icon: <Users className="w-5 h-5" />,
      color: 'purple',
      queries: [
        'How do I create a new user?',
        'How do I update user information?',
        'How do I list all users?'
      ]
    },
    {
      title: 'Configuration',
      icon: <Settings className="w-5 h-5" />,
      color: 'blue',
      queries: [
        'How do I configure custom fields?',
        'What are the available ticket statuses?',
        'How do I set up automation rules?'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      indigo: 'border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50',
      green: 'border-green-200 hover:border-green-300 hover:bg-green-50',
      purple: 'border-purple-200 hover:border-purple-300 hover:bg-purple-50',
      blue: 'border-blue-200 hover:border-blue-300 hover:bg-blue-50'
    };
    return colors[color as keyof typeof colors] || colors.indigo;
  };

  const getIconColor = (color: string) => {
    const colors = {
      indigo: 'text-indigo-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      blue: 'text-blue-600'
    };
    return colors[color as keyof typeof colors] || colors.indigo;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <HelpCircle className="w-6 h-6 text-indigo-600" />
          <h3 className="text-2xl font-bold text-gray-900">
            Example Queries
          </h3>
        </div>
        <p className="text-gray-600">
          Click on any example below to see how the system works
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exampleCategories.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            className={`border-2 rounded-xl p-6 transition-all duration-200 ${getColorClasses(category.color)}`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className={`${getIconColor(category.color)}`}>
                {category.icon}
              </div>
              <h4 className="font-semibold text-gray-800">
                {category.title}
              </h4>
            </div>
            
            <div className="space-y-2">
              {category.queries.map((query, queryIndex) => (
                <button
                  key={queryIndex}
                  onClick={() => onSelectQuery(query)}
                  className="w-full text-left p-3 text-sm text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-sm"
                >
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <span>{query}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
        <div className="text-center">
          <h4 className="font-semibold text-gray-800 mb-2">
            How It Works
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            This system uses advanced AI to search through Freshservice API documentation 
            and provide accurate, contextual answers with code examples.
          </p>
          <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
              <span>Semantic Search</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>AI-Generated Answers</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Source Citations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleQueries;