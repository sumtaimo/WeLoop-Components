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
    sm: string;
    md: string;
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

export interface MotionTokens {
  duration: {
    fast:   string; // 100ms — micro interactions
    normal: string; // 200ms — standard transitions
    slow:   string; // 300ms — panels, modals entering
    slower: string; // 500ms — page-level transitions
  };
  easing: {
    default: string; // standard ease-in-out
    spring:  string; // overshoot for playful feel
    enter:   string; // decelerate — elements entering
    exit:    string; // accelerate — elements leaving
  };
}

export interface RadiusTokens {
  none: string;   // 0
  xs:   string;   // 2px
  sm:   string;   // 4px
  md:   string;   // 8px
  lg:   string;   // 12px
  xl:   string;   // 16px
  xxl:  string;   // 24px
  full: string;   // 9999px
}

export interface ThemeTokens {
  name: ThemeName;
  mode: ColorMode;
  color: ColorTokens;
  shadow: ShadowTokens;
  motion: MotionTokens;
  radius: RadiusTokens;
}
