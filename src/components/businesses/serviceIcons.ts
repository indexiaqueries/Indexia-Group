import {
  Apple,ArrowLeftRight,Banknote,BarChart3,Briefcase,Building2,Candy,Car,ClipboardList,Clock,CreditCard,Crown,Dumbbell,Factory,FlaskConical,
  Globe,GraduationCap,HandCoins,HeartPulse,Home,Image,KeyRound,Landmark,Layers,Leaf,Lock,MapPin,MapPinned,Medal,PenTool,Route,SearchCheck,
  ShieldCheck,Ship,Snowflake,Sprout,Store,Swords,Ticket,TrendingUp,Trophy,Truck,Users,Wallet,Warehouse,
} from "lucide-react";

export const serviceIcons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  // Indexia Finance
  "FDI Facilitation": MapPinned,
  "Investor Services": Users,
  "NBFC Operations": Landmark,
  "Banking & Institutional Funding": HandCoins,
  "Cross-Border Capital Solutions": Globe,
  "Wealth & Asset Management": TrendingUp,

  // Indexia Finserve
  "Personal Loan": Wallet,
  "Business Loan": Building2,
  "Home Loan": Home,
  "Loan Against Property": KeyRound,
  "Balance Transfer": ArrowLeftRight,
  "Car Loan": Car,
  "Credit Card": CreditCard,
  "Education Loan": GraduationCap,
  "Project Loan": Briefcase,
  "Commercial Purchase": Store,
  "Lease R Discounting": HandCoins,
  "Working Capital": Banknote,

  // Indexia Overseas
  "Refined Sugar Export & Trading": Candy,
  "Edible Commodity Sourcing": Store,
  "Quality Assurance & Certification": SearchCheck,
  "International Freight & Logistics": Ship,
  "Regulatory & Compliance Management": ClipboardList,
  "South American Market Distribution": Globe,

  // Indexia Agro Bio Fertilizers
  "Organic Bio-Fertilizer Manufacturing": Sprout,
  "Customized Fertilizer Blends": FlaskConical,
  "Soil Health Assessment & Testing": Leaf,
  "Crop Yield Optimization Programmes": TrendingUp,
  "Farmer Training & Field Support": Users,
  "Domestic & Export Distribution": Truck,

  // Indexia Securities
  "Armed Security Guard Deployment": ShieldCheck,
  "Close Protection & VIP Escort Details": Crown,
  "Commando & Rapid Response Units": Swords,
  "Corporate & Industrial Site Security": Factory,
  "Event & Venue Security Management": Ticket,
  "24×7 Surveillance & Threat Monitoring": Clock,

  // Indexia Warehouse
  "Strategic Land Investment, 1 to 8 Acre Plots": MapPin,
  "Port Connectivity, Gujarat to Kolkata": Ship,
  "Modern Warehouse on 2-Acre Plot with Loading Docks": Warehouse,
  "Expressway & Highway Connectivity, 8 States": Route,
  "Airport Access, IGI Delhi & Jewar Within 1 Hour": MapPinned,

  // Indexia Advertising
  "Unipole 10×20 ft, ₹25,000/month": Image,
  "Unipole 12×24 ft, ₹36,000/month": Image,
  "Standard Rate, ₹125/sq ft per side per month": BarChart3,
  "Delhi–Dehradun Highway & Shamli Ring Road Placements": Route,
  "Printing, Installation & Maintenance": PenTool,
  "Long-Term & Bulk Packages": Layers,

  // Indexia Foundation
  "International Training Facility Access": Dumbbell,
  "Nutrition & Diet Planning": Apple,
  "Expert Coaching & Mentorship": Users,
  "Sports Medicine & Injury Recovery": HeartPulse,
  "Competition Funding & Equipment": Medal,
  "Psychological Support & Career Guidance": Trophy,

  // Legacy names kept as fallbacks so stale locales still resolve
  "Armed Security Guards": ShieldCheck,
  "Commando Protection Units": Swords,
  "VIP & Dignitary Escorts": Crown,
  "Event & Venue Security": Ticket,
  "Corporate & Site Security": Factory,
  "24×7 Monitoring & Rapid Response": Clock,
  "Sugar Export & Trading": Candy,
  "Sourcing & Quality Control": SearchCheck,
  "International Logistics": Ship,
  "14 South American Markets": Globe,
  "Organic Fertilizer Production": Sprout,
  "Bio-Fertilizer Blends": Leaf,
  "Soil Health Solutions": FlaskConical,
  "Yield Improvement Programmes": TrendingUp,
  "Farmer Support & Training": Users,
  "Shamli, UP Facility (Delhi NCR)": MapPin,
  "Warehousing on Lease (MNCs)": Warehouse,
  "Secure & Scalable Storage": Lock,
  "Inventory Management": ClipboardList,
  "Delhi NCR Locations": MapPin,
  "Logistics Integration": Truck,
  "Cold & Dry Storage Options": Snowflake,
  "Highway Hoardings & Billboards": Image,
  "Multiple Site Holdings": Layers,
  "High-Traffic Corridor Placements": Route,
  "Creative & Campaign Support": PenTool,
  "Site Analytics & Reporting": BarChart3,
  "International-Level Training": Dumbbell,
  "Diet & Nutrition Programmes": Apple,
  "Competition Funding & Gear": Medal,
  "Sports Medicine & Recovery": HeartPulse,
  "Olympic-Grade Support": Trophy,
};
