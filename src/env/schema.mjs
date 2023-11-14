// @ts-check
import { z } from "zod";

// SSR Env var schema
export const serverSchema = z.object({
  SERVER_GRAPHCDN_URL: z.string(),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string(),
  NEXT_PUBLIC_VIDEO_BUCKET: z.string(),
  NEXT_PUBLIC_VCMS_BUCKET: z.string(),
  NEXT_PUBLIC_AUDIO_BUCKET: z.string(),
  NEXT_PUBLIC_ACMS_BUCKET: z.string(),
  NEXT_PUBLIC_GRAPHCDN_URL: z.string(),
  NEXT_PUBLIC_WS_GQL_URI: z.string(),
  NEXT_PUBLIC_BARCHART_API_KEY: z.string(),
  NEXT_PUBLIC_CAPTCHA_SITE_KEY: z.string(),
  NEXT_PUBLIC_DRUPAL_URI: z.string(),
  NEXT_PUBLIC_IMAGES_CDN_API: z.string(),
  NEXT_PUBLIC_URL_CLOUDFLARE: z.string(),
  NEXT_PUBLIC_KEY_ENCRYPT: z.string(),
  NEXT_PUBLIC_CDN_PAGE: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  NEXT_PUBLIC_VIDEO_BUCKET: process.env.NEXT_PUBLIC_VIDEO_BUCKET,
  NEXT_PUBLIC_AUDIO_BUCKET: process.env.NEXT_PUBLIC_AUDIO_BUCKET,
  NEXT_PUBLIC_VCMS_BUCKET: process.env.NEXT_PUBLIC_VCMS_BUCKET,
  NEXT_PUBLIC_ACMS_BUCKET: process.env.NEXT_PUBLIC_ACMS_BUCKET,
  NEXT_PUBLIC_GRAPHCDN_URL: process.env.NEXT_PUBLIC_GRAPHCDN_URL,
  NEXT_PUBLIC_WS_GQL_URI: process.env.NEXT_PUBLIC_WS_GQL_URI,
  NEXT_PUBLIC_BARCHART_API_KEY: process.env.NEXT_PUBLIC_BARCHART_API_KEY,
  NEXT_PUBLIC_DRUPAL_URI: process.env.NEXT_PUBLIC_DRUPAL_URI,
  NEXT_PUBLIC_CAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY,
  NEXT_PUBLIC_IMAGES_CDN_API: process.env.NEXT_PUBLIC_IMAGES_CDN_API,
  NEXT_PUBLIC_URL_CLOUDFLARE: process.env.NEXT_PUBLIC_URL_CLOUDFLARE,
  NEXT_PUBLIC_KEY_ENCRYPT: process.env.NEXT_PUBLIC_KEY_ENCRYPT,
  NEXT_PUBLIC_CDN_PAGE: process.env.NEXT_PUBLIC_CDN_PAGE,
};
