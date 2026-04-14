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
    {
      id: "att-10a-20260413",
      date: "Apr 13, 2026",
      dateISO: "2026-04-13",
      title: "Mathematics",
      present: 36,
      absent: 4,
      timeStarted: "08:00 AM",
      timeEnded: "08:18 AM",
      studentMarks: [
        { studentId: "st-001", status: "Present", timeMarked: "08:03 AM" },
        { studentId: "st-002", status: "Present", timeMarked: "08:04 AM" },
        { studentId: "st-007", status: "Absent", timeMarked: "08:10 AM" },
      ],
    },
    {
      id: "att-10a-20260412",
      date: "Apr 12, 2026",
      dateISO: "2026-04-12",
      title: "Science",
      present: 38,
      absent: 2,
      timeStarted: "08:00 AM",
      timeEnded: "08:16 AM",
      studentMarks: [
        { studentId: "st-001", status: "Present", timeMarked: "08:02 AM" },
        { studentId: "st-002", status: "Present", timeMarked: "08:03 AM" },
        { studentId: "st-007", status: "Present", timeMarked: "08:05 AM" },
      ],
    },
  ],
  "class-9b": [
    {
      id: "att-9b-20260413",
      date: "Apr 13, 2026",
      dateISO: "2026-04-13",
      title: "Physics",
      present: 31,
      absent: 5,
      timeStarted: "09:10 AM",
      timeEnded: "09:28 AM",
      studentMarks: [
        { studentId: "st-002", status: "Present", timeMarked: "09:12 AM" },
        { studentId: "st-003", status: "Absent", timeMarked: "09:17 AM" },
        { studentId: "st-008", status: "Present", timeMarked: "09:14 AM" },
      ],
    },
    {
      id: "att-9b-20260412",
      date: "Apr 12, 2026",
      dateISO: "2026-04-12",
      title: "History",
      present: 33,
      absent: 3,
      timeStarted: "09:10 AM",
      timeEnded: "09:26 AM",
      studentMarks: [
        { studentId: "st-002", status: "Present", timeMarked: "09:11 AM" },
        { studentId: "st-003", status: "Present", timeMarked: "09:13 AM" },
        { studentId: "st-008", status: "Present", timeMarked: "09:14 AM" },
      ],
    },
  ],
  "class-8c": [
    {
      id: "att-8c-20260412",
      date: "Apr 12, 2026",
      dateISO: "2026-04-12",
      title: "English",
      present: 30,
      absent: 4,
      timeStarted: "10:20 AM",
      timeEnded: "10:36 AM",
      studentMarks: [
        { studentId: "st-004", status: "Present", timeMarked: "10:22 AM" },
        { studentId: "st-006", status: "Present", timeMarked: "10:23 AM" },
        { studentId: "st-010", status: "Absent", timeMarked: "10:30 AM" },
      ],
    },
    {
      id: "att-8c-20260411",
      date: "Apr 11, 2026",
      dateISO: "2026-04-11",
      title: "Art",
      present: 32,
      absent: 2,
      timeStarted: "10:20 AM",
      timeEnded: "10:35 AM",
      studentMarks: [
        { studentId: "st-004", status: "Present", timeMarked: "10:21 AM" },
        { studentId: "st-006", status: "Present", timeMarked: "10:22 AM" },
        { studentId: "st-010", status: "Present", timeMarked: "10:24 AM" },
      ],
    },
  ],
  "class-11d": [
    {
      id: "att-11d-20260412",
      date: "Apr 12, 2026",
      dateISO: "2026-04-12",
      title: "Chemistry",
      present: 34,
      absent: 4,
      timeStarted: "11:30 AM",
      timeEnded: "11:46 AM",
      studentMarks: [
        { studentId: "st-005", status: "Absent", timeMarked: "11:40 AM" },
        { studentId: "st-006", status: "Present", timeMarked: "11:34 AM" },
        { studentId: "st-009", status: "Present", timeMarked: "11:33 AM" },
      ],
    },
    {
      id: "att-11d-20260411",
      date: "Apr 11, 2026",
      dateISO: "2026-04-11",
      title: "Biology",
      present: 35,
      absent: 3,
      timeStarted: "11:30 AM",
      timeEnded: "11:44 AM",
      studentMarks: [
        { studentId: "st-005", status: "Present", timeMarked: "11:35 AM" },
        { studentId: "st-006", status: "Present", timeMarked: "11:33 AM" },
        { studentId: "st-009", status: "Present", timeMarked: "11:34 AM" },
      ],
    },
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
    return getAllAttendanceRecords();
  }
  const className = getClassById(classId)?.name || classId;
  return (classAttendanceHistory[classId] || []).map((item) => ({
    ...item,
    classId,
    className,
  }));
}

export function getAllAttendanceRecords() {
  return Object.entries(classAttendanceHistory)
    .flatMap(([classId, records]) => {
      const className = getClassById(classId)?.name || classId;
      return records.map((record) => ({
        ...record,
        classId,
        className,
      }));
    })
    .sort((a, b) => b.dateISO.localeCompare(a.dateISO));
}

export function getAttendanceRecord(classId, attendanceId) {
  const record = (classAttendanceHistory[classId] || []).find(
    (item) => item.id === attendanceId,
  );
  if (!record) return null;

  return {
    ...record,
    classId,
    className: getClassById(classId)?.name || classId,
  };
}

export function getStudentById(studentId) {
  return teacherStudents.find((student) => student.id === studentId) || null;
}
