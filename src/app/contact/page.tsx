export default function Contact() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Contact</h1>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-blue-700">Adresă</h3>
          <p className="mt-2 text-slate-700">Str. Exemplu nr. 10, București</p>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-blue-700">Telefon & Email</h3>
          <p className="mt-2 text-slate-700">+40 712 345 678</p>
          <p className="text-slate-700">contact@scoalaautobujor.ro</p>
        </div>
      </div>
    </section>
  );
}
