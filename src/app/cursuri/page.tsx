const cursuri = [
  { cat: 'B', titlu: 'Categoria B', desc: 'Autoturisme până la 3500 kg.', pret: '1800 RON' },
  { cat: 'A', titlu: 'Categoria A', desc: 'Motociclete fără limită de putere.', pret: '1500 RON' },
  { cat: 'C', titlu: 'Categoria C', desc: 'Autocamioane peste 3500 kg.', pret: '2500 RON' },
];

export default function Cursuri() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Cursuri disponibile</h1>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {cursuri.map((c) => (
          <div key={c.cat} className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-blue-700">{c.cat}</div>
            <h3 className="mt-2 font-semibold">{c.titlu}</h3>
            <p className="mt-1 text-sm text-slate-600">{c.desc}</p>
            <p className="mt-3 font-semibold">{c.pret}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
