import React from 'react';
import { AnalysisResult, JobRole } from '../types';
import { Target, TrendingUp, AlertTriangle, CheckCircle, X, Plus, Award, Briefcase } from 'lucide-react';

interface AnalysisResultsProps {
  analysis: AnalysisResult;
  targetRole: JobRole;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis, targetRole }) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-100';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSkillIcon = (action: string) => {
    switch (action) {
      case 'add': return <Plus className="w-4 h-4" />;
      case 'remove': return <X className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getSkillColor = (action: string) => {
    switch (action) {
      case 'add': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'remove': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Match Score Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg text-white overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Award className="w-8 h-8" />
                <h2 className="text-3xl font-bold">Match Score</h2>
              </div>
              <p className="text-blue-100">How well your resume matches the target role</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold">{Math.round(analysis.matchScore * 100)}%</div>
              <div className="text-blue-100">for {targetRole.title}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Role Detection */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Role Analysis</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Detected Role</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xl font-bold text-gray-900">{analysis.detectedRole}</div>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getConfidenceColor(analysis.confidence)}`}>
                  {Math.round(analysis.confidence * 100)}% confidence
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Target Role</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xl font-bold text-gray-900">{targetRole.title}</div>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-gray-600">{targetRole.category}</span>
                  <span className="text-sm font-medium text-green-600">{targetRole.averageSalary}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">Experience: {targetRole.experienceLevel}</div>
              </div>
            </div>
          </div>
          
          {analysis.detectedRole !== targetRole.title && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Role Mismatch Detected</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                Your resume appears to be optimized for {analysis.detectedRole}, but you're applying for {targetRole.title}.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Required Skills for Target Role */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Briefcase className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Required Skills for {targetRole.title}</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-3">🔴 Must-Have Skills</h3>
              <div className="flex flex-wrap gap-2">
                {targetRole.requiredSkills.map((skill, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">🟡 Preferred Skills</h3>
              <div className="flex flex-wrap gap-2">
                {targetRole.preferredSkills.map((skill, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Analysis */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Skills Analysis</h2>
          </div>
          
          <div className="space-y-6">
            {/* Relevant Skills */}
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-3">✓ Relevant Skills ({analysis.skillsAnalysis.relevant.length})</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.skillsAnalysis.relevant.map((skill, index) => (
                  <span key={index} className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                    <CheckCircle className="w-4 h-4" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
            
            {/* Missing Skills */}
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-3">+ Missing Skills ({analysis.skillsAnalysis.missing.length})</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.skillsAnalysis.missing.map((skill, index) => (
                  <span key={index} className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    <Plus className="w-4 h-4" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
              {analysis.skillsAnalysis.missing.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  Consider adding these skills to strengthen your application for {targetRole.title} positions.
                </p>
              )}
            </div>
            
            {/* Irrelevant Skills */}
            {analysis.skillsAnalysis.irrelevant.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-3">- Irrelevant Skills ({analysis.skillsAnalysis.irrelevant.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.skillsAnalysis.irrelevant.map((skill, index) => (
                    <span key={index} className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
                      <X className="w-4 h-4" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  These skills may not be relevant for {targetRole.title} positions. Consider de-emphasizing them.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Recommendations */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Alternative Job Recommendations</h2>
          <p className="text-gray-600 mb-6">Based on your current skills, these roles might be a better match:</p>
          
          <div className="space-y-4">
            {analysis.matchingJobs.map((job, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.category}</p>
                    <p className="text-sm text-gray-500 mt-1">{job.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">High Match</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommendations</h2>
          <div className="space-y-3">
            {analysis.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-blue-800">{recommendation}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};