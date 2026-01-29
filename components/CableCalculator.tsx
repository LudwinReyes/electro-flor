
import React, { useState } from 'react';
import { X, Zap, Ruler, Calculator, AlertTriangle, ShieldCheck } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CableCalculator: React.FC<Props> = ({ isOpen, onClose }) => {
  const [distance, setDistance] = useState<number>(0);
  const [voltage, setVoltage] = useState<'220' | '380'>('220');
  const [power, setPower] = useState<number>(0);
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    if (distance <= 0 || power <= 0) return;
    let gauge = "14 AWG (2.5 mm²)";
    if (power > 2000) gauge = "12 AWG (4 mm²)";
    if (power > 4000) gauge = "10 AWG (6 mm²)";
    if (power > 6000 || distance > 50) gauge = "8 AWG (10 mm²)";
    if (power > 10000) gauge = "6 AWG (16 mm²)";
    setResult(gauge);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 md:p-4">
      <div className="absolute inset-0 bg-[#002D62]/95 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border-4 border-[#8CC63F] max-h-[95vh] flex flex-col">
        <div className="bg-[#002D62] p-6 md:p-8 text-white flex justify-between items-start shrink-0">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="bg-[#8CC63F] p-3 md:p-4 rounded-2xl shrink-0">
              <Calculator size={28} className="text-[#002D62]" />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tighter">Calculadora Pro</h2>
              <p className="text-[10px] font-bold text-[#8CC63F] uppercase tracking-widest">Conductores Eléctricos</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition text-[#8CC63F]">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto overflow-x-hidden space-y-8 flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Ruler size={14} className="text-[#8CC63F]" /> Distancia (Metros)
                </label>
                <input 
                  type="number" 
                  value={distance || ''}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 font-black text-[#002D62] focus:border-[#8CC63F] outline-none text-lg"
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Zap size={14} className="text-[#8CC63F]" /> Voltaje (V)
                </label>
                <div className="flex gap-2">
                  {['220', '380'].map(v => (
                    <button 
                      key={v}
                      onClick={() => setVoltage(v as any)}
                      className={`flex-grow py-3 rounded-xl font-black text-[10px] uppercase border-2 transition-all ${voltage === v ? 'bg-[#002D62] text-white border-[#002D62]' : 'bg-white text-gray-400 border-gray-100'}`}
                    >
                      {v}V
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Zap size={14} className="text-[#8CC63F]" /> Potencia (Watts)
                </label>
                <input 
                  type="number" 
                  value={power || ''}
                  onChange={(e) => setPower(Number(e.target.value))}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 font-black text-[#002D62] focus:border-[#8CC63F] outline-none text-lg"
                  placeholder="0"
                />
              </div>

              <button 
                onClick={calculate}
                className="w-full bg-[#8CC63F] text-[#002D62] py-4 rounded-2xl font-black uppercase text-xs shadow-xl active:scale-95 transition-all"
              >
                Obtener Calibre
              </button>
            </div>

            <div className="flex flex-col h-full min-h-[200px]">
              <div className={`flex-grow rounded-3xl p-6 border-4 border-dashed flex flex-col items-center justify-center text-center transition-all ${result ? 'bg-gray-50 border-[#8CC63F]' : 'bg-gray-50 border-gray-200'}`}>
                {result ? (
                  <>
                    <ShieldCheck size={40} className="text-[#8CC63F] mb-3" />
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Recomendación Técnica:</span>
                    <p className="text-2xl font-black text-[#002D62] uppercase tracking-tighter">{result}</p>
                    <p className="text-[8px] font-bold text-gray-500 uppercase mt-4 max-w-[150px]">
                      Referencia basada en cobre 75°C
                    </p>
                  </>
                ) : (
                  <>
                    <Calculator size={40} className="text-gray-200 mb-3" />
                    <p className="text-[10px] font-black text-gray-300 uppercase">Completa los datos</p>
                  </>
                )}
              </div>
              
              <div className="mt-4 bg-amber-50 p-4 rounded-2xl flex gap-3">
                <AlertTriangle size={18} className="text-amber-500 shrink-0" />
                <p className="text-[8px] font-bold text-amber-700 uppercase leading-tight">
                  Cálculo referencial. Validar con un profesional certificado antes de la instalación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CableCalculator;
