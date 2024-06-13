
const Book = (props) => {
    const {image , name ,description   , author , genres} = props
    return (
        <>
            <div >
                <div className="shadow-lg w-[100%] cursor-pointer">
                    <div className="w-[100%] p-[50px]">
                        <img className="w-[100%]" src={image} alt="" />
                        <span className="text-center block">{name}</span>
                        <span className="block text-center">{description}</span>
                        <span className="block text-center">Tác giả: {author}</span>
                        <span className="block text-center">Thể Loại: <span className="text-blue-500">{genres}</span></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Book;