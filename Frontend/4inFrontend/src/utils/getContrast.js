function getLuminance(hexColor) {
  let r = parseInt(hexColor.slice(1, 3), 16) / 255;
  let g = parseInt(hexColor.slice(3, 5), 16) / 255;
  let b = parseInt(hexColor.slice(5, 7), 16) / 255;

  r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastingTextColor(backgroundHex) {
  const luminance = getLuminance(backgroundHex);
  return luminance > 0.5 ? "text-neutral-700" : "text-neutral-50";
}

export { getContrastingTextColor };
