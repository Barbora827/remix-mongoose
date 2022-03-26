import { useLoaderData, Meta, Links, useCatch, ThrownResponse } from "remix";
import connectDb from "~/db/connectDb.server.js";


export async function loader({ params }) {
  const db = await connectDb();
  const book = await db.models.Book.findById(params.bookId);
  if (!book){
    throw new Response(`Couldn't find a book with id ${params.bookId}`, {status: 404});
  }
  return (book);
}

export default function BookPage() {
  const book = useLoaderData();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <code>
        <pre>{JSON.stringify(book, null, 2)}</pre>
      </code>
    </div>
  );
}

export function ErrorBoundary({ error }) {
  console.error(error);
  return (
      <h1>Error</h1>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}
