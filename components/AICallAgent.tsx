import React, { useState, useEffect, useRef } from 'react';
import { Phone, X, MessageCircle, Mic, MicOff } from 'lucide-react';
import { RetellWebClient } from 'retell-client-js-sdk';

interface CallState {
  isOpen: boolean;
  isCallActive: boolean;
  isCallStarting: boolean;
  callDuration: number;
  isMuted: boolean;
  transcript: string;
  collectedData: {
    name: string;
    email: string;
    phone: string;
    company: string;
    interest: string;
  };
}

const AICallAgent: React.FC = () => {
  const [state, setState] = useState<CallState>({
    isOpen: false,
    isCallActive: false,
    isCallStarting: false,
    callDuration: 0,
    isMuted: false,
    transcript: '',
    collectedData: { name: '', email: '', phone: '', company: '', interest: '' },
  });

  const callTimerRef = useRef<NodeJS.Timeout | null>(null);
  const retellClientRef = useRef<RetellWebClient | null>(null);

  // Initialize Retell Client once
  useEffect(() => {
    if (!retellClientRef.current) {
      retellClientRef.current = new RetellWebClient();

      // Setup event listeners
      retellClientRef.current.on('call_started', () => {
        console.log('Call started');
        setState(prev => ({ ...prev, isCallStarting: false }));
      });

      retellClientRef.current.on('call_ended', () => {
        console.log('Call ended');
        endCall();
      });

      retellClientRef.current.on('agent_start_talking', () => {
        console.log('Agent is speaking');
      });

      retellClientRef.current.on('agent_stop_talking', () => {
        console.log('Agent stopped speaking');
      });

      retellClientRef.current.on('transcript', (data: any) => {
        console.log('Transcript:', data);
        setState(prev => ({ ...prev, transcript: (prev.transcript + ' ' + (data?.transcript || '')).trim() }));
      });
    }

    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, []);

  const startCall = async () => {
    try {
      setState(prev => ({ ...prev, isCallStarting: true }));

      // Get access token from backend
      const response = await fetch('/api/create-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_id: import.meta.env.VITE_RETELL_AGENT_ID,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create call');
      }

      const data = await response.json();
      const accessToken = data.access_token;

      if (!accessToken) {
        alert('Failed to get access token for call');
        setState(prev => ({ ...prev, isCallStarting: false }));
        return;
      }

      const client = retellClientRef.current;
      if (!client) {
        alert('Retell client not initialized');
        setState(prev => ({ ...prev, isCallStarting: false }));
        return;
      }

      // Start the call with access token
      await client.startCall({
        accessToken: accessToken,
      });

      // Start audio playback
      await client.startAudioPlayback();

      // Start call timer
      setState(prev => ({ ...prev, isCallActive: true, callDuration: 0 }));
      callTimerRef.current = setInterval(() => {
        setState(prev => ({ ...prev, callDuration: prev.callDuration + 1 }));
      }, 1000);
    } catch (error) {
      console.error('Failed to start call:', error);
      alert('Failed to start call. Please check your configuration and try again.');
      setState(prev => ({ ...prev, isCallStarting: false }));
    }
  };

  const endCall = () => {
    try {
      if (retellClientRef.current) {
        retellClientRef.current.stopCall();
      }
    } catch (error) {
      console.error('Error stopping call:', error);
    }

    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }

    setState(prev => ({
      ...prev,
      isCallActive: false,
      isCallStarting: false,
      callDuration: 0,
    }));
  };

  const toggleMute = () => {
    try {
      if (retellClientRef.current) {
        if (state.isMuted) {
          retellClientRef.current.unmute();
        } else {
          retellClientRef.current.mute();
        }
        setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
      }
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };

  const handleDataChange = (field: keyof CallState['collectedData'], value: string) => {
    setState(prev => ({
      ...prev,
      collectedData: {
        ...prev.collectedData,
        [field]: value,
      },
    }));
  };

  const handleSubmitData = async () => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state.collectedData),
      });

      if (response.ok) {
        alert('Thank you! We will contact you soon.');
        setState(prev => ({
          ...prev,
          isOpen: false,
          collectedData: { name: '', email: '', phone: '', company: '', interest: '' },
        }));
      }
    } catch (error) {
      console.error('Failed to submit lead data:', error);
      alert('Failed to submit information. Please try again.');
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Floating Button */}
      {!state.isOpen && (
        <button
          onClick={() => setState(prev => ({ ...prev, isOpen: true }))}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center gap-2 group animate-bounce"
          title="Start AI Call"
        >
          <Phone className="w-6 h-6" />
          <span className="hidden group-hover:inline text-sm font-semibold mr-2">
            Talk to AI Agent
          </span>
        </button>
      )}

      {/* Modal */}
      {state.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[600px] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <div>
                  <h3 className="font-bold text-lg">AI Sales Agent</h3>
                  {state.isCallActive && (
                    <p className="text-xs text-blue-100">
                      Call active • {formatDuration(state.callDuration)}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  if (state.isCallActive) endCall();
                  setState(prev => ({ ...prev, isOpen: false }));
                }}
                className="hover:bg-blue-500 p-1 rounded transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {!state.isCallActive ? (
                <>
                  <p className="text-gray-700 text-sm">
                    Welcome! I'm an AI agent ready to answer your questions about our AI sales
                    agents, lead generation tools, and local SEO solutions.
                  </p>
                  <button
                    onClick={startCall}
                    disabled={state.isCallStarting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    {state.isCallStarting ? 'Connecting...' : 'Start Call'}
                  </button>
                </>
              ) : (
                <>
                  {/* Call Interface */}
                  <div className="bg-blue-50 p-6 rounded-lg text-center space-y-4">
                    <div className="animate-pulse">
                      <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Mic className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-sm text-gray-600 font-medium">Listening...</p>
                    </div>
                  </div>

                  {/* Transcript */}
                  {state.transcript && (
                    <div className="bg-gray-50 p-3 rounded-lg max-h-24 overflow-y-auto">
                      <p className="text-xs text-gray-600 font-semibold mb-1">Conversation:</p>
                      <p className="text-sm text-gray-700">{state.transcript}</p>
                    </div>
                  )}

                  {/* Controls */}
                  <div className="flex gap-2">
                    <button
                      onClick={toggleMute}
                      className={`flex-1 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                        state.isMuted
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      }`}
                    >
                      {state.isMuted ? (
                        <>
                          <MicOff className="w-4 h-4" /> Unmute
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4" /> Mute
                        </>
                      )}
                    </button>
                    <button
                      onClick={endCall}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors"
                    >
                      End Call
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Lead Collection Form (shown when call ends) */}
            {!state.isCallActive && state.callDuration > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-3 bg-gray-50 max-h-[200px] overflow-y-auto">
                <h4 className="font-semibold text-gray-800 text-sm">Get in Touch</h4>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={state.collectedData.name}
                  onChange={(e) => handleDataChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={state.collectedData.email}
                  onChange={(e) => handleDataChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={state.collectedData.phone}
                  onChange={(e) => handleDataChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSubmitData}
                  disabled={!state.collectedData.email || !state.collectedData.name}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition-colors text-sm"
                >
                  Submit Information
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AICallAgent;
