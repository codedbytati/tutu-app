export type MeuComponenteProps = {
  titulo: string;
  mensagem: string;
};

export default function MeuComponente({
  titulo,
  mensagem,
}: MeuComponenteProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">
        Remote Vite
      </p>
      <h2 className="mt-3 text-2xl font-bold text-slate-900">{titulo}</h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
        {mensagem}
      </p>
    </section>
  );
}