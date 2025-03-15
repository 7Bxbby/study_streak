interface SubjectAndTechniqueSelectionProps {
    selectedSubject: { id: number; name: string };
    selectedTechnique: { id: number; name: string };
    subjects: Array<{ id: number; name: string; color: string; totalHours: number }>;
    techniques: Array<{ id: number; name: string; description: string }>;
    setSelectedSubject: (subject: { id: number; name: string; color: string; totalHours: number; }) => void;
    setSelectedTechnique: (technique: { id: number; name: string; description: string }) => void;
    activeSession: boolean;
}

const SubjectAndTechniqueSelection = ({
                                          selectedSubject,
                                          selectedTechnique,
                                          subjects,
                                          techniques,
                                          setSelectedSubject,
                                          setSelectedTechnique,
                                          activeSession
                                      }: SubjectAndTechniqueSelectionProps) => (
    <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Subject Selection */}
        <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Subject</label>
            <select
                className="p-2 disabled:bg-gray-900 disabled:text-gray-300 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500"
                value={selectedSubject.id}
                onChange={(e) => setSelectedSubject(subjects.find(s => s.id === parseInt(e.target.value)) ?? { id: 0, name: '', color: '',totalHours: 0 })}
                disabled={activeSession}
            >
                {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
            </select>
        </div>

        {/* Technique Selection */}
        <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Technique</label>
            <select
                className="p-2 disabled:bg-gray-900 disabled:text-gray-300 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500"
                value={selectedTechnique.id}
                onChange={(e) =>
                    setSelectedTechnique(techniques.find(t => t.id === parseInt(e.target.value)) ?? { id: 0, name: '', description: '' })
                }
                disabled={activeSession}
            >
                {techniques.map(technique => (
                    <option key={technique.id} value={technique.id}>{technique.name}</option>
                ))}
            </select>
        </div>
    </div>
);

export default SubjectAndTechniqueSelection;
