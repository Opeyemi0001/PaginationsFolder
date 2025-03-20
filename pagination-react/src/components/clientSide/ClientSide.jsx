import { useEffect, useState } from 'react';


function ClientSide() {
  const [posts, setPosts] = useState([]);
  const [loading, setloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setloading(true);
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        setPosts(data);
        setloading(false);
        
      } catch (error) {
        console.log(error);

      }
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className='container'>
      <h1>Blog Posts</h1>
      {loading ? <p>loading </p> : <PostList posts={currentPosts} />}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage} />
    </div>
  );
};

const PostList = ({ posts }) => {
  return (
    <ul className='list-group'>
      {posts.map((post) => (
        <li key={post.id} className='list-group-item'>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  )
}

const Pagination = ({
  postsPerPage,
  totalPosts,
  setCurrentPage,
  currentPage
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber, e) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
            <button onClick={(e) => paginate(number, e)} className='page-link'>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}



export default ClientSide
