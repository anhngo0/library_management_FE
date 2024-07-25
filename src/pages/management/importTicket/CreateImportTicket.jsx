
import { useState } from 'react';
import { createImportTicket } from '../../../api/importTicket';

function CreateImportTicket() {

    const [file, setFile] = useState();
    const [isSuccess, setIsSuccess] = useState(false);
    const [upsertImportTicketForm ,setUpsertImportTicketForm] = useState(
        {
           created_date: null,
           creator_note:"",
           creatorId:null,
           totalPrice: null,
           import_way:"",
           supplier: "",
           totalQuantity:""
        }
    )

    const handleChangeInput = (e, id) => {
        const value = !id ? e.target.value: id;
        console.log(value);
        const newUpsertImportTicketForm = {
            ...upsertImportTicketForm,
            [e.target.name]: value
        };
        setUpsertImportTicketForm(newUpsertImportTicketForm);
        setIsSuccess(false)
    }

    const createNewImportTicket = e => {
        e.preventDefault();
        createImportTicket(upsertImportTicketForm, file).then(response => {
            if(response.status === 200){
                setIsSuccess(true)
            }
        })
    }

    return (
        <div className=''>
            <form className="row p-3">
                <div className="col-8">
               
                <div className='py-3'>
                    <label className='pe-3'>Tổng giá:</label>
                    <input type="number" step="0.01" name="totalPrice"  onChange={e => handleChangeInput(e)} />
                </div>
                <div className='py-3'>
                    <label className='pe-3'>Cách nhập:</label>
                    <input type="text" name="import_way"  onChange={e => handleChangeInput(e)} />
                </div>
                <div className='py-3'>
                    <label className='pe-3'>Nhà cung cấp:</label>
                    <input type="text" name="supplier"  onChange={e => handleChangeInput(e)} />
                </div>
                <div className='py-3'>
                    <label className='pe-3'>Tổng số lượng:</label>
                    <input type="number" name="totalQuantity"  onChange={e => handleChangeInput(e)} />
                </div>

                <div className='py-3'>
                    <label className='pe-3'>ghi chú người tạo:</label>
                    <textarea onChange={(e)=>{handleChangeInput(e)}}
                                className={`form-control mb-2 mt-2`} 
                                rows="5"  name="creator_note" ></textarea>
                </div>
                <div className="d-flex justify-content-end">

                    <button className="btn btn-primary px-3 py-1 mb-5" onClick={e => createNewImportTicket(e)}>Tạo phiếu</button>
                    {isSuccess ? <p className="text-success">Thêm mới thành công</p> : <p></p>}
                </div>
                </div>
                <div className="col-4">
                    <p>Tải file sách nhập ở đây.</p>
                    <input type='file' className='form-control'  onChange={e => {e.preventDefault();setFile(e.target.files[0])}}/>
                    
                </div>
            </form>
            
        </div>
    );
}

export default CreateImportTicket;