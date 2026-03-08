"use client";

import { useState } from "react";
import { Activity, FileText, Upload, Clock, User, LogOut, AlertCircle, CheckCircle2, FileImage, History, ChevronRight } from "lucide-react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [chrData, setChrData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsSynthesizing(true);
    setError(null);
    setChrData(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    // Simulating a Firebase RAG query for this patient's past history
    const mockHistory = [
      {
        date: "2025-12-10",
        type: "Clinic Visit & Labs",
        details: "HBA1c Elevated (7.2%). Started on Metformin 500mg BID for T2DM."
      },
      {
        date: "2024-08-15",
        type: "Diagnosis",
        details: "Diagnosed with Hypertension. Prescribed Amlodipine 5mg OD. BP was 150/90."
      },
      {
        date: "2022-01-20",
        type: "Routine Checkup",
        details: "All vitals normal. No chronic illnesses at the time."
      }
    ];

    formData.append("history", JSON.stringify(mockHistory));

    try {
      const response = await fetch("/api/synthesize", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Synthesis failed");
      }

      setChrData(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="min-h-screen bg-anthropic-bg text-anthropic-text font-sans flex flex-col">
      {/* Top Navigation */}
      <header className="border-b border-anthropic-border-light bg-anthropic-bg-sec/80 backdrop-blur-md sticky top-0 z-50 shadow-[0_1px_2px_rgba(25,25,25,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-anthropic-primary to-[#E89A7E] p-2 rounded-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-anthropic-text">
              GeminiCHR.ai
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-anthropic-text-mut hover:text-anthropic-text-sec transition-colors cursor-pointer">
              <User className="w-4 h-4" />
              <span>Dr. Amin (Klinik Kesihatan)</span>
            </div>
            <button className="p-2 text-anthropic-text-mut hover:text-anthropic-text transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">

        {/* Left Column: Upload & Original Document (3/12 width) */}
        <section className="lg:col-span-3 flex flex-col gap-6">
          <div className="rounded-xl border border-anthropic-border bg-anthropic-bg-sec overflow-hidden flex flex-col h-[300px] shadow-[0_2px_4px_rgba(25,25,25,0.06)]">
            <div className="p-3 border-b border-anthropic-border-light flex items-center justify-between bg-white text-anthropic-text">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-anthropic-primary" />
                Upload Note
              </h2>
            </div>

            {!file ? (
              <label className="p-4 flex-1 flex flex-col items-center justify-center border-2 border-dashed border-anthropic-border-light rounded-lg mx-3 mb-3 mt-2 hover:bg-anthropic-bg-ter transition-colors cursor-pointer group leading-relaxed">
                <div className="bg-anthropic-primary-light p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-5 h-5 text-anthropic-primary" />
                </div>
                <p className="mt-3 text-sm font-medium text-anthropic-text">Drag & drop</p>
                <p className="mt-1 text-xs text-anthropic-text-mut text-center">
                  Surat Rujukan or PDF
                </p>
                <input type="file" className="hidden" aria-hidden="true" onChange={handleFileUpload} accept="image/*,application/pdf" />
              </label>
            ) : (
              <div className="p-4 flex-1 flex flex-col items-center justify-center">
                <div className="bg-anthropic-bg-ter border border-anthropic-border-light p-6 rounded-xl w-full flex flex-col items-center">
                  <FileImage className="w-10 h-10 text-anthropic-primary mb-3 opacity-90" />
                  <p className="text-sm font-medium text-anthropic-text truncate max-w-[150px]">{file.name}</p>
                  <p className="text-xs text-anthropic-text-mut mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                  <label className="mt-4 px-3 py-1.5 bg-white hover:bg-anthropic-hover text-xs font-medium rounded-lg cursor-pointer transition-colors border border-anthropic-border text-anthropic-text-sec shadow-[0_1px_2px_rgba(25,25,25,0.04)]">
                    Change File
                    <input type="file" className="hidden" aria-hidden="true" onChange={handleFileUpload} accept="image/*,application/pdf" />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* RAG Timeline Tracker (Mocked Data) */}
          <div className="rounded-xl border border-anthropic-border bg-anthropic-bg-sec overflow-hidden flex-1 flex flex-col min-h-[400px] shadow-[0_2px_4px_rgba(25,25,25,0.06)]">
            <div className="p-3 border-b border-anthropic-border-light flex items-center justify-between bg-white">
              <h2 className="text-sm font-semibold flex items-center gap-2 text-anthropic-text">
                <History className="w-4 h-4 text-[#2D7A5F]" />
                Patient History (RAG)
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#2D7A5F] bg-[#E8F5EE] px-2 py-0.5 rounded border border-[#2D7A5F]/20">Active</span>
            </div>
            <div className="p-4 relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-6 bottom-0 w-px bg-anthropic-border"></div>

              <div className="space-y-6 relative">
                {/* Timeline Item 1 */}
                <div className="flex gap-4 relative">
                  <div className="w-4 h-4 rounded-full bg-white border-2 border-[#2D7A5F] relative z-10 shrink-0 mt-1"></div>
                  <div>
                    <p className="text-xs text-[#2D7A5F] font-medium font-mono mb-1">Dec 2025</p>
                    <div className="bg-anthropic-bg border border-anthropic-border rounded p-2 cursor-pointer hover:border-[#2D7A5F]/50 transition-colors">
                      <p className="text-sm text-anthropic-text font-medium">HBA1c Elevated (7.2%)</p>
                      <p className="text-xs text-anthropic-text-sec mt-1 truncate">Metformin 500mg BID started.</p>
                    </div>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="flex gap-4 relative">
                  <div className="w-4 h-4 rounded-full bg-anthropic-bg border-2 border-anthropic-text-mut relative z-10 shrink-0 mt-1"></div>
                  <div>
                    <p className="text-xs text-anthropic-text-sec font-medium font-mono mb-1">Aug 2024</p>
                    <div className="bg-anthropic-bg-ter border border-anthropic-border-light rounded p-2">
                      <p className="text-sm text-anthropic-text-sec font-medium">Hypertension Diagnosis</p>
                      <p className="text-xs text-anthropic-text-mut mt-1">Amlodipine 5mg OD prescribed. BP 150/90.</p>
                    </div>
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="flex gap-4 relative">
                  <div className="w-4 h-4 rounded-full bg-anthropic-bg-ter border-2 border-anthropic-border relative z-10 shrink-0 mt-1"></div>
                  <div className="opacity-60">
                    <p className="text-xs text-anthropic-text-mut font-medium font-mono mb-1">Jan 2022</p>
                    <div className="bg-anthropic-bg-ter/50 border border-anthropic-border-light/50 rounded p-2">
                      <p className="text-sm text-anthropic-text-sec font-medium">Routine Checkup</p>
                      <p className="text-xs text-anthropic-text-mut mt-1">All vitals normal.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="mt-auto m-3 p-2 flex items-center justify-center gap-2 text-xs text-anthropic-text-sec bg-anthropic-bg-ter hover:bg-anthropic-hover rounded border border-anthropic-border transition-colors">
              View Full Medical Record <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </section>

        {/* Right Column: Generated CHR (9/12 width) */}
        <section className="lg:col-span-9 flex flex-col gap-6">
          <div className="rounded-xl border border-anthropic-border bg-anthropic-bg-sec overflow-hidden flex flex-col h-full relative shadow-[0_4px_12px_rgba(25,25,25,0.08)]">
            <div className="p-4 border-b border-anthropic-border-light flex items-center justify-between bg-white relative z-10">
              <h2 className="text-sm font-semibold flex items-center gap-2 text-anthropic-text">
                <Activity className="w-4 h-4 text-anthropic-primary" />
                Clinical Synthesis Report {chrData && <span className="text-anthropic-text-mut font-normal ml-2">with Source Verification</span>}
              </h2>
              <div className="flex items-center gap-2">
                {isSynthesizing ? (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A017] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4A017]"></span>
                  </span>
                ) : chrData ? (
                  <span className="flex h-2 w-2 relative">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2D7A5F]"></span>
                  </span>
                ) : (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-anthropic-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-anthropic-primary"></span>
                  </span>
                )}

                <span className={`text-xs font-medium ${isSynthesizing ? 'text-[#D4A017]' : chrData ? 'text-[#2D7A5F]' : 'text-anthropic-primary'}`}>
                  {isSynthesizing ? 'Synthesizing via Gemini 2.5 Pro...' : chrData ? 'Synthesis Complete' : 'Awaiting Input...'}
                </span>
              </div>
            </div>

            <div className="flex-1 relative z-10 overflow-y-auto min-h-[500px] bg-anthropic-bg-sec">
              {isSynthesizing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-20">
                  <div className="w-16 h-16 border-4 border-anthropic-primary-light border-t-anthropic-primary rounded-full animate-spin mb-6"></div>
                  <p className="text-anthropic-text font-semibold animate-pulse">Running In-Context RAG...</p>
                  <p className="text-anthropic-text-sec text-sm mt-2">Translating Manglish, extracting vitals, generating differential...</p>
                </div>
              )}

              {error && (
                <div className="m-6 p-4 rounded-lg bg-[#FDF2F2] border border-[#C94A4A]/20 flex flex-col items-center justify-center text-center">
                  <AlertCircle className="w-8 h-8 text-[#C94A4A] mb-3" />
                  <p className="text-[#C94A4A] font-medium">{error}</p>
                </div>
              )}

              {!isSynthesizing && !error && !chrData && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-anthropic-bg-sec">
                  <div className="w-16 h-16 mb-4 rounded-2xl bg-anthropic-primary-light flex items-center justify-center border border-anthropic-primary/20">
                    <Clock className="w-8 h-8 text-anthropic-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-anthropic-text mb-2">No active synthesis</h3>
                  <p className="text-sm text-anthropic-text-sec max-w-sm">
                    Upload a patient document on the left. Gemini 2.5 Pro will automatically extract and structure the clinical history here.
                  </p>
                </div>
              )}

              {!isSynthesizing && chrData && (
                <div className="grid grid-cols-1 xl:grid-cols-2 h-full divide-y xl:divide-y-0 xl:divide-x divide-anthropic-border-light bg-anthropic-bg-sec">
                  {/* Source Verification Pane */}
                  <div className="p-6 flex flex-col relative bg-anthropic-bg/50">
                    <h3 className="text-xs uppercase tracking-wider text-anthropic-text-mut font-bold mb-4 flex items-center justify-between">
                      <span>Source Document</span>
                      <span className="px-2 py-0.5 rounded bg-anthropic-primary-light text-anthropic-primary border border-anthropic-primary/20 text-[10px]">Interactive</span>
                    </h3>

                    <div className="flex-1 rounded-lg border border-anthropic-border-light bg-white overflow-hidden relative group min-h-[400px] shadow-[0_1px_2px_rgba(25,25,25,0.04)]">
                      {/* Image preview mock */}
                      <div className="absolute inset-0 flex items-center justify-center bg-anthropic-bg-ter">
                        {file && file.type.startsWith('image/') ? (
                          <img src={URL.createObjectURL(file)} alt="Source" className="max-w-full max-h-full object-contain mix-blend-multiply opacity-90" />
                        ) : (
                          <div className="text-center p-6 grayscale opacity-80 pointer-events-none select-none">
                            <div className="text-[8px] sm:text-[10px] md:text-xs leading-tight font-mono text-left bg-white p-6 rounded border border-anthropic-border text-anthropic-text-sec inline-block overflow-hidden max-h-[400px] shadow-[0_4px_12px_rgba(25,25,25,0.08)]">
                              <p>KLINIK KESIHATAN KUALA LUMPUR<br />
                                SURAT RUJUKAN<br />
                                Date: 08/03/2026<br />
                                Nama: En. Ahmad bin Ali<br />
                                Umur: 54<br />
                                <br />
                                Dear MO on call,<br />
                                Ref: Pak cik Ahmad came to KK complaining of chest pain.<br />
                                Dia cakap sakit dada since semalam, rasa macam kena tindih.<br />
                                Also got some SOB bila jalan jauh sikit.<br />
                                <br />
                                O/E:<br />
                                BP: 160/95 mmHg  HR: 92 bpm<br />
                                Temp: 37.1 C   SpO2: 97% on room air</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Highlight Overlay (Simulated Bounding Box) */}
                      <div className="absolute top-[210px] left-[50px] right-[50px] h-[60px] border-[3px] border-anthropic-primary bg-anthropic-primary/10 rounded-sm shadow-[0_0_15px_rgba(217,119,87,0.3)] opacity-0 group-[.is-hovering]:opacity-100 transition-opacity duration-300 z-10 hidden md:block mix-blend-multiply">
                        <span className="absolute -top-6 right-0 bg-anthropic-primary text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          AI Mapped Source
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-center">
                        <p className="text-xs text-anthropic-text-sec bg-white/90 backdrop-blur inline-block px-3 py-1.5 rounded-full border border-anthropic-border shadow-[0_2px_4px_rgba(25,25,25,0.06)]">Hover over CHR text to reveal source bounding box</p>
                      </div>
                    </div>
                  </div>

                  {/* Synthesis Output Pane */}
                  <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-y-auto bg-anthropic-bg-sec"
                    onMouseEnter={(e) => {
                      const parent = e.currentTarget.parentElement;
                      if (parent) parent.querySelector('.group')?.classList.add('is-hovering');
                    }}
                    onMouseLeave={(e) => {
                      const parent = e.currentTarget.parentElement;
                      if (parent) parent.querySelector('.group')?.classList.remove('is-hovering');
                    }}
                  >
                    {/* Demographics & Vitals Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-anthropic-bg border border-anthropic-border-light shadow-[0_1px_2px_rgba(25,25,25,0.04)]">
                        <h3 className="text-xs uppercase tracking-wider text-anthropic-text-mut font-bold mb-3">Patient Demographics</h3>
                        <p className="text-lg font-bold text-anthropic-text">{chrData.patientDemographics?.name}</p>
                        <p className="text-sm text-anthropic-text-sec mt-1">{chrData.patientDemographics?.age} yrs • {chrData.patientDemographics?.gender}</p>
                      </div>

                      <div className="p-4 rounded-lg bg-anthropic-bg border border-anthropic-border-light shadow-[0_1px_2px_rgba(25,25,25,0.04)]">
                        <h3 className="text-xs uppercase tracking-wider text-anthropic-text-mut font-bold mb-3">Extracted Vitals</h3>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <p className="text-xs text-anthropic-text-sec font-medium">BP</p>
                            <p className="font-bold text-anthropic-text text-base">{chrData.vitals?.bloodPressure}</p>
                          </div>
                          <div>
                            <p className="text-xs text-anthropic-text-sec font-medium">HR</p>
                            <p className="font-bold text-anthropic-text text-base">{chrData.vitals?.heartRate} <span className="text-xs text-anthropic-text-mut font-normal">bpm</span></p>
                          </div>
                          <div>
                            <p className="text-xs text-anthropic-text-sec font-medium">Temp</p>
                            <p className="font-bold text-anthropic-text text-base">{chrData.vitals?.temperature}°C</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Active Alerts */}
                    {chrData.alerts && chrData.alerts.length > 0 && (
                      <div className="p-4 rounded-lg bg-[#FDF2F2] border border-[#C94A4A]/20">
                        <h3 className="text-xs uppercase tracking-wider text-[#C94A4A] font-bold mb-3 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Clinical Alerts Detected
                        </h3>
                        <ul className="space-y-2">
                          {chrData.alerts.map((alert: string, idx: number) => (
                            <li key={idx} className="text-sm text-[#C94A4A] flex items-start gap-2 font-medium">
                              <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-[#C94A4A] shrink-0" />
                              {alert}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* History of Present Illness (Translated) */}
                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-anthropic-text-mut font-bold mb-3 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-anthropic-primary" />
                        History of Present Illness (Synthesized)
                      </h3>
                      <div className="p-5 rounded-lg bg-anthropic-primary-light border border-anthropic-primary/20 relative cursor-pointer hover:bg-white hover:border-anthropic-primary/40 transition-colors group/hpi text-anthropic-text shadow-[0_1px_2px_rgba(25,25,25,0.04)]">
                        <p className="text-sm leading-relaxed text-anthropic-text font-medium">
                          {chrData.historyOfPresentIllness}
                        </p>
                        <div className="absolute top-2 right-2 opacity-0 group-hover/hpi:opacity-100 transition-opacity">
                          <span className="text-[10px] bg-anthropic-primary/10 text-anthropic-primary font-bold px-2 py-1 rounded border border-anthropic-primary/20">
                            View Source Bounding Box
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Differential & Next Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xs uppercase tracking-wider text-anthropic-text-mut font-bold mb-3">Differential Diagnosis</h3>
                        <ul className="space-y-2">
                          {chrData.differentialDiagnosis?.map((dx: string, idx: number) => (
                            <li key={idx} className="text-sm text-anthropic-text-sec flex items-start gap-2 p-2 rounded hover:bg-anthropic-hover transition-colors font-medium">
                              <div className="mt-0.5 text-xs font-mono text-anthropic-text-mut font-bold">{idx + 1}.</div>
                              {dx}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xs uppercase tracking-wider text-anthropic-text-mut font-bold mb-3">Recommended Next Steps</h3>
                        <ul className="space-y-2">
                          {chrData.recommendedNextSteps?.map((step: string, idx: number) => (
                            <li key={idx} className="text-sm text-[#2D7A5F] flex items-start gap-2 p-2 rounded bg-[#E8F5EE] border border-[#2D7A5F]/20 font-medium">
                              <CheckCircle2 className="w-4 h-4 text-[#2D7A5F] shrink-0 mt-0.5" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
