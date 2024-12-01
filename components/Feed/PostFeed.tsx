// import { useEffect, useState } from "react";
// import CommentFeed from "./CommentFeed";
// import useWebSocket from "../../hooks/useWebSocket";
// import axios from "axios";
// import { storeTokens } from "@/app/utils/authHelpers";

// interface Post {
//     id: number;
//     message: string;
//     media_url?: string; // URL for optional media (image/video)
//     created_at: string; // Timestamp for sorting
// }

// interface WebSocketMessage {
//     type: string;
//     content: string;
//     media?: string;
//     access_token: string;
// }

// const PostFeed: React.FC = () => {
//     const { messages, sendMessage } = useWebSocket<WebSocketMessage>("ws://localhost:8001/ws/posts/"); // Replace with your WebSocket URL
//     const [posts, setPosts] = useState<Post[]>([]);
//     const [message, setMessage] = useState<string>(""); // For the message in the textarea
//     const [file, setFile] = useState<File | null>(null); // For the selected file

//     useEffect(() => {
//         // When a new message is received, update the posts state
//         if (messages.length > 0) {
//             const newMessage = messages[messages.length - 1] as unknown as Post;
//             console.log("New post received:", newMessage);
//             if (newMessage.id) {
//                 setPosts((prevPosts) => {
//                     if (!prevPosts.some((post) => post.id === newMessage.id)) {
//                         return [newMessage, ...prevPosts]; // Add new posts to the top
//                     }
//                     return prevPosts;
//                 });
//             }
//         }
//     }, [messages]);

//     // Function to refresh the access token
//     const refreshAccessToken = async (): Promise<string | null> => {
//         try {
//             const refreshToken = localStorage.getItem("refreshToken");
//             if (!refreshToken) {
//                 alert("You must be logged in to perform this action.");
//                 return null;
//             }

//             const response = await axios.post("http://localhost:8001/token/refresh/", {
//                 refresh: refreshToken,
//             });

//             const newAccessToken = response.data.access;
//             const newRefreshToken = response.data.refresh;
//             storeTokens(newAccessToken, newRefreshToken);
//             console.log("Access token refreshed.");
//             return newAccessToken;
//         } catch (error) {
//             console.error("Failed to refresh access token:", error);
//             alert("Session expired. Please log in again.");
//             localStorage.removeItem("accessToken");
//             localStorage.removeItem("refreshToken");
//             return null;
//         }
//     };

//     // Function to send the post message with FormData
//     const sendPostMessage = async (formData: FormData, accessToken: string) => {
//         sendMessage({
//             type: "new_post",
//             content: formData.get("message") as string,
//             media: formData.get("media") as File,
//             access_token: accessToken,
//         });
//     };

//     const handlePostSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (message.trim() === "") {
//             alert("Message cannot be empty.");
//             return;
//         }

//         // Refresh the access token before sending the post
//         const accessToken = await refreshAccessToken();
//         if (!accessToken) {
//             return;
//         }

//         // Create FormData to send the message and optional media
//         const formData = new FormData();
//         formData.append("message", message);
//         if (file) {
//             formData.append("media", file);
//         }

//         // Send the new post to the server via WebSocket
//         console.log("Sending post:", formData.get("message"), formData.get("media"));
//         await sendPostMessage(formData, accessToken);

//         // Reset form inputs after submission
//         setMessage("");
//         setFile(null);
//         (e.target as HTMLFormElement).reset();
//     };

//     return (
//         <div>
//             <h1>Post Feed</h1>

//             {/* Form for creating a new post */}
//             <form onSubmit={handlePostSubmit}>
//                 <textarea
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="What's on your mind?"
//                     rows={4}
//                     style={{ width: "100%" }}
//                     required
//                 />

//                 {/* File input for media (optional image/video upload) */}
//                 <input
//                     type="file"
//                     accept="image/*,video/*"
//                     onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
//                 />

//                 <button type="submit">Post</button>
//             </form>

//             {/* Render the list of posts */}
//             <ul>
//                 {posts.map((post) => (
//                     <li key={post.id}>
//                         {/* Render the post message */}
//                         <p>{post.message}</p>

//                         {/* If media is available, render it */}
//                         {post.media_url && (
//                             <div>
//                                 {post.media_url.endsWith(".mp4") ? (
//                                     <video controls width="100%">
//                                         <source src={post.media_url} type="video/mp4" />
//                                         Your browser does not support the video tag.
//                                     </video>
//                                 ) : (
//                                     <img src={post.media_url} alt="Post media" style={{ maxWidth: "100%" }} />
//                                 )}
//                             </div>
//                         )}

//                         {/* Comment section */}
//                         <CommentFeed postId={post.id.toString()} />
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default PostFeed;




import { useEffect, useState } from "react";
import CommentFeed from "./CommentFeed";
import useWebSocket from "../../hooks/useWebSocket";
import axios from "axios";
import { storeTokens } from "@/app/utils/authHelpers";

interface Post {
  id: number;
  message: string;
  media_url?: string; // URL for optional media (image/video)
  created_at: string; // Timestamp for sorting
}

interface WebSocketMessage {
  type: string;
  content: string;
  media?: string; // Base64-encoded media
  access_token: string;
}

const PostFeed: React.FC = () => {
  const { messages, sendMessage } = useWebSocket<WebSocketMessage>("ws://localhost:8001/ws/posts/"); // Replace with your WebSocket URL
  const [posts, setPosts] = useState<Post[]>([]);
  const [message, setMessage] = useState<string>(""); // For the message in the textarea
  const [file, setFile] = useState<File | null>(null); // For the selected file

  useEffect(() => {
    // When a new message is received, update the posts state
    if (messages.length > 0) {
      const newMessage = messages[messages.length - 1] as unknown as Post;
      console.log("New post received:", newMessage);
      if (newMessage.id) {
        setPosts((prevPosts) => {
          if (!prevPosts.some((post) => post.id === newMessage.id)) {
            return [newMessage, ...prevPosts]; // Add new posts to the top
          }
          return prevPosts;
        });
      }
    }
  }, [messages]);

  // Function to refresh the access token
  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        alert("You must be logged in to perform this action.");
        return null;
      }

      const response = await axios.post("http://localhost:8001/token/refresh/", {
        refresh: refreshToken,
      });

      const newAccessToken = response.data.access;
      const newRefreshToken = response.data.refresh;
      storeTokens(newAccessToken, newRefreshToken);
      console.log("Access token refreshed.");
      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      alert("Session expired. Please log in again.");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return null;
    }
  };

  // Convert file to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Function to send the post message with Base64 media
  const sendPostMessage = async (content: string, mediaBase64: string | null, accessToken: string) => {
    sendMessage({
      type: "new_post",
      content,
      media: mediaBase64 || undefined, // Only send media if it exists
      access_token: accessToken,
    });
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() === "") {
      alert("Message cannot be empty.");
      return;
    }

    // Refresh the access token before sending the post
    const accessToken = await refreshAccessToken();
    if (!accessToken) {
      return;
    }

    let mediaBase64: string | null = null;

    // Convert the file to Base64 if it exists
    if (file) {
      try {
        mediaBase64 = await fileToBase64(file);
      } catch (error) {
        console.error("Failed to convert file to Base64:", error);
        alert("Failed to process media file. Please try again.");
        return;
      }
    }

    // Send the new post to the server via WebSocket
    console.log("Sending post:", message, mediaBase64);
    await sendPostMessage(message, mediaBase64, accessToken);

    // Reset form inputs after submission
    setMessage("");
    setFile(null);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div>
      <h1>Post Feed</h1>

      {/* Form for creating a new post */}
      <form onSubmit={handlePostSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          rows={4}
          style={{ width: "100%" }}
          required
        />

        {/* File input for media (optional image/video upload) */}
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />

        <button type="submit">Post</button>
      </form>

      {/* Render the list of posts */}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {/* Render the post message */}
            <p>{post.message}</p>

            {/* If media is available, render it */}
            {post.media_url && (
              <div>
                {post.media_url.endsWith(".mp4") ? (
                  <video controls width="100%">
                    <source src={post.media_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={post.media_url} alt="Post media" style={{ maxWidth: "50%" }} />
                )}
              </div>
            )}

            {/* Comment section */}
            <CommentFeed postId={post.id.toString()} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostFeed;
