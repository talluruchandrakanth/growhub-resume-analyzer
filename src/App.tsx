import React, { useState } from 'react';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { AnalysisResults } from './components/AnalysisResults';
import { DataCollectionGuide } from './components/DataCollectionGuide';
import { Resume, AnalysisResult, JobRole } from './types';
import { Lightbulb, MessageCircle, BarChart3, Database } from 'lucide-react';

function App() {
  const [currentAnalysis, setCurrentAnalysis] = useState<{
    analysis: AnalysisResult;
    resume: Resume;
    targetRole: JobRole;
  } | null>(null);
  const [showDataGuide, setShowDataGuide] = useState<boolean>(false);

  const handleAnalysisComplete = (analysis: AnalysisResult, resume: Resume, targetRole: JobRole) => {
    setCurrentAnalysis({ analysis, resume, targetRole });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI Resume Analyzer Chatbot
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Chat with our AI assistant to analyze your resume against specific job roles. Get instant match scores, 
            skill gap analysis, and personalized career recommendations through an intuitive conversational interface.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowDataGuide(!showDataGuide)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Database className="w-5 h-5" />
              <span>Dataset Collection Guide</span>
            </button>
          </div>
        </div>

        {/* Data Collection Guide */}
        {showDataGuide && (
          <div className="mb-8">
            <DataCollectionGuide />
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chat Interface */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <MessageCircle className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Chat with AI Analyzer</h2>
            </div>
            <ChatInterface onAnalysisComplete={handleAnalysisComplete} />
          </div>

          {/* Analysis Results */}
          <div>
            {currentAnalysis ? (
              <>
                <div className="flex items-center space-x-3 mb-6">
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Analysis Results</h2>
                </div>
                <div className="max-h-[600px] overflow-y-auto">
                  <AnalysisResults 
                    analysis={currentAnalysis.analysis} 
                    targetRole={currentAnalysis.targetRole} 
                  />
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Analysis Yet</h3>
                <p className="text-gray-500">
                  Upload your resume through the chat interface to see detailed analysis results here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Chatbot Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Conversational Interface</h3>
              <p className="text-gray-600">
                Natural chat experience with step-by-step guidance through the analysis process.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Match Score Analysis</h3>
              <p className="text-gray-600">
                Get precise percentage match scores for your resume against target job roles.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Recommendations</h3>
              <p className="text-gray-600">
                Receive personalized suggestions based on your match score and career goals.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">10 Job Categories</h3>
              <p className="text-gray-600">
                Comprehensive analysis across software development, engineering, marketing, and more.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;