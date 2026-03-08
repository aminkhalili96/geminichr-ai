"use client";

import { Search, Filter, HardDrive, FileText, CheckCircle2, AlertTriangle, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock global data
const dataStats = [
    { label: "Total Assets", value: "1,248", icon: HardDrive, color: "text-[#1A1A1A]", bg: "bg-[#FAFAFA]" },
    { label: "Processed Successfully", value: "1,242", icon: CheckCircle2, color: "text-[#2D7A5F]", bg: "bg-[#F0FDF4]" },
    { label: "Processing Failed", value: "6", icon: AlertTriangle, color: "text-[#C94A4A]", bg: "bg-[#FEF2F2]" }
];

const mockFiles = [
    { id: "DOC-9921", filename: "Surat_Rujukan_Klinik.jpeg", patient: "Ahmad bin Ali", date: "Mar 8, 2026", type: "Referral Note", size: "2.4 MB", status: "Success", model: "Gemini 3.1 Pro" },
    { id: "DOC-9920", filename: "Lab_Results_Dec_2025.pdf", patient: "Ahmad bin Ali", date: "Jan 12, 2026", type: "Lab Report", size: "1.1 MB", status: "Success", model: "Gemini 1.5 Pro" },
    { id: "DOC-9919", filename: "Handwritten_Vitals.jpg", patient: "Sarah Lee", date: "Feb 10, 2026", type: "Clinical Note", size: "3.2 MB", status: "Success", model: "Gemini 1.5 Flash" },
    { id: "DOC-9918", filename: "Discharge_Summary_HKL.pdf", patient: "Rajesh Kumar", date: "Jan 05, 2026", type: "Discharge", size: "0.8 MB", status: "Failed", model: "OCR Pipeline" },
    { id: "DOC-9917", filename: "Scanned_Prescription.png", patient: "Mei Ling", date: "Nov 22, 2025", type: "Prescription", size: "1.5 MB", status: "Success", model: "Gemini 1.5 Pro" }
];

export default function DataProcessingPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="flex-1 bg-[#FAFAFA] min-h-screen">
            <div className="max-w-[1240px] mx-auto px-10 py-10">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-[28px] font-bold text-[#1A1A1A] tracking-[-0.02em] font-serif">Data Assets & Processing</h1>
                        <p className="text-[13px] text-[#6B6B6B] mt-1">Manage global raw clinical documents and LLM extraction pipelines.</p>
                    </div>
                    <button className="bg-[#1A1A1A] hover:bg-[#333] text-white px-4 py-2.5 rounded-lg text-[13px] font-medium transition-colors shadow-sm inline-flex items-center gap-2">
                        <UploadCloud className="w-4 h-4" />
                        Bulk Upload
                    </button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {dataStats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div key={i} className="bg-white border border-[#E8E4DF] rounded-xl p-6 shadow-sm flex items-center justify-between">
                                <div>
                                    <p className="text-[13px] font-medium text-[#6B6B6B] mb-1">{stat.label}</p>
                                    <h3 className="text-[28px] font-bold text-[#1A1A1A] tracking-[-0.02em]">{stat.value}</h3>
                                </div>
                                <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Data Table Area */}
                <div className="bg-white border border-[#E8E4DF] rounded-xl shadow-sm overflow-hidden">

                    {/* Toolbar */}
                    <div className="p-4 border-b border-[#E8E4DF] flex flex-col md:flex-row items-center justify-between gap-4 bg-[#FAFAFA]">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                            <input
                                type="text"
                                placeholder="Search by filename, patient, or ID..."
                                className="w-full pl-9 pr-4 py-2 bg-white border border-[#E8E4DF] rounded-lg text-[13px] outline-none focus:border-[#BF903C] focus:ring-1 focus:ring-[#BF903C] transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="px-4 py-2 bg-white border border-[#E8E4DF] rounded-lg text-[13px] font-medium text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors flex items-center gap-2">
                            <Filter className="w-4 h-4 text-[#6B6B6B]" />
                            Filter Options
                        </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-[13px]">
                            <thead className="bg-[#FAFAFA] border-b border-[#E8E4DF]">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-[#6B6B6B] uppercase tracking-[0.05em] text-[11px]">Document ID</th>
                                    <th className="px-6 py-4 font-semibold text-[#6B6B6B] uppercase tracking-[0.05em] text-[11px]">Filename</th>
                                    <th className="px-6 py-4 font-semibold text-[#6B6B6B] uppercase tracking-[0.05em] text-[11px]">Patient Link</th>
                                    <th className="px-6 py-4 font-semibold text-[#6B6B6B] uppercase tracking-[0.05em] text-[11px]">Type / Size</th>
                                    <th className="px-6 py-4 font-semibold text-[#6B6B6B] uppercase tracking-[0.05em] text-[11px]">Extraction Status</th>
                                    <th className="px-6 py-4 font-semibold text-[#6B6B6B] uppercase tracking-[0.05em] text-[11px] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E8E4DF]">
                                {mockFiles.map((file, i) => (
                                    <tr key={i} className="hover:bg-[#FAFAFA] transition-colors group">
                                        <td className="px-6 py-4 font-mono text-[#6B6B6B] text-[12px]">{file.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-[#F5F5F5] rounded-lg text-[#6B6B6B] group-hover:text-[#BF903C] group-hover:bg-[#BF903C]/10 transition-colors">
                                                    <FileText className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-[#1A1A1A]">{file.filename}</p>
                                                    <p className="text-[11px] text-[#6B6B6B] mt-0.5">Uploaded {file.date}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link href="/patients/123" className="font-medium text-[#BF903C] hover:underline">
                                                {file.patient}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-[#1A1A1A]">{file.type}</p>
                                            <p className="text-[11px] text-[#6B6B6B] mt-0.5">{file.size}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {file.status === "Success" ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#DCFCE7] text-[#16A34A]">
                                                        <CheckCircle2 className="w-3 h-3" /> Processed
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FEF2F2] text-[#DC2626]">
                                                        <AlertTriangle className="w-3 h-3" /> Failed
                                                    </span>
                                                )}
                                                <span className="text-[11px] text-[#8B8B8B] pl-2 border-l border-[#E8E4DF]">{file.model}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-[12px] font-medium text-[#1A1A1A] hover:text-[#BF903C] transition-colors">
                                                Inspect Output
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
