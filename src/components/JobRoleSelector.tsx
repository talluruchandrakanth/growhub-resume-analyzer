import React from 'react';
import { JobRole } from '../types';

interface JobRoleSelectorProps {
  jobRoles: JobRole[];
  selectedRole: string;
  onRoleSelect: (roleId: string) => void;
}

export const JobRoleSelector: React.FC<JobRoleSelectorProps> = ({ 
  jobRoles, 
  selectedRole, 
  onRoleSelect 
}) => {
  const categories = [...new Set(jobRoles.map(role => role.category))];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Target Job Role</h2>
        <p className="text-gray-600 mb-6">Select the job role you're applying for to get personalized analysis</p>
        
        <div className="space-y-4">
          {categories.map(category => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">{category}</h3>
              <div className="grid grid-cols-1 gap-2">
                {jobRoles
                  .filter(role => role.category === category)
                  .map(role => (
                    <button
                      key={role.id}
                      onClick={() => onRoleSelect(role.id)}
                      className={`text-left p-3 rounded-lg border transition-all duration-200 ${
                        selectedRole === role.id
                          ? 'border-blue-500 bg-blue-50 text-blue-800'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">{role.title}</div>
                      <div className="text-sm text-gray-500 mt-1">{role.description}</div>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};