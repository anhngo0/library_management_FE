import { useState, useEffect } from "react";
import SideBar from "../../../components/management/layout/SideBar";
import { changeCurrentUserProfile, getCurrentUserInfo } from "../../../api/user";
function Account() {
    const [image, setImage] = useState();
    const [account, setAccount] = useState({});
    const [updateMode, setUpdateMode] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({}); 
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        //fetch account api
        getCurrentUserInfo().then(response => {
            console.log(response.data);
            setUpdatedProfile(response.data.profile);
            setAccount(response.data);
        })
    }, []) 

    const handleChangeInput = (e) => {
        const value = e.target.value ; 
        e.preventDefault();
        const newProfile = {
            ...updatedProfile,
            [e.target.name]: value
        }
        setUpdatedProfile(newProfile);
    }

    const confirmChangeProfile = (e) => {
        e.preventDefault();
        changeCurrentUserProfile(updatedProfile).then(response => {
            if(response.status === 200){
                setSuccessMessage("Thay đổi thông tin thành công");
                setUpdateMode(false);
            }
        })
    } 

    return (
        <div>
            <div className="d-flex">
            <div className="w-[15%] ">
                <SideBar selected={3}/>
            </div>
            <div className="w-[85%] p-4 vh-min-[100%] bg-[#FFFBF5]">
                <div className="container pb-4 rounded-[5px] shadow bg-slate-100">
                    <div className="row pt-3">
                        <div className="col-9">
                            
                            {account.role === "manager" && <h1 className="fs-1 text-[#343A40] text-semibold mt-1">Quản lí</h1>}
                            {account.role === "librarian" &&<h1 className="fs-1 text-[#343A40] text-semibold mt-1">Thủ thư</h1>}

                            <div className="row py-2">
                                <div className="col-3"><p className="fs-5 ">Tên:</p></div>
                                <div className="col-9">
                                <input type="text" name="name" className="fs-5 text-[#343A40] w-100 " onChange={e => handleChangeInput(e)}
                                    disabled={updateMode ? false: true} value={updateMode ? updatedProfile.name : account.profile?.name}/>
                                </div>
                            </div>

                            <div className="row py-2">
                                <div className="col-3"><p className="fs-5 ">Email:</p></div>
                                <div className="col-9">
                                <input type="text" name="email" className="fs-5 text-[#343A40] w-100" onChange={e => handleChangeInput(e)}
                                    disabled={updateMode ? false: true} value={updateMode ? updatedProfile.email : account.profile?.email}/>
                                </div>
                            </div>

                            <div className="row py-2">
                                <div className="col-3"><p className="fs-5 ">Mã số CCCD:</p></div>
                                <div className="col-9">
                                    <input type="text" name="cccd_Id" className="fs-5 text-[#343A40] w-100 " onChange={e => handleChangeInput(e)}
                                    disabled={updateMode ? false: true} value={updateMode ? updatedProfile.cccd_Id : account.profile?.cccd_Id}/>
                                </div>
                            </div>

                            <div className="row py-2">
                                <div className="col-3"><p className="fs-5 ">Điện thoại:</p></div>
                                <div className="col-9">
                                    <input type="text" name="phone" className="fs-5 text-[#343A40] w-100 " onChange={e => handleChangeInput(e)}
                                    disabled={updateMode ? false: true} value={updateMode ? updatedProfile.phone : account.profile?.phone}/>
                                </div>
                            </div>

                            <div className="row py-2">
                                <div className="col-3"><p className="fs-5 ">Địa chỉ:</p></div>
                                <div className="col-9">
                                    <input type="text" name="address" className="fs-5 text-[#343A40] w-100 " onChange={e => handleChangeInput(e)}
                                    disabled={updateMode ? false: true} value={updateMode ? updatedProfile.address : account.profile?.address}/>
                                </div>
                            </div>

                        </div>
                        <div className="col-3">
                            <div className="container d-flex">
                            {updateMode ? <button className="btn btn-primary"onClick={() => setUpdateMode(false)}>Hủy</button>:<button className="btn btn-primary"onClick={() => setUpdateMode(true)}>Sửa</button>}
                            {updateMode ? <button className="ms-2 btn btn-info"onClick={(e) => confirmChangeProfile(e)}>Xác nhận</button>:<div></div>}
                        </div>

                        <div className="container d-flex flex-column align-items-center pt-2">
                            {image ? <img className="w-[125px] " src={typeof image === 'object' ? URL.createObjectURL(image) : image} alt="" /> 
                            : <img className="w-[125px] h-[165px] " src="../../public/images/images_not_ound.png" alt="" /> }
                            
                            <input disabled={updateMode ? false: true} type="file" name="quantity" className="form-control w-100 mt-3" 
                            onChange={e => {e.preventDefault(); setImage(e.target.files[0])}}/>
                            {successMessage ? <p className="text-success">{successMessage}</p> : <p></p>}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Account;