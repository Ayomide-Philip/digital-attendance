export default async function Page({ params }) {
  return (
    <>
      <h1>Attendance{await params.attendanceId} </h1>
    </>
  );
}
