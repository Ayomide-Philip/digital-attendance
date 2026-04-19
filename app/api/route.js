import { NextResponse } from "next/server";
export async function GET(request) {
  const classes = [
    {
      _id: "69e4b5ecebcf1bfe5ae8ef07",
      name: "Advance Algebra",
      code: "mth205",
      description: "Introduction to advance algebra",
      teacher: "69e4afa455516dc69b4ecdf1",
      students: ["69e4afea55516dc69b4ecdf2"],
      rules: {
        emailSuffix: "",
        departmentCode: [],
        _id: "69e4b5ecebcf1bfe5ae8ef08",
      },
      school: "obafemi awolowo university",
      createdAt: "2026-04-19T11:01:00.618Z",
      updatedAt: "2026-04-19T11:36:04.387Z",
      __v: 0,
    },
    {
      _id: "69e4b76eebcf1bfe5ae8ef09",
      name: "Introductory to computing science",
      code: "csc201",
      description:
        "Introductory to computing science which talks about input device, output device and an introduction to python.",
      teacher: "69e4afa455516dc69b4ecdf1",
      students: ["69e4afea55516dc69b4ecdf2"],
      rules: {
        emailSuffix: "@student.oauife.edu.ng",
        departmentCode: ["mth", "csc", "cyb", "cse"],
        _id: "69e4b76eebcf1bfe5ae8ef0a",
      },
      school: "obafemi awolowo university",
      createdAt: "2026-04-19T11:07:26.324Z",
      updatedAt: "2026-04-19T11:32:32.416Z",
      __v: 0,
    },
  ];

  function getTotalStudent(classes) {
    if (!Array.isArray(classes)) {
      return 0;
    }
    const student = [];
    classes.forEach((item) => {
      student.push(...item.students);
    });
    const uniqueStudent = new Set(student);
    return uniqueStudent.size;
  }

  return NextResponse.json({
    message: "Hello from the API route!",
    totalStudents: getTotalStudent(classes),
  });
}
