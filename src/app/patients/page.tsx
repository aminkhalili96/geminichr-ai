"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import clsx from "clsx";
import { mockPatientsList } from "@/data/mockPatients";

const getInitial = (first: string, last: string) => {
    return (first ? first.charAt(0) : last ? last.charAt(0) : "?").toUpperCase();
};

const getTagStyles = (type: string) => {
    switch (type) {
        case "mixed":
            return "badge-success";
        case "report-ready":
            return "badge-info";
        case "no-report":
            return "badge-neutral";
        case "docs-count":
            return "badge-neutral";
        case "pdf":
            return "badge-info";
        case "image":
            return "badge-error text-[#9D174D] bg-[#FCE7F3] border-transparent"; // Custom pink match MedCHR
        case "text":
            return "badge text-[#6B21A8] bg-[#F3E8FF] border-transparent"; // Custom purple match MedCHR
        default:
            return "badge-neutral";
    }
};

export default function PatientsDirectory() {
    return (
        <div>
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1>Patients</h1>
                    <p className="muted">Manage patient records and health reports</p>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="stats-row">
                <div className="stat-card">
                    <div className="stat-card-value">122</div>
                    <div className="stat-card-label">Total Patients</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-value">84</div>
                    <div className="stat-card-label">Reports Generated</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-value">843</div>
                    <div className="stat-card-label">Documents Processed</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-value">46</div>
                    <div className="stat-card-label">PDF + Image + Text</div>
                </div>
            </div>

            {/* Featured Demo Patients */}
            <div className="card" style={{ marginBottom: "20px" }}>
                <div className="card-header">
                    <h3 className="card-title">Featured Demo Patients (PDF + Image + Written Data)</h3>
                    <span className="badge badge-neutral">46</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px" }}>
                    <Link href="/patients/chris-nordin" style={{ textDecoration: "none", fontSize: "12px", fontWeight: "500", padding: "6px 10px", borderRadius: "999px", background: "#FEF3C7", color: "#92400E", border: "1px solid #FDE68A" }}>
                        Chris Nordin · 4 files
                    </Link>
                    <Link href="/patients/bianca-flores" style={{ textDecoration: "none", fontSize: "12px", fontWeight: "500", padding: "6px 10px", borderRadius: "999px", background: "#FEF3C7", color: "#92400E", border: "1px solid #FDE68A" }}>
                        Bianca Flores · 4 files
                    </Link>
                    <Link href="/patients/alex-parker" style={{ textDecoration: "none", fontSize: "12px", fontWeight: "500", padding: "6px 10px", borderRadius: "999px", background: "#FEF3C7", color: "#92400E", border: "1px solid #FDE68A" }}>
                        Alex Parker · 4 files
                    </Link>
                    <Link href="/patients/john-doe" style={{ textDecoration: "none", fontSize: "12px", fontWeight: "500", padding: "6px 10px", borderRadius: "999px", background: "#FEF3C7", color: "#92400E", border: "1px solid #FDE68A" }}>
                        John Doe · 4 files
                    </Link>
                </div>
            </div>

            {/* Patient Records */}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Patient Records</h3>
                    <span className="badge badge-neutral">122 patients</span>
                </div>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "4px 0 0 0" }}>
                    Ordered by data richness first (patients with PDF + image + written data are prioritized).
                </p>

                {/* Search */}
                <div className="search-bar" style={{ marginTop: "24px" }}>
                    <svg className="search-bar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input type="text" placeholder="Search patients by name, DOB, or notes..." />
                </div>

                {/* Patient Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
                    {mockPatientsList.map((patient: any) => (
                        <Link key={patient.id} href={`/patients/${patient.id}`} className="patient-card">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div>
                                    <div className="patient-card-name">{patient.firstName} {patient.lastName}</div>
                                    <div className="patient-card-meta">DOB: {patient.dob}</div>
                                </div>
                                <div style={{ width: "36px", height: "36px", background: "var(--accent-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-primary)", fontWeight: "600", fontSize: "14px", flexShrink: 0 }}>
                                    {getInitial(patient.firstName, patient.lastName)}
                                </div>
                            </div>

                            <div className="patient-card-notes">
                                {patient.notes}
                            </div>

                            <div style={{ display: "flex", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
                                {patient.tagsRow1.map((tag: any, i: any) => (
                                    <span key={i} className={clsx("badge", getTagStyles(tag.type))}>
                                        {tag.label}
                                    </span>
                                ))}
                                {patient.tagsRow2.map((tag: any, i: any) => (
                                    <span key={i} className={clsx("badge", getTagStyles(tag.type))}>
                                        {tag.label}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
}
