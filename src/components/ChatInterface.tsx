import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload, Bot, User, FileText, Target, TrendingUp } from 'lucide-react';
import { ChatMessage, JobRole, Resume, AnalysisResult } from '../types';
import { ResumeAnalyzer } from '../utils/resumeAnalyzer';
import { jobRoles } from '../data/mockData';

interface ChatInterfaceProps {
  onAnalysisComplete?: (analysis: AnalysisResult, resume: Resume, targetRole: JobRole) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onAnalysisComplete }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: "👋 Hello! I'm your AI Resume Analyzer. I can help you analyze your resume against specific job roles and provide personalized recommendations. Let's start by uploading your resume!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState<'upload' | 'selectRole' | 'analyze' | 'complete'>('upload');
  const [uploadedResume, setUploadedResume] = useState<Resume | null>(null);
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = async (message: string, delay: number = 1000) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, delay));
    setIsTyping(false);
    addMessage({ type: 'bot', content: message });
  };

  const handleFileUpload = async (file: File) => {
    const resume: Resume = {
      id: Date.now().toString(),
      fileName: file.name,
      uploadDate: new Date().toISOString().split('T')[0],
      detectedRole: '',
      confidence: 0,
      skills: [],
      experience: [],
      education: [],
      projects: [],
      file
    };

    setUploadedResume(resume);
    addMessage({ type: 'user', content: `📄 Uploaded: ${file.name}` });
    
    await simulateTyping("Great! I've received your resume. Now, please select the job role you're targeting from the options below:", 1500);
    
    const roleOptions = jobRoles.map(role => `${role.id}. ${role.title} (${role.category})`).join('\n');
    await simulateTyping(`Available job roles:\n\n${roleOptions}\n\nPlease type the number of your target role (1-10):`, 500);
    
    setCurrentStep('selectRole');
  };

  const handleRoleSelection = async (roleId: string) => {
    const role = jobRoles.find(r => r.id === roleId);
    if (!role) {
      await simulateTyping("Please enter a valid role number (1-10).");
      return;
    }

    setSelectedRole(role);
    addMessage({ type: 'user', content: `🎯 Selected: ${role.title}` });
    
    await simulateTyping(`Perfect! You've selected **${role.title}** in ${role.category}. Let me analyze your resume against this role...`, 1000);
    
    setCurrentStep('analyze');
    
    if (uploadedResume) {
      try {
        const analysis = await ResumeAnalyzer.analyzeResume(uploadedResume.file!, roleId);
        setAnalysisResult(analysis);
        
        const updatedResume = {
          ...uploadedResume,
          detectedRole: analysis.detectedRole,
          confidence: analysis.confidence,
          analysisResult: analysis
        };
        
        setUploadedResume(updatedResume);
        
        await presentAnalysisResults(analysis, updatedResume, role);
        
        if (onAnalysisComplete) {
          onAnalysisComplete(analysis, updatedResume, role);
        }
        
        setCurrentStep('complete');
      } catch (error) {
        await simulateTyping("Sorry, there was an error analyzing your resume. Please try again.");
      }
    }
  };

  const presentAnalysisResults = async (analysis: AnalysisResult, resume: Resume, targetRole: JobRole) => {
    // Match Score
    await simulateTyping(`📊 **Analysis Complete!**\n\n**Match Score: ${Math.round(analysis.matchScore * 100)}%** for ${targetRole.title}`, 2000);
    
    // Role Detection
    if (analysis.detectedRole !== targetRole.title) {
      await simulateTyping(`🔍 **Role Detection**: Your resume appears to be optimized for **${analysis.detectedRole}** (${Math.round(analysis.confidence * 100)}% confidence), but you're targeting **${targetRole.title}**.`, 1500);
    } else {
      await simulateTyping(`✅ **Great Match!** Your resume is well-aligned with **${targetRole.title}** (${Math.round(analysis.confidence * 100)}% confidence).`, 1500);
    }

    // Skills Analysis
    await simulateTyping(`🛠️ **Skills Analysis**:\n\n✅ **Relevant Skills** (${analysis.skillsAnalysis.relevant.length}): ${analysis.skillsAnalysis.relevant.join(', ')}\n\n➕ **Missing Skills** (${analysis.skillsAnalysis.missing.length}): ${analysis.skillsAnalysis.missing.join(', ')}\n\n➖ **Irrelevant Skills** (${analysis.skillsAnalysis.irrelevant.length}): ${analysis.skillsAnalysis.irrelevant.join(', ')}`, 2000);

    // Required Skills for Target Role
    await simulateTyping(`📋 **Required Skills for ${targetRole.title}**:\n\n🔴 **Must-Have**: ${targetRole.requiredSkills.join(', ')}\n\n🟡 **Preferred**: ${targetRole.preferredSkills.join(', ')}\n\n💰 **Salary Range**: ${targetRole.averageSalary}\n📈 **Experience Level**: ${targetRole.experienceLevel}`, 2000);

    // Personalized Recommendations
    const recommendations = analysis.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n');
    await simulateTyping(`💡 **Personalized Recommendations**:\n\n${recommendations}`, 2000);

    // Career Suggestions
    if (analysis.careerSuggestions && analysis.careerSuggestions.length > 0) {
      const suggestions = analysis.careerSuggestions.map((sug, index) => `${index + 1}. ${sug}`).join('\n');
      await simulateTyping(`🚀 **Career Development Suggestions**:\n\n${suggestions}`, 2000);
    }

    // Alternative Roles
    if (analysis.matchingJobs.length > 0) {
      const altRoles = analysis.matchingJobs.map(job => `• **${job.title}** - ${job.description}`).join('\n');
      await simulateTyping(`🔄 **Alternative Role Suggestions**:\n\nBased on your current skills, you might also consider:\n\n${altRoles}`, 2000);
    }

    await simulateTyping("Would you like to upload another resume for analysis? Just click the upload button!", 1000);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    addMessage({ type: 'user', content: userMessage });
    setInputMessage('');

    if (currentStep === 'selectRole') {
      const roleNumber = parseInt(userMessage);
      if (roleNumber >= 1 && roleNumber <= 10) {
        await handleRoleSelection(roleNumber.toString());
      } else {
        await simulateTyping("Please enter a valid role number (1-10).");
      }
    } else if (currentStep === 'complete') {
      await simulateTyping("To analyze another resume, please upload a new file using the upload button above!");
    } else {
      await simulateTyping("Please upload your resume first to get started with the analysis.");
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: "👋 Hello! I'm your AI Resume Analyzer. I can help you analyze your resume against specific job roles and provide personalized recommendations. Let's start by uploading your resume!",
        timestamp: new Date()
      }
    ]);
    setCurrentStep('upload');
    setUploadedResume(null);
    setSelectedRole(null);
    setAnalysisResult(null);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
        <div className="flex items-center space-x-3">
          <Bot className="w-6 h-6" />
          <div>
            <h3 className="font-semibold">AI Resume Analyzer</h3>
            <p className="text-xs opacity-90">Your intelligent career assistant</p>
          </div>
        </div>
        <button
          onClick={resetChat}
          className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors"
        >
          New Analysis
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.type === 'bot' && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                {message.type === 'user' && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
            disabled={isTyping}
          >
            <Upload className="w-4 h-4" />
            <span className="text-sm">Upload Resume</span>
          </button>
          
          <div className="flex-1 flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={
                currentStep === 'selectRole' 
                  ? "Type role number (1-10)..." 
                  : "Type your message..."
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};