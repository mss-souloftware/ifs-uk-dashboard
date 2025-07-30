/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_BASE_URL: string;
    readonly VITE_BACKEND_API_VERSION: string;
  }
  
  declare interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  