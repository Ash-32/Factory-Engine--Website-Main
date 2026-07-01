/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_FORM_ACTION_URL?: string;
  readonly VITE_GOOGLE_FORM_EMAIL_ENTRY?: string;
  readonly VITE_GOOGLE_FORM_NAME_ENTRY?: string;
  readonly VITE_GOOGLE_FORM_COMPANY_ENTRY?: string;
  readonly VITE_GOOGLE_FORM_ROLE_ENTRY?: string;
  readonly VITE_GOOGLE_FORM_COMMENT_ENTRY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
