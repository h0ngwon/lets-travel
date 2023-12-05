import React from 'react'

function Navbar() {
  return (
    <>
      <h3>LET'S TRAVEL</h3>
      <ul>
        <li>{isLogin ? 'LOGIN' : 'LOGOUT'}</li>
      </ul>
    </>
  )
}

export default Navbar
