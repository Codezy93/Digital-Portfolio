export default function ProjectThumb({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt || ''}
      loading="lazy"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  );
}
