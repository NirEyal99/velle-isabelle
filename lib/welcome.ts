/**
 * Welcome-gift signup (demo). The email is only kept in this browser.
 * Later this would send the email to a mailing-list service instead.
 */
const KEY = "velle:welcome";

export type WelcomeSignup = { email: string; at: string };

export function getWelcomeSignup(): WelcomeSignup | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as WelcomeSignup) : null;
  } catch {
    return null;
  }
}

export function saveWelcomeSignup(email: string) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ email, at: new Date().toISOString() }));
  } catch {
    // Storage blocked (e.g. private mode): the thank-you message still shows.
  }
}

export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
