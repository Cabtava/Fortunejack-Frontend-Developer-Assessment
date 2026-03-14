interface ErrorStateProps {
  message?: string;
}

export function ErrorState({
  message = "Something went wrong.",
}: ErrorStateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <p className="text-red-400">{message}</p>
    </div>
  );
}
