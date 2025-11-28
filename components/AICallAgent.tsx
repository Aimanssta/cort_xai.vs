import React, { useState, useEffect, useRef } from 'react';
import { Phone, X, MessageCircle } from 'lucide-react';

interface CallState {
  isOpen: boolean;
  isCallActive: boolean;
  isCallStarting: boolean;
  callDuration: number;
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
    collectedData: { name: '', email: '', phone: '', company: '', interest: '' },
  });

  const audioRef = useRef<HTMLAudioElement>(null);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);
  const retellWebSocketRef = useRef<WebSocket | null>(null);

  // Initialize Retell AI WebSocket connection
  useEffect(() => {
    if (state.isCallActive && !retellWebSocketRef.current) {
      initializeRetellConnection();
    }

    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [state.isCallActive]);

  const initializeRetellConnection = async () => {
    try {
      setState(prev => ({ ...prev, isCallStarting: true }));

      // Get Retell API key from environment
      const apiKey = import.meta.env.VITE_RETELL_API_KEY;
      const agentId = import.meta.env.VITE_RETELL_AGENT_ID;
      
      if (!apiKey || !agentId) {
        console.error('Retell API credentials not found. Please set VITE_RETELL_API_KEY and VITE_RETELL_AGENT_ID environment variables.');
        alert('AI Call Agent is not configured yet. Please contact support.');
        setState(prev => ({ ...prev, isCallStarting: false }));
        return;
      }

      // Initialize WebRTC for audio
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (audioRef.current) {
        audioRef.current.srcObject = stream;
      }

      // Start call timer
      setState(prev => ({ ...prev, callDuration: 0 }));
      callTimerRef.current = setInterval(() => {
        setState(prev => ({ ...prev, callDuration: prev.callDuration + 1 }));
      }, 1000);

      // Here you would connect to Retell AI WebSocket
      // This is a placeholder - actual implementation depends on Retell AI SDK
      connectToRetellAI(apiKey);

      setState(prev => ({ ...prev, isCallStarting: false }));
    } catch (error) {
      console.error('Failed to initialize call:', error);
      setState(prev => ({ ...prev, isCallStarting: false, isCallActive: false }));
      alert('Failed to start call. Please check your microphone permissions.');
    }
  };

  const connectToRetellAI = (apiKey: string) => {
    // WebSocket URL for Retell AI (placeholder - replace with actual Retell endpoint)
    const wsUrl = `wss://api.retellai.com/v2/ws`;

    try {
      retellWebSocketRef.current = new WebSocket(wsUrl);

      retellWebSocketRef.current.onopen = () => {
        console.log('Connected to Retell AI');
        // Send initial handshake
        retellWebSocketRef.current?.send(JSON.stringify({
          type: 'register',
          apiKey: apiKey,
          agentId: import.meta.env.VITE_RETELL_AGENT_ID || 'default-agent',
        }));
      };

      retellWebSocketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Retell message:', data);
        // Handle messages from Retell (audio, transcripts, etc.)
      };

      retellWebSocketRef.current.onerror = (error) => {
        console.error('Retell WebSocket error:', error);
      };

      retellWebSocketRef.current.onclose = () => {
        console.log('Disconnected from Retell AI');
        endCall();
      };
    } catch (error) {
      console.error('Failed to connect to Retell AI:', error);
      endCall();
    }
  };

  const startCall = async () => {
    setState(prev => ({ ...prev, isCallActive: true }));
  };

  const endCall = () => {
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
    }

    if (retellWebSocketRef.current) {
      retellWebSocketRef.current.close();
      retellWebSocketRef.current = null;
    }

    if (audioRef.current && audioRef.current.srcObject) {
      const stream = audioRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }

    setState(prev => ({
      ...prev,
      isCallActive: false,
      isCallStarting: false,
      callDuration: 0,
    }));
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
    // Send collected data to your backend or CRM
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
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center gap-2 group"
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-96 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <div>
                  <h3 className="font-bold text-lg">AI Sales Agent</h3>
                  {state.isCallActive && (
                    <p className="text-xs text-blue-100">Call active • {formatDuration(state.callDuration)}</p>
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
            <div className="flex-1 overflow-y-auto p-6">
              {!state.isCallActive ? (
                <div className="space-y-4">
                  <p className="text-gray-700 text-sm">
                    Welcome! I'm an AI agent ready to answer your questions about our services and help you get started.
                  </p>
                  <button
                    onClick={startCall}
                    disabled={state.isCallStarting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    {state.isCallStarting ? 'Connecting...' : 'Start Call'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Audio Element (hidden) */}
                  <audio ref={audioRef} autoPlay playsInline />

                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="animate-pulse">
                      <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2"></div>
                      <p className="text-sm text-gray-600">Listening...</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    You can speak naturally. The agent will answer your questions about our AI sales agents, lead generation, and local SEO solutions.
                  </p>

                  <button
                    onClick={endCall}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors"
                  >
                    End Call
                  </button>
                </div>
              )}
            </div>

            {/* Lead Collection Form (shown when call ends) */}
            {!state.isCallActive && state.callDuration > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-3 bg-gray-50">
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
