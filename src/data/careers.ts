type JobRole = {
  key: string;
  title: string;
  department: string;
  company: string;
  location: string;
  type: string;
  description?: string;
  requirements?: string[];
};

export const jobRoles: JobRole[] = [
  // Internships
  {
    key: "finance-intern",
    title: "Finance Intern",
    department: "Finance",
    company: "Indexia Group",
    location: "Mumbai",
    type: "Intern",
    description: "Gain hands-on experience in financial operations, loan processing, and banking procedures.",
    requirements: ["Currently pursuing or recently completed degree in Finance/Commerce", "Interest in financial services and banking", "Proficiency in MS Excel and basic financial tools"],
  },
  {
    key: "hr-intern",
    title: "HR Intern",
    department: "Human Resources",
    company: "Indexia Group",
    location: "Mumbai",
    type: "Intern",
    description: "Learn end-to-end HR processes including recruitment, onboarding, and employee management.",
    requirements: ["Currently pursuing or recently completed degree in HR/Management", "Strong communication and interpersonal skills", "Basic knowledge of HR practices"],
  },
  {
    key: "digital-marketing-intern",
    title: "Digital Marketing Intern",
    department: "Digital Marketing",
    company: "Indexia Group",
    location: "Mumbai",
    type: "Intern",
    description: "Assist in digital marketing campaigns, SEO optimization, and social media management.",
    requirements: ["Currently pursuing or recently completed degree in Marketing/Communications", "Knowledge of SEO, SEM, and social media platforms", "Creative thinking and analytical skills"],
  },
  {
    key: "it-intern",
    title: "IT Intern",
    department: "Information Technology",
    company: "Indexia Group",
    location: "Mumbai",
    type: "Intern",
    description: "Support IT infrastructure, software development, and technical operations.",
    requirements: ["Currently pursuing or recently completed degree in Computer Science/IT", "Basic programming knowledge", "Interest in software development and IT systems"],
  },
  // Full-time positions
  {
    key: "digital-marketing-executive",
    title: "Digital Marketing Executive",
    department: "Digital Marketing",
    company: "Indexia Group",
    location: "Mumbai",
    type: "Full-time",
    description: "Lead digital marketing strategies including SEO, SEM, social media marketing, and content creation to drive online presence and lead generation.",
    requirements: ["Minimum 1 year experience in digital marketing", "Strong knowledge of SEO, SEM, and SMO", "Experience with Google Analytics, Ads, and social media tools", "Excellent communication and analytical skills"],
  },
  {
    key: "it-developer",
    title: "IT Developer",
    department: "Information Technology",
    company: "Indexia Group",
    location: "Mumbai",
    type: "Full-time",
    description: "Develop and maintain software applications, manage databases, and support IT infrastructure across the organization.",
    requirements: ["Minimum 1 year experience as a full-stack developer", "Proficiency in frontend and backend technologies", "Experience with databases and API development", "Strong problem-solving and debugging skills"],
  },
  {
    key: "hr-executive",
    title: "HR Executive",
    department: "Human Resources",
    company: "Indexia Group",
    location: "Mumbai",
    type: "Full-time",
    description: "Manage end-to-end HR processes including profile hiring, shortlisting candidates, conducting interviews, managing joining formalities, induction, training, salary management, and exit formalities.",
    requirements: ["Minimum 1 year experience in HR", "End-to-end recruitment experience from hiring to exit", "Knowledge of HR policies, salary management, and employee relations", "Strong interpersonal and organizational skills"],
  },
  {
    key: "customer-support-associate",
    title: "Customer Support Associate (CSA)",
    department: "Customer Support",
    company: "Indexia Finserve Pvt. Ltd.",
    location: "Mumbai",
    type: "Full-time",
    description: "Handle customer inquiries across all loan products, provide end-to-end support from application to disbursal, and ensure a seamless customer experience at Indexia Finserve.",
    requirements: ["Handle inbound/outbound calls for loan enquiries (Personal, Business, Home, LAP, etc.)", "Guide customers through eligibility, documentation, and application process", "Maintain customer records and follow up on pending applications", "Coordinate with banks and NBFCs for loan processing updates", "Resolve customer complaints and escalate issues when necessary", "Achieve monthly targets for customer engagement and satisfaction", "Strong communication skills in English and Hindi", "Basic knowledge of financial products and banking processes"],
  },
  {
    key: "ea-to-director",
    title: "Executive Assistant to Director",
    department: "Administration",
    company: "Indexia Group",
    location: "Mumbai",
    type: "Full-time",
    description: "Support the Director in managing multiple profiles, coordinating schedules, handling correspondence, and acting as a supporting hand for day-to-day operations.",
    requirements: ["Minimum 1 year experience as EA or similar administrative role", "Ability to handle multiple profiles and priorities", "Excellent organizational and time management skills", "Proficiency in MS Office and communication tools", "Discretion and professionalism in handling confidential matters"],
  },
];

// Company-culture intro from the source page, adapted to the group.
export const careerCulture: string[] = [
  "Indexia Group is a learning organization and its corporate culture is its team. Our employees are a valued asset, and we are committed to providing them with the latest technology assignments and a working environment that is fun, collaborative, and team-oriented. We believe in providing our people with the experience and training opportunities that expand their existing knowledge base — with flexible working hours, an emphasis on open communication, and an open-door policy between management and staff.",
  "We proudly provide the opportunity to expand and develop your career in an atmosphere that combines the entrepreneurial nature of a start-up firm with the financial stability and great benefits of an established company. We invite you to submit your resume for consideration as the group continues to expand its market operations and client base with individuals who share our passion for operational excellence.",
];
