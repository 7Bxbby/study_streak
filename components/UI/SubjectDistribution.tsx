import {BarChart2} from "lucide-react";

interface SubjectDistributionProps {
    subjects: Array<{ id: number; name: string; color: string; totalHours: number }>;
    totalStudyHours: number;
}

const SubjectDistribution = ({ subjects,totalStudyHours }: SubjectDistributionProps) => (
    <div
        className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 hover:border-gray-600 transition-all duration-200">
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center">
                <BarChart2 size={22} className="mr-2 text-blue-400"/>
                Subject Distribution
            </h2>
            {subjects.map((subject) => (
                <div key={subject.id} className="mb-4">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-300">{subject.name}</span>
                        <span className="text-sm font-medium text-gray-300">{subject.totalHours} hrs</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                            className={`${subject.color} h-3 rounded-full transition-all duration-700 hover:opacity-90`}
                            style={{width: `${(subject.totalHours / totalStudyHours) * 100}%`}}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default SubjectDistribution;
