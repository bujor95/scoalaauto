import Link from 'next/link';

export default function Home() {
  return (
    <section className="space-y-10">
      <div className="rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 p-10 text-white shadow-lg">
        <h1 className="text-4xl font-bold">Învață să conduci cu încredere</h1>
        <p className="mt-3 max-w-xl text-lg text-blue-50">
          Instructori autorizați, mașini moderne, program flexibil. Pregătire completă
          pentru categoriile B, A și C.
        </p>
        <Link
          href="/programare"
          className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 hover:bg-blue-50"
        >
          Înscrie-te acum
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {[
          { t: 'Instructori atestați', d: 'Echipă cu experiență de peste 10 ani.' },
          { t: 'Program flexibil', d: 'Orare adaptate timpului tău.' },
          { t: 'Promovabilitate ridicată', d: 'Peste 90% promovați la prima încercare.' },
        ].map((x) => (
          <div key={x.t} className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-blue-700">{x.t}</h3>
            <p className="mt-2 text-sm text-slate-600">{x.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
