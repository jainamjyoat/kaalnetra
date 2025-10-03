export default function Head() {
  return (
    <>
      {/* Ensure favicon is included immediately during initial load and transitions */}
      <link rel="icon" href="/Pictures/Favicon.png" type="image/png" sizes="any" />
      <link rel="apple-touch-icon" href="/Pictures/Favicon.png" />
      <link rel="shortcut icon" href="/Pictures/Favicon.png" type="image/png" />
      <link rel="preload" as="image" href="/Pictures/Favicon.png" />
      {/* Optional theme color for better PWA/Android display */}
      <meta name="theme-color" content="#000000" />
    </>
  );
}
