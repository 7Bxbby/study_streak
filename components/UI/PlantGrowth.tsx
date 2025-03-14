interface PlantGrowthProps {
    activeSession: boolean;
    totalStudyHours: number;
    sessionMinutes: number;
    timerMinutes: number;
    isBreak: boolean;
}

export default function PlantGrowth({activeSession, totalStudyHours, sessionMinutes, isBreak, timerMinutes}: PlantGrowthProps){
    const plantEmojis = ["🌸", "🌳", "🌵", "🌿","🌱"];
    const stageDuration = Math.floor(sessionMinutes / 5);
    const plantStageFromTime = Math.min(Math.floor(timerMinutes / stageDuration), plantEmojis.length - 1);

    return(
    <div
        className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 hover:border-gray-600 transition-all duration-200">
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center">
                <span className="mr-2">🌱</span>
                Study Plant
            </h2>
            <div className="flex justify-center p-6 bg-gray-700 rounded-md relative overflow-hidden">
                <div
                    className={`text-center`}
                >
                    {/* This would be an actual image in a real app */}
                    <div className={`w-44 h-44 mx-auto mb-3 bg-gray-600 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden
                      ${activeSession && !isBreak ? 'animate-pulse-slow' : ''}`}>
                        {/* Background light effect */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent ${activeSession && !isBreak ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}></div>

                        <div
                            className={`text-7xl transition-all duration-500 transform`}>
                            {plantEmojis[activeSession ? plantStageFromTime : 4]}
                        </div>
                    </div>
                    <p className="text-sm font-medium text-gray-300">
                        {activeSession && !isBreak
                            ? "Your plant is growing as you study!"
                            : isBreak
                                ? "Your plant is resting during your break"
                                : "Start a session to grow your plant"}
                    </p>
                </div>
            </div>
            <div className="mt-4 text-center">
                <div className="text-sm font-semibold text-gray-400">Total Study Time</div>
                <div className="text-xl font-bold text-green-400">{totalStudyHours} hours</div>
            </div>
        </div>
    </div>
)};

