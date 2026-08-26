import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEO from "../components/common/SEO";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-4 text-center">
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist or has been moved."
        canonicalPath="/"
        noindex
      />
      <span className="font-ledger text-[80px] font-bold leading-none text-(--color-teal)/20 sm:text-[120px]">
        404
      </span>
      <h1 className="mt-4 font-display text-[clamp(24px,4vw,36px)] font-bold text-(--color-ink)">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-[14px] leading-6 text-slate-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-(--color-teal) px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      >
        <ArrowLeft size={16} strokeWidth={2.5} />
        Back to Home
      </Link>
    </main>
  );
};

export default NotFoundPage;
