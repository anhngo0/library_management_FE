
const Book = (props) => {
    const {image , titleName ,alterName , author , category} = props;
    return (
        <>
            <div >
                <div className="shadow-lg w-[100%] h-[360px] cursor-pointer">
                    <div className="w-[100%] p-3 h-100 d-flex flex-column justify-content-between">
                        
                        <div className="container d-flex justify-content-center">
                            {image ? <img className="w-[125px] " src={`data:image/jpeg;base64,${image}`} alt="" /> : <img className="w-[125px] h-[165px] " src="../../public/images/images_not_ound.png" alt="" /> }
                        </div>
                        
                        <div className="container pb-2 text-center">
                            <p className="font-semibold text-lg pb-2">{titleName}</p>
                            {alterName ? <p  className="font-semibold pb-3">{alterName}</p>:""}
                            {author ? <p className=" text-muted">Tác giả: {author}</p> : ""}
                            <p className=" text-muted">Thể Loại: <span className="text-blue-500">{category}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Book;