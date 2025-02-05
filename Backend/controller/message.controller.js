import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";



export const sendMessage = async (req, res) => {
  try {
    const { messageContent, messageType, verificationCode, locationShared } =
      req.body;
    const { id: receiverId } = req.params;
    const senderId = req.userId;

    console.log("Sender ID:", senderId); // Debugging
    console.log("Receiver ID:", receiverId); // Debugging
    console.log("Message Type:", messageType); // Debugging
    console.log("Verification Code:", verificationCode); // Debugging

    // Step 1: Find existing conversation (chat) between the sender and receiver
    let conversation = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // Step 2: If no conversation exists, create one
    if (!conversation) {
      conversation = await Chat.create({
        participants: [senderId, receiverId],
        chatName: `${senderId}-${receiverId}`,
      });
    }

    // Step 3: Prepare message data (handle verification and normal messages)
    const newMessage = new Message({
      senderId,
      receiverId,
      messageContent,
      messageType:"text",
      chatId: conversation._id,
      verificationCode, // Will be added if it's a verification message
      locationShared, // Will be added if location is shared
    });

    // Step 4: Add message to the conversation’s message array
    conversation.messages.push({
      sender: senderId,
      message: messageContent,
      messageType,
      verificationCode,
      locationShared,
    });

    // Step 5: Save both the message and the conversation (run in parallel)
    await Promise.all([conversation.save(), newMessage.save()]);

    // Step 6: Return success response with the new message
    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      newMessage,
    });
  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.userId;

    // Step 1: Find conversation between sender and receiver (participants in chat)
    const conversation = await Chat.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // Populating messages field

    // Step 2: If no conversation exists, return an error
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Step 3: Return the conversation messages
    res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error("Error in getMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
