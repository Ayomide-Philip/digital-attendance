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
