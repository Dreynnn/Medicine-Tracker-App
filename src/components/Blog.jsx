import {useState} from 'react';
import './Blog.css';

const blogPosts = [
  {
    id: 1,
    title: 'The Importance of Regular Health Check-Ups',
    date: 'June 15, 2024',
    author: 'Dr. John Smith',
    excerpt: 'Regular health check-ups are crucial for maintaining good health and early detection of potential health issues...',
    content: 'Regular health check-ups are crucial for maintaining good health and early detection of potential health issues. By visiting your doctor regularly, you can ensure that you stay on top of your health and address any concerns early on.'
  },
  {
    id: 2,
    title: 'Tips for a Healthy Diet',
    date: 'June 10, 2024',
    author: 'Dr. Jane Doe',
    excerpt: 'A healthy diet is essential for overall well-being. Here are some tips to help you eat healthier...',
    content: 'A healthy diet is essential for overall well-being. Here are some tips to help you eat healthier: eat a variety of foods, including fruits, vegetables, lean proteins, and whole grains; limit your intake of processed foods and sugars; and stay hydrated by drinking plenty of water.'
  },
  {
    id: 3,
    title: 'Understanding Mental Health',
    date: 'June 5, 2024',
    author: 'Dr. Emily White',
    excerpt: 'Mental health is just as important as physical health. It’s important to understand the signs and seek help when needed...',
    content: 'Mental health is just as important as physical health. It’s important to understand the signs and seek help when needed. If you or someone you know is struggling with mental health issues, don’t hesitate to reach out to a healthcare professional for support and guidance.'
  },
];

const Blog = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleReadMore = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="blog-container">
      <h1>Latest Blog Posts</h1>
      {blogPosts.map(post => (
        <div key={post.id} className="blog-post">
          <h2>{post.title}</h2>
          <p className="blog-meta">
            <span>{post.date}</span> | <span>by {post.author}</span>
          </p>
          <p>{post.excerpt}</p>
          <button onClick={() => handleReadMore(post)}>Read More</button>
        </div>
      ))}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.content}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;