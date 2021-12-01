export const injectStyle = (rule: string) => {
  const styleEl = document.createElement('style') as HTMLStyleElement;
  document.head.appendChild(styleEl);

  const styleSheet = styleEl.sheet as CSSStyleSheet;
  if (styleSheet) styleSheet.insertRule(rule, styleSheet.cssRules.length);
};
