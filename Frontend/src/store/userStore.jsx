import {create} from "zustand";

export const userStore = create((set) => ({
  userInfo: null,
  error: null,
  isLoading: false,

  // Function to fetch user data
  fetchUserInfo: async () => {
    set({ isLoading: true }); // Set loading state to true

    try {
      const response = await fetch("http://localhost:5000/api/user-info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Send credentials (cookies or tokens)
      });

      // Check if the response is OK (200)
      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      const data = await response.json();

      // Validate if the response contains the expected structure
      if (data.message === "User found" && data.userInfo) {
        set({ userInfo: data.userInfo, error: null }); // Set user info if found
      } else {
        set({ error: "User info not found", userInfo: null }); // Handle case when user info is not found
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      set({
        error: error.message || "Error fetching user info",
        userInfo: null,
      });
    } finally {
      set({ isLoading: false }); // Set loading state to false
    }
  },
}));
