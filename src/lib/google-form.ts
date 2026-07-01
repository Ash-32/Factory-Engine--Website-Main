import {
  googleFormConfig,
  isGoogleFormConfigured,
} from "@/config/google-form";

export type BetaSignupData = {
  email: string;
  name: string;
  company: string;
  role: string;
  comment?: string;
};

function viewFormUrlFromAction(actionUrl: string): string {
  return actionUrl.replace(/\/formResponse\/?$/, "/viewform");
}

export function buildPrefilledFormUrl(data: BetaSignupData): string | null {
  if (!isGoogleFormConfigured()) return null;

  const params = new URLSearchParams();
  params.set(googleFormConfig.emailEntry, data.email);
  params.set(googleFormConfig.nameEntry, data.name);
  params.set(googleFormConfig.companyEntry, data.company);
  params.set(googleFormConfig.roleEntry, data.role);
  if (data.comment && googleFormConfig.commentEntry) {
    params.set(googleFormConfig.commentEntry, data.comment);
  }

  const base = viewFormUrlFromAction(googleFormConfig.actionUrl);
  return `${base}?${params.toString()}`;
}

export function openPrefilledFormInNewTab(data: BetaSignupData): boolean {
  const url = buildPrefilledFormUrl(data);
  if (!url) return false;
  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}

/**
 * Submit beta signup to Google Forms via no-cors POST.
 * Google Forms does not return a readable response — resolve means success.
 */
export async function submitBetaSignup(
  data: BetaSignupData,
): Promise<{ ok: true } | { ok: false; reason: "not_configured" | "network" }> {
  if (!isGoogleFormConfigured()) {
    return { ok: false, reason: "not_configured" };
  }

  const body = new URLSearchParams();
  body.set(googleFormConfig.emailEntry, data.email);
  body.set(googleFormConfig.nameEntry, data.name);
  body.set(googleFormConfig.companyEntry, data.company);
  body.set(googleFormConfig.roleEntry, data.role);
  if (data.comment && googleFormConfig.commentEntry) {
    body.set(googleFormConfig.commentEntry, data.comment);
  }

  try {
    await fetch(googleFormConfig.actionUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    return { ok: true };
  } catch {
    return { ok: false, reason: "network" };
  }
}
