export type ThemeName = 'wabooks' | 'webill365' | 'wecafe';
export type ColorMode = 'light' | 'dark';

export interface FeedbackPair {
  solid: string;
  subtle: string;
}

export interface ColorTokens {
  bg: {
    default: string;
    surface: {
      default: string;
      subtle: string;
      ghost: string;
      emphasized: string;
      inverse: string;
      disabled: string;
    };
    brand: {
      primary: string;
      subtle: string;
      subtleHover: string;
      subtlePress: string;
      contrast: string;
    };
    feedback: {
      neutral: FeedbackPair & { outline: string; surface: string };
      info: FeedbackPair;
      error: FeedbackPair;
      success: FeedbackPair;
      warning: FeedbackPair;
      caution: FeedbackPair;
      accent: FeedbackPair;
    };
    danger: {
      default: string;
      subtle: string;
      subtleHover: string;
      subtlePressed: string;
    };
  };
  text: {
    default: string;
    onBgPrimary: string;
    subtle: string;
    brand: string;
    disabled: string;
    inverse: string;
    danger: string;
    onBgDanger: string;
    success: string;
    warning: string;
    feedback: {
      neutral: FeedbackPair;
      info: FeedbackPair;
      error: FeedbackPair;
      success: FeedbackPair;
      warning: FeedbackPair;
      caution: FeedbackPair;
      accent: FeedbackPair;
    };
  };
  border: {
    default: string;
    brand: string;
    subtle: string;
    contrast: string;
    subtleHover: string;
    strong: string;
    danger: string;
    success: string;
    disabled: string;
    emphasized: string;
    inverse: string;
    feedback: {
      neutral: FeedbackPair;
      info: FeedbackPair;
      error: FeedbackPair;
      success: FeedbackPair;
      warning: FeedbackPair;
      caution: FeedbackPair;
      accent: FeedbackPair;
    };
  };
}

export interface ShadowTokens {
  brand: {
    default:   string;
    hover:     string;
    pressed:   string;
    secondary: string;
    sm: string;  // kept for backwards compat
    md: string;  // kept for backwards compat
  };
  default: {
    default: string;
    hover:   string;
    pressed: string;
  };
  danger: {
    default: string;
    hover:   string;
    pressed: string;
  };
  toggle: {
    default: string;
    hover:   string;
    pressed: string;
    checked: string;
  };
  input: {
    default: string;
    brand:   string;
    warning: string;
    success: string;
  };
  disabled: string;
  floating: {
    default: string;
    genCard: string;
    float:   string;
  };
}

export interface ThemeTokens {
  name: ThemeName;
  mode: ColorMode;
  color: ColorTokens;
  shadow: ShadowTokens;
}
