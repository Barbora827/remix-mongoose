import { useLoaderData, Link } from "remix";
import connectDb from "~/db/connectDb.server.js";

export async function loader() {
  const db = await connectDb();
  const books = await db.models.Book.find();
  return books;
}

export default function Index() {
  const books = useLoaderData();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Remix + Mongoose</h1>
      <h2 className="text-lg font-bold mb-3">
        Here are a few of my favorite books:
      </h2>
      <ul className="ml-5 list-disc">
      {books.map((book) => {
          return (
          <li key={book._id} className="mb-5">
            <Link to={`/books/${book._id}`} className="title"><b>{book.title}</b>
            </Link>
            <p>{book.author}</p>
            <p>{book.price} DKK</p>
            <p>{book.rating}</p>
          </li>);
        })}
      </ul>
    </div>
  );
}
