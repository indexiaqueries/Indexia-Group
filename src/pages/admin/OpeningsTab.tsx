import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Edit3, Plus, ToggleLeft, ToggleRight, Trash2, X } from "lucide-react";
import type { Opening, OpeningFormValues } from "./types";

const DEPARTMENTS = ["Finance", "Human Resources", "Digital Marketing", "Information Technology", "Customer Support", "Administration"];

const EMPTY_FORM: OpeningFormValues = {
  title: "",
  department: "Finance",
  company: "Indexia Group",
  location: "Mumbai",
  type: "Full-time",
  description: "",
  requirements: "",
};

type OpeningsTabProps = {
  openings: Opening[];
  // Saves a new or edited opening. Returns true on success so the tab can
  // reset the form; errors are surfaced by the shell's error banner.
  onSaveOpening: (values: OpeningFormValues, editingId?: string) => Promise<boolean>;
  onToggleActive: (opening: Opening) => void;
  onDeleteOpening: (id: string) => void;
};

const OpeningsTab = ({ openings, onSaveOpening, onToggleActive, onDeleteOpening }: OpeningsTabProps) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingOpening, setEditingOpening] = useState<Opening | null>(null);
  const [form, setForm] = useState<OpeningFormValues>(EMPTY_FORM);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingOpening(null);
    setShowCreateForm(false);
  };

  const startEdit = (opening: Opening) => {
    setEditingOpening(opening);
    setForm({
      title: opening.title,
      department: opening.department,
      company: opening.company,
      location: opening.location,
      type: opening.type,
      description: opening.description || "",
      requirements: (opening.requirements || []).join("\n"),
    });
    setShowCreateForm(true);
  };

  const handleSave = async () => {
    const saved = await onSaveOpening(form, editingOpening?._id);
    if (saved) resetForm();
  };

  return (
    <>
      {/* Action bar */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Manage job and internship openings. Changes appear on the <Link to="/careers" className="font-bold text-(--color-teal) hover:underline">Careers page</Link>.
        </p>
        <button
          onClick={() => { setShowCreateForm(true); setEditingOpening(null); setForm(EMPTY_FORM); }}
          className="flex items-center gap-1.5 rounded-full bg-(--color-teal) px-4 py-2 text-xs font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-(--color-teal-deep)"
        >
          <Plus size={14} /> New Opening
        </button>
      </div>

      {/* Create / Edit form */}
      {showCreateForm && (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-(--color-ink)">
              {editingOpening ? "Edit Opening" : "Create New Opening"}
            </h3>
            <button onClick={resetForm} className="text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="opening-title" className="mb-1 block text-xs font-bold text-slate-600">Title *</label>
              <input
                id="opening-title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Software Developer"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-(--color-teal)"
              />
            </div>
            <div>
              <label htmlFor="opening-dept" className="mb-1 block text-xs font-bold text-slate-600">Department *</label>
              <select
                id="opening-dept"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-(--color-teal)"
              >
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="opening-type" className="mb-1 block text-xs font-bold text-slate-600">Type *</label>
              <select
                id="opening-type"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-(--color-teal)"
              >
                <option value="Full-time">Full-time</option>
                <option value="Intern">Intern</option>
              </select>
            </div>
            <div>
              <label htmlFor="opening-company" className="mb-1 block text-xs font-bold text-slate-600">Company</label>
              <input
                id="opening-company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Indexia Group"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-(--color-teal)"
              />
            </div>
            <div>
              <label htmlFor="opening-location" className="mb-1 block text-xs font-bold text-slate-600">Location</label>
              <input
                id="opening-location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Mumbai"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-(--color-teal)"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="opening-desc" className="mb-1 block text-xs font-bold text-slate-600">Description</label>
              <textarea
                id="opening-desc"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description of the role..."
                rows={3}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-(--color-teal)"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="opening-reqs" className="mb-1 block text-xs font-bold text-slate-600">Requirements (one per line)</label>
              <textarea
                id="opening-reqs"
                value={form.requirements}
                onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                placeholder={"Minimum 1 year experience\nProficiency in React\nStrong communication skills"}
                rows={4}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-(--color-teal)"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleSave}
              disabled={!form.title}
              className="flex items-center gap-1.5 rounded-full bg-(--color-teal) px-5 py-2 text-xs font-bold text-white transition-all hover:bg-(--color-teal-deep) disabled:opacity-50"
            >
              <Check size={14} />
              {editingOpening ? "Update Opening" : "Create Opening"}
            </button>
            <button
              onClick={resetForm}
              className="rounded-full border border-slate-200 px-5 py-2 text-xs font-bold text-slate-500 transition-colors hover:border-slate-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Openings list */}
      <div className="space-y-3">
        {openings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center text-sm text-(--color-muted)">
            No openings yet. Click "New Opening" to create one.
          </div>
        ) : (
          openings.map((opening) => (
            <div
              key={opening._id}
              className={`rounded-2xl border bg-white p-5 transition-all hover:shadow-md ${
                opening.isActive ? "border-slate-100" : "border-slate-200 opacity-60"
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-sm font-bold text-(--color-ink)">{opening.title}</h3>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-500">
                      {opening.type}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-500">
                      {opening.department}
                    </span>
                    {!opening.isActive && (
                      <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{opening.company} · {opening.location}</p>
                  {opening.description && (
                    <p className="mt-2 text-sm text-slate-500 line-clamp-2">{opening.description}</p>
                  )}
                  {opening.requirements && opening.requirements.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {opening.requirements.slice(0, 3).map((req, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 rounded-full bg-(--color-soft) px-2 py-0.5 text-[10px] text-slate-600">
                          <span className="h-1 w-1 rounded-full bg-(--color-teal)" />
                          {req}
                        </span>
                      ))}
                      {opening.requirements.length > 3 && (
                        <span className="text-[10px] text-slate-400">+{opening.requirements.length - 3} more</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => onToggleActive(opening)}
                    title={opening.isActive ? "Deactivate" : "Activate"}
                    className="flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-500 transition-colors hover:border-(--color-teal) hover:text-(--color-teal)"
                  >
                    {opening.isActive ? <ToggleRight size={14} className="text-(--color-teal)" /> : <ToggleLeft size={14} />}
                    {opening.isActive ? "Active" : "Inactive"}
                  </button>
                  <button
                    onClick={() => startEdit(opening)}
                    className="flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-500 transition-colors hover:border-(--color-teal) hover:text-(--color-teal)"
                  >
                    <Edit3 size={12} /> Edit
                  </button>
                  <button
                    onClick={() => onDeleteOpening(opening._id)}
                    className="flex items-center gap-1 rounded-full border border-red-200 px-3 py-1.5 text-xs font-bold text-red-400 transition-colors hover:border-red-300 hover:text-red-600"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default OpeningsTab;