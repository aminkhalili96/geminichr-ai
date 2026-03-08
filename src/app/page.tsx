"use client";

import Link from "next/link";
import { Users, FileText, Activity, AlertTriangle, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { label: "Total Patients Managed", value: "122", icon: Users, trend: "+12% this month", color: "text-anthropic-primary", bg: "bg-anthropic-primary/10" },
    { label: "Documents Synthesized", value: "348", icon: FileText, trend: "+45 this week", color: "text-[#2D7A5F]", bg: "bg-[#E8F5EE]" },
    { label: "High Risk Alerts", value: "14", icon: AlertTriangle, trend: "Requires attention", color: "text-[#C94A4A]", bg: "bg-[#FDF2F2]" },
  ];

  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto bg-anthropic-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-anthropic-bg-sec to-white border border-anthropic-border shadow-sm rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-anthropic-primary/5 to-transparent pointer-events-none" />
          <h1 className="text-3xl font-bold text-anthropic-text tracking-tight mb-2">
            Welcome to GeminiCHR.ai
          </h1>
          <p className="text-anthropic-text-sec max-w-2xl text-lg leading-relaxed">
            The intelligent clinical health record synthesizes complex, unstructured Malaysian patient histories (Manglish, handwritten notes) into structured, actionable insights using Google's Gemini 3.1 Pro.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/analysis" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-anthropic-primary hover:bg-anthropic-primary-hover text-white rounded-lg font-medium transition-all shadow-sm hover:shadow-md">
              <Activity className="w-5 h-5" />
              Synthesize New Document
            </Link>
            <Link href="/patients" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-anthropic-hover text-anthropic-text border border-anthropic-border rounded-lg font-medium transition-colors shadow-sm">
              <Users className="w-5 h-5" />
              View Patient Directory
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-anthropic-border shadow-sm flex items-start gap-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-anthropic-text-sec mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-anthropic-text tracking-tight">{stat.value}</span>
                </div>
                <p className="text-sm text-anthropic-text-mut mt-1">{stat.trend}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Alerts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Urgent Gap Analytics Alerts */}
          <div className="bg-white rounded-xl border border-anthropic-border shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-anthropic-border bg-anthropic-bg-sec/50 flex items-center justify-between">
              <h2 className="text-lg font-bold text-anthropic-text flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#C94A4A]" />
                Priority Gap Alerts
              </h2>
              <Link href="/patients" className="text-sm font-medium text-anthropic-primary hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="p-5 divide-y divide-anthropic-border flex-1">
              {[
                { patient: "Ahmad bin Ali", mrn: "MRN-10492", alert: "HBA1c climbing (8.1%). Recommend immediate Metformin review.", time: "2 hours ago" },
                { patient: "Chong Wei Feng", mrn: "MRN-11029", alert: "Critical BP reading 160/100 synthesised from handwritten note.", time: "4 hours ago" },
              ].map((alert, i) => (
                <div key={i} className={`${i > 0 ? 'pt-4' : 'pb-4'} flex items-start gap-3`}>
                  <div className="w-2 h-2 rounded-full bg-[#C94A4A] mt-2 shrink-0 animate-pulse" />
                  <div>
                    <h4 className="text-sm font-bold text-anthropic-text">{alert.patient} <span className="font-normal text-anthropic-text-mut">({alert.mrn})</span></h4>
                    <p className="text-sm text-anthropic-text-sec mt-1">{alert.alert}</p>
                    <p className="text-xs text-anthropic-text-mut mt-2">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent AI Syntheses */}
          <div className="bg-white rounded-xl border border-anthropic-border shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-anthropic-border bg-anthropic-bg-sec/50 flex items-center justify-between">
              <h2 className="text-lg font-bold text-anthropic-text flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#2D7A5F]" />
                Recent Syntheses
              </h2>
            </div>
            <div className="p-5 divide-y divide-anthropic-border flex-1">
              {[
                { doc: "Klinik Kesihatan Referral.jpg", patient: "Siti Nurhaliza", status: "Completed", time: "10 mins ago" },
                { doc: "Discharge_Summary_HKT.pdf", patient: "David Fernandez", status: "Completed", time: "1 hour ago" },
                { doc: "Handwritten_Lab_Notes.jpeg", patient: "Priya Murugan", status: "Completed", time: "Yesterday" },
              ].map((activity, i) => (
                <div key={i} className={`${i > 0 ? 'pt-4' : 'pb-4'} flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#E8F5EE] rounded-lg">
                      <FileText className="w-4 h-4 text-[#2D7A5F]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-anthropic-text truncate max-w-[200px]">{activity.doc}</p>
                      <p className="text-xs text-anthropic-text-sec mt-0.5">Matched to <span className="font-medium">{activity.patient}</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#E8F5EE] text-[#2D7A5F]">
                      {activity.status}
                    </span>
                    <p className="text-xs text-anthropic-text-mut mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
