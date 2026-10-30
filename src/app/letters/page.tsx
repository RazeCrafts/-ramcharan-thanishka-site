"use client";

import { useEffect, useState, useCallback } from "react";

interface Letter {
  id: string;
  title: string;
  content: string;
  date: string;
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Letters() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Letter | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [isDraft, setIsDraft] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchLetters = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/letters");
      const data = await res.json();
      setLetters(data);
    } catch {
      setError("Failed to load letters.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLetters();
  }, [fetchLetters]);

  const resetForm = () => {
    setEditing(null);
    setTitle("");
    setContent("");
    setDate(new Date().toISOString().split("T")[0]);
    setIsDraft(false);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body: any = {
        title,
        content,
        date,
        isDraft,
      };
      if (editing) {
        const res = await fetch(`/api/letters/${editing.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("Update failed");
      } else {
        const res = await fetch("/api/letters", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("Create failed");
      }
      resetForm();
      fetchLetters();
    } catch {
      setError("Failed to save letter.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this letter? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/letters/${id}`, { method: "DELETE" });
      if (res.ok) fetchLetters();
    } catch {
      setError("Delete failed.");
    }
  };

  const drafts = letters.filter((l) => l.isDraft);
  const published = letters.filter((l) => !l.isDraft);

  return (
    <div className="min-h-[90vh] bg-ink-900 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-1">Letters</h1>
            <p className="text-gray-400 text-sm">Notes and letters written for each other.</p>
          </div>
          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="px-6 py-2.5 bg-white text-ink-900 font-semibold rounded-xl hover:bg-gray-200 transition text-sm"
          >
            Write a letter
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${
              showForm ? "bg-white text-ink-900" : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            {showForm ? "Hide" : "Drafts"} ({drafts.length})
          </button>
        </div>

        {/* Write form */}
        {showForm && (
          <div className="glass rounded-[2rem] p-6 mb-8 border">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-sm font-semibold text-white mb-1">
                {editing ? "Edit letter" : "New letter"}
              </h3>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-burgundy-500 text-lg font-medium"
              />
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-burgundy-500"
              />
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="checkbox"
                  checked={isDraft}
                  onChange={(e) => setIsDraft(e.target.checked)}
                  className="text-burgundy-500 bg-white/5 border-white/10 rounded focus:ring-burgundy-500"
                />
                <label className="text-xs text-gray-400">Save as draft</label>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your letter here…"
                rows={10}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-burgundy-500 resize-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-400 rounded-lg hover:bg-white/10 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-white text-ink-900 font-semibold rounded-lg hover:bg-gray-200 text-sm"
                >
                  {editing ? "Update" : "Save letter"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Published letters */}
        <div className="mb-8">
          <h2 className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-4">Letters</h2>
          {published.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No letters yet. Write your first one.</p>
          ) : (
            <div className="space-y-3">
              {published.map((l) => (
                <div
                  key={l.id}
                  className="glass rounded-xl p-5 border hover:border-white/20 transition group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-lg font-bold text-white">{l.title}</h3>
                    <span className="text-xs font-mono text-gray-500">
                      {new Date(l.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{l.content}</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => {
                        setEditing(l);
                        setTitle(l.title);
                        setContent(l.content);
                        setDate(l.date);
                        setIsDraft(l.isDraft);
                        setShowForm(true);
                      }}
                      className="px-3 py-1 text-xs text-white/70 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(l.id)}
                      className="px-3 py-1 text-xs text-red-400/70 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drafts */}
        {showForm && drafts.length > 0 && (
          <div>
            <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-4 mt-8">Drafts</h2>
            <div className="space-y-3">
              {drafts.map((l) => (
                <div
                  key={l.id}
                  className="glass rounded-xl p-5 border border-white/10 hover:border-white/20 transition group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-lg font-bold text-white">{l.title}</h3>
                    <span className="text-xs font-mono text-gray-500">Draft</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{l.content}</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => {
                        setEditing(l);
                        setTitle(l.title);
                        setContent(l.content);
                        setDate(l.date);
                        setIsDraft(l.isDraft);
                        setShowForm(true);
                      }}
                      className="px-3 py-1 text-xs text-white/70 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(l.id)}
                      className="px-3 py-1 text-xs text-red-400/70 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
