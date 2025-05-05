import React, { useState, useMemo } from 'react';
import { getYears, generateMonths } from './utils/dateUtils';
import KidForm from './components/KidForm';
import KidItem from './components/KidItem';
import StatsTable from './components/StatsTable';

function App() {
  const years = useMemo(getYears, []);
  const [year, setYear] = useState(years[2]);
  const [kids, setKids] = useState([]);
  const [form, setForm] = useState({ name: '', birthday: '', start: '', end: '', group: 'Gelb' });

  const months = useMemo(() => generateMonths(year), [year]);

  const addKid = e => { e.preventDefault(); setKids([...kids, { ...form, id: Date.now() }]); setForm({ name:'', birthday:'', start:'', end:'', group:'Gelb' }); };
  const updateKid = (id, field, value) => setKids(kids.map(k => k.id===id ? { ...k, [field]: value } : k));
  const removeKid = id => setKids(kids.filter(k => k.id !== id));

  const exportCSV = () => {
    const headers = ['id','name','birthday','start','end','group'];
    const rows = kids.map(k => headers.map(h => k[h] || '').join(','));
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'kinder.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportExcel = () => {
    import('xlsx').then(xlsx => {
      const wb = xlsx.utils.book_new();

      // Kids Sheet
      const kidsHeaders = ['id','name','birthday','start','end','group'];
      const kidsRows = kids.map(k => kidsHeaders.map(h => k[h] || ''));
      xlsx.utils.book_append_sheet(wb, xlsx.utils.aoa_to_sheet([kidsHeaders, ...kidsRows]), 'Kids');

      // Stats Sheet
      const statsHeaders = Object.keys(stats[0] || {});
      const statsRows = stats.map(s => statsHeaders.map(h => s[h] || ''));
      xlsx.utils.book_append_sheet(wb, xlsx.utils.aoa_to_sheet([statsHeaders, ...statsRows]), 'Stats');

      xlsx.writeFile(wb, 'kiga_data.xlsx');
    });
  };

  const importCSV = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (evt) => {
    const text = evt.target.result;
    const [headerLine, ...lines] = text.split(/\r?\n/);
    const headers = headerLine.split(',');
    const imported = lines
      .filter(line => line.trim() !== '')
      .map(line => {
        const values = line.split(',');
        const obj = headers.reduce((acc, h, i) => {
          acc[h] = values[i];
          return acc;
        }, {});
        return {
          ...obj,
          id: Number(obj.id) || Date.now() + Math.random()
        };
      });
    setKids(prev => [...prev, ...imported]);
  };
  reader.readAsText(file);
  // Damit dieselbe Datei erneut importiert werden kann:
  e.target.value = null;
};

  const computeStats = () => {
  return months.map(m => {
    // Monatsanfang und Monatsende
    const monthStart = m.date;
    const monthEnd = new Date(
      monthStart.getFullYear(),
      monthStart.getMonth() + 1,
      0
    );
    // Datum für den 5. des aktuellen Monats
    const fifthOfMonth = new Date(
      monthStart.getFullYear(),
      monthStart.getMonth(),
      5
    );

    const row = { month: m.label };

    ['Gelb', 'Grün'].forEach(g => {
      let occ = 0;
      let count = 0;

      kids
        .filter(k => k.group === g)
        .forEach(k => {
          const b = new Date(k.birthday);
          const s = new Date(k.start);
          const e = k.end ? new Date(k.end) : null;

          if (s <= monthEnd && (!e || e >= monthStart)) {
            const ageAtFifth = (fifthOfMonth - b) / (1000 * 60 * 60 * 24 * 365.25);
            occ += ageAtFifth < 3 ? 2 : 1;
            count += 1;
          }
        });

      row[`occ${g}`] = occ;
      row[`count${g}`] = count;
      row[`free${g}`] = 22 - occ;
    });

    row.occTotal = row.occGelb + row.occGrün;
    row.freeTotal = 44 - row.occTotal;

    return row;
  });
};
  const stats = useMemo(computeStats, [kids, months]);

  return (
    <>
      {/* Year selector + CSV Buttons */}
      <div className="flex justify-center mb-4 space-x-4">
        <label className="mr-2 font-medium">Jahr:</label>
        <select className="border rounded px-2 py-1" value={year} onChange={e=>setYear(parseInt(e.target.value))}>
          {years.map(y=><option key={y} value={y}>{y}/{y+1}</option>)}
        </select>
        <button onClick={exportCSV} className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition">Export CSV</button>
        <button onClick={exportExcel} className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition">Export XLSX</button>
        <label className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition cursor-pointer">
          Import CSV
          <input type="file" accept=".csv" onChange={importCSV} className="hidden" />
        </label>
      </div>

      <KidForm form={form} setForm={setForm} addKid={addKid} />

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {['Gelb','Grün'].map(g=>(
          <div key={g} className="bg-white p-4 rounded shadow">
            <div className={`text-lg font-semibold mb-2 p-2 rounded ${g==='Gelb'?'bg-yellow-400 text-black':'bg-green-500 text-white'}`}>Gruppe {g}</div>
            {kids.filter(k=>k.group===g).map(k=><KidItem key={k.id} kid={k} updateKid={updateKid} removeKid={removeKid} />)}
          </div>
        ))}
      </div>

      <StatsTable stats={stats} />
    </>
  );
}

export default App;