import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import StudentList from "./StudentList";

export default function StudentsTab({ students, classId }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button className="h-10 rounded-xl px-4">
          <Plus className="size-4" />
          Add Student
        </Button>
        <Button variant="outline" className="h-10 rounded-xl px-4">
          <Upload className="size-4" />
          Import Students
        </Button>
      </div>

      <StudentList students={students} classId={classId} />
    </div>
  );
}
