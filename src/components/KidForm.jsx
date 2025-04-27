import React from 'react';

const KidForm = ({ form, setForm, addKid }) => (
  <form onSubmit={addKid} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
    {/* Name */}
    <div>
      <label className="block text-sm font-medium">Name *</label>
      <input
        type="text" required
        className="mt-1 w-full border rounded px-2 py-1"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
    </div>
    {/* Geburtsdatum */}
    <div>
      <label className="block text-sm font-medium">Geburtsdatum *</label>
      <input
        type="date" required
        className="mt-1 w-full border rounded px-2 py-1"
        value={form.birthday}
        onChange={e => setForm({ ...form, birthday: e.target.value })}
      />
    </div>
    {/* Aufnahme */}
    <div>
      <label className="block text-sm font-medium">Aufnahme *</label>
      <input
        type="date" required
        className="mt-1 w-full border rounded px-2 py-1"
        value={form.start}
        onChange={e => setForm({ ...form, start: e.target.value })}
      />
    </div>
    {/* Einschulung */}
    <div>
      <label className="block text-sm font-medium">Einschulung</label>
      <input
        type="date"
        className="mt-1 w-full border rounded px-2 py-1"
        value={form.end}
        onChange={e => setForm({ ...form, end: e.target.value })}
      />
    </div>
    {/* Gruppe */}
    <div>
      <label className="block text-sm font-medium">Gruppe *</label>
      <select
        required
        className="mt-1 w-full border rounded px-2 py-1"
        value={form.group}
        onChange={e => setForm({ ...form, group: e.target.value })}
      >
        <option>Gelb</option>
        <option>Grün</option>
      </select>
    </div>
    {/* Submit */}
    <button
      type="submit"
      className="md:col-span-5 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
    >Hinzufügen</button>
  </form>
);

export default KidForm;