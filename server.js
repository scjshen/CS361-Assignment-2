const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const notificationSchema = new mongoose.Schema({
  userId: Number,
  message: String,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);

mongoose
  .connect("mongodb://localhost:27017/notifications")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const createNotification = (userId, message) => ({ userId, message });

app.post("/comments", async (req, res) => {
  try {
    const { postId, commentId, commenterId, postOwnerId, previousCommenters, content } = req.body;

    if (!postId || !commentId || !postOwnerId || !content || !Array.isArray(previousCommenters)) {
      return res.status(400).json({ error: "Invalid comment data" });
    }

    const notifications = [
      createNotification(postOwnerId, `New comment on your post: "${content}"`),
    ];

    previousCommenters.forEach((prevCommenterId) => {
      if (prevCommenterId !== commenterId) {
        notifications.push(createNotification(prevCommenterId, `Someone also commented: "${content}"`));
      }
    });

    await Notification.insertMany(notifications);

    res.status(200).json({ message: "Notifications created" });
  } catch (err) {
    console.error("Error creating notifications:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/notifications", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const notifications = await Notification.find({ userId });
    res.json({ notifications });
  } catch (err) {
    console.error("Error retrieving notifications:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/notifications/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.json({ message: "Notification marked as read", notification: updatedNotification });
  } catch (err) {
    console.error("Error updating notification:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
