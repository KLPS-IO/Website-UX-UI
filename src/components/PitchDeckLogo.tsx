export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="klps-logo" style={light ? { color: "white" } : undefined}>
      <span className="mark" />
      <span>KLPS</span>
      <span className="tag" style={light ? { color: "rgba(255,255,255,0.75)" } : undefined}>
        technology
      </span>
    </div>
  );
}
