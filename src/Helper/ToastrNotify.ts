import { toast, Slide } from "react-toastify";
import type { CSSProperties } from "react";

const ToastrNotify = (message: string, notifyType: any) => {
    const type = String(notifyType || "default").toLowerCase();

    const accentMap: Record<string, string> = {
        success: "#22c55e",
        info: "#38bdf8",
        warning: "#f59e0b",
        error: "#ef4444",
        default: "#64748b",
    };

    const iconMap: Record<string, string> = {
        success: "👍",
        info: "ℹ️",
        warning: "⚠️",
        error: "👎",
        default: "🔔",
    };

    const accent = accentMap[type] ?? accentMap.default;
        const icon = iconMap[type] ?? iconMap.default;

    const style: CSSProperties = {
        background: "#0b1018",
        color: "#e5e7eb",
        borderRadius: 12,
        border: `1px solid ${accent}33`,
        boxShadow: `0 12px 28px -8px ${accent}55`,
    };


        const messageText = `${icon}  ${message}`;

        toast(messageText, {
        type: type as any,
        position: "bottom-right",
        autoClose: 4500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Slide,
        style,
    });
};

export default ToastrNotify;
