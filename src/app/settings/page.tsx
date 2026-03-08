"use client";

import { ShieldCheck, Smartphone, Key, Lock, Search, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function SecurityAudit() {
    const [mfaEnabled, setMfaEnabled] = useState(false);

    return (
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-anthropic-bg">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-anthropic-text tracking-tight flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-anthropic-primary" />
                        Security & HIPAA Audit
                    </h1>
                    <p className="text-sm text-anthropic-text-sec mt-1">Manage authentication settings and view system access logs.</p>
                </div>

                {/* Multi-Factor Authentication (MFA) Mock */}
                <div className="bg-white rounded-xl border border-anthropic-border shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-anthropic-border bg-anthropic-bg-sec/50">
                        <h2 className="text-lg font-bold text-anthropic-text">Two-Factor Authentication (2FA)</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-full ${mfaEnabled ? 'bg-[#E8F5EE] text-[#2D7A5F]' : 'bg-anthropic-bg-sec text-anthropic-text-mut'}`}>
                                {mfaEnabled ? <ShieldCheck className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-base font-semibold text-anthropic-text">
                                    {mfaEnabled ? "2FA is currently Enabled" : "2FA is currently Disabled"}
                                </h3>
                                <p className="text-sm text-anthropic-text-sec mt-1 max-w-xl leading-relaxed">
                                    Protect your account and PHI (Protected Health Information) data with an extra layer of security. We support highly secure authenticator apps like Google Authenticator or Authy.
                                </p>

                                {!mfaEnabled ? (
                                    <div className="mt-6 p-4 border border-anthropic-border-light rounded-lg bg-anthropic-bg-ter/50 flex flex-col sm:flex-row gap-4 items-center">
                                        <div className="w-24 h-24 bg-white border border-anthropic-border rounded grid place-items-center shrink-0">
                                            <span className="text-xs text-anthropic-text-mut font-mono">Mock QR</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-anthropic-text">1. Scan the QR Code</h4>
                                            <p className="text-xs text-anthropic-text-sec mt-1">Use your authenticator app to scan this code.</p>

                                            <div className="mt-3 flex gap-2">
                                                <input type="text" placeholder="123456" className="w-24 px-3 py-1.5 text-sm border border-anthropic-border rounded-md focus:outline-none focus:ring-1 focus:ring-anthropic-primary" />
                                                <button onClick={() => setMfaEnabled(true)} className="px-3 py-1.5 bg-anthropic-primary hover:bg-anthropic-primary-hover text-white text-sm font-medium rounded-md transition-colors shadow-sm focus:outline-none">
                                                    Verify & Enable
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-4">
                                        <button onClick={() => setMfaEnabled(false)} className="px-4 py-2 border border-[#C94A4A] text-[#C94A4A] hover:bg-[#FDF2F2] rounded-lg text-sm font-medium transition-colors focus:outline-none">
                                            Disable 2FA
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* HIPAA Audit Logs Mock */}
                <div className="bg-white rounded-xl border border-anthropic-border shadow-sm overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-anthropic-border bg-anthropic-bg-sec/50 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-anthropic-text">System Audit Logs</h2>
                        <div className="relative">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-anthropic-text-mut" />
                            <input type="text" placeholder="Search logs..." className="pl-3 pr-9 py-1.5 border border-anthropic-border rounded-lg text-sm focus:outline-none focus:border-anthropic-primary bg-white" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead>
                                <tr className="border-b border-anthropic-border text-anthropic-text-sec bg-anthropic-bg-ter/30">
                                    <th className="px-5 py-3 font-semibold">Timestamp</th>
                                    <th className="px-5 py-3 font-semibold">Actor</th>
                                    <th className="px-5 py-3 font-semibold">Event</th>
                                    <th className="px-5 py-3 font-semibold">IP Address</th>
                                    <th className="px-5 py-3 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-anthropic-border">
                                {[
                                    { time: "2026-03-08 14:05:22", actor: "Dr. Amin (admin)", event: "Accessed Patient MRN-10492", ip: "192.168.1.44", status: "Success" },
                                    { time: "2026-03-08 13:42:10", actor: "Dr. Amin (admin)", event: "Generated CHR Synthesis", ip: "192.168.1.44", status: "Success" },
                                    { time: "2026-03-08 11:15:05", actor: "System Agent", event: "Daily Backup Initiated", ip: "10.0.0.5", status: "Success" },
                                    { time: "2026-03-07 19:33:14", actor: "Nurse Sarah", event: "Failed Login Attempt", ip: "172.16.0.4", status: "Failed" },
                                    { time: "2026-03-07 08:22:00", actor: "Dr. Lim (staff)", event: "Downloaded Lab PDF (MRN-11029)", ip: "192.168.1.20", status: "Success" },
                                ].map((log, i) => (
                                    <tr key={i} className="hover:bg-anthropic-hover/50">
                                        <td className="px-5 py-3 text-anthropic-text-mut font-mono text-xs">{log.time}</td>
                                        <td className="px-5 py-3 font-medium text-anthropic-text">{log.actor}</td>
                                        <td className="px-5 py-3 text-anthropic-text-sec">{log.event}</td>
                                        <td className="px-5 py-3 text-anthropic-text-mut font-mono text-xs">{log.ip}</td>
                                        <td className="px-5 py-3">
                                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${log.status === 'Success' ? 'bg-[#E8F5EE] text-[#2D7A5F]' : 'bg-[#FDF2F2] text-[#C94A4A]'
                                                }`}>
                                                {log.status === 'Success' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                                {log.status}
                                            </span>
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
