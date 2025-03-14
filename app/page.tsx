"use client"
import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, AlarmClock} from 'lucide-react';
import Header from "@/components/UI/Header";
import Toast from "@/components/UI/Toast";
import Timer from '@/components/UI/Timer';
import TimerSettings from "@/components/UI/TimerSettings";
import SubjectAndTechniqueSelection from "@/components/UI/SubjectAndTechniqueSelection";
import SessionControls from "@/components/UI/SessionControls";
import SessionsHistory from "@/components/UI/SessionsHistory";
import DailyProgress from "@/components/UI/DailyProgress";
import PlantGrowth from "@/components/UI/PlantGrowth";
import SubjectDistribution from "@/components/UI/SubjectDistribution";

// Mock data for the application
const mockData = {
  user: {
    name: 'Klex Chen',
    totalStudyHours: 126.5,
    streak: 15, // days
    level: 8,
    defaultGoal: 4
  },
  todayStats: [
      {date: '2025-03-14', completed: 3, goal: 6, focusScore: 55, morningHours: 3, eveningHours: 0},
    {date: '2025-12-12', completed: 2.5, goal: 4, focusScore: 85, morningHours: 1.5, eveningHours: 1.0},
    {date: '2025-03-12', completed: 2.5, goal: 4, focusScore: 85, morningHours: 1.5, eveningHours: 1.0},
  ],
  sessionsHistory: [
    { id: 1, subject: 'Mathematics', duration: 45, date: '2025-03-13', technique: 'Pomodoro' },
    { id: 2, subject: 'Physics', duration: 60, date: '2025-03-13', technique: 'Deep Focus' },
    { id: 3, subject: 'Computer Science', duration: 90, date: '2025-03-12', technique: 'Pomodoro' },
    { id: 4, subject: 'Biology', duration: 30, date: '2025-03-11', technique: 'Time Blocking' },
    { id: 5, subject: 'Computer Science', duration: 30, date: '2025-03-02', technique: 'Pomodoro' },
    { id: 6, subject: 'Biology', duration: 45, date: '2025-03-03', technique: 'Time Blocking' },
    { id: 7, subject: 'Mathematics', duration: 45, date: '2025-03-04', technique: 'Pomodoro' },
    { id: 8, subject: 'Physics', duration: 25, date: '2025-03-05', technique: 'Pomodoro' },
    { id: 9, subject: 'Mathematics', duration: 60, date: '2025-03-06', technique: 'Deep Focus' },
    { id: 10, subject: 'Mathematics', duration: 60, date: '2025-03-07', technique: 'Deep Focus' },
    { id: 11, subject: 'Mathematics', duration: 60, date: '2025-03-08', technique: 'Deep Focus' },
  ],
  subjects: [
    { id: 1, name: 'Mathematics', color: 'bg-blue-500', totalHours: 42.5 },
    { id: 2, name: 'Physics', color: 'bg-purple-500', totalHours: 28.0 },
    { id: 3, name: 'Computer Science', color: 'bg-green-500', totalHours: 36.0 },
    { id: 4, name: 'Biology', color: 'bg-yellow-500', totalHours: 20.0 },
    { id: 6, name: 'Other', color: 'bg-yellow-500', totalHours: 20.0 },
  ],
  techniques: [
    { id: 1, name: 'Pomodoro', description: '25 minutes study, 5 minutes break' },
    { id: 2, name: 'Deep Focus', description: '90 minutes uninterrupted study' },
    { id: 3, name: 'Time Blocking', description: 'Dedicated time slots for specific subjects' },
  ],
};

export default function Dashboard() {
  const [activeSession, setActiveSession] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const [selectedSubject, setSelectedSubject] = useState<{ id: number; name: string; color: string; totalHours: number }>({
    id: 0,
    name: '',
    color: '',
    totalHours: 0
  });

  const [selectedTechnique, setSelectedTechnique] = useState<{ id: number; name: string; description: string }>({
    id: 0,
    name: '',
    description: ''
  });
  const [sessionMinutes, setSessionMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [showTimeSettings, setShowTimeSettings] = useState(false);
  const [timerPulse, setTimerPulse] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);


  interface Notification {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning' | '';
  }
  const [notification, setNotification] = useState<Notification>({
    show: false,
    message: "",
    type: "",
  });

  // Effect to handle the timer countdown
  useEffect(() => {
    if (activeSession) {
      // Add pulsing effect every 10 seconds
      if (timerSeconds % 10 === 0) {
        setTimerPulse(true);
        setTimeout(() => setTimerPulse(false), 1000);
      }

      timerRef.current = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds(timerSeconds - 1);
        } else if (timerMinutes > 0) {
          setTimerMinutes(timerMinutes - 1);
          setTimerSeconds(59);
        } else {
          // Timer finished
          if (isBreak) {
            // Break finished, start a new session
            setIsBreak(false);
            setTimerMinutes(sessionMinutes);
            setTimerSeconds(0);

            // Show notification
            showNotification("Study session starting now!", "success");
          } else {
            // Session finished, start a break
            setIsBreak(true);
            setTimerMinutes(breakMinutes);
            setTimerSeconds(0);

            // Show notification
            showNotification("Great job! Break time starts now.", "info");
          }
        }
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeSession, timerMinutes, timerSeconds, isBreak]);

  // Show notification
  const showNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'info' }); // Default type when hiding
    }, 3000);
  };

  // Toggle study session
  const toggleSession = () => {
    if (activeSession) {
      // Stop session
      setActiveSession(false);

      // Show notification
      showNotification("Session paused", "info");

      // Reset timer based on mode
      if (isBreak) {
        setTimerMinutes(breakMinutes);
      } else {
        setTimerMinutes(sessionMinutes);
      }
      setTimerSeconds(0);
    } else {
      // Start session
      setActiveSession(true);
      setIsBreak(false);
      setTimerMinutes(sessionMinutes);
      setTimerSeconds(0);

      // Show notification
      showNotification("Session started! Focus time.", "success");
    }
  };

  // Format time as MM:SS
  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Adjust session time
  const adjustSessionTime = (amount: number) => {
    const newTime = Math.max(1, Math.min(120, sessionMinutes + amount));
    setSessionMinutes(newTime);
    if (!activeSession && !isBreak) {
      setTimerMinutes(newTime);
    }
  };

  // Adjust break time
  const adjustBreakTime = (amount: number) => {
    const newTime = Math.max(1, Math.min(60, breakMinutes + amount));
    setBreakMinutes(newTime);
    if (!activeSession && isBreak) {
      setTimerMinutes(newTime);
    }
  };

  return (
      <div className="min-h-screen bg-gray-900 text-gray-100">
        {/* Header */}
        <Header level={mockData.user.level} streak={mockData.user.streak} name={mockData.user.name}/>
        {/* Notification Toast */}
        {notification.show && (
            <Toast type={notification.type} message={notification.message}/>
        )}
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Session Control */}
            <div className="lg:col-span-2 flex flex-col space-y-6">
              {/* Session Card */}
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-200">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center">
                    {isBreak ? (
                        <>
                          <AlarmClock size={22} className="mr-2 text-blue-400"/>
                          Break Time
                        </>
                    ) : (
                        <>
                          <BookOpen size={22} className="mr-2 text-green-400"/>
                          Study Session
                        </>
                    )}
                  </h2>

                  {/* Subject and Technique Selection */}
                  <SubjectAndTechniqueSelection
                      selectedSubject={selectedSubject}
                      selectedTechnique={selectedTechnique}
                      subjects={mockData.subjects}
                      techniques={mockData.techniques}
                      setSelectedSubject={setSelectedSubject}
                      setSelectedTechnique={setSelectedTechnique}
                      activeSession={activeSession}
                  />
                  {/* Time Settings */}
                  <TimerSettings
                      showTimeSettings={showTimeSettings}
                      setShowTimeSettings={setShowTimeSettings}
                      sessionMinutes={sessionMinutes}
                      breakMinutes={breakMinutes}
                      adjustSessionTime={adjustSessionTime}
                      adjustBreakTime={adjustBreakTime}
                      activeSession={activeSession}
                  />
                  {/* Timer Display */}
                  <Timer
                      isBreak={isBreak}
                      activeSession={activeSession}
                      timerMinutes={timerMinutes}
                      timerSeconds={timerSeconds}
                      formatTime={formatTime}
                      timerPulse={timerPulse}
                      breakMinutes={breakMinutes}
                      sessionMinutes={sessionMinutes}
                      selectedTechnique={selectedTechnique.description}
                  />
                  {/* Session Controls */}
                  <SessionControls toggleSession={toggleSession} isBreak={isBreak} activeSession={activeSession} />
                </div>
              </div>

              {/* Sessions History */}
              <SessionsHistory isFullHistory={false} history={mockData.sessionsHistory} />
            </div>

            {/* Right Column - Stats & Plant */}
            <div className="space-y-6 flex flex-col">
              {/* Daily Progress */}
              <DailyProgress todayStats={mockData.todayStats} />
              {/* Plant Growth */}
             <PlantGrowth  activeSession={activeSession} isBreak={isBreak} timerMinutes={timerMinutes} sessionMinutes={sessionMinutes} totalStudyHours={mockData.user.totalStudyHours}/>
              {/* Subject Distribution */}
              <SubjectDistribution subjects={mockData.subjects} totalStudyHours={mockData.user.totalStudyHours} />
            </div>
          </div>
        </main>

        <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
      </div>
  );
}