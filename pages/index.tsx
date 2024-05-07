import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useEffect, useState } from "react";

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [books, setBooks] = useState<any[]>([]);

  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [updatedBookData, setUpdatedBookData] = useState({
    title: "",
    author: "",
    genre: "",
    numPages: ""
  });


  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    numPages: ""
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("New book added:", data);
        setBooks([...books, data]);
        setFormData({ title: "", author: "", genre: "", numPages: "" });
        fetchBooks();
      } else {
        console.error("Failed to add book");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this book?');
    if (!isConfirmed) {
      return; // Do nothing if the user cancels
    }

    try {
      const response = await fetch(`/api/list?id=${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        console.log("Book deleted successfully");
        fetchBooks();
      } else {
        console.error("Failed to delete book");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = (id: string) => {
    setEditingBookId(id);
    // Retrieve the book data corresponding to the id and set it in updatedBookData state
    const bookToUpdate = books.find(book => book._id === id);
    if (bookToUpdate) {
      setUpdatedBookData({
        title: bookToUpdate.title,
        author: bookToUpdate.author,
        genre: bookToUpdate.genre,
        numPages: bookToUpdate.numPages
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedBookData({
      ...updatedBookData,
      [name]: value
    });
  };

  const handleSave = async (id: string) => {
    try {
      const response = await fetch(`/api/list?id=${id}`, {
        method: "PUT", // or "PATCH" depending on your API
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedBookData)
      });

      if (response.ok) {
        console.log("Book updated successfully");
        fetchBooks();
        setEditingBookId(null); // Reset editing mode
      } else {
        console.error("Failed to update book");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    setEditingBookId(null); // Exit editing mode
    // Reset updatedBookData to original book data
    const originalBookData = books.find(book => book._id === editingBookId);
    if (originalBookData) {
      setUpdatedBookData({
        title: originalBookData.title,
        author: originalBookData.author,
        genre: originalBookData.genre,
        numPages: originalBookData.numPages
      });
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/list");
      const booksData = await response.json();
      setBooks(booksData);
      console.log(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Bookstore cloud project
        </h1>
        <h2>
          DINU Alexandru Cristian 1131
        </h2>
        <h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Book Title"
              required
              pattern=".{3,}" // Minimum 3 characters
              title="Please enter at least 3 characters"
              style={{ marginRight: '0.5rem' }}
            />
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Book Author"
              required
              pattern=".{3,}" // Minimum 3 characters
              title="Please enter at least 3 characters"
              style={{ marginRight: '0.5rem' }}
            />
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Book Genre"
              required
              pattern=".{3,}" // Minimum 3 characters
              title="Please enter at least 3 characters"
              style={{ marginRight: '0.5rem' }}
            />
            <input
              type="number"
              name="numPages"
              value={formData.numPages}
              onChange={handleChange}
              placeholder="Number of pages"
              required
              min="1" // Minimum value
              title="Please enter a valid number"
              style={{ marginRight: '0.5rem' }}
            />
            <button type="submit">Add to bookstore.</button>
          </form>


        </h1>
        <div className="grid">
          {books.map((book) => (
            <div className="card" key={book._id}>
              {editingBookId === book._id ? (
                <form onSubmit={() => handleSave(book._id)}>
                  <input
                    type="text"
                    name="title"
                    value={updatedBookData.title}
                    onChange={handleInputChange}
                    placeholder="Book Title"
                    required
                    pattern=".{3,}" // Minimum 3 characters
                    title="Please enter at least 3 characters"
                  />
                  <input
                    type="text"
                    name="author"
                    value={updatedBookData.author}
                    onChange={handleInputChange}
                    placeholder="Book Author"
                    required
                    pattern=".{3,}" // Minimum 3 characters
                    title="Please enter at least 3 characters"
                  />
                  <input
                    type="text"
                    name="genre"
                    value={updatedBookData.genre}
                    onChange={handleInputChange}
                    placeholder="Book Genre"
                    required
                    pattern=".{3,}" // Minimum 3 characters
                    title="Please enter at least 3 characters"
                  />
                  <input
                    type="number"
                    name="numPages"
                    value={updatedBookData.numPages}
                    onChange={handleInputChange}
                    placeholder="Number of pages"
                    required
                    min="1" // Minimum value
                    title="Please enter a valid number"
                  />
                  <button style={{ marginRight: '0.5rem' }} type="submit">Save</button>
                  <button type="button" onClick={handleCancel}>Cancel</button>
                </form>
              ) : (
                <>
                  <h2>{book.title}</h2>
                  <p>{book.author}</p>
                  <p>{book.genre}</p>
                  <p>{book.numPages}</p>
                  <button style={{ marginRight: '0.5rem' }} onClick={() => handleUpdate(book._id)}>Update</button>
                  <button onClick={() => handleDelete(book._id)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>


      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
  .container {
    min-height: 100vh;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  main {
    padding: 2rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  footer {
    width: 100%;
    height: 100px;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  footer img {
    margin-left: 0.5rem;
  }

  a {
    color: #333;
    text-decoration: none;
  }

  .title {
    margin: 0;
    line-height: 1.15;
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    max-width: 1200px;
    margin-top: 2rem;
  }

  .card {
    padding: 1.5rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    transition: transform 0.2s ease, box-shadow 0.3s ease; /* Added box-shadow transition */
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Added box-shadow effect on hover */
  }

  .card h2 {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .card p {
    margin: 0;
    font-size: 1.2rem;
    color: #555;
  }

  .card button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .card button:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
      `}</style>

      <style jsx global>{`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background-color: #f7f7f7;
    color: #333;
  }

  * {
    box-sizing: border-box;
  }

  button:focus {
    outline: none;
  }
      `}</style>
    </div>
  );
}
