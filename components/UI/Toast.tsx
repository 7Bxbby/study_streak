import {Bell} from "lucide-react";
import React from "react";
import {AnimatePresence, motion} from "framer-motion"

interface Notification {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning' | '';
    show: boolean;
}
interface ToastProps {
    notification: Notification;
}

export default function Toast({notification}: ToastProps) {
    return (
        <AnimatePresence>
            {notification.show&& (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 p-4 rounded-md shadow-lg max-w-xs z-50 transition-opacity duration-300 flex items-center
            ${notification.type === 'success' ? 'bg-green-500 text-white' :
                        notification.type === 'info' ? 'bg-blue-500 text-white' :
                            notification.type === 'warning' ? 'bg-yellow-500 text-gray-900' :
                                'bg-red-500 text-white'}`}
                >
                    <Bell size={18} className="mr-2"/>
                    <p className="font-medium">{notification.message}</p>
                </motion.div>
            )}
        </AnimatePresence>
    )
}