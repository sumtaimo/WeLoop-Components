import type { ThemeTokens, ColorMode } from "./types";
import { getTheme } from "./context";
import type { ThemeName } from "./types";

/**
 * Deep-merges a partial override into a full ThemeTokens object.
 * Only goes two levels deep (the token tree shape).
 */
function deepMerge<T extends object>(base: T, override: DeepPartial<T>): T {
  const result = { ...base } as T;
  for (const key in override) {
    const k = key as keyof T;
    const overrideVal = override[k];
    const baseVal = base[k];
    if (
      overrideVal !== undefined &&
      typeof overrideVal === "object" &&
      !Array.isArray(overrideVal) &&
      typeof baseVal === "object" &&
      baseVal !== null
    ) {
      result[k] = deepMerge(baseVal as object, overrideVal as object) as T[keyof T];
    } else if (overrideVal !== undefined) {
      result[k] = overrideVal as T[keyof T];
    }
  }
  return result;
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Creates a custom ThemeTokens by merging overrides on top of an existing base theme.
 *
 * ## Usage
 * ```ts
 * import { createCustomTheme } from "@weloop/components/tokens";
 *
 * // Give your team a teal brand on top of the webill365 light base
 * const tealTheme = createCustomTheme("webill365", "light", {
 *   color: {
 *     bg: {
 *       brand: {
 *         primary: "#0D9488",     // teal-600
 *         subtle:  "#CCFBF1",     // teal-100
 *         subtleHover: "#99F6E4", // teal-200
 *         subtlePress: "#5EEAD4", // teal-300
 *         contrast: "#042F2E",    // teal-950
 *       },
 *     },
 *     text: { brand: "#0D9488" },
 *     border: { brand: "#14B8A6" },
 *   },
 *   shadow: {
 *     brand: {
 *       default: "0 0 0 4px rgba(20, 184, 166, 0.24)",
 *       sm: "0 0 0 2px rgba(20, 184, 166, 0.16)",
 *       md: "0 0 0 6px rgba(20, 184, 166, 0.32)",
 *     },
 *   },
 * });
 *
 * // Pass it to ThemeProvider
 * <ThemeProvider customTokens={tealTheme}>…</ThemeProvider>
 * ```
 */
export function createCustomTheme(
  baseTheme: ThemeName,
  mode: ColorMode,
  overrides: DeepPartial<ThemeTokens>
): ThemeTokens {
  const base = getTheme(baseTheme, mode);
  return deepMerge(base, overrides);
}

/**
 * Convenience shorthand: override just the brand color family from a single hex value.
 *
 * The function derives `subtle`, `subtleHover`, `subtlePress`, and border variants
 * automatically by applying opacity layers over white — good enough for quick prototyping.
 * For production precision, use `createCustomTheme` and specify all slots manually.
 *
 * @param base         - Base theme name to inherit from
 * @param mode         - Color mode
 * @param brandHex     - Primary brand color, e.g. "#0D9488"
 * @param overrides    - Optional extra token overrides applied on top
 */
export function createBrandTheme(
  base: ThemeName,
  mode: ColorMode,
  brandHex: string,
  overrides: DeepPartial<ThemeTokens> = {}
): ThemeTokens {
  // Simple derived subtle = brand at 12% opacity over white (#FFFFFF)
  // We express it as a CSS color-mix-compatible rgba string
  const brandOverrides: DeepPartial<ThemeTokens> = {
    color: {
      bg: {
        brand: {
          primary: brandHex,
          // These are approximations — teams should supply exact values in production
          subtle:       `color-mix(in srgb, ${brandHex} 10%, #FFFFFF)`,
          subtleHover:  `color-mix(in srgb, ${brandHex} 18%, #FFFFFF)`,
          subtlePress:  `color-mix(in srgb, ${brandHex} 26%, #FFFFFF)`,
          contrast:     brandHex,
        },
      },
      text:   { brand: brandHex },
      border: { brand: brandHex },
    },
    shadow: {
      brand: {
        default: `0 0 0 4px ${brandHex}3D`,
        sm:      `0 0 0 2px ${brandHex}29`,
        md:      `0 0 0 6px ${brandHex}52`,
      },
    },
    ...overrides,
  };
  return createCustomTheme(base, mode, brandOverrides);
}
