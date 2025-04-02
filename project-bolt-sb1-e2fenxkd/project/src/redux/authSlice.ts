import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User type (adjust based on your actual user data structure)
interface User {
  name: string;
  email?: string; // Optional fields based on your backend response
  phone?: string;
  [key: string]: any; // For flexibility if more fields are returned
}

// Define the AuthState type
interface AuthState {
  user: User | null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  } as AuthState, // Type assertion for initial state
  reducers: {
    setAuthUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthUser } = authSlice.actions;
export default authSlice.reducer;