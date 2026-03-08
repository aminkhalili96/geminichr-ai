"use client";

import { useState } from "react";
import { ArrowLeft, Activity, User, Calendar, FileText, AlertTriangle, Download, TrendingUp, Search, Info, CheckCircle2, FileUp, Sparkles, Upload } from "lucide-react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import clsx from "clsx";
import { mockPatientsList } from "@/data/mockPatients";

// Mock Gap Analytics Data (from MedCHR.ai logic)
const hba1cData = [
    { date: "Jan 2025", value: 6.2 },
    { date: "Apr 2025", value: 6.5 },
    { date: "Jul 2025", value: 6.8 },
    { date: "Oct 2025", value: 7.2 },
    { date: "Jan 2026", value: 7.5 },
    { date: "Mar 2026", value: 8.1 },
];

export default function PatientDashboard({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState("Labs");

    const patient = mockPatientsList.find(p => p.id === params.id) || mockPatientsList[0];

    const getInitial = (first: string, last: string) => {
        return (first ? first.charAt(0) : last ? last.charAt(0) : "?").toUpperCase();
    };

    const tabs = ["Labs", "Medications", "Diagnoses", "Vitals", "Allergies"];

    return (
        <div className="flex-1 bg-[#FAFAFA] min-h-screen">
            <div className="max-w-[1240px] mx-auto px-10 py-10">

                {/* Back Button */}
                <Link href="/patients" className="inline-flex items-center text-[13px] font-medium text-[#6B6B6B] hover:text-[#1A1A1A] mb-8 transition-colors no-underline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to All Patients
                </Link>

                {/* Patient Header Card */}
                <div className="bg-white border border-[#E8E4DF] rounded-xl p-6 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F5E6DF] to-[#E8E4DF] flex items-center justify-center text-[#1A1A1A] font-bold text-[22px] border border-[#E8E4DF] shrink-0">
                            {getInitial(patient.firstName, patient.lastName)}
                        </div>
                        <div>
                            <h1 className="text-[24px] font-bold text-[#1A1A1A] tracking-[-0.02em] font-serif mb-1">
                                {patient.firstName} {patient.lastName}
                            </h1>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#6B6B6B]">
                                <span><strong className="text-[#1A1A1A] font-medium">DOB:</strong> {patient.dob}</span>
                                <span className="w-1 h-1 rounded-full bg-[#D1D1D1]"></span>
                                <span><strong className="text-[#1A1A1A] font-medium">Gender:</strong> {patient.gender}</span>
                                <span className="w-1 h-1 rounded-full bg-[#D1D1D1]"></span>
                                <span className="font-mono bg-[#FAFAFA] border border-[#E8E4DF] px-1.5 py-0.5 rounded text-[#1A1A1A]">{patient.mrn}</span>
                                <span className="w-1 h-1 rounded-full bg-[#D1D1D1]"></span>
                                <span>{patient.address}</span>
                                <span className="w-1 h-1 rounded-full bg-[#D1D1D1]"></span>
                                <span><strong className="text-[#1A1A1A] text-[#C94A4A] font-medium">Blood:</strong> {patient.bloodType}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <Link href={`/patients/${params.id}/report`} className="bg-white border border-[#E8E4DF] hover:border-[#BF903C] hover:text-[#BF903C] text-[#1A1A1A] px-4 py-2 rounded-lg text-[13px] font-medium transition-colors shadow-sm inline-flex items-center gap-2 no-underline">
                            <FileText className="w-4 h-4" />
                            Generate Summary
                        </Link>
                        <button className="bg-[#1A1A1A] hover:bg-[#333] text-white px-4 py-2 rounded-lg text-[13px] font-medium transition-colors shadow-sm inline-flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Synthesize New Document
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                    {/* Left Column (Main Content) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Clinical Safety Alerts */}
                        <div id="overview" className="space-y-3 scroll-mt-[100px]">
                            <h2 className="text-[14px] font-bold text-[#1A1A1A] uppercase tracking-[0.05em] mb-4 flex items-center gap-2">
                                <AlertTriangle className="w-[18px] h-[18px] text-[#C94A4A]" />
                                Clinical Safety Alerts
                            </h2>
                            <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl p-4 flex items-start gap-4">
                                <div className="mt-0.5 bg-red-100 p-1.5 rounded-full shrink-0">
                                    <AlertTriangle className="w-4 h-4 text-red-600" />
                                </div>
                                <div>
                                    <h4 className="text-[14px] font-bold text-red-900 mb-1">Critical Rising HBA1c</h4>
                                    <p className="text-[13px] text-red-800 leading-relaxed">Patient's HBA1c has climbed rapidly to 8.1% (up 1.3 points in 9 months). Immediate intervention recommended. Verified via lab extraction from document <Link href="/analysis" className="font-mono text-red-900 underline hover:text-red-700">doc_9281.pdf</Link>.</p>
                                </div>
                            </div>
                            <div className="bg-[#FEFCE8] border border-[#FDE047] rounded-xl p-4 flex items-start gap-4">
                                <div className="mt-0.5 bg-yellow-100 p-1.5 rounded-full shrink-0">
                                    <Info className="w-4 h-4 text-yellow-600" />
                                </div>
                                <div>
                                    <h4 className="text-[14px] font-bold text-yellow-900 mb-1">Allergy Warning: Penicillin</h4>
                                    <p className="text-[13px] text-yellow-800 leading-relaxed">Severe allergic reaction documented on 2021-04-12. Ensure all future antibiotic prescriptions are cross-checked.</p>
                                </div>
                            </div>
                        </div>

                        {/* Raw Patient Data */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mt-8">
                                <h2 className="text-[14px] font-bold text-[#1A1A1A] uppercase tracking-[0.05em] flex items-center gap-2">
                                    <FileText className="w-[18px] h-[18px] text-[#6B6B6B]" />
                                    Raw Patient Data (Source Docs)
                                </h2>
                                <button className="text-[12px] font-medium text-[#BF903C] hover:text-[#9A712B] bg-[#BF903C]/10 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5">
                                    <Upload className="w-3.5 h-3.5" />
                                    Upload PDF/Image
                                </button>
                            </div>
                            <div className="bg-white border border-[#E8E4DF] rounded-xl overflow-hidden shadow-sm">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#FAFAFA] border-b border-[#E8E4DF]">
                                            <th className="px-5 py-3 text-[11px] font-semibold text-[#6B6B6B] uppercase tracking-[0.05em]">Document Type</th>
                                            <th className="px-5 py-3 text-[11px] font-semibold text-[#6B6B6B] uppercase tracking-[0.05em]">Date</th>
                                            <th className="px-5 py-3 text-[11px] font-semibold text-[#6B6B6B] uppercase tracking-[0.05em]">Status</th>
                                            <th className="px-5 py-3 text-[11px] font-semibold text-[#6B6B6B] uppercase tracking-[0.05em]">Extracted By</th>
                                            <th className="px-5 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#E8E4DF] text-[13px]">
                                        <tr className="hover:bg-[#FAFAFA] transition-colors">
                                            <td className="px-5 py-3.5 font-medium text-[#1A1A1A]">Surat_Rujukan_Klinik.jpeg</td>
                                            <td className="px-5 py-3.5 text-[#6B6B6B]">Mar 8, 2026</td>
                                            <td className="px-5 py-3.5"><span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#DCFCE7] text-[#16A34A]"><CheckCircle2 className="w-3 h-3" /> Processed</span></td>
                                            <td className="px-5 py-3.5 text-[#6B6B6B]">Gemini 3.1 Pro</td>
                                            <td className="px-5 py-3.5 text-right"><Link href="/analysis" className="text-[#BF903C] font-medium hover:underline">Inspect →</Link></td>
                                        </tr>
                                        <tr className="hover:bg-[#FAFAFA] transition-colors">
                                            <td className="px-5 py-3.5 font-medium text-[#1A1A1A]">Lab_Results_Dec_2025.pdf</td>
                                            <td className="px-5 py-3.5 text-[#6B6B6B]">Jan 12, 2026</td>
                                            <td className="px-5 py-3.5"><span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#DCFCE7] text-[#16A34A]"><CheckCircle2 className="w-3 h-3" /> Processed</span></td>
                                            <td className="px-5 py-3.5 text-[#6B6B6B]">Gemini 1.5 Pro</td>
                                            <td className="px-5 py-3.5 text-right"><span className="text-[#BF903C] font-medium cursor-not-allowed opacity-50">Inspect →</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Trend Visualizations */}
                        <div id="visualizations" className="space-y-4 scroll-mt-[100px]">
                            <h2 className="text-[14px] font-bold text-[#1A1A1A] uppercase tracking-[0.05em] mt-8 flex items-center gap-2">
                                <TrendingUp className="w-[18px] h-[18px] text-[#D97756]" />
                                Trend Visualizations
                            </h2>
                            <div className="bg-white border border-[#E8E4DF] rounded-xl p-6 shadow-sm">
                                <div className="mb-6">
                                    <h3 className="text-[15px] font-bold text-[#1A1A1A]">HBA1c Over Time</h3>
                                    <p className="text-[13px] text-[#6B6B6B] mt-1">Data extracted automatically from 6 separate historical PDFs using Gemini Vision.</p>
                                </div>
                                <div className="h-[280px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={hba1cData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
                                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8B8B8B' }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8B8B8B' }} domain={[5, 10]} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E5E5', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                itemStyle={{ color: '#D97757', fontWeight: 600 }}
                                            />
                                            <Line type="monotone" dataKey="value" stroke="#D97757" strokeWidth={3} dot={{ r: 4, fill: '#D97757', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Patient Records Tabs */}
                        <div id="records" className="space-y-4 scroll-mt-[100px]">
                            <h2 className="text-[14px] font-bold text-[#1A1A1A] uppercase tracking-[0.05em] mt-8 flex items-center gap-2">
                                <Activity className="w-[18px] h-[18px] text-[#6B6B6B]" />
                                Fully Structured Patient Records
                            </h2>

                            <div className="bg-white border border-[#E8E4DF] rounded-xl shadow-sm overflow-hidden">
                                <div className="flex items-center overflow-x-auto border-b border-[#E8E4DF] bg-[#FAFAFA]">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={clsx(
                                                "px-6 py-3.5 text-[13px] font-medium transition-all whitespace-nowrap",
                                                activeTab === tab
                                                    ? "bg-white text-[#BF903C] border-t-[3px] border-t-[#BF903C] border-x border-[#E8E4DF]"
                                                    : "text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] border-t-[3px] border-t-transparent border-x border-transparent"
                                            )}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                                <div className="p-0">
                                    {activeTab === "Labs" && (
                                        <table className="w-full text-left text-[13px]">
                                            <thead className="bg-[#FAFAFA] border-b border-[#E8E4DF]">
                                                <tr>
                                                    <th className="px-5 py-3 font-semibold text-[#6B6B6B]">Test</th>
                                                    <th className="px-5 py-3 font-semibold text-[#6B6B6B]">Result</th>
                                                    <th className="px-5 py-3 font-semibold text-[#6B6B6B]">Ref Range</th>
                                                    <th className="px-5 py-3 font-semibold text-[#6B6B6B]">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#E8E4DF]">
                                                <tr className="hover:bg-[#FAFAFA]">
                                                    <td className="px-5 py-3 font-medium text-[#1A1A1A]">HBA1c</td>
                                                    <td className="px-5 py-3"><span className="text-[#C94A4A] font-bold">8.1</span> <span className="text-[#6B6B6B]">%</span></td>
                                                    <td className="px-5 py-3 text-[#6B6B6B]">&lt; 5.7</td>
                                                    <td className="px-5 py-3 text-[#6B6B6B]">Mar 2026</td>
                                                </tr>
                                                <tr className="hover:bg-[#FAFAFA]">
                                                    <td className="px-5 py-3 font-medium text-[#1A1A1A]">Fasting Glucose</td>
                                                    <td className="px-5 py-3"><span className="text-[#C94A4A] font-bold">142</span> <span className="text-[#6B6B6B]">mg/dL</span></td>
                                                    <td className="px-5 py-3 text-[#6B6B6B]">70-99</td>
                                                    <td className="px-5 py-3 text-[#6B6B6B]">Mar 2026</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    )}
                                    {activeTab === "Medications" && (
                                        <div className="p-8 text-center text-[#6B6B6B] text-[14px]">
                                            <p className="mb-2">Currently on Metformin (1000mg BID) and Amlodipine (5mg OD).</p>
                                            <p className="text-[12px] opacity-70">Synthesized successfully from physician notes.</p>
                                        </div>
                                    )}
                                    {/* Fallback for other tabs */}
                                    {["Diagnoses", "Vitals", "Allergies"].includes(activeTab) && (
                                        <div className="p-10 text-center text-[#6B6B6B] text-[13px] bg-[#FAFAFA]/50">
                                            No recent data available for {activeTab}.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column (Demo Flow / RAG Sideboard) */}
                    <div className="space-y-6">

                        {/* MedCHR Demo Flow block */}
                        <div className="bg-gradient-to-br from-[#FEF4F1] to-white border border-[#F5E6DF] rounded-xl p-6 shadow-sm sticky top-6">
                            <h3 className="text-[14px] font-bold text-[#1A1A1A] uppercase tracking-[0.05em] mb-4 flex items-center gap-2">
                                <Sparkles className="w-[18px] h-[18px] text-[#D97756]" />
                                MedCHR.ai Demo Flow
                            </h3>
                            <p className="text-[13px] text-[#333] leading-relaxed mb-5">
                                Follow this path to see the full power of Gemini 3.1 Pro structurizing messy patient history.
                            </p>

                            <div className="space-y-3 relative before:content-[''] before:absolute before:left-[11px] before:top-[12px] before:bottom-[24px] before:w-[2px] before:bg-[#E8E4DF]">

                                <div className="relative pl-8">
                                    <div className="absolute left-[7px] top-[4px] w-[10px] h-[10px] rounded-full bg-[#D97756] shadow-[0_0_0_4px_#FEF4F1]"></div>
                                    <div className="text-[13px] font-bold text-[#1A1A1A]">1. View Dashboard</div>
                                    <p className="text-[12px] text-[#6B6B6B] mt-0.5">Explore the synthesized summary.</p>
                                </div>
                                <div className="relative pl-8">
                                    <div className="absolute left-[7px] top-[4px] w-[10px] h-[10px] rounded-full bg-[#E8E4DF] shadow-[0_0_0_4px_#FEF4F1]"></div>
                                    <Link href="/analysis" className="text-[13px] font-bold text-[#BF903C] hover:underline">2. Inspect New Document</Link>
                                    <p className="text-[12px] text-[#6B6B6B] mt-0.5">Upload a messy Manglish referral letter.</p>
                                </div>
                                <div className="relative pl-8">
                                    <div className="absolute left-[7px] top-[4px] w-[10px] h-[10px] rounded-full bg-[#E8E4DF] shadow-[0_0_0_4px_#FEF4F1]"></div>
                                    <Link href={`/patients/${params.id}/report`} className="text-[13px] font-bold text-[#BF903C] hover:underline">3. Generate Patient Report</Link>
                                    <p className="text-[12px] text-[#6B6B6B] mt-0.5">Print a simplified plan for the patient.</p>
                                </div>

                            </div>
                        </div>

                        {/* RAG Timeline Tracker */}
                        <div className="bg-white rounded-xl border border-[#E8E4DF] shadow-sm p-6 sticky top-[300px]">
                            <h2 className="text-[14px] font-bold text-[#1A1A1A] flex items-center gap-2 mb-6 uppercase tracking-[0.05em]">
                                <Calendar className="w-[18px] h-[18px] text-[#6B6B6B]" />
                                AI extraction timeline
                            </h2>

                            <div className="relative border-l-[2px] border-[#E8E4DF] ml-3 space-y-6">
                                {[
                                    { date: "Mar 8, 2026", title: "Endocrinologist Referral", desc: "Patient presented with severe numbness in extremeities. Manglish note translated.", type: "referral" },
                                    { date: "Jan 12, 2026", title: "Prescription Adjusted", desc: "Added Amlodipine 5mg for persisting hypertension.", type: "medication" },
                                    { date: "Oct 5, 2025", title: "Routine Checkup", desc: "Initial signs of elevated HBA1c noted. Dietitian referral generated.", type: "visit" },
                                ].map((event, i) => (
                                    <div key={i} className="relative pl-6">
                                        <div className={`absolute w-3 h-3 rounded-full -left-[7px] top-1 border-2 border-white ${event.type === 'referral' ? 'bg-[#C94A4A]' :
                                            event.type === 'medication' ? 'bg-[#D4A017]' :
                                                event.type === 'diagnosis' ? 'bg-[#2D7A5F]' :
                                                    'bg-[#6B6B6B]'
                                            }`} />
                                        <p className="text-[11px] font-bold tracking-[0.05em] text-[#6B6B6B] uppercase mb-1">{event.date}</p>
                                        <h4 className="text-[13px] font-semibold text-[#1A1A1A]">{event.title}</h4>
                                        <p className="text-[12px] text-[#6B6B6B] mt-1 leading-relaxed">{event.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
