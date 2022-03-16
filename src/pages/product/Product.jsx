import IconButton from '@material-ui/core/IconButton'
import TextField from "@material-ui/core/TextField"
import { Publish } from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import {
    getDownloadURL, getStorage,
    ref,
    uploadBytesResumable
} from "firebase/storage"
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Chart from '../../compunents/chart/Chart'
import Modal from '../../compunents/Modal'
import Sidebar from '../../compunents/sidebar/Sidebar'
import Topbar from '../../compunents/topbar/Topbar'
import app from '../../firebase'
import { getAttributes, updateAttributes, updateProduct } from '../../redux/apiCalls'
import { userRequest } from '../../requestMethod'
import "./product.css"

export default function Product() {
    const location = useLocation()
    const dispatch = useDispatch()
    const [modal,setModal] = useState(false)
    const productId = location.pathname.split("/")[2]
    const [pStats, setPStats] = useState([])
    const product = useSelector(state => state.product.products.find(product => product._id === productId))
    const error = useSelector(state => state.product.error)
    const token = useSelector(state => state.user.currentUser.accessToken)
    useEffect(() => {
        getAttributes(dispatch,productId)
    },[productId,dispatch])
    const productAttributes = useSelector(state=>state.product.curProductAttribute.attributes)
    const [attrs, setAttrs] = useState([])
    useEffect(() => {
        setAttrs([...productAttributes])
    },[productAttributes])
    const [inputs, setInputs] = useState(product)
    const [file, setFile] = useState("")
    const MONTHS = useMemo(
        () => [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],[]);
    useEffect(() => {
            const getStats = async () => {
              try {
                const res = await userRequest.get("orders/income?pid=" + productId);
                const list = res.data.sort((a,b)=>{
                    return a._id - b._id
                })
                list.map((item) =>
                  setPStats((prev) => [
                    ...prev,
                    { name: MONTHS[item._id - 1], Sales: item.total },
                  ])
                );
              } catch (err) {
                console.log(err);
              }
            };
            getStats();
    }, [productId, MONTHS]);
    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value };
        })
    }
    const handleChangeInput = (index, e) => {
        let newArr = attrs.map((item, i) => {
            if (index === i) {
              return { ...item, [e.target.name]: e.target.value };
            } else {
              return item;
            }
          });
          setAttrs(newArr);
    }
    const handleAddField = () => {
        setAttrs([...attrs, {attributeID: "", label: "", value: ""}])
    }
    const handleRemoveFields = (index) => {
        const values = [...attrs]
        values.splice(index,1)
        setAttrs(values)
    }
    const handleClick = (e) => {
        e.preventDefault()
        updateAttributes(dispatch,productId,token,{attributes: [...attrs],productID: productId})
        if(file === "") {
            const product = { ...inputs};
            updateProduct(product._id,product,dispatch)
            setModal(true)
        } else {
            const fileName = new Date().getTime() + file.name
            const storage = getStorage(app)
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file);
                 // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                        console.log("Upload is paused");
                        break;
                        case "running":
                        console.log("Upload is running");
                        break;
                        default:
                    }
                },
                (error) => {
                // Handle unsuccessful uploads
                },
                () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const product = { ...inputs, img: downloadURL};
                    updateProduct(product._id,product,dispatch)
                    
                });
                }
                );
                setModal(true)
        }
    }
    return (
        <div className="wrapper">
            <Topbar/>
            <div className="container">
                {modal && <Modal stateModal={setModal} message={error ? "Có lỗi xảy ra, vui lòng thử lại" : "Cập nhật thành công!"}/>}
                <Sidebar/>
                <div className='product'>
                    <div className="productTitleContainer">
                        <h1 className="productTitle">Thông tin sản phẩm {product.title}</h1>
                    </div>
                    <div className="productTop">
                        <div className="productTopLeft">
                            <Chart data={pStats} dataKey="Sales" title="Biểu đồ bán hàng"/>
                        </div>
                        <div className="productTopRight">
                            <div className="productInfoTop">
                                <img src={product.img} alt="" className="productInfoImg" />
                                <span className="productName">{product.title}</span>
                            </div>
                            <div className="productInfoBottom">
                                <div className="productInfoItem">
                                    <span className="productInfoKey">ID:</span>
                                    <span className="productInfoValue">{product._id}</span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Giá:</span>
                                    <span className="productInfoValue">{product.price}.000Đ</span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Mô tả:</span>
                                    <span className="productInfoValue">{product.desc}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="productBottom">
                        <form action="" className="productForm" >
                            <div className="productFormLeft">
                                <label >Tên sản phẩm</label>
                                <input type="text" name='title' value={inputs.title} onChange={handleChange}/>
                                <label >Mô tả</label>
                                <input type="text" name='desc' className='productDesc' value={inputs.desc} onChange={handleChange}/>
                                <label >Giá(đơn vị: nghìn đồng)</label>
                                <input type="text" name='price' value={inputs.price} onChange={handleChange}/>
                                <div>
                                
                               {attrs.map((attr,index) => (
                                   <div key={index} className="productAttribute">
                                       <TextField
                                        style={{marginRight:"10px",marginBottom:"10px"}}
                                        name='attributeID'
                                        label="Thuộc tính"
                                        variant='outlined'
                                        value={attr.attributeID}
                                        onChange={e => handleChangeInput(index, e)}
                                       />
                                       <TextField
                                        
                                        style={{marginRight:"10px"}}
                                        name='label'
                                        label="Mô tả "
                                        variant='outlined'
                                        value={attr.label}
                                        onChange={e => handleChangeInput(index, e)}
                                       />
                                       <TextField
                                        
                                        style={{marginRight:"10px"}}
                                        name='value'
                                        label="Giá trị"
                                        variant='outlined'
                                        value={attr.value}
                                        onChange={e => handleChangeInput(index, e)}
                                       />
                                       <IconButton onClick={() => handleAddField()}  disabled={Object.values(attr).some(item => item.trim() === "")}>
                                           <AddIcon/>
                                       </IconButton>
                                       <IconButton disabled={attrs.length === 1} onClick={() => handleRemoveFields(index)}>
                                           <RemoveIcon/>
                                       </IconButton>
                                   </div>
                                ))}
                                </div>
                            </div>
                            <div className="productFormRight">
                                <div className="productUpload">
                                    <img src={product.img} alt="" className="productUploadImg" />
                                    <label for="file" >
                                        <Publish/>
                                    </label>
                                    <input type="file" name="file" id="file" onChange={e => setFile(e.target.files[0])}/>
                                </div>
                                <button onClick={handleClick} className="productBtn">Cập nhật</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
