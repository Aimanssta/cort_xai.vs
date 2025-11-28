import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: 'Sales Agents',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', company: '', interest: 'Sales Agents', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SEO 
        title="Contact Cort X AI - Book a Demo"
        description="Get in touch with Cort X AI tailored growth strategy. Sales agents, lead gen, and local AIO services."
      />

      <div className="bg-slate-950 pt-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Info Column */}
            <div>
              <h1 className="text-4xl font-bold text-white mb-6">Let's Scale Your Business</h1>
              <p className="text-lg text-slate-400 mb-10">
                Ready to deploy autonomous agents and dominate your market? Fill out the form, and our strategy team will build a custom roadmap for you.
              </p>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <Mail className="h-6 w-6 text-cort-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Email Us</h4>
                    <p className="text-slate-400">sales@cortxai.com</p>
                    <p className="text-slate-400">support@cortxai.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <Phone className="h-6 w-6 text-cort-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Call Us</h4>
                    <p className="text-slate-400">+1 (888) 555-0123</p>
                    <p className="text-xs text-slate-500 mt-1">Mon-Fri, 9am - 6pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <MapPin className="h-6 w-6 text-cort-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Headquarters</h4>
                    <p className="text-slate-400">100 Innovation Dr, Suite 500</p>
                    <p className="text-slate-400">San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-800 shadow-xl">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-fade-in">
                  <div className="bg-emerald-500/20 p-4 rounded-full mb-6">
                    <CheckCircle className="h-12 w-12 text-emerald-500" size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-400">Our team will be in touch within 2 hours.</p>
                  <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-8">Send Another</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cort-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Work Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cort-500 focus:border-transparent transition-all"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cort-500 focus:border-transparent transition-all"
                      placeholder="Acme Inc."
                    />
                  </div>

                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-slate-300 mb-2">I'm interested in...</label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cort-500 focus:border-transparent transition-all"
                    >
                      <option>AI Sales Agents</option>
                      <option>Lead Generation Tools</option>
                      <option>Local AIO Services</option>
                      <option>Full Platform Demo</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">How can we help?</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cort-500 focus:border-transparent transition-all"
                      placeholder="Tell us about your current challenges..."
                    ></textarea>
                  </div>

                  <Button type="submit" variant="primary" className="w-full py-4 text-base">
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <Loader2 className="animate-spin mr-2 h-5 w-5" /> Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Request Demo <Send className="ml-2 h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper component for success message icon
const CheckCircle = ({ className, size }: { className?: string; size?: number }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

export default Contact;