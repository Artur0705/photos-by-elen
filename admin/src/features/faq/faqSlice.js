import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import faqService from "./faqService";

export const getFAQS = createAsyncThunk("faq/get-faqs", async (thunkAPI) => {
  try {
    return await faqService.getFAQs();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getAFAQ = createAsyncThunk(
  "faq/get-faq",
  async (faqId, thunkAPI) => {
    try {
      return await faqService.getFAQ(faqId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createFAQ = createAsyncThunk(
  "faq/create-faq",
  async (faq, thunkAPI) => {
    try {
      return await faqService.createFAQ(faq);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateFAQ = createAsyncThunk(
  "faq/update-faq",
  async ({ faqId, faqData }, thunkAPI) => {
    try {
      return await faqService.updateFAQ(faqId, faqData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteFAQ = createAsyncThunk(
  "faq/delete-faq",
  async (faqId, thunkAPI) => {
    try {
      return await faqService.deleteFAQ(faqId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  faqs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const faqSlice = createSlice({
  name: "faqs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFAQS.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFAQS.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.faqs = action.payload;
      })
      .addCase(getFAQS.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAFAQ.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAFAQ.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleFAQ = action.payload;
      })
      .addCase(getAFAQ.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createFAQ.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFAQ.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdFAQ = action.payload;
      })
      .addCase(createFAQ.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateFAQ.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFAQ.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedFAQ = action.payload;
      })
      .addCase(updateFAQ.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteFAQ.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFAQ.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedFAQ = action.payload;
      })
      .addCase(deleteFAQ.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default faqSlice.reducer;
