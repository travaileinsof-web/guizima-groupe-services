import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, Loader2, Settings2 } from "lucide-react";
import { useCrud } from "@/hooks/use-crud";
import { EntityModal, Field, Input, Textarea, Select } from "@/components/admin/entity-modal";
import { Entity, inputValue } from "@/types/entity";

type Item = Entity;

export default function AdminCareersPage() {
  const { items, loading, create, update, remove } = useCrud<Item>("/api/careers");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<Partial<Item>>({});

  // Filter settings management
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({ departments: [], locations: [], types: [] });
  const [savingFilters, setSavingFilters] = useState(false);

  useEffect(() => {
    fetch("/api/settings/careers-filters")
      .then(res => res.json())
      .then(data => setFilters(data));
  }, []);

  const saveFilters = async (newFilters: any) => {
    setSavingFilters(true);
    try {
      const res = await fetch("/api/settings/careers-filters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFilters)
      });
      if (res.ok) setFilters(await res.json());
    } finally {
      setSavingFilters(false);
    }
  };

  const updateFilterArray = (key: 'departments'|'locations'|'types', val: string) => {
    setFilters({ ...filters, [key]: val.split(",").map(s => s.trim()).filter(Boolean) });
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ published: true, order: 0, dept: filters.departments[0] || "", location: filters.locations[0] || "", type: filters.types[0] || "" });
    setModalOpen(true);
  };

  const openEdit = (p: Item) => {
    setEditing(p);
    setForm(p);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await update(editing.id, form);
    } else {
      await create(form);
    }
    setModalOpen(false);
  };

  const filtered = items.filter(
    (p) => !search || JSON.stringify(p).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-ivory">Job Openings</h1>
          <p className="mt-1 text-sm text-muted-foreground">{items.length} items</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setFiltersOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-ivory hover:bg-white/5 transition-colors"
          >
            <Settings2 className="h-4 w-4" /> Manage Filters
          </button>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-5 py-2.5 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-coal py-2.5 pl-10 pr-4 text-sm text-ivory placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-coal">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-obsidian/50">
                  <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-muted-foreground">Title</th>
                  <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-muted-foreground">Location</th>
                  <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-muted-foreground">Dept</th>
                  <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-sm text-ivory">{item.title || "—"}</td>
                  <td className="px-4 py-3 text-sm text-ivory">{item.location || "—"}</td>
                  <td className="px-4 py-3 text-sm text-ivory">{item.type || "—"}</td>
                  <td className="px-4 py-3 text-sm text-ivory">{item.dept || "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-ivory hover:border-gold hover:text-gold transition-colors"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => remove(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-ivory hover:border-red-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Main Form Modal */}
      <EntityModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Job" : "Add Job"}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Title (FR)" required>
            <Input required value={inputValue(form.title)} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label="Title (EN)">
            <Input value={inputValue(form.titleEn)} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} />
          </Field>
          <Field label="Description (FR)" required>
            <Textarea required rows={5} value={inputValue(form.description)} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>
          <Field label="Description (EN)">
            <Textarea rows={5} value={inputValue(form.descriptionEn)} onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })} />
          </Field>
          
          <div className="grid grid-cols-2 gap-4">
            <Field label="Department" required>
              <Select required value={inputValue(form.dept)} onChange={(e) => setForm({ ...form, dept: e.target.value })}>
                <option value="">— Select —</option>
                {filters.departments.map((d: string) => <option key={d} value={d}>{d}</option>)}
              </Select>
            </Field>
            <Field label="Location" required>
              <Select required value={inputValue(form.location)} onChange={(e) => setForm({ ...form, location: e.target.value })}>
                <option value="">— Select —</option>
                {filters.locations.map((l: string) => <option key={l} value={l}>{l}</option>)}
              </Select>
            </Field>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Field label="Contract Type" required>
              <Select required value={inputValue(form.type)} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="">— Select —</option>
                {filters.types.map((t: string) => <option key={t} value={t}>{t}</option>)}
              </Select>
            </Field>
            <Field label="Salary">
              <Input value={inputValue(form.salary)} onChange={(e) => setForm({ ...form, salary: e.target.value })} />
            </Field>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <label className="flex items-center gap-2 text-sm text-ivory">
              <input type="checkbox" checked={!!form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="h-4 w-4 rounded border-border accent-gold" />
              Published
            </label>
            <div className="flex gap-3">
              <button type="button" onClick={() => setModalOpen(false)} className="rounded-full border border-border px-5 py-2 text-sm text-ivory hover:bg-white/5 transition-colors">Cancel</button>
              <button type="submit" className="rounded-full bg-gradient-to-r from-gold to-copper px-5 py-2 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light">
                {editing ? "Save Changes" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </EntityModal>

      {/* Filters Management Modal */}
      <EntityModal
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Manage Filter Options"
      >
        <div className="space-y-6">
          <p className="text-sm text-ivory/60">Define the dropdown options available for job creation. Separate items with commas.</p>
          
          <Field label="Departments">
            <Textarea 
              rows={2} 
              defaultValue={filters.departments.join(", ")} 
              onBlur={(e) => updateFilterArray("departments", e.target.value)}
            />
          </Field>
          <Field label="Locations">
            <Textarea 
              rows={2} 
              defaultValue={filters.locations.join(", ")} 
              onBlur={(e) => updateFilterArray("locations", e.target.value)}
            />
          </Field>
          <Field label="Contract Types">
            <Textarea 
              rows={2} 
              defaultValue={filters.types.join(", ")} 
              onBlur={(e) => updateFilterArray("types", e.target.value)}
            />
          </Field>

          <div className="flex justify-end gap-3 border-t border-border pt-4">
            <button onClick={() => setFiltersOpen(false)} className="rounded-full border border-border px-5 py-2 text-sm text-ivory hover:bg-white/5 transition-colors">Close</button>
            <button onClick={() => saveFilters(filters)} disabled={savingFilters} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-5 py-2 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light disabled:opacity-50">
              {savingFilters && <Loader2 className="h-4 w-4 animate-spin" />}
              Save Filters
            </button>
          </div>
        </div>
      </EntityModal>
    </div>
  );
}
