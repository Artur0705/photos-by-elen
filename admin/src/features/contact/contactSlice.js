import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";

export const getContacts = createAsyncThunk(
  "contact/get-contacts",
  async (thunkAPI) => {
    try {
      return await contactService.getContacts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAContact = createAsyncThunk(
  "contact/get-contact",
  async (contactId, thunkAPI) => {
    try {
      return await contactService.getContact(contactId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateContactStatus = createAsyncThunk(
  "contact/update-status",
  async ({ contactId, status }, thunkAPI) => {
    try {
      return await contactService.updateContactStatus(contactId, status);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contact/delete-contact",
  async (contactId, thunkAPI) => {
    try {
      await contactService.deleteContact(contactId);
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  contacts: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.contacts = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleContact = action.payload;
      })
      .addCase(getAContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateContactStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContactStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedContact = action.payload;
      })
      .addCase(updateContactStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedContact = action.payload;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default contactSlice.reducer;
