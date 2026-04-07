'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Programare() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [err, setErr] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const fd = new FormData(e.currentTarget);
    const payload = {
      nume: String(fd.get('nume') || ''),
      telefon: String(fd.get('telefon') || ''),
      email: String(fd.get('email') || ''),
      categorie: String(fd.get('categorie') || 'B'),
      mesaj: String(fd.get('mesaj') || ''),
    };
    const { error } = await supabase.from('programari').insert(payload);
    if (error) {
      setErr(error.message);
      setStatus('err');
    } else {
      setStatus('ok');
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <section className="max-w-2xl">
      <h1 className="text-3xl font-bold">Programare</h1>
      <p className="mt-2 text-slate-600">Completează formularul și te contactăm noi.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-xl border bg-white p-6 shadow-sm">
        <Field label="Nume complet" name="nume" required />
        <Field label="Telefon" name="telefon" type="tel" required />
        <Field label="Email" name="email" type="email" required />
        <div>
          <label className="block text-sm font-medium">Categorie</label>
          <select name="categorie" className="mt-1 w-full rounded-lg border p-2">
            <option value="B">B - Autoturisme</option>
            <option value="A">A - Motociclete</option>
            <option value="C">C - Camioane</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Mesaj (opțional)</label>
          <textarea name="mesaj" rows={3} className="mt-1 w-full rounded-lg border p-2" />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
        >
          {status === 'loading' ? 'Se trimite...' : 'Trimite cererea'}
        </button>

        {status === 'ok' && <p className="text-green-700">Mulțumim! Te vom contacta în curând.</p>}
        {status === 'err' && <p className="text-red-700">Eroare: {err}</p>}
      </form>
    </section>
  );
}

function Field({ label, name, type = 'text', required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full rounded-lg border p-2"
      />
    </div>
  );
}
