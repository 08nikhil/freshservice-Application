import React, { useState, useEffect } from 'react';
import { Search, FileText, Zap, Database, Globe, Code, BookOpen, MessageSquare } from 'lucide-react';
import SearchInterface from './components/SearchInterface';
import QueryResults from './components/QueryResults';
import SystemStatus from './components/SystemStatus';
import ExampleQueries from './components/ExampleQueries';
import Header from './components/Header';
import { QueryResult } from './types';

function App() {
  const [currentQuery, setCurrentQuery] = useState('');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [queryHistory, setQueryHistory] = useState<string[]>([]);

  // Simulate RAG system functionality
  const handleQuery = async (query: string) => {
    setIsLoading(true);
    setCurrentQuery(query);

    // Add to history
    setQueryHistory(prev => [query, ...prev.slice(0, 9)]);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock response based on query content
    const mockResult = generateMockResponse(query);
    setQueryResult(mockResult);
    setIsLoading(false);
  };

  const generateMockResponse = (query: string): QueryResult => {
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('create') && queryLower.includes('ticket')) {
      return {
        answer: `To create a ticket using the Freshservice API, use the following curl command:

\`\`\`bash
curl -X POST "https://domain.freshservice.com/api/v2/tickets" \\
  -H "Content-Type: application/json" \\
  -u "api_key:X" \\
  -d '{
    "description": "Details about the issue...",
    "subject": "Support needed..",
    "email": "tom@outerspace.com",
    "priority": 1,
    "status": 2,
    "cc_emails": ["ram@freshservice.com","diana@freshservice.com"]
  }'
\`\`\`

**Required Fields:**
- \`description\`: Details about the issue
- \`subject\`: Brief summary of the ticket
- \`email\`: Requester's email address

**Optional Fields:**
- \`priority\`: 1 (Low), 2 (Medium), 3 (High), 4 (Urgent)
- \`status\`: 2 (Open), 3 (Pending), 4 (Resolved), 5 (Closed)
- \`cc_emails\`: Array of email addresses to CC

The API will return the created ticket object with a unique ID and timestamp.`,
        sources: [
          {
            title: "Ticket Management - Create Ticket",
            url: "https://api.freshservice.com/#create_ticket",
            relevance_score: 0.95
          },
          {
            title: "Ticket Attributes Reference",
            url: "https://api.freshservice.com/#ticket_attributes",
            relevance_score: 0.87
          }
        ],
        confidence: 0.92,
        query: query
      };
    }

    if (queryLower.includes('update') && queryLower.includes('status')) {
      return {
        answer: `To update a ticket status in Freshservice, use the PUT method:

\`\`\`bash
curl -X PUT "https://domain.freshservice.com/api/v2/tickets/{id}" \\
  -H "Content-Type: application/json" \\
  -u "api_key:X" \\
  -d '{
    "status": 4
  }'
\`\`\`

**Status Values:**
- \`2\`: Open
- \`3\`: Pending
- \`4\`: Resolved
- \`5\`: Closed

You can also update multiple fields simultaneously by including them in the JSON payload. The ticket ID should be replaced with the actual ticket number.`,
        sources: [
          {
            title: "Ticket Management - Update Ticket",
            url: "https://api.freshservice.com/#update_ticket",
            relevance_score: 0.91
          }
        ],
        confidence: 0.88,
        query: query
      };
    }

    if (queryLower.includes('auth')) {
      return {
        answer: `Freshservice API uses HTTP Basic Authentication with your API key:

\`\`\`bash
curl -u "api_key:X" "https://domain.freshservice.com/api/v2/tickets"
\`\`\`

**Authentication Steps:**
1. Go to Admin → API Settings in your Freshservice portal
2. Generate or copy your API key
3. Use the API key as the username with 'X' as the password
4. Include the \`-u\` flag in all curl requests

**Alternative Header Method:**
\`\`\`bash
curl -H "Authorization: Basic $(echo -n 'api_key:X' | base64)" \\
  "https://domain.freshservice.com/api/v2/tickets"
\`\`\`

Replace \`domain\` with your Freshservice subdomain and \`api_key\` with your actual API key.`,
        sources: [
          {
            title: "API Authentication",
            url: "https://api.freshservice.com/#authentication",
            relevance_score: 0.94
          }
        ],
        confidence: 0.89,
        query: query
      };
    }

    // Default response
    return {
      answer: `I found some relevant information about "${query}" in the Freshservice API documentation. Here's what I can tell you:

The Freshservice API provides comprehensive endpoints for managing tickets, assets, users, and other service desk operations. Most operations require proper authentication using your API key.

For specific implementation details, please refer to the official documentation sections that match your query. The API follows REST principles and returns JSON responses.

**Common API Patterns:**
- GET requests for retrieving data
- POST requests for creating new resources  
- PUT requests for updating existing resources
- DELETE requests for removing resources

Would you like me to help you with a more specific question about the Freshservice API?`,
      sources: [
        {
          title: "Freshservice API Overview",
          url: "https://api.freshservice.com/",
          relevance_score: 0.75
        }
      ],
      confidence: 0.65,
      query: query
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <SearchInterface 
              onQuery={handleQuery}
              isLoading={isLoading}
              currentQuery={currentQuery}
            />
            
            {queryResult && (
              <QueryResults 
                result={queryResult}
                isLoading={isLoading}
              />
            )}
            
            {!queryResult && !isLoading && (
              <ExampleQueries onSelectQuery={handleQuery} />
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <SystemStatus />
            
            {queryHistory.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-indigo-600" />
                  Recent Queries
                </h3>
                <div className="space-y-2">
                  {queryHistory.slice(0, 5).map((query, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuery(query)}
                      className="w-full text-left p-3 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200 border border-transparent hover:border-indigo-200"
                    >
                      {query.length > 40 ? `${query.substring(0, 40)}...` : query}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;