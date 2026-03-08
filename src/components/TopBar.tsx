import Link from "next/link";
import { User } from "lucide-react";

export default function TopBar() {
    return (
        <div className="h-[56px] bg-white border-b border-[#E8E6E0] flex items-center justify-between px-8 sticky top-0 z-[100]">
            <div className="flex items-center gap-4">
                {/* Breadcrumb would go here, optionally passed as children or via context */}
                <div className="flex items-center gap-[6px] text-sm text-[#737372]">
                    <span className="text-[#141413] font-medium">Dashboard</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-[#3D8C5C] bg-[#EDF7F0] px-2.5 py-1 rounded-full font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3D8C5C] animate-pulse"></div>
                    Secure Connection Active
                </div>

                {/* User Profile Mock */}
                <div className="flex items-center gap-2.5 ml-2 cursor-pointer hover:bg-black/5 p-1.5 rounded-md transition-colors">
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-medium text-[#141413]">Dr. Amin</span>
                        <span className="text-[10px] text-[#737372]">Cardiologist</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center border border-black/10">
                        <User className="w-4 h-4 text-[#737372]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
