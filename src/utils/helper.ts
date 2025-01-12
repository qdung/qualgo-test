export function removeHtmlEntities(str: string) {
  const htmlEntities: { [key: string]: string } = {
    '&#039;': "'",
    '&amp;': '&',
    '&apos;': "'",
    '&gt;': '>',
    '&lt;': '<',
    '&quot;': '"',
    // Add more entities as needed
  };

  return str.replaceAll(
    /&amp;|&lt;|&gt;|&quot;|&apos;|&#039;/g,
    (match) => htmlEntities[match],
  );
}
