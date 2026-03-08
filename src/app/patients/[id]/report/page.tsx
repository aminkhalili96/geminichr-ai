"use client";

import { useRef } from "react";
import { Printer, ArrowLeft, FileText, CheckCircle2, Info } from "lucide-react";
import Link from "next/link";
import { useReactToPrint } from "react-to-print";
import { mockPatientsList } from "@/data/mockPatients";

export default function PatientReport({ params }: { params: { id: string } }) {
    const reportRef = useRef<HTMLDivElement>(null);

    const patient = mockPatientsList.find((p: any) => p.id === params.id) || mockPatientsList[0];

    // Derived values for the report header since mockPatientsList uses firstName/lastName
    const patientName = `${patient.firstName} ${patient.lastName}`;
    const patientDob = patient.dob;
    const patientMrn = patient.mrn;
    const patientDate = "March 8, 2026"; // Current report date

    const handlePrint = useReactToPrint({
        content: () => reportRef.current,
        documentTitle: `MedCHR_Report_${patientName.replace(/ /g, "_")}_2026-03-08`,
    });

    return (
        <div className="flex-1 bg-[#FAFAFA] min-h-screen">
            <div className="max-w-[850px] mx-auto px-6 py-10">

                {/* Non-printable Header Controls */}
                <div className="mb-8 flex items-center justify-between print:hidden">
                    <Link href={`/patients/${params.id}`} className="inline-flex items-center text-[13px] font-medium text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors no-underline">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Patient Dashboard
                    </Link>
                    <div className="flex items-center gap-3">
                        <p className="text-[12px] text-[#6B6B6B]">Synthesized by: <span className="font-semibold text-[#BF903C]">Gemini 3.1 Pro</span></p>
                        <button
                            onClick={handlePrint}
                            className="bg-[#1A1A1A] hover:bg-[#333] text-white px-4 py-2 rounded-lg text-[13px] font-medium transition-colors shadow-sm inline-flex items-center gap-2"
                        >
                            <Printer className="w-4 h-4" />
                            Print or Save PDF
                        </button>
                    </div>
                </div>

                {/* --- Printable Report Container --- */}
                <div
                    ref={reportRef}
                    className="bg-white border border-[#E8E4DF] shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-12 print:shadow-none print:border-none print:p-0"
                    style={{ minHeight: '1056px' }} // Standard Letter size approximation
                >

                    {/* Report Header */}
                    <div className="border-b-[3px] border-[#1A1A1A] pb-6 mb-8 flex justify-between items-end">
                        <div>
                            <h1 className="text-[28px] font-bold text-[#1A1A1A] tracking-[-0.02em] font-serif flex items-center gap-3">
                                <span className="bg-[#1A1A1A] text-white px-3 py-1 text-[20px] rounded-sm">M</span>
                                MedCHR.ai
                            </h1>
                            <p className="text-[14px] text-[#6B6B6B] mt-2 uppercase tracking-[0.05em] font-medium">Your Health Summary</p>
                        </div>
                        <div className="text-right text-[13px] text-[#6B6B6B] space-y-1">
                            <p><strong className="text-[#1A1A1A]">Patient:</strong> {patientName}</p>
                            <p><strong className="text-[#1A1A1A]">DOB:</strong> {patientDob}</p>
                            <p><strong className="text-[#1A1A1A]">MRN:</strong> <span className="font-mono">{patientMrn}</span></p>
                            <p><strong className="text-[#1A1A1A]">Date:</strong> {patientDate}</p>
                        </div>
                    </div>

                    {/* Executive Summary (AI Synthesized) */}
                    <div className="mb-10">
                        <h2 className="text-[16px] font-bold text-[#1A1A1A] uppercase tracking-[0.05em] mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-[#BF903C]" />
                            Executive Summary
                        </h2>
                        <div className="text-[14px] text-[#333] leading-relaxed space-y-4 font-serif">
                            <p>
                                Mr. Ahmad bin Ali was referred for numbness in his extremities. Based on the translated referral and recent lab results extracted from PDF, there is a clear upward trend in <strong>HBA1c (now 8.1%)</strong>, indicating poorly controlled Type 2 Diabetes.
                            </p>
                            <p>
                                Blood pressure remains slightly elevated despite recent Amlodipine adjustments. Immediate focus should be on glycemic control to prevent further progression of suspected diabetic neuropathy.
                            </p>
                        </div>
                    </div>

                    {/* Action Plan */}
                    <div className="mb-10">
                        <h2 className="text-[16px] font-bold text-[#1A1A1A] uppercase tracking-[0.05em] mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-[#2D7A5F]" />
                            Your Action Plan
                        </h2>
                        <div className="bg-[#FAFAFA] border border-[#E8E4DF] rounded-lg p-6">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[11px] font-bold shrink-0">1</div>
                                    <div>
                                        <h4 className="text-[14px] font-bold text-[#1A1A1A]">Increase Metformin Dosage</h4>
                                        <p className="text-[13px] text-[#6B6B6B] mt-1">Take 1000mg twice daily with meals as prescribed to help lower blood sugar.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[11px] font-bold shrink-0">2</div>
                                    <div>
                                        <h4 className="text-[14px] font-bold text-[#1A1A1A]">Schedule Dietitian Consult</h4>
                                        <p className="text-[13px] text-[#6B6B6B] mt-1">Book an appointment this week to establish a structured diabetic meal plan.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[11px] font-bold shrink-0">3</div>
                                    <div>
                                        <h4 className="text-[14px] font-bold text-[#1A1A1A]">Daily Foot Checks</h4>
                                        <p className="text-[13px] text-[#6B6B6B] mt-1">Inspect your feet daily for any cuts or sores due to the numbness you are experiencing.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Vitals & Labs Summary */}
                    <div className="mb-10">
                        <h2 className="text-[16px] font-bold text-[#1A1A1A] uppercase tracking-[0.05em] mb-4">
                            Recent Vitals & Key Labs
                        </h2>
                        <table className="w-full text-left text-[13px]">
                            <thead className="bg-[#FAFAFA] border-b border-t border-[#E8E4DF]">
                                <tr>
                                    <th className="px-4 py-3 font-semibold text-[#6B6B6B]">Metric</th>
                                    <th className="px-4 py-3 font-semibold text-[#6B6B6B]">Recent Value</th>
                                    <th className="px-4 py-3 font-semibold text-[#6B6B6B]">Target Range</th>
                                    <th className="px-4 py-3 font-semibold text-[#6B6B6B]">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E8E4DF]">
                                <tr>
                                    <td className="px-4 py-3 font-medium text-[#1A1A1A]">Blood Pressure</td>
                                    <td className="px-4 py-3">145/92 mmHg</td>
                                    <td className="px-4 py-3 text-[#6B6B6B]">&lt; 130/80</td>
                                    <td className="px-4 py-3"><span className="text-[#C94A4A] font-medium">Elevated</span></td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium text-[#1A1A1A]">HBA1c</td>
                                    <td className="px-4 py-3">8.1 %</td>
                                    <td className="px-4 py-3 text-[#6B6B6B]">&lt; 7.0 (Diabetic target)</td>
                                    <td className="px-4 py-3"><span className="text-[#C94A4A] font-medium">Critically High</span></td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium text-[#1A1A1A]">Weight</td>
                                    <td className="px-4 py-3">85 kg (BMI 28.7)</td>
                                    <td className="px-4 py-3 text-[#6B6B6B]">BMI 18.5 - 24.9</td>
                                    <td className="px-4 py-3"><span className="text-[#D4A017] font-medium">Overweight</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Disclaimer Footer */}
                    <div className="mt-16 pt-6 border-t border-[#E8E4DF] text-[11px] text-[#8B8B8B] leading-relaxed flex items-start gap-3">
                        <Info className="w-4 h-4 shrink-0 mt-0.5" />
                        <p>
                            <strong>Disclaimer:</strong> This report is a draft synthesized automatically from unstructured clinical notes and test results by MedCHR.ai's large language model (Gemini 3.1 Pro). It is designed to assist both the patient and care provider but does not constitute official medical advice until reviewed and signed by an attending physician. If you experience emergency symptoms, please call emergency services immediately.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}
