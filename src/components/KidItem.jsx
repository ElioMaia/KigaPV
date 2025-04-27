import React from 'react';

const KidItem = ({ kid, updateKid, removeKid }) => (
  <div className="flex flex-wrap items-center gap-2 mb-2">
    <input
      className="border rounded px-2 py-1 flex-1"
      value={kid.name}
      onChange={e => updateKid(kid.id, 'name', e.target.value)}
    />
    <input
      type="date"
      className="border rounded px-2 py-1"
      value={kid.birthday}
      onChange={e => updateKid(kid.id, 'birthday', e.target.value)}
    />
    <input
      type="date"
      className="border rounded px-2 py-1"
      value={kid.start}
      onChange={e => updateKid(kid.id, 'start', e.target.value)}
    />
    <input
      type="date"
      className="border rounded px-2 py-1"
      value={kid.end}
      onChange={e => updateKid(kid.id, 'end', e.target.value)}
    />
    <select
      className="border rounded px-2 py-1"
      value={kid.group}
      onChange={e => updateKid(kid.id, 'group', e.target.value)}
    >
      <option>Gelb</option>
      <option>Grün</option>
    </select>
    <button
      onClick={() => removeKid(kid.id)}
      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
    >Löschen</button>
  </div>
);

export default KidItem;