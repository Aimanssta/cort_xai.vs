import React, { useState } from 'react';
import { CheckCircle, AlertCircle, XCircle, BarChart, ExternalLink, Search } from 'lucide-react';

interface Directory {
  name: string;
  status: 'present' | 'not_present' | 'issues' | 'unknown';
  details: string;
  traffic: string;
}

const directoryData: Directory[] = [
  { name: 'Google Business Profile', status: 'present', details: 'Business Profile Verified', traffic: '8.5B+' },
  { name: 'Facebook', status: 'not_present', details: 'Missed opportunity.', traffic: '3.1B' },
  { name: 'Yahoo!', status: 'not_present', details: 'Missed opportunity.', traffic: '653.2K' },
  { name: 'Bing', status: 'not_present', details: 'Missed opportunity.', traffic: '650.8M' },
  { name: 'Yelp', status: 'present', details: 'Listing Verified', traffic: '150M+' },
  { name: 'MapQuest', status: 'not_present', details: 'Missed opportunity.', traffic: '30.7M' },
  { name: 'Foursquare', status: 'not_present', details: 'Missed opportunity.', traffic: '9.0M' },
  { name: 'TripAdvisor', status: 'not_present', details: 'Missed opportunity.', traffic: '105.4M' },
  { name: 'MerchantCircle', status: 'not_present', details: 'Missed opportunity.', traffic: '1.4M' },
  { name: 'ChamberofCommerce.com', status: 'not_present', details: 'Missed opportunity.', traffic: '674.1K' },
  { name: 'ShowMeLocal', status: 'not_present', details: 'Missed opportunity.', traffic: '237.1K' },
  { name: 'EZlocal', status: 'not_present', details: 'Missed opportunity.', traffic: '122.6K' },
  { name: 'tellows', status: 'not_present', details: 'Missed opportunity.', traffic: '101.2K' },
  { name: 'YP.com', status: 'not_present', details: 'Missed opportunity.', traffic: '93.3K' },
  { name: 'GoLocal247', status: 'not_present', details: 'Missed opportunity.', traffic: '84.2K' },
  { name: 'iBegin', status: 'not_present', details: 'Missed opportunity.', traffic: '66.8K' },
  { name: 'YellowPagesDirectory', status: 'not_present', details: 'Missed opportunity.', traffic: '66.6K' },
  { name: '8coupons', status: 'not_present', details: 'Missed opportunity.', traffic: '55.7K' },
  { name: 'iGlobal', status: 'not_present', details: 'Missed opportunity.', traffic: '43.9K' },
  { name: 'Property Capsule', status: 'not_present', details: 'Missed opportunity.', traffic: '40.6K' },
  { name: 'n49', status: 'not_present', details: 'Missed opportunity.', traffic: '31.8K' },
  { name: 'Tupalo', status: 'not_present', details: 'Missed opportunity.', traffic: '29.3K' },
  { name: 'Brownbook.net', status: 'not_present', details: 'Missed opportunity.', traffic: '29.1K' },
  { name: 'My Local Services', status: 'not_present', details: 'Missed opportunity.', traffic: '14.5K' },
  { name: 'CitySquares', status: 'not_present', details: 'Missed opportunity.', traffic: '6.4K' },
  { name: 'USCity.net', status: 'not_present', details: 'Missed opportunity.', traffic: '6.2K' },
  { name: 'HotFrog', status: 'issues', details: 'Wrong Address: Serving Area', traffic: 'N/A' },
  { name: 'Opendi', status: 'issues', details: 'Wrong Name/Address/Phone: N & N Uniforms', traffic: 'N/A' },
  { name: 'Amazon Alexa', status: 'unknown', details: 'Scan unavailable - Subscriber only.', traffic: 'High' },
  { name: 'Apple Maps', status: 'unknown', details: 'Scan unavailable - Subscriber only.', traffic: 'High' },
  { name: 'Instagram', status: 'unknown', details: 'Scan unavailable - Subscriber only.', traffic: 'High' },
];

const ListingManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDirectories = directoryData.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-fade-in">
      <div className="p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Search className="h-6 w-6 text-emerald-400" />
            Listing Audit & Management
          </h3>
          <p className="text-slate-400 text-sm">Real-time scan of 30+ major directories and potential traffic loss.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input 
            type="text"
            placeholder="Search directory..."
            className="bg-slate-950 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-950/50 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <tr>
              <th className="px-8 py-4">Directory</th>
              <th className="px-8 py-4 text-center">Status</th>
              <th className="px-8 py-4">Audit Details</th>
              <th className="px-8 py-4 text-right">Monthly Traffic</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredDirectories.map((dir, idx) => (
              <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                <td className="px-8 py-5 flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center font-bold text-[10px] text-slate-300">
                    {dir.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-white font-semibold text-sm">{dir.name}</span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex justify-center">
                    {dir.status === 'present' && <CheckCircle className="h-5 w-5 text-emerald-500" />}
                    {dir.status === 'not_present' && <XCircle className="h-5 w-5 text-red-500/50" />}
                    {dir.status === 'issues' && <AlertCircle className="h-5 w-5 text-orange-500" />}
                    {dir.status === 'unknown' && <BarChart className="h-5 w-5 text-slate-600" />}
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    dir.status === 'present' ? 'bg-emerald-500/10 text-emerald-400' :
                    dir.status === 'issues' ? 'bg-orange-500/10 text-orange-400' :
                    'bg-slate-800 text-slate-500'
                  }`}>
                    {dir.details}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex flex-col items-end">
                    <span className="text-white font-bold text-sm">{dir.traffic}</span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Potential Monthly Reach</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-emerald-600/5 p-6 border-t border-slate-800 flex items-center justify-between">
        <p className="text-sm text-slate-400">
          <strong className="text-emerald-400">Pro Tip:</strong> Fixing these "Missed Opportunities" instantly boosts your Domain Authority and Local SEO ranking.
        </p>
        <button className="text-xs font-bold text-emerald-400 flex items-center gap-1 hover:underline">
          SYNC ALL DIRECTORIES <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default ListingManagement;
