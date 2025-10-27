// client/src/pages/Posts.jsx
import { useState, useEffect } from 'react';
import useApi from '../hooks/useApi';
import { postService } from '../services/api';
import PostList from '../components/Post/PostList';
import Paginate from '../components/Common/Paginate';
import Loader from '../components/Common/Loader';
import Message from '../components/Common/Message';

const Posts = () => {
  const [page, setPage] = useState(1);
  const { data, error, loading, request } = useApi(postService.getAllPosts);

  useEffect(() => {
    request(page, 10);
  }, [page]);

  return (
    <div>
      <h1>Blog Posts</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {data && (
        <>
          <PostList posts={data.posts} />
          <Paginate
            totalPages={data.totalPages}
            currentPage={data.currentPage}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default Posts;