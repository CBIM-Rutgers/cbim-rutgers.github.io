export default function ScrollPanel({
  children,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div className="relative">
      <div
        className={`scroll-panel overflow-y-auto overscroll-contain pr-3 ${className}`}
      >
        {children}
      </div>
      {/* Bottom fade hints that the list continues */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-3 h-12 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}
