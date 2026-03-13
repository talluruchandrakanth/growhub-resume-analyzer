import React from 'react';
import { FileText, Brain, Target } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ResumeAnalyzer</h1>
              <p className="text-xs text-gray-500">AI-Powered Career Intelligence</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#upload" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <FileText className="w-4 h-4" />
              <span>Upload</span>
            </a>
            <a href="#analysis" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Target className="w-4 h-4" />
              <span>Analysis</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};