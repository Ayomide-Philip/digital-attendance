import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import StudentList from "./StudentList";

export default function StudentsTab({ students, classId }) {
  return (
    <div className="space-y-4">
      <StudentList students={students} classId={classId} />
    </div>
  );
}
