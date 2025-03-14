import {Bell} from "lucide-react";
import React from "react";

interface Notification {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning' | '';
}

export default function Toast({message, type}: Notification) {
    return (
        <div
            className={`fixed top-5 right-5 p-4 rounded-md shadow-lg max-w-xs z-50 transition-opacity duration-300 flex items-center
            ${type === 'success' ? 'bg-green-500 text-white' :
                type === 'info' ? 'bg-blue-500 text-white' :
                    type === 'warning' ? 'bg-yellow-500 text-gray-900' :
                        'bg-red-500 text-white'}`}
        >
            <Bell size={18} className="mr-2"/>
            <p className="font-medium">{message}</p>
        </div>
    )
}