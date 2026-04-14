"use client";

import { createContext, useContext, useMemo, useState } from "react";

import { teacherClasses } from "./mock-data";

const TeacherClassContext = createContext(null);

export default function TeacherClassProvider({ children }) {
  const [selectedClassId, setSelectedClassId] = useState(() => {
    if (typeof window === "undefined") return "";

    const stored = window.localStorage.getItem("teacher-selected-class");
    if (stored && teacherClasses.some((item) => item.id === stored)) {
      return stored;
    }

    return "";
  });

  const value = useMemo(() => {
    const selectedClass = teacherClasses.find(
      (item) => item.id === selectedClassId,
    );

    return {
      classes: teacherClasses,
      selectedClassId,
      selectedClass,
      setSelectedClassId: (classId) => {
        setSelectedClassId(classId);
        if (typeof window !== "undefined") {
          window.localStorage.setItem("teacher-selected-class", classId);
        }
      },
    };
  }, [selectedClassId]);

  return (
    <TeacherClassContext.Provider value={value}>
      {children}
    </TeacherClassContext.Provider>
  );
}

export function useTeacherClass() {
  const context = useContext(TeacherClassContext);

  if (!context) {
    throw new Error("useTeacherClass must be used inside TeacherClassProvider");
  }

  return context;
}
