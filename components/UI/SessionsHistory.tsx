import {BarChart2} from "lucide-react";

interface SessionsHistoryProps {
    history: Array<{ id: number; subject: string; duration: number; date: string; technique: string }>;
    isFullHistory: boolean;
}

const SessionsHistory = ({ history }: SessionsHistoryProps) => (
<div
    className="grow bg-gray-800 rounded-lg shadow-lg border border-gray-700 hover:border-gray-600 transition-all duration-200">
    <div className="p-6">
        <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center">
            <BarChart2 size={22} className="mr-2 text-purple-400"/>
            Recent Sessions
        </h2>
        <div className="overflow-hidden rounded-md">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                <tr>
                    <th scope="col"
                        className="px-4 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Subject
                    </th>
                    <th scope="col"
                        className="px-4 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Duration
                    </th>
                    <th scope="col"
                        className="px-4 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Date
                    </th>
                    <th scope="col"
                        className="px-4 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Technique
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                {history.slice(-9).reverse().map((session) => (
                    <tr key={session.id} className="bg-gray-800 hover:bg-gray-700 transition-colors duration-150">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-100">{session.subject}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{session.duration} min</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{session.date}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{session.technique}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
</div>
)
;

export default SessionsHistory;
