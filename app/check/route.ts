export async function POST(request: Request) {
  console.log(process.env.AGEMO_API_KEY);
  const req = await request.json();

  const requestHeaders: HeadersInit = new Headers();
  if (process.env.AGEMO_API_KEY) {
    requestHeaders.set("x-api-key", process.env.AGEMO_API_KEY);
  }

  const execution_id = req.inputs.execution_id;

  const res = await fetch(
    `https://api.agemo.ai/execution-status?execution_id=${execution_id}`,
    {
      method: "GET",
      headers: requestHeaders,
    }
  );

  const data = await res.json();

  console.log(data);

  return Response.json({ data });
}
