import { BASE_URL } from "@/lib/database/config";
import ClassIdBody from "../../components/classIdBody";
import { cookies } from "next/headers";
import ClassErrorState from "../../components/classErrorStand";

export default async function Page({ params }) {
  const { id } = await params;
  const request = await fetch(`${BASE_URL}/api/teacher/classes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
  });
  const response = await request.json();
  const { classes, error } = response;

  if (error) {
    return (
      <ClassErrorState
        error={error}
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
  return (
    <div className="space-y-5">
      <ClassIdBody students={students} classId={id} settings={settings} />
    </div>
  );
}
