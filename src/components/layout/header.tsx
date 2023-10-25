import ThemeToggler from './theme-toggler';

export default function Header(): JSX.Element {
  return (
    <header className="flex w-full justify-center border-b border-foreground bg-background py-4">
      <div className="flex w-full max-w-screen-xl items-center justify-between">
        <p className="text-2xl font-bold">Massive Bioinformatics Assessment</p>
        <ThemeToggler />
      </div>
    </header>
  );
}
