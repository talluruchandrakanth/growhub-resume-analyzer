import { JobRole, Resume } from '../types';

export const jobRoles: JobRole[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    category: 'Software Development',
    requiredSkills: ['JavaScript', 'React', 'HTML', 'CSS', 'TypeScript'],
    preferredSkills: ['Next.js', 'Tailwind CSS', 'Redux', 'GraphQL', 'Testing'],
    description: 'Build user interfaces and web applications',
    averageSalary: '$70,000 - $120,000',
    experienceLevel: 'Entry to Senior'
  },
  {
    id: '2',
    title: 'Backend Developer',
    category: 'Software Development',
    requiredSkills: ['Python', 'Node.js', 'Database Design', 'API Development', 'SQL'],
    preferredSkills: ['Docker', 'AWS', 'MongoDB', 'Redis', 'Microservices'],
    description: 'Develop server-side logic and database systems',
    averageSalary: '$75,000 - $130,000',
    experienceLevel: 'Entry to Senior'
  },
  {
    id: '3',
    title: 'Civil Engineer',
    category: 'Engineering',
    requiredSkills: ['AutoCAD', 'Structural Design', 'Project Management', 'Construction Planning'],
    preferredSkills: ['STAAD Pro', 'Revit', 'SAP2000', 'Site Supervision', 'Building Codes'],
    description: 'Design and supervise construction projects',
    averageSalary: '$60,000 - $95,000',
    experienceLevel: 'Entry to Senior'
  },
  {
    id: '4',
    title: 'Data Scientist',
    category: 'Data & Analytics',
    requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'Data Visualization', 'SQL'],
    preferredSkills: ['TensorFlow', 'PyTorch', 'R', 'Tableau', 'Big Data'],
    description: 'Analyze complex data to drive business decisions',
    averageSalary: '$85,000 - $150,000',
    experienceLevel: 'Mid to Senior'
  },
  {
    id: '5',
    title: 'Product Manager',
    category: 'Management',
    requiredSkills: ['Product Strategy', 'Market Research', 'Agile', 'User Experience', 'Analytics'],
    preferredSkills: ['Roadmapping', 'A/B Testing', 'Figma', 'SQL', 'Leadership'],
    description: 'Guide product development and strategy',
    averageSalary: '$90,000 - $160,000',
    experienceLevel: 'Mid to Senior'
  },
  {
    id: '6',
    title: 'Digital Marketing Specialist',
    category: 'Marketing',
    requiredSkills: ['SEO', 'Google Analytics', 'Social Media Marketing', 'Content Marketing', 'PPC'],
    preferredSkills: ['Google Ads', 'Facebook Ads', 'Email Marketing', 'Marketing Automation', 'Copywriting'],
    description: 'Drive online marketing campaigns and brand awareness',
    averageSalary: '$45,000 - $80,000',
    experienceLevel: 'Entry to Mid'
  },
  {
    id: '7',
    title: 'UX/UI Designer',
    category: 'Design',
    requiredSkills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    preferredSkills: ['Adobe Creative Suite', 'Sketch', 'InVision', 'Usability Testing', 'HTML/CSS'],
    description: 'Design user-centered digital experiences',
    averageSalary: '$60,000 - $110,000',
    experienceLevel: 'Entry to Senior'
  },
  {
    id: '8',
    title: 'Financial Analyst',
    category: 'Finance',
    requiredSkills: ['Financial Modeling', 'Excel', 'Financial Reporting', 'Data Analysis', 'Accounting'],
    preferredSkills: ['SQL', 'Python', 'Tableau', 'Bloomberg Terminal', 'Risk Management'],
    description: 'Analyze financial data and provide investment insights',
    averageSalary: '$55,000 - $95,000',
    experienceLevel: 'Entry to Mid'
  },
  {
    id: '9',
    title: 'DevOps Engineer',
    category: 'Software Development',
    requiredSkills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Linux'],
    preferredSkills: ['Terraform', 'Jenkins', 'Monitoring', 'Security', 'Automation'],
    description: 'Manage infrastructure and deployment pipelines',
    averageSalary: '$80,000 - $140,000',
    experienceLevel: 'Mid to Senior'
  },
  {
    id: '10',
    title: 'HR Business Partner',
    category: 'Human Resources',
    requiredSkills: ['Talent Management', 'Employee Relations', 'Performance Management', 'Recruitment', 'HR Analytics'],
    preferredSkills: ['HRIS', 'Compensation Planning', 'Change Management', 'Leadership Development', 'Employment Law'],
    description: 'Partner with business leaders on HR strategy and operations',
    averageSalary: '$65,000 - $110,000',
    experienceLevel: 'Mid to Senior'
  }
];

export const sampleResumes: Resume[] = [
  {
    id: '1',
    fileName: 'john_doe_resume.pdf',
    uploadDate: '2024-01-15',
    detectedRole: 'Frontend Developer',
    confidence: 0.92,
    skills: ['JavaScript', 'React', 'HTML', 'CSS', 'AutoCAD', 'Project Management'],
    experience: ['3 years web development', '1 year construction'],
    education: ['BS Computer Science', 'Minor in Civil Engineering'],
    projects: ['E-commerce website', 'Portfolio site', 'Bridge design project']
  }
];