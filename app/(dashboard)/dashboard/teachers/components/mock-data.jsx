export const teacherClasses = [
  {
    id: "class-10a",
    name: "Class 10-A",
    studentsCount: 40,
    lastAttendanceDate: "Apr 13, 2026",
    todaysSession: "08:00 AM - Mathematics",
  },
  {
    id: "class-9b",
    name: "Class 9-B",
    studentsCount: 36,
    lastAttendanceDate: "Apr 13, 2026",
    todaysSession: "09:10 AM - Physics",
  },
  {
    id: "class-8c",
    name: "Class 8-C",
    studentsCount: 34,
    lastAttendanceDate: "Apr 12, 2026",
    todaysSession: "10:20 AM - English",
  },
  {
    id: "class-11d",
    name: "Class 11-D",
    studentsCount: 38,
    lastAttendanceDate: "Apr 12, 2026",
    todaysSession: "11:30 AM - Chemistry",
  },
];

export const teacherStudents = [
  { id: "st-001", name: "Aarav Kumar", classIds: ["class-10a"] },
  { id: "st-002", name: "Mia Chen", classIds: ["class-10a", "class-9b"] },
  { id: "st-003", name: "Noah Patel", classIds: ["class-9b"] },
  { id: "st-004", name: "Sophia Ali", classIds: ["class-8c"] },
  { id: "st-005", name: "Liam Johnson", classIds: ["class-11d"] },
  { id: "st-006", name: "Emma Wilson", classIds: ["class-8c", "class-11d"] },
  { id: "st-007", name: "Olivia Smith", classIds: ["class-10a"] },
  { id: "st-008", name: "Ethan Davis", classIds: ["class-9b"] },
  { id: "st-009", name: "Aisha Rahman", classIds: ["class-11d"] },
  { id: "st-010", name: "Daniel Kim", classIds: ["class-8c"] },
];

export const classAttendanceHistory = {
  "class-10a": [
    { date: "Apr 13, 2026", title: "Mathematics", present: 36, absent: 4 },
    { date: "Apr 12, 2026", title: "Science", present: 38, absent: 2 },
  ],
  "class-9b": [
    { date: "Apr 13, 2026", title: "Physics", present: 31, absent: 5 },
    { date: "Apr 12, 2026", title: "History", present: 33, absent: 3 },
  ],
  "class-8c": [
    { date: "Apr 12, 2026", title: "English", present: 30, absent: 4 },
    { date: "Apr 11, 2026", title: "Art", present: 32, absent: 2 },
  ],
  "class-11d": [
    { date: "Apr 12, 2026", title: "Chemistry", present: 34, absent: 4 },
    { date: "Apr 11, 2026", title: "Biology", present: 35, absent: 3 },
  ],
};

export function getClassById(classId) {
  return teacherClasses.find((item) => item.id === classId);
}

export function getStudentsByClass(classId) {
  if (!classId) return teacherStudents;
  return teacherStudents.filter((student) =>
    student.classIds.includes(classId),
  );
}

export function getClassHistory(classId) {
  if (!classId) {
    return Object.values(classAttendanceHistory).flat();
  }
  return classAttendanceHistory[classId] || [];
}
