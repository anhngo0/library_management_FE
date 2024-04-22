import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookCategoryTypeSelector from './component/common/BookCategoryTypeSelector';
import AddBook from './component/book/AddBook';

function Application() {
    return (
        <div>
            <BrowserRouter>
                <div className="container">
                    <Routes>
                        <Route path='/' exact element={<AddBook/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default Application;