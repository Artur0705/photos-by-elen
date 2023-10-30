import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serviceService from "./serviceService";

export const getServices = createAsyncThunk(
  "service/get-services",
  async (thunkAPI) => {
    try {
      return await serviceService.getServices();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAService = createAsyncThunk(
  "service/get-service",
  async (serviceId, thunkAPI) => {
    try {
      return await serviceService.getService(serviceId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createService = createAsyncThunk(
  "service/create-service",
  async (service, thunkAPI) => {
    try {
      return await serviceService.createService(service);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateService = createAsyncThunk(
  "service/update-service",
  async ({ serviceId, serviceData }, thunkAPI) => {
    try {
      return await serviceService.updateService(serviceId, serviceData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteService = createAsyncThunk(
  "service/delete-service",
  async (serviceId, thunkAPI) => {
    try {
      return await serviceService.deleteService(serviceId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  services: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.services = action.payload;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleService = action.payload;
      })
      .addCase(getAService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdService = action.payload;
      })
      .addCase(createService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedService = action.payload;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedService = action.payload;
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default serviceSlice.reducer;
