import React from 'react'
import Read from '../../components/read/Read'
import Navbar from '../../components/navbar/Navbar'


const Result = () => {
  return (
    <>
      <Navbar />
      <div className="resultsWrapper">
        <Read />
      </div>
    </>
  )
}

export default Result;