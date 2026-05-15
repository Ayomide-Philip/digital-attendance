import StudentList from "./StudentList";

export default function StudentsTab({ students, classId }) {
  return (
    <div className="space-y-4">
      <StudentList students={students} classId={classId} />
    </div>
  );
}
