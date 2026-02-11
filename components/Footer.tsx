export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 px-4 text-sm text-zinc-400 sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} BrightPath Academy, Mohali</p>
        <p>Admissions Open — Free Demo Class</p>
      </div>
    </footer>
  );
}
