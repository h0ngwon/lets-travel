import Comment from 'components/Comment';
import CountryBtn from 'components/ui/CountryBtn';
import Footer from 'components/ui/Footer';
import Navbar from 'components/ui/Navbar';
import React from 'react';

function CommentPage() {
    return (
        <div>
            <Navbar />
            <Comment />
        </div>
    );
}

export default CommentPage;
