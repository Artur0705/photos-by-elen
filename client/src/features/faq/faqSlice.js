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
      });
  },
});

export default faqSlice.reducer;
