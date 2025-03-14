interface SessionControlsProps {
    toggleSession: () => void;
    activeSession: boolean;
    isBreak: boolean;
}

const SessionControls = ({ toggleSession, activeSession, isBreak }: SessionControlsProps) => (
    <div className="mt-4">
        <button
            onClick={toggleSession}
            className={`cursor-pointer w-full ${isBreak&&activeSession? 'bg-[#509FFF] hover:bg-[#60A5FA]' : 'bg-green-500 hover:bg-green-600'} text-white py-2 px-4 rounded-md text-lg transition-colors duration-300`}
        >
            {activeSession ? 'Stop' : 'Start'} {isBreak ? (!activeSession ? 'Session' : 'Break') : 'Session'}
        </button>
    </div>
);

export default SessionControls;
