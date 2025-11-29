import React, { useState } from 'react';

const initialState = {
  businessName: '',
  website: '',
  googleProfile: '',
  socialLinks: '',
  citations: '',
  serviceArea: '',
  primaryKeywords: '',
};

const LocalAIDashboard: React.FC = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const runAnalysis = async () => {
    setLoading(true);
    setAnalysis(null);
    try {
      const resp = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await resp.json();
      setAnalysis(data);
    } catch (err) {
      console.error(err);
      alert('Analysis failed. Check console.');
    } finally {
      setLoading(false);
    }
  };

  const generatePdf = async () => {
    if (!analysis) {
      alert('Run analysis first');
      return;
    }
    setLoading(true);
    try {
      const resp = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form, analysis }),
      });

      if (!resp.ok) throw new Error('Failed to generate PDF');

      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${form.businessName || 'local-aio-report'}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('Failed to generate PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 mb-12">
      <h3 className="text-xl font-bold text-white mb-4">Local Business Audit & Report</h3>
      <p className="text-slate-400 text-sm mb-6">Enter your business details below to generate a comprehensive local SEO and AIO audit report. The analysis will evaluate your online presence, visibility, and provide actionable recommendations.</p>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <input name="businessName" value={form.businessName} onChange={handleChange} placeholder="Business Name" className="px-3 py-2 rounded bg-slate-800 text-white" />
        <input name="website" value={form.website} onChange={handleChange} placeholder="Website (https://...)" className="px-3 py-2 rounded bg-slate-800 text-white" />
        <input name="googleProfile" value={form.googleProfile} onChange={handleChange} placeholder="Google Business Profile URL" className="px-3 py-2 rounded bg-slate-800 text-white" />
        <input name="serviceArea" value={form.serviceArea} onChange={handleChange} placeholder="Service Area (City, State)" className="px-3 py-2 rounded bg-slate-800 text-white" />
        <textarea name="socialLinks" value={form.socialLinks} onChange={handleChange} placeholder="Social links (comma separated)" className="col-span-2 px-3 py-2 rounded bg-slate-800 text-white" />
        <textarea name="citations" value={form.citations} onChange={handleChange} placeholder="Other citations / directories (comma separated)" className="col-span-2 px-3 py-2 rounded bg-slate-800 text-white" />
        <input name="primaryKeywords" value={form.primaryKeywords} onChange={handleChange} placeholder="Primary keywords (comma separated)" className="px-3 py-2 rounded bg-slate-800 text-white" />
      </div>

      <div className="flex gap-3">
        <button onClick={runAnalysis} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded">{loading ? 'Working...' : 'Run Analysis'}</button>
        <button onClick={generatePdf} disabled={loading || !analysis} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Generate PDF Report</button>
      </div>

      {analysis && (
        <div className="mt-6 bg-slate-800 p-4 rounded">
          <h4 className="text-white font-semibold mb-2">Summary</h4>
          <div className="text-slate-300 text-sm space-y-2">
            <div><strong>Website Title:</strong> {analysis.title || '—'}</div>
            <div><strong>Meta Description:</strong> {analysis.description || '—'}</div>
            <div><strong>Internal Links:</strong> {analysis.internalLinks}</div>
            <div><strong>External Links:</strong> {analysis.externalLinks}</div>
            <div><strong>Estimated Local Searches (mock):</strong> {analysis.estimated_searches}</div>
            <div><strong>1st Page Visibility (mock):</strong> {analysis.first_page_visibility}</div>
            <div><strong>Notes:</strong> {analysis.notes}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalAIDashboard;
