export const studentClasses = [
  {
    id: "csc-101",
    name: "CSC 101",
    teacherName: "Dr. Ahmed",
    attendance: 96,
    status: "Good",
    totalClasses: 24,
    attendedClasses: 23,
    missedClasses: 1,
  },
  {
    id: "mth-102",
    name: "MTH 102",
    teacherName: "Prof. Grace",
    attendance: 74,
    status: "Warning",
    totalClasses: 24,
    attendedClasses: 18,
    missedClasses: 6,
  },
  {
    id: "eng-110",
    name: "ENG 110",
    teacherName: "Ms. Rivera",
    attendance: 88,
    status: "Good",
    totalClasses: 24,
    attendedClasses: 21,
    missedClasses: 3,
  },
  {
    id: "gst-120",
    name: "GST 120",
    teacherName: "Mr. Lewis",
    attendance: 64,
    status: "Critical",
    totalClasses: 24,
    attendedClasses: 15,
    missedClasses: 9,
  },
];

export const studentAttendanceTrend = [
  { name: "Week 1", attendance: 82 },
  { name: "Week 2", attendance: 84 },
  { name: "Week 3", attendance: 81 },
  { name: "Week 4", attendance: 87 },
  { name: "Week 5", attendance: 89 },
  { name: "Week 6", attendance: 91 },
];

export const studentAttendanceByClass = studentClasses.map((item) => ({
  name: item.name,
  attendance: item.attendance,
}));

export const studentClassTrends = {
  "csc-101": [
    { name: "Week 1", attendance: 88 },
    { name: "Week 2", attendance: 90 },
    { name: "Week 3", attendance: 92 },
    { name: "Week 4", attendance: 93 },
    { name: "Week 5", attendance: 95 },
  ],
  "mth-102": [
    { name: "Week 1", attendance: 68 },
    { name: "Week 2", attendance: 70 },
    { name: "Week 3", attendance: 72 },
    { name: "Week 4", attendance: 73 },
    { name: "Week 5", attendance: 74 },
  ],
  "eng-110": [
    { name: "Week 1", attendance: 84 },
    { name: "Week 2", attendance: 85 },
    { name: "Week 3", attendance: 86 },
    { name: "Week 4", attendance: 87 },
    { name: "Week 5", attendance: 88 },
  ],
  "gst-120": [
    { name: "Week 1", attendance: 60 },
    { name: "Week 2", attendance: 61 },
    { name: "Week 3", attendance: 63 },
    { name: "Week 4", attendance: 64 },
    { name: "Week 5", attendance: 64 },
  ],
};

export const studentInsights = [
  "You are doing well in CSC 101.",
  "Attendance is low in MTH 102. Try to improve next week.",
  "ENG 110 is trending upward compared with last month.",
  "GST 120 needs attention to avoid a critical attendance drop.",
];

export const studentAttendanceRecords = [
  {
    id: "att-001",
    classId: "csc-101",
    className: "CSC 101",
    date: "Apr 12, 2026",
    dateISO: "2026-04-12",
    status: "Present",
    timeMarked: "08:12 AM",
  },
  {
    id: "att-002",
    classId: "mth-102",
    className: "MTH 102",
    date: "Apr 12, 2026",
    dateISO: "2026-04-12",
    status: "Absent",
    timeMarked: "-",
  },
  {
    id: "att-003",
    classId: "eng-110",
    className: "ENG 110",
    date: "Apr 11, 2026",
    dateISO: "2026-04-11",
    status: "Present",
    timeMarked: "10:05 AM",
  },
  {
    id: "att-004",
    classId: "gst-120",
    className: "GST 120",
    date: "Apr 10, 2026",
    dateISO: "2026-04-10",
    status: "Absent",
    timeMarked: "-",
  },
  {
    id: "att-005",
    classId: "csc-101",
    className: "CSC 101",
    date: "Apr 09, 2026",
    dateISO: "2026-04-09",
    status: "Present",
    timeMarked: "08:10 AM",
  },
];

export const studentClassAttendanceHistory = {
  "csc-101": [
    {
      id: "csc-101-1",
      date: "Apr 12, 2026",
      status: "Present",
      timeMarked: "08:12 AM",
    },
    {
      id: "csc-101-2",
      date: "Apr 10, 2026",
      status: "Present",
      timeMarked: "08:10 AM",
    },
    {
      id: "csc-101-3",
      date: "Apr 08, 2026",
      status: "Present",
      timeMarked: "08:11 AM",
    },
  ],
  "mth-102": [
    {
      id: "mth-102-1",
      date: "Apr 12, 2026",
      status: "Absent",
      timeMarked: "-",
    },
    {
      id: "mth-102-2",
      date: "Apr 10, 2026",
      status: "Present",
      timeMarked: "09:05 AM",
    },
    {
      id: "mth-102-3",
      date: "Apr 08, 2026",
      status: "Present",
      timeMarked: "09:03 AM",
    },
  ],
  "eng-110": [
    {
      id: "eng-110-1",
      date: "Apr 11, 2026",
      status: "Present",
      timeMarked: "10:05 AM",
    },
    {
      id: "eng-110-2",
      date: "Apr 09, 2026",
      status: "Present",
      timeMarked: "10:06 AM",
    },
    {
      id: "eng-110-3",
      date: "Apr 07, 2026",
      status: "Absent",
      timeMarked: "-",
    },
  ],
  "gst-120": [
    {
      id: "gst-120-1",
      date: "Apr 10, 2026",
      status: "Absent",
      timeMarked: "-",
    },
    {
      id: "gst-120-2",
      date: "Apr 08, 2026",
      status: "Present",
      timeMarked: "11:02 AM",
    },
    {
      id: "gst-120-3",
      date: "Apr 06, 2026",
      status: "Absent",
      timeMarked: "-",
    },
  ],
};

export function getStudentClassById(id) {
  return studentClasses.find((item) => item.id === id) || null;
}

export function getStudentAttendanceForClass(classId) {
  return studentAttendanceRecords.filter(
    (record) => record.classId === classId,
  );
}

export function getStudentAttendanceByFilter(classId, dateISO) {
  return studentAttendanceRecords.filter((record) => {
    const matchesClass = !classId || record.classId === classId;
    const matchesDate = !dateISO || record.dateISO === dateISO;
    return matchesClass && matchesDate;
  });
}

export function getStudentClassTrend(classId) {
  return studentClassTrends[classId] || [];
}

export function getStudentClassHistory(classId) {
  return studentClassAttendanceHistory[classId] || [];
}
