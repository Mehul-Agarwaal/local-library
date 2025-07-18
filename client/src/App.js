import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// --- Page Components ---

const Home = () => <MainContent />;

// AllBooks component now fetches and displays data
const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('/catalog/books') // The proxy will redirect this to http://localhost:3000/catalog/books
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBooks(data.book_list);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h1 className="text-3xl font-bold text-cyan-300 mb-6" style={{textShadow: '0 0 10px rgba(56, 189, 248, 0.4)'}}>
        Book List
      </h1>
      {loading && <p className="text-gray-400">Loading books...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <ul className="space-y-3">
          {books.map(book => (
            <li key={book._id} className="flex items-baseline">
               <span className="text-cyan-400 mr-3">●</span>
               <div>
                <Link to={book.url} className="font-semibold text-gray-200 hover:text-cyan-300 transition-colors duration-200">{book.title}</Link>
                <span className="ml-2 text-gray-500">({book.author.first_name} {book.author.last_name})</span>
               </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AllAuthors = () => <h1 className="text-3xl font-bold text-cyan-300">All Authors Page</h1>;
const AllGenres = () => <h1 className="text-3xl font-bold text-cyan-300">All Genres Page</h1>;
const AllBookInstances = () => <h1 className="text-3xl font-bold text-cyan-300">All Book Instances Page</h1>;
const CreateAuthor = () => <h1 className="text-3xl font-bold text-pink-500">Create New Author Page</h1>;
const CreateGenre = () => <h1 className="text-3xl font-bold text-pink-500">Create New Genre Page</h1>;
const CreateBook = () => <h1 className="text-3xl font-bold text-pink-500">Create New Book Page</h1>;
const CreateBookInstance = () => <h1 className="text-3xl font-bold text-pink-500">Create New Book Instance Page</h1>;


// Main App Component
export default function App() {
  return (
    <Router>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-gray-300 font-sans">
        <Sidebar />
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<AllBooks />} />
            <Route path="/authors" element={<AllAuthors />} />
            <Route path="/genres" element={<AllGenres />} />
            <Route path="/bookinstances" element={<AllBookInstances />} />
            <Route path="/author/create" element={<CreateAuthor />} />
            <Route path="/genre/create" element={<CreateGenre />} />
            <Route path="/book/create" element={<CreateBook />} />
            <Route path="/bookinstance/create" element={<CreateBookInstance />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Sidebar Component
const Sidebar = () => {
  const mainLinks = [
    { text: 'Home', path: '/' },
    { text: 'All books', path: '/books' },
    { text: 'All authors', path: '/authors' },
    { text: 'All genres', path: '/genres' },
    { text: 'All book-instances', path: '/bookinstances' },
  ];
  const createLinks = [
    { text: 'Create new author', path: '/author/create' },
    { text: 'Create new genre', path: '/genre/create' },
    { text: 'Create new book', path: '/book/create' },
    { text: 'Create new book instance', path: '/bookinstance/create' },
  ];

  const NavLink = ({ to, children }) => (
    <li>
      <Link
        to={to}
        className="block px-4 py-2.5 text-sm text-gray-400 rounded-lg transition-all duration-200 hover:bg-cyan-500/10 hover:text-cyan-300 hover:pl-6"
      >
        {children}
      </Link>
    </li>
  );

  return (
    <aside className="w-full md:w-64 bg-black/30 backdrop-blur-lg border-r border-gray-700/60 flex-shrink-0">
      <div className="p-6 border-b border-gray-800">
        <h1 
          className="text-xl font-bold text-cyan-400 tracking-wider"
          style={{textShadow: '0 0 8px rgba(56, 189, 248, 0.5)'}}
        >
          Local Library
        </h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-1">
          {mainLinks.map(link => <NavLink key={link.text} to={link.path}>{link.text}</NavLink>)}
        </ul>
        <hr className="my-4 border-t border-gray-800" />
        <ul className="space-y-1">
          {createLinks.map(link => <NavLink key={link.text} to={link.path}>{link.text}</NavLink>)}
        </ul>
      </nav>
    </aside>
  );
};

// MainContent Component (The Homepage)
const MainContent = () => {
  const stats = [
    { label: 'Books', value: 6 },
    { label: 'Copies', value: 10 },
    { label: 'Copies available', value: 4 },
    { label: 'Authors', value: 4 },
    { label: 'Genres', value: 3 },
  ];

  const StatItem = ({ label, value }) => (
    <li className="flex items-baseline">
      <span className="text-cyan-400 mr-3" style={{textShadow: '0 0 5px rgba(56, 189, 248, 0.7)'}}>●</span>
      <div>
        <span className="font-semibold text-gray-200">{label}:</span>
        <span className="ml-2 text-gray-400">{value}</span>
      </div>
    </li>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <header>
        <h2 
          className="text-3xl md:text-4xl font-bold text-cyan-300"
          style={{textShadow: '0 0 10px rgba(56, 189, 248, 0.4)'}}
        >
          Local Library Home
        </h2>
        <p className="mt-3 text-base md:text-lg text-gray-400">
          Welcome to{' '}
          <a href="#" className="font-medium text-cyan-400 hover:underline hover:text-cyan-300">
            LocalLibrary
          </a>
          , a very basic Express website developed as a tutorial example.
        </p>
      </header>
      <section className="mt-10">
        <h3 
          className="text-2xl md:text-3xl font-semibold text-pink-500"
          style={{textShadow: '0 0 8px rgba(219, 39, 119, 0.4)'}}
        >
          Dynamic content
        </h3>
        <p className="mt-2 text-gray-400">
          The library has the following record counts.
        </p>
        <div className="mt-6 bg-gray-800/50 border border-gray-700/60 rounded-lg shadow-lg p-6 shadow-cyan-500/5">
          <ul className="space-y-4">
            {stats.map(stat => (
              <StatItem key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
