import React, { useState, useRef, useEffect } from 'react';
import { Mic, X, Activity, Volume2, MicOff } from 'lucide-react';
import { getLiveSession, createBlob, decodeAudioData } from '../services/geminiService';
import { Modality, LiveServerMessage } from '@google/genai';

const VoiceChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);

  // Refs for Audio Contexts and Processor
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);

  const cleanupAudio = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }
    setIsConnected(false);
    setVolumeLevel(0);
  };

  const startSession = async () => {
    try {
      setIsConnected(true);
      
      const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      inputAudioContextRef.current = inputAudioContext;
      outputAudioContextRef.current = outputAudioContext;

      const outputNode = outputAudioContext.createGain();
      outputNode.connect(outputAudioContext.destination);
      outputNodeRef.current = outputNode;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const liveClient = getLiveSession();

      const sessionPromise = liveClient.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: "You are Cort X AI, an advanced AI manager for Business Profiles. Your goal is to help users optimize their Google Business Profile, improve local SEO, and manage customer reputation. Be professional, concise, and proactive.",
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
        },
        callbacks: {
          onopen: () => {
            console.log('Gemini Live Connected');
            // Setup input streaming
            const source = inputAudioContext.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (e) => {
              if (isMuted) return;
              
              const inputData = e.inputBuffer.getChannelData(0);
              
              // Simple volume meter
              let sum = 0;
              for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
              setVolumeLevel(Math.sqrt(sum / inputData.length) * 5); // Scale up a bit

              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
               nextStartTimeRef.current = Math.max(
                nextStartTimeRef.current,
                outputAudioContext.currentTime
              );
              
              const audioBuffer = await decodeAudioData(base64Audio, outputAudioContext, 24000, 1);
              const source = outputAudioContext.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputNode);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
            }
          },
          onclose: () => {
            console.log('Gemini Live Closed');
            cleanupAudio();
          },
          onerror: (err) => {
            console.error('Gemini Live Error', err);
            cleanupAudio();
          }
        }
      });
      
      sessionPromiseRef.current = sessionPromise;

    } catch (error) {
      console.error("Failed to start voice session", error);
      setIsConnected(false);
    }
  };

  const toggleSession = () => {
    if (isOpen) {
      setIsOpen(false);
      // Clean up session if it was open
      if (sessionPromiseRef.current) {
        cleanupAudio();
        sessionPromiseRef.current = null;
      }
    } else {
      setIsOpen(true);
      startSession();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    return () => {
      cleanupAudio();
    };
  }, []);

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={toggleSession}
        className={`fixed bottom-8 right-8 z-50 flex items-center gap-2 px-6 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-gradient-to-r from-indigo-500 to-fuchsia-600 text-white'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        <span className="font-bold tracking-wide">{isOpen ? 'END SESSION' : 'VOICE CHAT'}</span>
      </button>

      {/* Voice Interface Overlay */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 w-80 bg-surface border border-surfaceHighlight rounded-2xl shadow-2xl z-40 p-6 backdrop-blur-md bg-opacity-95">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 text-indigo-400">
              <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 ${isConnected ? 'duration-1000' : 'hidden'}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 bg-indigo-500 ${isConnected ? '' : 'bg-gray-500'}`}></span>
              </span>
              <span className="text-sm font-semibold uppercase tracking-wider">
                {isConnected ? 'Cort X Listening' : 'Connecting...'}
              </span>
            </div>

            {/* Visualizer Ring */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div 
                className="absolute inset-0 rounded-full border-4 border-indigo-500/30 transition-all duration-75"
                style={{ transform: `scale(${1 + volumeLevel})` }}
              ></div>
              <div 
                className="absolute inset-2 rounded-full border-4 border-fuchsia-500/30 transition-all duration-100 delay-75"
                style={{ transform: `scale(${1 + (volumeLevel * 0.8)})` }}
              ></div>
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-fuchsia-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/50">
                 <Mic className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="flex gap-4 w-full justify-center">
               <button 
                onClick={toggleMute}
                className={`p-3 rounded-full transition-colors ${isMuted ? 'bg-red-500/20 text-red-400' : 'bg-surfaceHighlight text-gray-400 hover:text-white'}`}
               >
                 {isMuted ? <MicOff className="w-5 h-5"/> : <Mic className="w-5 h-5"/>}
               </button>
               <div className="h-full w-px bg-surfaceHighlight"></div>
               <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Activity className="w-4 h-4" />
                  <span>AI Active</span>
               </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceChat;