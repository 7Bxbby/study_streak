interface TimerProps {
    isBreak: boolean;
    timerMinutes: number;
    timerSeconds: number;
    formatTime: (minutes: number, seconds: number) => string;
    timerPulse: boolean;
    selectedTechnique: string;
    breakMinutes: number;
    sessionMinutes: number;
    activeSession: boolean;
}

export default function Timer ({ isBreak,activeSession, timerMinutes, timerSeconds, formatTime, timerPulse, selectedTechnique, breakMinutes, sessionMinutes }: TimerProps){
    return (
        <div className="text-center mb-8">
            {/* Circular Progress Timer */}
            <div className="relative inline-flex justify-center items-center">
                {/* Circular Background */}
                <svg className="w-48 h-48" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        stroke="#374151"
                        strokeWidth="8"
                    />

                    {/* Progress Circle - Updates Every 10 Seconds */}
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        stroke={isBreak ? "#60A5FA" : "#4ADE80"}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (isBreak
                            ? (timerMinutes * 60 + timerSeconds) / (breakMinutes * 60)
                            : (timerMinutes * 60 + timerSeconds) / (sessionMinutes * 60))}`}
                        transform="rotate(-90 50 50)"
                        className="transition-all duration-300"
                    />
                </svg>

                {/* Timer Text (Centered in Circle) */}
                <div className="absolute">
                    <div
                        className={`text-5xl font-bold transition-all duration-300 ${timerPulse ? 'scale-105' : 'scale-100'} ${isBreak&&activeSession ? 'text-blue-400' : 'text-green-400'}`}>
                        {formatTime(timerMinutes, timerSeconds)}
                    </div>
                </div>
            </div>

            {/* Mode Description */}
            <p className="text-sm font-medium text-gray-400 mt-4">
                {isBreak
                    ? "Take a break and recharge"
                    : selectedTechnique}
            </p>
        </div>
)
}
