// Centralized animation utilities (50% faster)
export const animations = {
  // Page transitions
  pageEnter: "animate-fade-up",
  pageExit: "animate-fade-out",
  
  // Staggered delays
  delay1: "animate-fade-up-delay-1",
  delay2: "animate-fade-up-delay-2",
  delay3: "animate-fade-up-delay-3",
  delay4: "animate-fade-up-delay-4",
  
  // Interactive elements
  hover: "transition-all duration-100 hover:scale-105 active:scale-95",
  hoverSubtle: "transition-all duration-100 hover:scale-[1.02] active:scale-98",
  hoverCard: "transition-all duration-150 hover:border-slate-600/50 hover:transform hover:scale-[1.01]",
  hoverImage: "transition-transform duration-150 hover:scale-110",
  
  // Buttons
  button: "transition-all duration-100 hover:scale-105 active:scale-95",
  buttonIcon: "transition-all duration-100 hover:scale-110 active:scale-95",
  
  // Inputs
  input: "transition-all duration-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50",
  
  // Misc
  slideDown: "animate-slide-down",
  smooth: "transition-all duration-150",
} as const;

// Generate staggered delay style (50% faster)
export const staggerDelay = (index: number, baseDelay: number = 0.025) => ({
  animationDelay: `${index * baseDelay}s`,
});
