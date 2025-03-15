import {ChevronDown, ChevronUp, Clock} from "lucide-react";

interface TimerSettingsProps {
    showTimeSettings: boolean;
    setShowTimeSettings: (value: boolean) => void;
    sessionMinutes: number;
    breakMinutes: number;
    adjustSessionTime: (amount: number) => void;
    adjustBreakTime: (amount: number) => void;
    activeSession: boolean;
}

const TimerSettings = ({
                          showTimeSettings,
                          setShowTimeSettings,
                          sessionMinutes,
                          breakMinutes,
                          adjustSessionTime,
                          adjustBreakTime,
                          activeSession
                      }: TimerSettingsProps) => (
    <div className="mb-6">
        <button
            disabled={activeSession}
            onClick={() => setShowTimeSettings(!showTimeSettings)}
            className={`disabled:bg-gray-900 disabled:text-gray-300 flex items-center mb-2 text-sm font-medium text-gray-300 transition-colors duration-200 bg-gray-700 px-3 py-2 rounded-md ${!activeSession ? 'hover:text-gray-100 hover:bg-gray-600' : ''}`}
        >
            <Clock size={16} className="mr-2" />
            Time Settings
            {showTimeSettings && !activeSession ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
        </button>

        {showTimeSettings && !activeSession &&(
            <div className="bg-gray-700 p-5 rounded-md grid grid-cols-2 gap-4 animate-fadeIn shadow-inner">
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Session Length</label>
                    <div className="flex items-center">
                        <button
                            onClick={() => adjustSessionTime(-5)}
                            disabled={activeSession}
                            className="text-gray-300 hover:text-gray-100 disabled:opacity-50 bg-gray-600 hover:bg-gray-500 h-10 w-10 rounded-l-md flex items-center justify-center transition-colors duration-200"
                        >
                            <ChevronDown size={20} />
                        </button>
                        <span className="text-lg font-medium w-16 text-center py-2">{sessionMinutes} min</span>
                        <button
                            onClick={() => adjustSessionTime(5)}
                            disabled={activeSession}
                            className="text-gray-300 hover:text-gray-100 disabled:opacity-50 bg-gray-600 hover:bg-gray-500 h-10 w-10 rounded-r-md flex items-center justify-center transition-colors duration-200"
                        >
                            <ChevronUp size={20} />
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Break Length</label>
                    <div className="flex items-center">
                        <button
                            onClick={() => adjustBreakTime(-1)}
                            disabled={activeSession}
                            className="text-gray-300 hover:text-gray-100 disabled:opacity-50 bg-gray-600 hover:bg-gray-500 h-10 w-10 rounded-l-md flex items-center justify-center transition-colors duration-200"
                        >
                            <ChevronDown size={20} />
                        </button>
                        <span className="text-lg font-medium w-16 text-center py-2">{breakMinutes} min</span>
                        <button
                            onClick={() => adjustBreakTime(1)}
                            disabled={activeSession}
                            className="text-gray-300 hover:text-gray-100 disabled:opacity-50 bg-gray-600 hover:bg-gray-500 h-10 w-10 rounded-r-md flex items-center justify-center transition-colors duration-200"
                        >
                            <ChevronUp size={20} />
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
);

export default TimerSettings;
