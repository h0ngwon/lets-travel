import Comment from 'components/Comment'
import CountryBtn from 'components/ui/CountryBtn'
import Footer from 'components/ui/Footer'
import Navbar from 'components/ui/Navbar'
import React from 'react'

function CommentPage() {
  return (
    <div>
        <Navbar />
        <h4>Comments</h4>
        <Comment />
        <Footer />
    </div>
  )
}

export default CommentPage
