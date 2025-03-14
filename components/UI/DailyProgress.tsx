import {AlarmClock} from "lucide-react";

interface DailyProgressProps {
    todayStats: Array<{ date: string;
        completed: number;
        goal: number;
        focusScore: number;
        morningHours: number;
        eveningHours: number; }>;

}

export default function DailyProgress({ todayStats }: DailyProgressProps) {
    const today = new Date().toISOString().split("T")[0];
    const todayData = todayStats.find(stat => stat.date === today);

    return (
        <div
            className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 hover:border-gray-600 transition-all duration-200">
            <div className="p-6">
                {todayData&&(
                    <>
                        <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center">
                            <AlarmClock size={22} className="mr-2 text-yellow-400"/>
                            Today&#39;s Progress
                        </h2>

                        <div className="mb-4">
                            <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-300">
                      Study Goal
                    </span>
                                <span className="text-sm font-semibold text-gray-300">
                      {todayData.completed} / {todayData.goal} hours
                      <span className="ml-2 text-green-400 font-bold">
                        {Math.round((todayData.completed / todayData.goal) * 100)}%
                      </span>
                    </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                                <div className="bg-green-500 h-3 rounded-full transition-all duration-700"
                                     style={{width: `${(todayData.completed / todayData.goal) * 100}%`}}></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-gray-700 p-3 rounded-md">
                                <div className="flex justify-between mb-1">
                                    <span className="text-xs font-medium text-gray-400">Morning</span>
                                    <span
                                        className="text-xs font-medium text-gray-400">{todayData.morningHours} hrs</span>
                                </div>
                                <div className="w-full bg-gray-600 rounded-full h-1.5">
                                    <div className="bg-yellow-400 h-1.5 rounded-full"
                                         style={{width: `${(todayData.morningHours / todayData.goal) * 100}%`}}></div>
                                </div>
                            </div>
                            <div className="bg-gray-700 p-3 rounded-md">
                                <div className="flex justify-between mb-1">
                                    <span className="text-xs font-medium text-gray-400">Evening</span>
                                    <span
                                        className="text-xs font-medium text-gray-400">{todayData.eveningHours} hrs</span>
                                </div>
                                <div className="w-full bg-gray-600 rounded-full h-1.5">
                                    <div className="bg-purple-400 h-1.5 rounded-full"
                                         style={{width: `${(todayData.eveningHours / todayData.goal) * 100}%`}}></div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-semibold text-gray-300">Focus Score</span>
                                <span className="text-sm font-semibold text-gray-300">
                      {todayData.focusScore}
                                    <span className="text-blue-400 font-bold ml-1">%</span>
                    </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-3">
                                <div className="bg-blue-500 h-3 rounded-full transition-all duration-700"
                                     style={{width: `${todayData.focusScore}%`}}></div>
                            </div>
                        </div>
                    </>
                )}
                {!todayData&&(
                    <>
                        <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center">
                            <AlarmClock size={22} className="mr-2 text-yellow-400"/>
                            Today&#39;s Progress
                        </h2>

                        <div className="mb-4">
                            <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-300">
                      Let&#39;s start learning!
                    </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                                <div className="bg-gray-500 h-3 rounded-full transition-all duration-700"
                                     style={{width: `${100}%`}}></div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
    ;
}

