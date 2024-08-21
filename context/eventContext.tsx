import { AppEvent } from "@/types/event";
import { createContext, useContext, useState } from "react";

interface EventContextType {
  selectedEvent: AppEvent | null;
  setSelectedEvent: (event: AppEvent) => void;
  updateTicketsVerified: (count: number) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);

  const updateTicketsVerified = (count: number) => {
    setSelectedEvent((prev) => {
      if (prev) {
        return { ...prev, tickets_verified: count };
      }
      return null;
    });
  };

  return (
    <EventContext.Provider
      value={{ selectedEvent, setSelectedEvent, updateTicketsVerified }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};