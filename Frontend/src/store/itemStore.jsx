import { create } from "zustand";
import axios from "axios";

// Set the API URL based on the environment
const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/items"
    : "/api/items";

// Enable cookies for cross-origin requests
axios.defaults.withCredentials = true;

// Create the Zustand store
const useItemStore = create((set) => ({
  items: [], // State to hold items
  loading: false, // State to indicate loading status
  error: null, // State to hold any errors

  // Fetch all items from the backend
  fetchItems: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      set({ items: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Add a new item (including image file handling)
  addItem: async (newItem, imageFile) => {
    set({ loading: true, error: null });
    try {
      // Create FormData for handling file upload
      const formData = new FormData();
      formData.append("itemName", newItem.itemName);
      formData.append("itemType", newItem.itemType);
      formData.append("date", newItem.date);
      formData.append("time", newItem.time);
      formData.append("location", newItem.location);
      formData.append("description", newItem.description);
    
      if (imageFile) {
       
        formData.append("image", imageFile); 
        console.log (imageFile);
        // Append the image file to FormData
      }

       console.log("Sending FormData:", [formData]);

      // Send the POST request with the FormData (which includes both form fields and the file)
      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the request is sent as form-data
        },
      });

      // Update the state with the newly created item
      set((state) => ({
        items: [...state.items, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Update an existing item
  updateItem: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      set((state) => ({
        items: state.items.map((item) =>
          item._id === id ? response.data : item
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Delete an item
  deleteItem: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        items: state.items.filter((item) => item._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useItemStore;
