import { useState, useEffect } from 'react';
import Left from "../../images/Left.png";

export default function TaskComments({ taskId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [repliedTo, setRepliedTo] = useState(null); 
  const [replyText, setReplyText] = useState(""); 

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

  const handleReply = (commentId) => {
    const commentToReplyTo = comments.find((comment) => comment.id === commentId);


    if (commentToReplyTo && (!commentToReplyTo.sub_comments || commentToReplyTo.sub_comments.length === 0)) {
      setRepliedTo(commentId);
    } else {
      alert('You can only reply to a comment with no subcomments.');
    }
  };

  const postComment = async () => {
    if (!comment.trim()) {
      alert('Please enter a comment');
      return;
    }

    try {
      const res = await fetch(`https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer 9e685023-d697-49c2-9442-4c707290d2bf`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: comment,
        }),
      });

      const newComment = await res.json();
      if (newComment) {
        setComments((prevComments) => [...prevComments, newComment]);
        setComment("");
      } else {
        alert("Failed to add comment.");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("There was an error posting your comment.");
    }
  };

  const postReply = async (commentId) => {
    if (!replyText.trim()) {
      alert('Please enter a reply');
      return;
    }

    try {
      const res = await fetch(`https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer 9e685023-d697-49c2-9442-4c707290d2bf`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: replyText,
          parent_id: commentId, 
        }),
      });

      const newReply = await res.json();
      if (newReply) {
        setComments((prevComments) => {
          return prevComments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                sub_comments: comment.sub_comments ? [...comment.sub_comments, newReply] : [newReply],
              };
            }
            return comment;
          });
        });
        setReplyText(""); 
        setRepliedTo(null); 
      } else {
        alert("Failed to post reply.");
      }
    } catch (error) {
      console.error("Error posting reply:", error);
      alert("There was an error posting your reply.");
    }
  };

  return (
    <div className='comments-parent'>
      <div className="write-comment">
        <textarea
          id="writeComment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='დაწერე კომენტარი'
        ></textarea>
        <button onClick={postComment} className='comment-btn'>დააკომენტარე</button>
      </div>

      <h1 style={{ margin: '30px 0 30px 47px' }}>
        კომენტარები <span style={{ fontWeight: "500", lineHeight: "100%", padding: "1px 10px", borderRadius: "30px", background: '#8338EC', color: "white", fontSize: '20px' }}>
          {comments.length}
        </span>
      </h1>

      <div className='comments'>
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
              <div className='reply-comment'>
                {(!comment.sub_comments || comment.sub_comments.length === 0) && (
                  <button onClick={() => handleReply(comment.id)}><img src={`${Left}`} alt="" /> უპასუხე</button>
                )}
                {repliedTo === comment.id && (
                  <div style={{position: "relative"}}>
                    <textarea
                    id='writeComment'
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder='უპასუხე'
                  ></textarea>
                    <button className='reply-button' onClick={() => postReply(comment.id)}>Submit Reply</button>
                  </div>
                )}
              </div>
              {comment.sub_comments && comment.sub_comments.length > 0 && (
                <div className="nested-replies">
                  {comment.sub_comments.map((reply, idx) => (
                    <div key={idx} className="comment-item nested-reply">
                      <div className='comment-author'>
                        <img id='avatar' className='avatar comment-avatar' src={`${reply.author_avatar}`} alt="" />
                        <label className='comment-author-name' htmlFor="avatar">{reply.author_nickname}</label>
                      </div>
                      <div className='comment'>
                        <p>{reply.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No comments available</p>
        )}
      </div>
    </div>
  );
}
