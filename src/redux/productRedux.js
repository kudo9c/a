import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
    curProductAttribute: {
      productID: "", 
      attributes: [
      {
        attributeID: "",
        label: "",
        value: ""
      }
    ]}
  },
  reducers: {
    //GET ALL PRODUCTS
    getProductStart: (state) => {
        state.isFetching = true
        state.error = false
    },
    getProductSuccess: (state,action) => {
        state.isFetching = false
        state.products = action.payload
    },
    getProductFailure: (state) => {
        state.isFetching = false
        state.error = true
    },
    //DELETE PRODUCT
    deleteProductStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    deleteProductSuccess: (state,action) => {
        state.isFetching = false
        state.products.splice(state.products.findIndex(item => item._id === action.payload),1)
    },
    deleteProductFailure: (state) => {
        state.isFetching = false
        state.error = true
    },
    //UPDATE PRODUCT
    updateProductStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    updateProductSuccess: (state,action) => {
        state.isFetching = false
        state.products[state.products.findIndex(item => item._id === action.payload.id)] = action.payload.product
    },
    updateProductFailure: (state) => {
        state.isFetching = false
        state.error = true
    },
    //ADD PRODUCT
    addProductStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    addProductSuccess: (state,action) => {
        state.isFetching = false
        state.products.push(action.payload)
    },
    addProductFailure: (state) => {
        state.isFetching = false
        state.error = true
    },
    //ADD ATTRIBUTE
    addAttributeStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    addAttributeSuccess: (state) => {
        state.isFetching = false
    },
    addAttributeFailure: (state) => {
        state.isFetching = false
        state.error = true
    },
    //GET ATTRIBUTES
    getAttributeStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    getAttributeSuccess: (state,action) => {
        state.isFetching = false
        state.curProductAttribute = action.payload
    },
    getAttributeFailure: (state) => {
        state.isFetching = false
        state.error = true
    },
    //UPDATE ATTRIBUTES
    updateAttributeStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    updateAttributeSuccess: (state,action) => {
        state.isFetching = false
        state.curProductAttribute = {...action.payload}
        
    },
    updateAttributeFailure: (state) => {
        state.isFetching = false
        state.error = true
    },
    //RESET STATE
    resetProduct: (state) => {
      state.products = []
    }
  },
})

export const {
  getProductStart,getProductSuccess,getProductFailure, 
  deleteProductStart, deleteProductSuccess, deleteProductFailure, 
  updateProductStart, updateProductSuccess, updateProductFailure,
  addProductStart, addProductSuccess, addProductFailure,
  addAttributeStart, addAttributeSuccess, addAttributeFailure,
  getAttributeStart, getAttributeSuccess, getAttributeFailure,
  updateAttributeStart, updateAttributeSuccess, updateAttributeFailure,
  resetProduct
  } = productSlice.actions

export default productSlice.reducer;