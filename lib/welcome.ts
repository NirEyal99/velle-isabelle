/**
 * Welcome-gift signup (demo). The email is only kept in this browser.
 * Later this would send the email to a mailing-list service instead.
 */
const KEY = "velle:welcome";
/** Fired when someone signs up, so the cart can add the free mini serum straight away. */
export const WELCOME_EVENT = "velle:welcome-signup";

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
    window.dispatchEvent(new Event(WELCOME_EVENT));
  } catch {
    // Storage blocked (e.g. private mode): the thank-you message still shows.
  }
}

export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
