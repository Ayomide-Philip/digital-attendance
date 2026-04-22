import ClassIdBody from "../../components/classIdBody";
import ClassErrorState from "../../components/classErrorStand";
import { cookies } from "next/headers";
import { BASE_URL } from "@/lib/database/config";

export default async function Page({ params }) {
  const { id } = await params;

  if (!id || id === "undefined" || id === "null") {
    return (
      <ClassErrorState
        error="Invalid class id in URL"
        retryHref="/dashboard/teachers/classes"
      />
    );
  }

  const request = await fetch(`${BASE_URL}/api/teacher/classes/${id}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
  });
  const response = await request.json();
  const { classes, error } = response;

  if (!request.ok || error || !classes) {
    return (
      <ClassErrorState
        error={error || "Class not found or you do not have access to it"}
        retryHref={`/dashboard/teachers/classes/${id}`}
      />
    );
  }
  const students = classes?.students || [];
  const settings = {
    rules: classes?.rules || { emailSuffix: "", departmentCode: [] },
    school: classes?.school || "",
    createdAt: classes?.createdAt || "",
    updatedAt: classes?.updatedAt || "",
  };
  const overview = {
    title: classes?.name || "",
    code: classes?.code || "",
    teacher: classes?.teacher || null,
    school: classes?.school || "",
    createdAt: classes?.createdAt || "",
    students: students || [],
    description: classes?.description || "",
  };
  return (
    <div className="space-y-5">
      <ClassIdBody
        students={students}
        classId={id}
        settings={settings}
        overview={overview}
      />
    </div>
  );
}
