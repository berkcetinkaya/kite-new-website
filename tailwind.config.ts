import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1600px",
      "4xl": "1920px",
    },
    extend: {
      colors: {
        paper: "var(--color-paper)",
        "paper-dim": "var(--color-paper-dim)",
        "paper-soft": "var(--color-paper-soft)",
        ink: "var(--color-ink)",
        "ink-soft": "var(--color-ink-soft)",
        kite: "var(--color-kite-yellow)",
        "kite-dark": "var(--color-kite-yellow-dark)",
        line: "var(--color-line)",
        "line-soft": "var(--color-line-soft)",
        "line-inverse": "var(--color-line-inverse)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      fontSize: {
        "display-2xl": ["var(--fs-display-2xl)", { lineHeight: "0.94", letterSpacing: "-0.02em" }],
        "display-xl": ["var(--fs-display-xl)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-lg": ["var(--fs-display-lg)", { lineHeight: "0.97", letterSpacing: "-0.015em" }],
        "display-md": ["var(--fs-display-md)", { lineHeight: "1", letterSpacing: "-0.01em" }],
        "display-sm": ["var(--fs-display-sm)", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
        "body-lg": ["var(--fs-body-lg)", { lineHeight: "1.6", letterSpacing: "-0.011em" }],
        "body-md": ["var(--fs-body-md)", { lineHeight: "1.62", letterSpacing: "-0.011em" }],
        "body-sm": ["var(--fs-body-sm)", { lineHeight: "1.56", letterSpacing: "-0.006em" }],
        label: ["var(--fs-label)", { lineHeight: "1.2", letterSpacing: "0.08em" }],
        eyebrow: ["var(--fs-eyebrow)", { lineHeight: "1.2", letterSpacing: "0.16em" }],
      },
      spacing: {
        "3xs": "var(--space-3xs)",
        "2xs": "var(--space-2xs)",
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "3xl": "var(--space-3xl)",
        "4xl": "var(--space-4xl)",
        gutter: "var(--space-gutter)",
      },
      maxWidth: {
        container: "var(--container-max)",
      },
      borderColor: {
        DEFAULT: "var(--color-line)",
      },
      letterSpacing: {
        tightest: "-0.03em",
        wide: "0.08em",
        widest: "0.16em",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
