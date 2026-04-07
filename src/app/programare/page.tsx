'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

async function uploadFile(file: File, prefix: string): Promise<string> {
  const ext = file.name.split('.').pop() || 'bin';
  const path = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from('documente').upload(path, file);
  if (error) throw error;
  return path;
}

export default function Programare() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [err, setErr] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErr('');

    const fd = new FormData(e.currentTarget);
    const factura = fd.get('factura_utilitati') as File | null;
    const extras = fd.get('extras_cont') as File | null;
    const buletin = fd.get('buletin') as File | null;

    if (!factura?.size || !extras?.size || !buletin?.size) {
      setErr('Toate cele 3 documente sunt obligatorii.');
      setStatus('err');
      return;
    }

    try {
      const [factura_path, extras_path, buletin_path] = await Promise.all([
        uploadFile(factura, 'factura'),
        uploadFile(extras, 'extras'),
        uploadFile(buletin, 'buletin'),
      ]);

      const { error } = await supabase.from('programari').insert({
        nume: String(fd.get('nume') || ''),
        telefon: String(fd.get('telefon') || ''),
        email: String(fd.get('email') || ''),
        categorie: String(fd.get('categorie') || 'B'),
        pasiuni: String(fd.get('pasiuni') || ''),
        mesaj: String(fd.get('mesaj') || ''),
        factura_utilitati_path: factura_path,
        extras_cont_path: extras_path,
        buletin_path: buletin_path,
      });
      if (error) throw error;

      setStatus('ok');
      (e.target as HTMLFormElement).reset();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Eroare necunoscută');
      setStatus('err');
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
          <label className="block text-sm font-medium">Pasiuni</label>
          <textarea
            name="pasiuni"
            rows={3}
            placeholder="Spune-ne ce hobby-uri și pasiuni ai..."
            className="mt-1 w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Mesaj (opțional)</label>
          <textarea name="mesaj" rows={3} className="mt-1 w-full rounded-lg border p-2" />
        </div>

        <fieldset className="rounded-lg border p-4">
          <legend className="px-2 text-sm font-semibold text-blue-700">Documente obligatorii</legend>
          <FileField label="Factură la utilități" name="factura_utilitati" />
          <FileField label="Extras de cont" name="extras_cont" />
          <FileField label="Buletin (CI)" name="buletin" />
          <p className="mt-2 text-xs text-slate-500">
            Acceptăm: PDF, JPG, PNG. Max 10 MB / fișier.
          </p>
        </fieldset>

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

function FileField({ label, name }: { label: string; name: string }) {
  return (
    <div className="mt-3">
      <label className="block text-sm font-medium">{label}</label>
      <input
        type="file"
        name={name}
        accept=".pdf,.jpg,.jpeg,.png"
        required
        className="mt-1 block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-blue-700 file:px-3 file:py-2 file:text-white hover:file:bg-blue-800"
      />
    </div>
  );
}
