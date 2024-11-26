const axios = require("axios");

async function addComment() {
  const commentData = {
    postId: 1,
    commentId: 101,
    commenterId: 3,
    postOwnerId: 1,
    previousCommenters: [2, 4],
    content: "Welcome to the first post!"
  };

  try {
    const response = await axios.post("http://localhost:3000/comments", commentData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response from server:", response.data);
  } catch (error) {
    console.error("Error adding comment:", error.response ? error.response.data : error.message);
  }
}

addComment();
