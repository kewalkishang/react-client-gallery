import { createSlice,  PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

// Define the state shape
interface DescriptionsState {
  [key: string]: string; // Keyed by image identifier
}

// Initial state
const initialState: DescriptionsState = {};

// Async thunk for fetching descriptions
export const fetchDescriptions = createAsyncThunk(
    'descriptions/fetchDescriptions',
    async () => {
      const response = await fetch('/api/imagedata');
      const data = await response.json();
     // console.log(data);
      return data;
    }
  );


  export const deleteDescription = createAsyncThunk(
    'descriptions/deleteDescriptions',
    async (keys) => {
      try {
        const response = await fetch('/api/imagedata', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ keys }),
        });
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to delete items');
        }
  
        const data = await response.json();
        console.log(data);
        return data; // Assuming the API returns some success message or deleted item details
      } catch (error) {
        console.log(error);
      }
    }
  );
  

// Create the slice
export const descriptionsSlice = createSlice({
  name: 'descriptions',
  initialState,
  reducers: {
    setDescription: (state, action: PayloadAction<{ image: string; description: string }>) => {
      const { image, description } = action.payload;
      state[image] = description; // Directly mutating the state is safe with Redux Toolkit
    },
    removeDescription: (state, action: PayloadAction<string>) => {
      delete state[action.payload]; // Removing a description for an image
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDescriptions.fulfilled, (state, action) => {
      Object.entries(action.payload).forEach(([image, description]) => {
        state[image] = description;
      });
    })
    .addCase(deleteDescription.fulfilled, (state, action) => {
      console.log("Delete successful");
      // Handle the successful deletion, e.g., update the state as necessary
    });
  },
});

// Export actions and reducer
export const { setDescription, removeDescription } = descriptionsSlice.actions;
export default descriptionsSlice.reducer;

