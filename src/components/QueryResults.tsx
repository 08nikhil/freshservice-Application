import React from 'react';
import { ExternalLink, CheckCircle, AlertCircle, Copy, BookOpen } from 'lucide-react';
import { QueryResult } from '../types';

interface QueryResultsProps {
  result: QueryResult;
  isLoading: boolean;
}

const QueryResults: React.FC<QueryResultsProps> = ({ result, isLoading }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-50 border-green-200';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.8) return <CheckCircle className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
  };

  const formatAnswer = (answer: string) => {
    // Split by code blocks
    const parts = answer.split(/```(\w+)?\n([\s\S]*?)```/);
    
    return parts.map((part, index) => {
      if (index % 3 === 0) {
        // Regular text
        return (
          <div key={index} className="prose prose-gray max-w-none">
            {part.split('\n').map((line, lineIndex) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <h4 key={lineIndex} className="font-semibold text-gray-800 mt-4 mb-2">
                    {line.replace(/\*\*/g, '')}
                  </h4>
                );
              }
              if (line.startsWith('- ')) {
                return (
                  <li key={lineIndex} className="ml-4 text-gray-700">
                    {line.substring(2)}
                  </li>
                );
              }
              if (line.trim()) {
                return (
                  <p key={lineIndex} className="text-gray-700 mb-2">
                    {line}
                  </p>
                );
              }
              return null;
            })}
          </div>
        );
      } else if (index % 3 === 2) {
        // Code block content
        const language = parts[index - 1] || 'bash';
        return (
          <div key={index} className="relative group">
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 uppercase tracking-wide">
                  {language}
                </span>
                <button
                  onClick={() => copyToClipboard(part)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-white p-1 rounded"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <pre className="text-green-400 text-sm font-mono">
                <code>{part}</code>
              </pre>
            </div>
          </div>
        );
      }
      return null;
    });
  };

  if (isLoading) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          Query Results
        </h3>
        <p className="text-indigo-100 text-sm">
          "{result.query}"
        </p>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Confidence Score */}
        <div className="mb-6">
          <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg border ${getConfidenceColor(result.confidence)}`}>
            {getConfidenceIcon(result.confidence)}
            <span className="text-sm font-medium">
              Confidence: {(result.confidence * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Answer */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
            Answer
          </h4>
          <div className="space-y-4">
            {formatAnswer(result.answer)}
          </div>
        </div>

        {/* Sources */}
        {result.sources.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <ExternalLink className="w-5 h-5 mr-2 text-indigo-600" />
              Sources
            </h4>
            <div className="grid gap-3">
              {result.sources.map((source, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-all duration-200"
                >
                  <div className="flex-1">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                    >
                      {source.title}
                    </a>
                    <p className="text-xs text-gray-500 mt-1">
                      Relevance: {(source.relevance_score * 100).toFixed(1)}%
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryResults;