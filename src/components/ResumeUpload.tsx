import React, { useState, useRef } from 'react';
import { Upload, FileText, Check, AlertCircle, X, Eye } from 'lucide-react';
import { Resume } from '../types';

interface ResumeUploadProps {
  onFilesUpload: (files: File[]) => void;
  isAnalyzing: boolean;
  uploadedResumes: Resume[];
  onRemoveResume: (id: string) => void;
  onViewResume: (resume: Resume) => void;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ 
  onFilesUpload, 
  isAnalyzing, 
  uploadedResumes, 
  onRemoveResume,
  onViewResume 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesUpload(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFilesUpload(Array.from(files));
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-100';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Resumes</h2>
        <p className="text-gray-600 mb-6">Upload multiple resumes to get batch analysis and job role recommendations</p>
        
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
            isDragOver
              ? 'border-blue-500 bg-blue-50'
              : uploadedResumes.length > 0
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="flex flex-col items-center space-y-4">
            {uploadedResumes.length > 0 ? (
              <>
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800">
                    {uploadedResumes.length} Resume{uploadedResumes.length > 1 ? 's' : ''} Uploaded
                  </h3>
                  <p className="text-sm text-green-600">Click to add more files</p>
                </div>
              </>
            ) : (
              <>
                <div className={`flex items-center justify-center w-16 h-16 rounded-full transition-colors ${
                  isDragOver ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Upload className={`w-8 h-8 ${isDragOver ? 'text-blue-600' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Drop your resumes here</h3>
                  <p className="text-sm text-gray-500">or click to browse files (multiple selection supported)</p>
                </div>
              </>
            )}
          </div>
          
          <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-500">
            <FileText className="w-4 h-4" />
            <span>Supports PDF, DOC, DOCX files • Multiple files allowed</span>
          </div>
        </div>
        
        {/* Uploaded Files List */}
        {uploadedResumes.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Resumes ({uploadedResumes.length})</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {uploadedResumes.map((resume) => (
                <div key={resume.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3 flex-1">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{resume.fileName}</p>
                      {resume.analysisResult && (
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-600">Detected: {resume.detectedRole}</span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getConfidenceColor(resume.confidence)}`}>
                            {Math.round(resume.confidence * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {resume.analysisResult && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewResume(resume);
                        }}
                        className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded transition-colors"
                        title="View Analysis"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveResume(resume.id);
                      }}
                      className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {isAnalyzing && (
          <div className="mt-6 flex items-center justify-center space-x-3 text-blue-600">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="font-medium">Analyzing resumes...</span>
          </div>
        )}
      </div>
    </div>
  );
};