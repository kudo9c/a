import { publicRequest, userRequest } from "../requestMethod"
import { loginFailure, loginStart, loginSuccess,getUserStart,getUserSuccess,getUserFailure,deleteUserStart,deleteUserSuccess,deleteUserFailure
,updateUserStart,updateUserSuccess,updateUserFailure,
addUserStart,addUserSuccess,addUserFailure } from "./userRedux"
import { 
getProductFailure, getProductStart, getProductSuccess, 
deleteProductStart, deleteProductSuccess, deleteProductFailure,
updateProductStart, updateProductSuccess, updateProductFailure,
addProductStart, addProductSuccess, addProductFailure ,
addAttributeStart, addAttributeSuccess, addAttributeFailure,
getAttributeStart, getAttributeSuccess, getAttributeFailure,
updateAttributeStart, updateAttributeSuccess, updateAttributeFailure
} from "./productRedux"
import {
getOrderStart, getOrderSuccess,  getOrderFailure,
deleteOrderStart, deleteOrderSuccess, deleteOrderFailure,
updateOrderStart, updateOrderSuccess, updateOrderFailure,
addOrderStart, addOrderSuccess, addOrderFailure,
getIncomeStart, getIncomeSuccess, getIncomeFailure,
} from "./orderRedux"
import axios from "axios";


export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try{
        const res = await publicRequest.post("/auth/login",user)
        dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFailure())
    }
}

//--------------------------------PRODUCTS---------------------------------------------------------------------

export const getProducts = async (dispatch) => {
    dispatch(getProductStart())
    try{
        const res = await publicRequest.get("/products")
        dispatch(getProductSuccess(res.data))
    }catch(err){
        dispatch(getProductFailure())
    }
}

export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart())
    try{
        const res = await userRequest.delete(`/products/${id}`)
        dispatch(deleteProductSuccess(id))
    }catch(err){
        dispatch(deleteProductFailure())
    }
}

export const updateProduct = async (id,product, dispatch) => {
    dispatch(updateProductStart())
    try{
        const res = await userRequest.put(`/products/${id}`,product)
        dispatch(updateProductSuccess({id, product }))
    }catch(err){
        dispatch(updateProductFailure())
    }
}

export const addProduct = async (product, dispatch,token,attribute) => {
    dispatch(addProductStart())
    const userRequest2 = axios.create({
        baseURL: "http://localhost:5000/api/",
        headers: {token:`Bearer ${token}`}
    })
    try{
        const res = await userRequest2.post(`/products`, product)
        dispatch(addProductSuccess(res.data))
        if(attribute.some(att => Object.values(att).some(item => item.trim() !== ""))) {
            addAttribute(attribute,dispatch,token,res.data._id)
        }
    }catch(err){
        dispatch(addProductFailure())
    }
}

export const addAttribute = async (attributes, dispatch,token,id) => {
    const userRequest2 = axios.create({
        baseURL: "http://localhost:5000/api/",
        headers: {token:`Bearer ${token}`}
    })
    const att = {productID: id,attributes}
    dispatch(addAttributeStart())
        try{
            const res = await userRequest2.post(`/value`, att)
            dispatch(addAttributeSuccess())
        }
        catch(err){
            dispatch(addAttributeFailure())
        }
}

export const getAttributes = async (dispatch,id) => {
    dispatch(getAttributeStart())
    try{
        const res = await publicRequest.get(`/value/find/${id}`)
        dispatch(getAttributeSuccess(res.data))
    }catch(err){
        dispatch(getAttributeFailure())
    }
}

export const updateAttributes = async (dispatch,id,token,attribute) => {
    const userRequest2 = axios.create({
        baseURL: "http://localhost:5000/api/",
        headers: {token:`Bearer ${token}`}
    })
    dispatch(updateAttributeStart())
    try{
        const res = await userRequest2.put(`/value/${id}`,attribute)
        dispatch(updateAttributeSuccess(res.data))
    }catch(err){
        dispatch(updateAttributeFailure())
    }
}

//----------------------------------USERS-------------------------------------------------------------------


export const getUsers = async (dispatch) => {
    dispatch(getUserStart())
    try{
        const res = await userRequest.get("/users")
        dispatch(getUserSuccess(res.data))
    }catch(err){
        dispatch(getUserFailure())
    }
}

export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart())
    try{
        const res = await userRequest.delete(`/users/${id}`)
        dispatch(deleteUserSuccess(id))
    }catch(err){
        dispatch(deleteUserFailure())
    }
}

export const updateUser = async (id,user, dispatch) => {
    dispatch(updateUserStart())
    try{
        const res = await userRequest.put(`/users/${id}`)
        dispatch(updateUserSuccess({id, user }))
    }catch(err){
        dispatch(updateUserFailure())
    }
}

export const addUser = async (user, dispatch) => {
    dispatch(addUserStart())
    try{
        const res = await publicRequest.post(`/auth/register`, user)
        dispatch(addUserSuccess(res.data))
    }catch(err){
        dispatch(addUserFailure())
    }
}

//----------------------------------ORDERS-------------------------------------------------------------------

export const getOrders = async (dispatch) => {
    dispatch(getOrderStart())
    try{
        const res = await userRequest.get("/orders")
        dispatch(getOrderSuccess(res.data))
    }catch(err){
        dispatch(getOrderFailure())
    }
}

export const deleteOrder = async (id, dispatch) => {
    dispatch(deleteOrderStart())
    try{
        const res = await userRequest.delete(`/orders/${id}`)
        dispatch(deleteOrderSuccess(id))
    }catch(err){
        dispatch(deleteOrderFailure())
    }
}

export const updateOrder = async (id,order, dispatch) => {
    dispatch(updateOrderStart())
    try{
        const res = await userRequest.put(`/orders/${id}`,order)
        dispatch(updateOrderSuccess({id, order }))
    }catch(err){
        dispatch(updateOrderFailure())
    }
}

export const addOrder = async (order, dispatch,token) => {
    dispatch(addOrderStart())
    const userRequest2 = axios.create({
        baseURL: "http://localhost:5000/api/",
        headers: {token:`Bearer ${token}`}
    })
    try{
        const res = await userRequest2.post(`/orders`, order)
        dispatch(addOrderSuccess(res.data))
    }catch(err){
        dispatch(addOrderFailure())
    }
}

export const getIncome = async (dispatch) => {
    dispatch(getIncomeStart())
    try{
        const res = await userRequest.get("orders/income")
        dispatch(getIncomeSuccess(res.data))
    }catch(err){
        dispatch(getIncomeFailure())
    }
}

