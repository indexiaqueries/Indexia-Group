// Shared types for the admin dashboard (applications, enquiries, openings).

export type Application = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  intro: string;
  roleTitle: string;
  department: string;
  resumeFileName: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected";
  createdAt: string;
};

export type Opening = {
  _id: string;
  title: string;
  department: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  isActive: boolean;
  createdAt: string;
};

export type Enquiry = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "handled";
  createdAt: string;
};

export type Tab = "applications" | "enquiries" | "openings";

// Values collected by the "New/Edit Opening" form. `requirements` is the raw
// textarea value (one requirement per line) and is split into an array on save.
export type OpeningFormValues = {
  title: string;
  department: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
};