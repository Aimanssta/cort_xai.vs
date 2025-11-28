/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY?: string;
  readonly VITE_RETELL_API_KEY?: string;
  readonly VITE_RETELL_AGENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
