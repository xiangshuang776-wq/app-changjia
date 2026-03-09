'use client';
import { useState } from 'react';
import { Upload, Scan, Loader2, Video, Cpu } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch('/api/product-search', { method: 'POST', body: formData });
      setResult(await res.json());
    } catch { alert("連線異常"); } finally { setLoading(false); }
  };

  return (
    <main className="max-w-md mx-auto min-h-screen bg-[#020617] text-white p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px]"></div>
      <header className="py-6 flex items-center gap-2 relative z-10 font-bold tracking-tighter italic">
        <Cpu className="text-blue-500 w-5 h-5" /> TRUE FACTORY AI
      </header>
      {!result ? (
        <div className="py-20">
          <h1 className="text-5xl font-black italic mb-8 uppercase leading-[0.9]">Reveal The <br/><span className="text-blue-500">Truth.</span></h1>
          <label className="block bg-slate-900/50 border border-white/10 rounded-[40px] p-20 text-center cursor-pointer active:scale-95 transition-all">
            {loading ? <Loader2 className="animate-spin h-12 w-12 mx-auto" /> : <Scan className="h-12 w-12 mx-auto text-blue-500" />}
            <span className="block mt-4 font-bold text-xl">{loading ? "解析數據中..." : "啟動視覺偵察"}</span>
            <input type="file" hidden onChange={handleUpload} disabled={loading} />
          </label>
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-bottom-10">
          <div className="bg-blue-600 rounded-[40px] p-10 text-center shadow-[0_20px_50px_rgba(59,130,246,0.4)] border border-blue-400/30">
            <p className="text-[10px] font-black opacity-60 mb-2 tracking-widest uppercase italic">源頭工廠底價</p>
            <span className="text-6xl font-black tracking-tighter italic">${result.factory_price}</span>
          </div>
          <button className="w-full bg-white text-black py-7 rounded-[40px] font-black text-xl flex items-center justify-center gap-3 active:scale-95 transition-all">
            <Video className="w-6 h-6" /> 生成 TikTok 爆款劇本
          </button>
        </div>
      )}
    </main>
  );
}
