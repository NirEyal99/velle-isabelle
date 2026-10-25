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

const USED_KEY = "velle:welcome-used";

/** The welcome gift is one per customer: after the first order that includes it, it's used. */
export function welcomeGiftAvailable(): boolean {
  try {
    return getWelcomeSignup() !== null && localStorage.getItem(USED_KEY) === null;
  } catch {
    return false;
  }
}

export function markWelcomeGiftUsed() {
  try {
    localStorage.setItem(USED_KEY, new Date().toISOString());
  } catch {
    // Storage blocked: nothing to remember.
  }
}
