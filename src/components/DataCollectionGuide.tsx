import React from 'react';
import { Database, Users, FileText, Target, TrendingUp } from 'lucide-react';

export const DataCollectionGuide: React.FC = () => {
  const steps = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Recruit Diverse Candidates',
      description: 'Partner with universities, recruitment agencies, and professional networks to gather resumes from various backgrounds and experience levels.',
      details: ['Entry-level to senior positions', 'Multiple industries', 'Different educational backgrounds', 'Various geographic locations']
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Standardize Data Format',
      description: 'Create a consistent structure for storing resume data to enable effective analysis and machine learning.',
      details: ['Extract skills, experience, education', 'Normalize job titles and company names', 'Tag industry classifications', 'Store in JSON/XML format']
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Categorize by Job Roles',
      description: 'Organize resumes into specific job role categories with detailed skill requirements and success metrics.',
      details: ['Create 50+ job role categories', 'Define required vs preferred skills', 'Set experience level requirements', 'Include success indicators']
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Validate and Enrich',
      description: 'Quality check the dataset and enrich with additional metadata for better analysis accuracy.',
      details: ['Remove duplicate entries', 'Validate skill classifications', 'Add performance ratings', 'Include hiring outcomes']
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Database className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">Dataset Collection Strategy</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          To build an effective resume analysis system, you'll need a comprehensive dataset. Here's a strategic approach to collect and organize 1000+ resume samples:
        </p>
        
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl text-purple-600">
                  {step.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-3">{step.description}</p>
                <ul className="space-y-1">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
          <h3 className="font-semibold text-purple-900 mb-2">Pro Tip: Data Sources</h3>
          <p className="text-sm text-purple-800">
            Consider scraping anonymized data from job boards, partnering with HR departments, or using synthetic data generation tools to supplement your dataset while maintaining privacy compliance.
          </p>
        </div>
      </div>
    </div>
  );
};