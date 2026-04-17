export default async function PUT(req) {
  const { role, userId } = await req.json();

  return NextResponse.json(
    { message: `User role updated to ${role}` },
    {
      status: 200,
    },
  );
}
