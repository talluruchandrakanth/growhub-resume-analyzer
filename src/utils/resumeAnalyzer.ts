import { AnalysisResult, JobRole, Resume } from '../types';
import { jobRoles } from '../data/mockData';

export class ResumeAnalyzer {
  private static extractSkillsFromFileName(fileName: string): string[] {
    // Mock skill extraction - in real implementation, this would use NLP/ML
    const mockSkills = [
      'JavaScript', 'React', 'HTML', 'CSS', 'TypeScript', 'Node.js', 'Python',
      'AutoCAD', 'Project Management', 'SQL', 'Data Analysis', 'Machine Learning',
      'Figma', 'Leadership', 'Agile', 'Docker', 'AWS'
    ];
    
    // Return random subset for demo
    return mockSkills.slice(0, Math.floor(Math.random() * 8) + 3);
  }

  private static detectJobRole(skills: string[]): { role: string; confidence: number } {
    let bestMatch = jobRoles[0];
    let highestScore = 0;

    for (const role of jobRoles) {
      const allRoleSkills = [...role.requiredSkills, ...role.preferredSkills];
      const matchingSkills = skills.filter(skill => 
        allRoleSkills.some(roleSkill => 
          roleSkill.toLowerCase().includes(skill.toLowerCase()) || 
          skill.toLowerCase().includes(roleSkill.toLowerCase())
        )
      );
      
      const score = matchingSkills.length / allRoleSkills.length;
      if (score > highestScore) {
        highestScore = score;
        bestMatch = role;
      }
    }

    return {
      role: bestMatch.title,
      confidence: Math.min(0.95, Math.max(0.3, highestScore + Math.random() * 0.3))
    };
  }

  private static analyzeSkills(resumeSkills: string[], targetRole: JobRole) {
    const allRequiredSkills = [...targetRole.requiredSkills, ...targetRole.preferredSkills];
    
    const relevant = resumeSkills.filter(skill =>
      allRequiredSkills.some(required => 
        required.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(required.toLowerCase())
      )
    );

    const missing = allRequiredSkills.filter(skill =>
      !resumeSkills.some(resumeSkill =>
        resumeSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(resumeSkill.toLowerCase())
      )
    ).slice(0, 5); // Limit to 5 for demo

    const irrelevant = resumeSkills.filter(skill => !relevant.includes(skill));

    return { relevant, missing, irrelevant };
  }

  private static generateRecommendations(
    detectedRole: string,
    targetRole: JobRole,
    skillsAnalysis: any,
    matchScore: number
  ): string[] {
    const recommendations = [];

    // Match score based recommendations
    if (matchScore >= 0.8) {
      recommendations.push('🎉 Excellent match! Your resume is well-aligned with this role. Focus on highlighting your achievements with quantifiable results.');
    } else if (matchScore >= 0.6) {
      recommendations.push('👍 Good foundation! With some improvements, you can significantly strengthen your application for this role.');
    } else {
      recommendations.push('⚠️ Consider significant resume optimization or exploring roles that better match your current skill set.');
    }

    if (detectedRole !== targetRole.title) {
      recommendations.push(
        `🔄 Your resume appears optimized for ${detectedRole}. Restructure your experience section to emphasize ${targetRole.title} responsibilities.`
      );
    }

    if (skillsAnalysis.missing.length > 0) {
      recommendations.push(
        `📚 Priority skill development: Focus on ${skillsAnalysis.missing.slice(0, 3).join(', ')} through online courses, certifications, or hands-on projects.`
      );
    }

    if (skillsAnalysis.irrelevant.length > 0) {
      recommendations.push(
        `✂️ Streamline your resume by de-emphasizing ${skillsAnalysis.irrelevant.slice(0, 2).join(', ')} to make room for more relevant skills.`
      );
    }

    // Role-specific recommendations
    if (targetRole.category === 'Software Development') {
      recommendations.push('💻 Include links to your GitHub profile and showcase 2-3 relevant projects with live demos.');
    } else if (targetRole.category === 'Engineering') {
      recommendations.push('🏗️ Highlight specific projects with measurable outcomes (cost savings, efficiency improvements, etc.).');
    } else if (targetRole.category === 'Marketing') {
      recommendations.push('📈 Quantify your marketing achievements with metrics like conversion rates, ROI, and audience growth.');
    }

    recommendations.push(
      '📊 Use action verbs and quantify achievements with specific metrics (increased sales by 25%, reduced costs by $50K, etc.).',
      '🎯 Tailor your resume summary to directly address the job requirements and company needs.'
    );

    return recommendations;
  }

  private static generateCareerSuggestions(
    detectedRole: string,
    targetRole: JobRole,
    matchScore: number,
    skillsAnalysis: any
  ): string[] {
    const suggestions = [];

    if (matchScore < 0.5) {
      suggestions.push(`Consider transitioning gradually by taking on ${targetRole.title} responsibilities in your current role.`);
      suggestions.push(`Look for hybrid roles that combine your ${detectedRole} background with ${targetRole.title} elements.`);
    }

    if (skillsAnalysis.missing.length > 3) {
      suggestions.push(`Enroll in a comprehensive ${targetRole.title} bootcamp or certification program.`);
      suggestions.push(`Consider freelance projects or volunteer work to gain hands-on experience in ${targetRole.title}.`);
    }

    suggestions.push(`Network with ${targetRole.title} professionals through LinkedIn and industry events.`);
    suggestions.push(`Follow industry leaders and stay updated with ${targetRole.category} trends and best practices.`);

    return suggestions;
  }
  public static analyzeResume(file: File, targetRoleId: string): Promise<AnalysisResult> {
    return new Promise((resolve) => {
      // Simulate async analysis
      setTimeout(() => {
        const targetRole = jobRoles.find(role => role.id === targetRoleId) || jobRoles[0];
        const resumeSkills = this.extractSkillsFromFileName(file.name);
        const { role: detectedRole, confidence } = this.detectJobRole(resumeSkills);
        
        const skillsAnalysis = this.analyzeSkills(resumeSkills, targetRole);
        
        // Calculate match score based on skills alignment and role detection
        const skillsMatchRatio = skillsAnalysis.relevant.length / (skillsAnalysis.relevant.length + skillsAnalysis.missing.length);
        const roleMatchBonus = detectedRole === targetRole.title ? 0.2 : 0;
        const matchScore = Math.min(0.95, Math.max(0.1, skillsMatchRatio + roleMatchBonus + (Math.random() * 0.1)));
        
        const matchingJobs = jobRoles
          .filter(job => job.title !== targetRole.title)
          .slice(0, 3);
        
        const recommendations = this.generateRecommendations(
          detectedRole,
          targetRole,
          skillsAnalysis,
          matchScore
        );
        
        const careerSuggestions = this.generateCareerSuggestions(
          detectedRole,
          targetRole,
          matchScore,
          skillsAnalysis
        );

        const result: AnalysisResult = {
          detectedRole,
          confidence,
          matchScore,
          matchingJobs,
          skillsAnalysis,
          recommendations,
          careerSuggestions
        };

        resolve(result);
      }, 2000);
    });
  }
}