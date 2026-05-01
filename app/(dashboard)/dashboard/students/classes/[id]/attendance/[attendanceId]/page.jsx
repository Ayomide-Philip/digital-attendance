export default async function Page({ params }) {
  const { id, attendanceId } = await params;
  return (
    <>
      <h1>
        Attendance Details for Class ID: {id} and Attendance ID: {attendanceId}
      </h1>
    </>
  );
}
