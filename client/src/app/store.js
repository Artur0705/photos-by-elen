import { configureStore } from "@reduxjs/toolkit";

import serviceReducer from "../features/service/serviceSlice";
import contactReducer from "../features/contact/contactSlice";
import portfolioReducer from "../features/portfolio/portfolioSlice";
import faqReducer from "../features/faq/faqSlice";
export const store = configureStore({
  reducer: {
    service: serviceReducer,
    contact: contactReducer,
    portfolio: portfolioReducer,
    faq: faqReducer,
  },
});
