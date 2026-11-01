// The visual scene is isolated from the interface. Replace this composite with
// separate sky, planet and terrain layers here when production assets are ready.
export default function CosmicScene() {
  return (
    <div className="cosmic-scene" aria-hidden="true">
      <picture className="scene-art" data-parallax>
        <source
          media="(max-width: 639px)"
          srcSet="/images/galaxy-mobile.webp"
        />
        <img
          src="/images/galaxy.webp"
          alt=""
          fetchPriority="high"
          decoding="async"
          width="1586"
          height="992"
        />
      </picture>
      <div className="scene-shade" />
      <div className="stars">
        {Array.from({ length: 28 }, (_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 37 + 11) % 100}%`,
              top: `${(i * 19 + 7) % 70}%`,
              animationDelay: `${i * -0.43}s`,
              animationDuration: `${3 + (i % 5)}s`,
            }}
          />
        ))}
      </div>
      <div className="scene-vignette" />
    </div>
  );
}
