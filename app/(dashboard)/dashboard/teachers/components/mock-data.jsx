export const teacherClasses = [
  {
    id: "class-10a",
    name: "Class 10-A",
    studentsCount: 40,
    lastAttendanceDate: "Apr 13, 2026",
    todaysSession: "08:00 AM - Mathematics",
    attendanceRate: 93,
  },
  {
    id: "class-9b",
    name: "Class 9-B",
    studentsCount: 36,
    lastAttendanceDate: "Apr 13, 2026",
    todaysSession: "09:10 AM - Physics",
    attendanceRate: 88,
  },
  {
    id: "class-8c",
    name: "Class 8-C",
    studentsCount: 34,
    lastAttendanceDate: "Apr 12, 2026",
    todaysSession: "10:20 AM - English",
    attendanceRate: 85,
  },
  {
    id: "class-11d",
    name: "Class 11-D",
    studentsCount: 38,
    lastAttendanceDate: "Apr 12, 2026",
    todaysSession: "11:30 AM - Chemistry",
    attendanceRate: 91,
  },
];

export const teacherStudents = [
  {
    id: "st-001",
    name: "Aarav Kumar",
    matricId: "MAT-1001",
    classIds: ["class-10a"],
    overallAttendance: 96,
  },
  {
    id: "st-002",
    name: "Mia Chen",
    matricId: "MAT-1002",
    classIds: ["class-10a", "class-9b"],
    overallAttendance: 91,
  },
  {
    id: "st-003",
    name: "Noah Patel",
    matricId: "MAT-1003",
    classIds: ["class-9b"],
    overallAttendance: 84,
  },
  {
    id: "st-004",
    name: "Sophia Ali",
    matricId: "MAT-1004",
    classIds: ["class-8c"],
    overallAttendance: 78,
  },
  {
    id: "st-005",
    name: "Liam Johnson",
    matricId: "MAT-1005",
    classIds: ["class-11d"],
    overallAttendance: 67,
  },
  {
    id: "st-006",
    name: "Emma Wilson",
    matricId: "MAT-1006",
    classIds: ["class-8c", "class-11d"],
    overallAttendance: 73,
  },
  {
    id: "st-007",
    name: "Olivia Smith",
    matricId: "MAT-1007",
    classIds: ["class-10a"],
    overallAttendance: 95,
  },
  {
    id: "st-008",
    name: "Ethan Davis",
    matricId: "MAT-1008",
    classIds: ["class-9b"],
    overallAttendance: 88,
  },
  {
    id: "st-009",
    name: "Aisha Rahman",
    matricId: "MAT-1009",
    classIds: ["class-11d"],
    overallAttendance: 92,
  },
  {
    id: "st-010",
    name: "Daniel Kim",
    matricId: "MAT-1010",
    classIds: ["class-8c"],
    overallAttendance: 81,
  },
];

export const dashboardAttendanceTrend = [
  { name: "Mon", attendance: 84 },
  { name: "Tue", attendance: 86 },
  { name: "Wed", attendance: 88 },
  { name: "Thu", attendance: 90 },
  { name: "Fri", attendance: 89 },
  { name: "Sat", attendance: 92 },
  { name: "Sun", attendance: 94 },
];

export const attendancePerClassData = teacherClasses.map((item) => ({
  name: item.name,
  attendance: item.attendanceRate,
}));

export const reportPieData = [
  { name: "Present", value: 348 },
  { name: "Absent", value: 42 },
];

export function getStudentStatus(attendancePercentage) {
  if (attendancePercentage >= 85) return "Good";
  if (attendancePercentage >= 70) return "Low";
  return "Critical";
}

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

export function getAllStudents() {
  return teacherStudents;
}

export function getClassHistory(classId) {
  if (!classId) {
    return Object.values(classAttendanceHistory).flat();
  }
  return classAttendanceHistory[classId] || [];
}
