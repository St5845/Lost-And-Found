import Item from "../models/item.model.js";
import User  from "../models/user.model.js";

// Get all items (either Lost or Found)
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate("ownerId", "name")
      .populate("founderId", "name")
      .exec();
    res.status(200).json(items); // Respond with the items in JSON format
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving items", error: error.message });
  }
};

export const createItem = async (req, res) => {
  try {
    const { itemName, itemType, date, time, location, description, status } =
      req.body;
    const reporterId = req.userId;

    if (!reporterId) {
      return res.status(400).json({ message: "Reporter ID is required" });
    }

    // Ensure status is either "Lost" or "Found"
    if (!["Lost", "Found"].includes(itemType)) {
      return res
        .status(400)
        .json({ message: "Invalid status. Must be 'Lost' or 'Found'" });
    }

    // Handle image upload
    console.log("File received:", req.file);
    const image = req.file ? req.file.path.replace(/\\/g, "/") : null;

    // Initialize item data
    let itemData = {
      itemName,
      itemType,
      date,
      time,
      location,
      description,
      status,
      images: image ? [image] : [], // If there are uploaded images, save their paths
    };

    // Assign either ownerId or founderId based on the status
    if (itemType === "Lost") {
      itemData.ownerId = reporterId; // Reporter is the owner in case of a lost item
    } else if (itemType === "Found") {
      itemData.founderId = reporterId; // Reporter is the founder in case of a found item
    }

    // Create and save the new item
    const newItem = new Item(itemData);
    console.log(newItem);

    await newItem.save();
    res
      .status(201)
      .json({ message: "Item created successfully", item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get an item by ID
export const getUserItems = async (req, res) => {
  try {
    const userId = req.userId; // Get the logged-in user's ID from the request

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find items where the user is either the owner (Lost) or the founder (Found)
    const items = await Item.find({
      $or: [{ ownerId: userId }, { founderId: userId }],
    })
      .populate("ownerId", "name")
      .populate("founderId", "name")
      .sort({ createdAt: -1 }) // Show the latest items first
      .lean()
      .exec();

    res.status(200).json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user items", error: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .lean()
      .exec();

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating item status", error: error.message });
  }
};


// Update an item by ID
export const updateItemById = async (req, res) => {
  const { id } = req.params; // Extract the item ID from the URL parameters
  const {
    itemName,
    itemType,
    date,
    time,
    location,
    description,
    status,
    images,
  } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      {
        itemName,
        itemType,
        date,
        time,
        location,
        description,
        status,
        images,
      },
      { new: true } // Return the updated item after modification
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem); // Respond with the updated item
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating item", error: error.message });
  }
};

// Delete an item by ID
export const deleteItemById = async (req, res) => {
  const { id } = req.params; // Extract the item ID from the URL parameters

  try {
    const deletedItem = await Item.findByIdAndDelete(id); // Delete the item by its ID
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" }); // Respond with a success message
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting item", error: error.message });
  }
};
