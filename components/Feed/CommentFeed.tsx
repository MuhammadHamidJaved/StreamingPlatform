import { useEffect, useState } from "react";
import useWebSocket from "../../hooks/useWebSocket";
import axios from "axios";
import { storeTokens } from "@/app/utils/authHelpers";

interface Comment {
    message: string;
}

interface CommentFeedProps {
    postId: string;
}

const CommentFeed: React.FC<CommentFeedProps> = ({ postId }) => {
    const { messages, sendMessage } = useWebSocket(`ws://localhost:8001/ws/comments/${postId}/`);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        if (messages.length > 0) {
            const newMessage = messages[messages.length - 1] as Comment;
            console.log("New comment received:", newMessage);
            setComments((prevComments) => [...prevComments, newMessage]);
        }
    }, [messages]);

    // Function to refresh the access token
    const refreshAccessToken = async (): Promise<string | null> => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                alert("You must be logged in to comment.");
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

    // Function to handle comment submission
    const handleCommentSubmit = async (commentContent: string) => {
        if (commentContent.trim() === "") {
            alert("Comment cannot be empty.");
            return;
        }

        // Refresh the access token before sending the comment
        const accessToken = await refreshAccessToken();
        if (!accessToken) {
            return;
        }

        // Send the new comment to the WebSocket
        sendMessage({
            type: "new_comment",
            content: commentContent,
            postId,
            access_token: accessToken,
        });
    };

    return (
        <div>
            <h4>Comments</h4>

            {/* Button for adding a comment (for demonstration purposes) */}
            <button onClick={() => handleCommentSubmit("Nice post!")}>
                Add Comment
            </button>

            {/* Render the list of comments */}
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommentFeed;
