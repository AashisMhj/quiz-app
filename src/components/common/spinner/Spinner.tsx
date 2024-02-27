export default function Spinner() {
  return (
    <span className="relative flex h-6 w-6">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
      <span className="relative inline-flex h-6 w-6 rounded-full bg-primary"></span>
    </span>
  );
}
