import React from 'react';
import { Resume, JobRole } from '../types';
import { BarChart3, Users, TrendingUp, AlertTriangle, FileText, Target } from 'lucide-react';

interface BatchAnalysisResultsProps {
  resumes: Resume[];
  targetRole: JobRole;
  selectedResume: Resume | null;
  onSelectResume: (resume: Resume) => void;
}

export const BatchAnalysisResults: React.FC<BatchAnalysisResultsProps> = ({
  resumes,
  targetRole,
  selectedResume,
  onSelectResume
}) => {
  const analyzedResumes = resumes.filter(resume => resume.analysisResult);
  
  const getMatchStats = () => {
    const matches = analyzedResumes.filter(resume => 
      resume.detectedRole === targetRole.title && resume.confidence >= 0.7
    );
    const partialMatches = analyzedResumes.filter(resume => 
      resume.detectedRole !== targetRole.title && resume.confidence >= 0.5
    );
    const poorMatches = analyzedResumes.filter(resume => resume.confidence < 0.5);
    
    return { matches, partialMatches, poorMatches };
  };

  const { matches, partialMatches, poorMatches } = getMatchStats();

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-500';
    if (confidence >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getConfidenceBadgeColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-100';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (analyzedResumes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Batch Overview */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Batch Analysis Overview</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Total Resumes</span>
              </div>
              <div className="text-2xl font-bold text-blue-900 mt-1">{analyzedResumes.length}</div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">Strong Matches</span>
              </div>
              <div className="text-2xl font-bold text-green-900 mt-1">{matches.length}</div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">Partial Matches</span>
              </div>
              <div className="text-2xl font-bold text-yellow-900 mt-1">{partialMatches.length}</div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-800">Poor Matches</span>
              </div>
              <div className="text-2xl font-bold text-red-900 mt-1">{poorMatches.length}</div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Target Role: {targetRole.title}</h3>
            <p className="text-gray-600">{targetRole.description}</p>
          </div>
        </div>
      </div>

      {/* Resume List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Resume Analysis Results</h2>
          
          <div className="space-y-3">
            {analyzedResumes.map((resume) => (
              <div
                key={resume.id}
                onClick={() => onSelectResume(resume)}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedResume?.id === resume.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{resume.fileName}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600">
                          Detected: <span className="font-medium">{resume.detectedRole}</span>
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getConfidenceBadgeColor(resume.confidence)}`}>
                          {Math.round(resume.confidence * 100)}% match
                        </span>
                        {resume.detectedRole !== targetRole.title && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Role Mismatch
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getConfidenceColor(resume.confidence)}`}
                        style={{ width: `${resume.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {Math.round(resume.confidence * 100)}%
                    </span>
                  </div>
                </div>
                
                {resume.analysisResult && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Relevant Skills:</span>
                        <span className="ml-1 font-medium text-green-600">
                          {resume.analysisResult.skillsAnalysis.relevant.length}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Missing Skills:</span>
                        <span className="ml-1 font-medium text-blue-600">
                          {resume.analysisResult.skillsAnalysis.missing.length}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Irrelevant Skills:</span>
                        <span className="ml-1 font-medium text-red-600">
                          {resume.analysisResult.skillsAnalysis.irrelevant.length}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};