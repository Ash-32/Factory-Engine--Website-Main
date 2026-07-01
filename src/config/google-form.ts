import { googleFormDefaults } from "./google-form.defaults";

export const googleFormConfig = {
  actionUrl:
    import.meta.env.VITE_GOOGLE_FORM_ACTION_URL || googleFormDefaults.actionUrl,
  emailEntry:
    import.meta.env.VITE_GOOGLE_FORM_EMAIL_ENTRY || googleFormDefaults.emailEntry,
  nameEntry:
    import.meta.env.VITE_GOOGLE_FORM_NAME_ENTRY || googleFormDefaults.nameEntry,
  companyEntry:
    import.meta.env.VITE_GOOGLE_FORM_COMPANY_ENTRY ||
    googleFormDefaults.companyEntry,
  roleEntry:
    import.meta.env.VITE_GOOGLE_FORM_ROLE_ENTRY || googleFormDefaults.roleEntry,
  commentEntry:
    import.meta.env.VITE_GOOGLE_FORM_COMMENT_ENTRY ||
    googleFormDefaults.commentEntry,
} as const;

export function isGoogleFormConfigured(): boolean {
  const { actionUrl, emailEntry, nameEntry, companyEntry, roleEntry } =
    googleFormConfig;
  return Boolean(
    actionUrl && emailEntry && nameEntry && companyEntry && roleEntry,
  );
}
