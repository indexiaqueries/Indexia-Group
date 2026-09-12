import { API_BASE } from "./api";

/**
 * Web3Forms email delivery.
 *
 * Enquiries are still stored in MongoDB via `${API_BASE}/api/contact` (the
 * admin dashboard reads them from there). This helper additionally forwards
 * the same payload to Web3Forms so the team gets an instant email copy.
 *
 * Configure with VITE_WEB3FORMS_ACCESS_KEY (get one at web3forms.com —
 * the key is emailed to the inbox that should receive submissions).
 * When the key is unset the helper resolves to `false` and only the
 * database write happens.
 */

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export const web3FormsAccessKey: string = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "";

export const web3FormsEnabled = Boolean(web3FormsAccessKey);

export type Web3FormsPayload = Record<string, string | undefined> & {
  subject?: string;
  email?: string;
};

/**
 * Fire-and-forget email copy. Never throws — email delivery must not
 * fail the form when the database write already succeeded.
 */
export const sendWeb3Forms = async (payload: Web3FormsPayload): Promise<boolean> => {
  if (!web3FormsEnabled) return false;
  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: web3FormsAccessKey,
        ...payload,
      }),
    });
    const data = (await response.json().catch(() => ({}))) as { success?: boolean };
    return response.ok && data.success !== false;
  } catch {
    return false;
  }
};

/** Convenience: is the DB-backed API reachable at all? */
export const hasApi = Boolean(API_BASE) || import.meta.env.PROD;
