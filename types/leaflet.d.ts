// types/leaflet.d.ts
declare module 'leaflet/dist/leaflet.css' {
  const content: unknown;
  export default content;
}

// Additional Leaflet type declarations if needed
declare module 'leaflet' {
  export = L;
}