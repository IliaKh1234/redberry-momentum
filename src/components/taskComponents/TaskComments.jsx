import { useState, useEffect } from 'react';

export default function TaskComments({ taskId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer 9e685023-d697-49c2-9442-4c707290d2bf`,
            "Content-Type": "application/json",
          },
        });
        
        const data = await res.json();
        setComments(data); 
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [taskId]);
  console.log(comments)
  return (
    <div className='comments-parent'>
      <div className="write-comment">
        <textarea
          value={comment}
          id="writeComment"
          placeholder='დაწერე კომენტარი'
        ></textarea>
        <button className='comment-btn'>დააკომენტარე</button>
      </div>

      <div className='comments'>
        <h1 style={{margin:'30px 0 '}}>კომენტარები <span style={{fontWeight: "500", lineHeight: "100%", padding: "1px 10px", borderRadius: "30px", background: '#8338EC', color: "white", fontSize: '20px'}}>{comments.length}</span></h1>
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment-item">
                <div className='comment-author'>
                    <img id='avatar' className='avatar comment-avatar' src={`${comment.author_avatar}`} alt="" />
                     <label className='comment-author-name' htmlFor="avatar">{comment.author_nickname}</label>
                </div>
                <div className='comment'>
                    <p>{comment.text}</p>
                </div>
            </div>
          ))
        ) : (
          <p>No comments available</p>
        )}
      </div>
    </div>
  );
}
