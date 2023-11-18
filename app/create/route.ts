export async function POST(request: Request) {
  const requestHeaders: HeadersInit = new Headers();
  if (process.env.AGEMO_API_KEY) {
    requestHeaders.set("x-api-key", process.env.AGEMO_API_KEY);
    requestHeaders.set("Content-Type", "application/json");
  }

  console.log(process.env.AGEMO_API_KEY);
  const req = await request.json();
  console.log(req.inputs.book_title);

  const bookTitle = req.inputs.book_title;

  const res = await fetch("https://api.agemo.ai/execute", {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify({
      app_id: "cloh97ecd0001l408hf6i0yqp",
      inputs: {
        book_title: bookTitle,
      },
    }),
  });

  const data = await res.json();

  console.log(data);

  return Response.json({ data });
}
