"use client"
import {BarChart2} from "lucide-react";
import {useEffect, useState} from "react";

interface Session {
    _id: string;
    subject: number | string;
    duration: number;
    technique: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface ApiResponse {
    sessions: Session[];
}

export default function SessionsHistory() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/sessions', {
                    cache: 'no-store',
                })
                if (!res.ok) {
                    throw new Error("Failed to fetch sessions.");
                }
                const result = await res.json() as ApiResponse;

                if (result.sessions && Array.isArray(result.sessions)) {
                    setSessions(result.sessions);
                } else {
                    setSessions([]);
                    console.warn("Unexpected structure of data:", result);
                }
            } catch (error) {
                console.error("Error loading session history", error);
                setError(error instanceof Error ? error.message : "Uncaught error");
                setSessions([]);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="flex grow bg-gray-800 rounded-lg shadow-lg border border-gray-700 hover:border-gray-600 transition-all duration-200 justify-center ">
            {isLoading ? (
                <div className="p-6 text-gray-300">Loading</div>
            ) : error ? (
                <div className="p-6 text-red-400">{error}</div>
            ) : (
                <div className="p-6 grow">
                    <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center">
                        <BarChart2 size={22} className="mr-2 text-purple-400"/>
                        Recent Sessions
                    </h2>
                    <div className="overflow-hidden rounded-md">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Subject</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Duration</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Technique</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                            {sessions.length > 0 ? (
                                sessions.slice(-6).reverse().map((session) => (
                                    <tr key={session._id} className="bg-gray-800 hover:bg-[#1a2331] transition-colors select-none duration-150">
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-100">{session.subject}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{session.duration} min</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                            {new Date(session.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{session.technique}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-4 py-3 text-center text-gray-400">No sessions</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}