'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const STEPS = ['uploading', 'analyzing', 'generating'];

function StepBadge({ label, state }) {
  const base = 'px-3 py-1 text-xs font-black uppercase border-2 border-black';
  if (state === 'active') return <span className={`${base} bg-yellow-400 text-black animate-pulse`}>{label}</span>;
  if (state === 'done')   return <span className={`${base} bg-green-400 text-black`}>{label}</span>;
  return <span className={`${base} bg-gray-700 text-gray-400`}>{label}</span>;
}

function stepState(currentStep, badgeStep) {
  const order = ['uploading', 'analyzing', 'generating', 'done'];
  const current = order.indexOf(currentStep);
  const badge   = order.indexOf(badgeStep);
  if (current === badge) return 'active';
  if (current > badge)   return 'done';
  return 'pending';
}

function CompiledPdfPanel({ compileStep, compiledPdfUrl, onRetry }) {
  if (compileStep === 'compiling') {
    return (
      <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-green-400 font-black uppercase text-sm">Rendering your LaTeX...</p>
        <p className="text-gray-500 font-mono text-xs">This takes a few seconds</p>
      </div>
    );
  }

  if (compileStep === 'done' && compiledPdfUrl) {
    return (
      <iframe
        src={compiledPdfUrl}
        className="w-full h-full"
        style={{ border: 'none', display: 'block' }}
        title="Compiled PDF"
      />
    );
  }

  if (compileStep === 'error') {
    return (
      <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center gap-4 p-8">
        <div className="bg-pink-400 border-4 border-black p-6 shadow-[4px_4px_0px_0px_#000] max-w-md w-full">
          <p className="font-black uppercase text-black text-sm mb-2">Compilation Failed</p>
          <p className="font-bold text-black text-xs">
            Your source may contain unsupported packages or syntax errors.
          </p>
        </div>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-yellow-400 text-black font-black uppercase text-sm border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          RETRY
        </button>
      </div>
    );
  }

  return null;
}

export default function ConvertPage() {
  const [file, setFile]             = useState(null);
  const [step, setStep]             = useState('idle');
  const [latexCode, setLatexCode]   = useState('');
  const [pdfUrl, setPdfUrl]         = useState(null);
  const [errorMsg, setErrorMsg]     = useState('');
  const [dragOver, setDragOver]     = useState(false);
  const [tokenCount, setTokenCount] = useState(0);
  const [progress, setProgress]     = useState(0);
  const [compileStep, setCompileStep]     = useState('idle');
  const [compiledPdfUrl, setCompiledPdfUrl] = useState(null);
  const codeRef    = useRef(null);
  const fileInputRef = useRef(null);

  const handleFile = (f) => {
    if (!f || f.type !== 'application/pdf') return;
    setFile(f);
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(URL.createObjectURL(f));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const triggerCompile = async (code) => {
    const src = code ?? latexCode;
    setCompileStep('compiling');
    try {
      const res = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latex: src }),
      });
      if (!res.ok) throw new Error('Compilation failed');
      const blob = await res.blob();
      if (compiledPdfUrl) URL.revokeObjectURL(compiledPdfUrl);
      setCompiledPdfUrl(URL.createObjectURL(blob));
      setCompileStep('done');
    } catch {
      setCompileStep('error');
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setStep('uploading');
    setLatexCode('');
    setTokenCount(0);
    setProgress(0);
    setCompileStep('idle');
    if (compiledPdfUrl) {
      URL.revokeObjectURL(compiledPdfUrl);
      setCompiledPdfUrl(null);
    }

    const formData = new FormData();
    formData.append('pdfFile', file);

    try {
      const response = await fetch('/api/convert', { method: 'POST', body: formData });
      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Server error' }));
        throw new Error(err.error || 'Conversion failed');
      }

      setStep('analyzing');

      const reader  = response.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      let firstToken = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        acc += chunk;
        if (!firstToken && chunk.trim().length > 0) {
          firstToken = true;
          setStep('generating');
        }
        setLatexCode(acc);
        const tokens = Math.round(acc.length / 4);
        setTokenCount(tokens);
        setProgress(Math.min(Math.round(tokens / 82), 95));
        if (codeRef.current) {
          codeRef.current.scrollTop = codeRef.current.scrollHeight;
        }
      }

      setProgress(100);
      setStep('done');
      // auto-compile with the final accumulated code
      triggerCompile(acc);
    } catch (err) {
      setErrorMsg(err.message || 'Conversion failed');
      setStep('error');
    }
  };

  const handleReset = () => {
    setFile(null);
    setStep('idle');
    setLatexCode('');
    setErrorMsg('');
    setTokenCount(0);
    setProgress(0);
    setCompileStep('idle');
    if (pdfUrl) { URL.revokeObjectURL(pdfUrl); setPdfUrl(null); }
    if (compiledPdfUrl) { URL.revokeObjectURL(compiledPdfUrl); setCompiledPdfUrl(null); }
  };

  const handleCopy = () => navigator.clipboard.writeText(latexCode);

  const isLoading = step === 'uploading' || step === 'analyzing' || step === 'generating';

  return (
    <div className="h-screen flex flex-col overflow-hidden">

      {/* Compact nav bar — always visible */}
      <div className="flex-shrink-0 px-5 py-3 border-b-4 border-black bg-white flex items-center gap-3 flex-wrap">
        <Link href="/" className="text-xl font-black uppercase tracking-tight text-black hover:text-yellow-400 transition-colors shrink-0">
          MATH<span className="text-yellow-400">&</span>TEX
        </Link>

        {isLoading && (
          <>
            <div className="flex items-center gap-2 flex-wrap">
              {STEPS.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <StepBadge label={s} state={stepState(step, s)} />
                  {i < STEPS.length - 1 && <span className="text-gray-400 text-xs">▶</span>}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-auto shrink-0">
              <div className="w-32 bg-gray-200 border-2 border-black h-3 hidden sm:block">
                <div className="h-full bg-yellow-400 transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-gray-500 font-mono text-xs">{progress}%</span>
            </div>
          </>
        )}

        {step === 'done' && (
          <>
            <span className="px-3 py-1 text-xs font-black uppercase border-2 border-black bg-green-400 text-black">
              ✔ DONE · {tokenCount.toLocaleString()} tokens
            </span>
            <div className="flex gap-2 ml-auto flex-wrap">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-yellow-400 text-black font-black uppercase text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                COPY
              </button>
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(latexCode)}`}
                download={`${file?.name?.replace(/\.pdf$/i, '') ?? 'document'}.tex`}
                className="px-3 py-1.5 bg-cyan-400 text-black font-black uppercase text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                ↓ .tex
              </a>
              <button
                onClick={handleReset}
                className="px-3 py-1.5 bg-white text-black font-black uppercase text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                RESET
              </button>
            </div>
          </>
        )}

        {step === 'idle' && (
          <div className="flex gap-3 ml-auto">
            <Link href="/" className="font-black py-1.5 px-3 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all uppercase text-xs">
              HOME
            </Link>
            <Link href="/about" className="font-black py-1.5 px-3 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all uppercase text-xs">
              ABOUT
            </Link>
          </div>
        )}

        {step === 'error' && (
          <button
            onClick={handleReset}
            className="px-3 py-1.5 bg-white text-black font-black uppercase text-xs border-2 border-black ml-auto shadow-[2px_2px_0px_0px_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            RESET
          </button>
        )}
      </div>

      {/* Idle: scrollable centered upload form */}
      {step === 'idle' && (
        <div className="flex-1 overflow-y-auto px-5 md:px-12 lg:px-28 py-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-pink-400 border-4 border-black px-8 py-4 shadow-[8px_8px_0px_0px_#000] transform -rotate-1">
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black">
                PDF → LaTeX
              </h1>
              <p className="text-lg font-bold text-black mt-2 uppercase">
                Convert any PDF to compilable LaTeX source
              </p>
            </div>
          </div>

          <div className="max-w-[700px] mx-auto space-y-6">
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              className={`border-8 border-black border-dashed p-16 text-center cursor-pointer transition-all shadow-[8px_8px_0px_0px_#000] ${
                dragOver ? 'bg-yellow-400' : 'bg-white hover:bg-yellow-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              <div className="text-6xl mb-4">📄</div>
              {file ? (
                <>
                  <p className="text-2xl font-black uppercase text-black">{file.name}</p>
                  <p className="text-base font-bold text-gray-600 mt-2">
                    {(file.size / 1024).toFixed(0)} KB — Click to change
                  </p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-black uppercase text-black">Drop PDF here</p>
                  <p className="text-base font-bold text-gray-600 mt-2">or click to browse</p>
                </>
              )}
            </div>

            <button
              onClick={handleConvert}
              disabled={!file}
              className={`w-full py-5 text-2xl font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_#000] transition-all ${
                file
                  ? 'bg-yellow-400 hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              }`}
            >
              CONVERT
            </button>
          </div>
        </div>
      )}

      {/* Loading: full-height split (original PDF | streaming code) */}
      {isLoading && (
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="hidden md:flex border-r-4 border-black overflow-hidden">
            {pdfUrl && (
              <iframe
                src={pdfUrl}
                className="w-full h-full"
                style={{ border: 'none', display: 'block' }}
                title="Original PDF"
              />
            )}
          </div>
          <div
            ref={codeRef}
            className="bg-gray-900 overflow-y-auto p-4 font-mono text-sm text-green-400 whitespace-pre-wrap"
          >
            {latexCode}
            <span className="animate-pulse">█</span>
          </div>
        </div>
      )}

      {/* Done: full-height split (LaTeX source | compiled PDF) */}
      {step === 'done' && (
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="hidden md:block border-r-4 border-black bg-gray-900 overflow-y-auto p-4 font-mono text-sm text-green-400 whitespace-pre-wrap">
            {latexCode}
          </div>
          <div className="overflow-hidden flex flex-col">
            <CompiledPdfPanel
              compileStep={compileStep}
              compiledPdfUrl={compiledPdfUrl}
              onRetry={() => triggerCompile()}
            />
          </div>
        </div>
      )}

      {/* Error state */}
      {step === 'error' && (
        <div className="flex-1 overflow-y-auto flex items-center justify-center px-5">
          <div className="bg-red-400 border-4 border-black p-8 shadow-[6px_6px_0px_0px_#000] max-w-lg w-full">
            <p className="font-black uppercase text-black text-lg mb-2">Conversion Error</p>
            <p className="font-bold text-black text-sm">{errorMsg}</p>
          </div>
        </div>
      )}
    </div>
  );
}
