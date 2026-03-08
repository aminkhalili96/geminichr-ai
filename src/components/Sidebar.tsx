"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Database, Settings } from "lucide-react";
import clsx from "clsx";

export default function Sidebar() {
    const pathname = usePathname();

    // Determine if we are within a patient detail context
    const patientMatch = pathname.match(/^\/patients\/([^/]+)/);
    const patientId = patientMatch ? patientMatch[1] : null;

    return (
        <div className="flex flex-col w-[240px] bg-[#1B1B18] fixed top-0 left-0 bottom-0 z-[200] overflow-y-auto overflow-x-hidden text-[rgba(255,255,255,0.55)] transition-all duration-200">
            {/* Logo Header */}
            <div className="px-5 pt-5 pb-4 border-b border-white/10">
                <Link href="/" className="flex items-center gap-3 text-white no-underline">
                    <div className="w-8 h-8 bg-[#BF903C] rounded flex items-center justify-center text-white font-bold text-sm shrink-0">
                        N
                    </div>
                    <div className="font-serif text-[17px] font-semibold tracking-[-0.02em]">
                        GeminiCHR<span className="opacity-50">.ai</span>
                    </div>
                </Link>
            </div>

            {/* Main Navigation */}
            <div className="flex-1 py-3 px-2">
                {/* CLINICAL */}
                <div className="mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400/50 px-3 pt-3 pb-1.5 block">
                        CLINICAL
                    </span>

                    <Link
                        href="/patients"
                        className={clsx(
                            "flex items-center gap-3 px-3 py-[9px] my-px rounded-md text-[13px] font-medium transition-all duration-120 relative no-underline hover:bg-[#2A2A26] hover:text-white",
                            (pathname === "/patients" || pathname === "/") && "bg-[#BF903C]/10 text-[#BF903C] font-semibold before:content-[''] before:absolute before:left-[-8px] before:top-1.5 before:bottom-1.5 before:w-[3px] before:bg-[#BF903C] before:rounded-r-sm"
                        )}
                    >
                        <Users className={clsx("w-[18px] h-[18px] shrink-0", (pathname === "/patients" || pathname === "/") ? "opacity-100" : "opacity-70")} />
                        <span>Patients</span>
                        <span className="ml-auto text-[10px] font-semibold py-[2px] px-[7px] rounded-full leading-[1.3] bg-[#BF903C]/15 text-[#BF903C]">
                            122
                        </span>
                    </Link>

                    {/* Dynamic Patient Sub-links if on a patient page */}
                    {patientId && (
                        <div className="flex flex-col pl-[42px] py-1 gap-px">
                            <Link
                                href={`/patients/${patientId}`}
                                className={clsx("text-[12.5px] py-1.5 px-3 rounded-sm transition-all duration-150 no-underline", pathname === `/patients/${patientId}` && !window.location.hash ? "opacity-100 text-[#BF903C]" : "opacity-60 text-[rgba(255,255,255,0.55)] hover:opacity-100 hover:bg-white/5")}
                            >
                                Overview
                            </Link>
                            <Link
                                href={`/patients/${patientId}#records`}
                                className="text-[12.5px] py-1.5 px-3 rounded-sm opacity-60 text-[rgba(255,255,255,0.55)] transition-all duration-150 hover:opacity-100 hover:bg-white/5 no-underline"
                            >
                                Records
                            </Link>
                            <Link
                                href={`/patients/${patientId}#visualizations`}
                                className="text-[12.5px] py-1.5 px-3 rounded-sm opacity-60 text-[rgba(255,255,255,0.55)] transition-all duration-150 hover:opacity-100 hover:bg-white/5 no-underline"
                            >
                                Visualizations
                            </Link>
                            <Link
                                href={`/patients/${patientId}/report`}
                                className={clsx("text-[12.5px] py-1.5 px-3 rounded-sm transition-all duration-150 no-underline", pathname === `/patients/${patientId}/report` ? "opacity-100 text-[#BF903C]" : "opacity-60 text-[rgba(255,255,255,0.55)] hover:opacity-100 hover:bg-white/5")}
                            >
                                Report
                            </Link>
                        </div>
                    )}
                </div>

                {/* RECORDS & INSIGHTS */}
                <div className="mt-6 mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400/50 px-3 pt-3 pb-1.5 block">
                        RECORDS & INSIGHTS
                    </span>

                    <Link
                        href="/data"
                        className={clsx(
                            "flex items-center gap-3 px-3 py-[9px] my-px rounded-md text-[13px] font-medium transition-all duration-120 relative no-underline hover:bg-[#2A2A26] hover:text-white",
                            pathname.startsWith("/data") || pathname.startsWith("/analysis") ? "bg-[#BF903C]/10 text-[#BF903C] font-semibold before:content-[''] before:absolute before:left-[-8px] before:top-1.5 before:bottom-1.5 before:w-[3px] before:bg-[#BF903C] before:rounded-r-sm" : ""
                        )}
                    >
                        <Database className={clsx("w-[18px] h-[18px] shrink-0", pathname.startsWith("/data") ? "opacity-100" : "opacity-70")} />
                        <span>Data</span>
                    </Link>
                </div>
            </div>

            {/* Footer - Settings */}
            <div className="py-3 px-2 border-t border-white/10">
                <Link
                    href="/settings"
                    className={clsx(
                        "flex items-center gap-3 px-3 py-[9px] my-px rounded-md text-[13px] font-medium transition-all duration-120 relative no-underline hover:bg-[#2A2A26] hover:text-white",
                        pathname.startsWith("/settings") ? "bg-[#BF903C]/10 text-[#BF903C] font-semibold before:content-[''] before:absolute before:left-[-8px] before:top-1.5 before:bottom-1.5 before:w-[3px] before:bg-[#BF903C] before:rounded-r-sm" : ""
                    )}
                >
                    <Settings className={clsx("w-[18px] h-[18px] shrink-0", pathname.startsWith("/settings") ? "opacity-100" : "opacity-70")} />
                    <span>Settings</span>
                </Link>
            </div>
        </div>
    );
}
