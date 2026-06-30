'use client';

import { useState } from 'react';

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.analysis);
      } else {
        alert('Analysis failed: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8 flex flex-col items-center">
      <header className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent sm:text-5xl">
          Community Hero
        </h1>
        <p className="mt-4 text-lg text-slate-400">
          Hyperlocal Problem Solver powered by autonomous AI dispatch logic.
        </p>
      </header>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Column */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-teal-400">Report an Issue</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-600 rounded-xl p-6 bg-slate-800 hover:border-teal-500 transition-colors cursor-pointer relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {preview ? (
                <img src={preview} alt="Preview" className="max-h-48 rounded-lg object-cover" />
              ) : (
                <div className="text-center space-y-2">
                  <p className="text-sm text-slate-400">Click or drag an image here to upload</p>
                  <p className="text-xs text-slate-500">PNG, JPG up to 10MB</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !image}
              className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-slate-700 text-slate-900 font-bold py-3 px-4 rounded-xl transition-colors shadow-lg"
            >
              {loading ? 'AI Analyzing Matrix...' : 'Submit to Citizen Portal'}
            </button>
          </form>
        </div>

        {/* AI Results Column */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">Agentic Analysis Dashboard</h2>

            {!result && !loading && (
              <p className="text-slate-500 italic">Upload an issue to view autonomous classification metrics.</p>
            )}

            {loading && (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-slate-700 rounded w-1/3"></div>
                <div className="h-4 bg-slate-700 rounded w-1/4"></div>
                <div className="h-12 bg-slate-700 rounded"></div>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Identified Category</span>
                  <span className="text-2xl font-bold text-white">{result.category}</span>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Severity Level</span>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-1 ${result.severity === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      result.severity === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                    {result.severity} Priority
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Visual Verification Summary</span>
                  <p className="text-slate-300 mt-1">{result.description}</p>
                </div>
              </div>
            )}
          </div>

          {result && (
            <div className="mt-6 pt-6 border-t border-slate-700 bg-slate-900/50 p-4 rounded-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">🤖 Autonomous Dispatch Action</span>
              <p className="text-sm text-slate-300 italic">"{result.autonomousAction}"</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}