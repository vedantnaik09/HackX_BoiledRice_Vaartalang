import React from 'react'

import homeIcon from "../assets/home.png"
import learnIcon from "../assets/learn.png"
import profileIcon from "../assets/grid.png"
import dP from "../assets/profile.png"
import meet from "../assets/meet.png"
import chat from "../assets/chat.svg"
import exIcon from  "../assets/extension.png"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='nav flex p-2 justify-center'>
        <div className="flex w-1/2 justify-center">
            <div className="flex justify-center">
                <a href="/home" className='p-1'><img src={homeIcon} style={{filter:"invert(1)",width:"30px"}}></img></a>
                <a href="/learn" className='p-1'><img src={learnIcon} className='w-[30px]' style={{filter:"invert(1)"}}></img></a>
                <a href="#" className='p-1'><img src={meet} className=' w-[30px] backdrop-filter' ></img></a>
                <Link to="/chat" className='p-1'><img src={chat} className=' w-[30px] backdrop-filter' style={{filter:"invert(1)"}}></img></Link>
                <Link to="../assets/extensiongoogle.rar" target="_blank" download><img src={exIcon} alt="" style={{width: "34px",filter: "invert(1)"}}/>Download</Link>
            </div>
        </div>


        <div className="">
            <div className="flex icons p-2 right-4 absolute">
                <Link to="#" className=''><img src={dP}></img></Link>
                <Link to="#" className=''><img src={profileIcon} style={{filter:"invert(1)"}}></img></Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar