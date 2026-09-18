/**
 * Astro's BASE_URL is "/" unless `base` is set in astro.config.mjs. Normalising it
 * once here means pages can join paths without each re-deriving the trailing slash.
 */
const base = import.meta.env.BASE_URL;

export const basePath = base.endsWith("/") ? base : `${base}/`;

/** Join a site-relative path onto the base, tolerating a leading slash. */
export function withBase(path: string): string {
	return `${basePath}${path.replace(/^\/+/, "")}`;
}
