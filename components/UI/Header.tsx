import {BookOpen} from "lucide-react";
import React from "react";

interface HeaderProps {
    level: number;
    streak: number;
    name: string;
}

export default function Header ({level, streak, name}: HeaderProps) {
    return (
        <header className="bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex items-center">
                    <div className="bg-green-500 w-10 h-10 rounded-md flex items-center justify-center mr-3 shadow-lg">
                        <BookOpen size={20} className="text-gray-900"/>
                    </div>
                    <h1 className="text-xl font-bold text-gray-100">StudyStreak</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-sm font-medium text-gray-300">
                        Level {level} • {streak} Day Streak
                    </div>
                    <div
                        className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center shadow-md hover:bg-green-400 transition-colors duration-200">
                        <span className="text-sm font-bold text-gray-900">{name.charAt(0)}</span>
                    </div>
                </div>
            </div>
        </header>
    )
}