import React, { useRef, useEffect, useState } from "react";
import bg from "../assets/Landing/boby_ball.gif";
import "../assets/Landing/landing.css";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import down from "../assets/Landing/down.svg";
import ring from "../assets/Landing/ring.png";


const Landing = () => {
  const parallaxRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const parallaxDiv = parallaxRef.current.children[0];
        if (parallaxDiv) {
          const position = parallaxDiv.scrollTop;
          setScrollPosition(position);
          console.log("Scroll Position:", position);
        }
      }
    };

    if (parallaxRef.current) {
      const parallaxDiv = parallaxRef.current.children[0];
      parallaxDiv.addEventListener("scroll", handleScroll);
      return () => {
        parallaxDiv.removeEventListener("scroll", handleScroll);
      };
    }
  }, [parallaxRef]);

  useEffect;

  return (
    <div
      className="min-h-[100vh] bg-cover font-asap"
      style={{ backgroundImage: `url(${bg})`, backgroundPosition: "center" }}
    >     
      <div className="background w-full min-h-[100vh] relative overflow-hidden">
        <div className="relative snowfall w-[80%] p-5 mx-auto">
          {/* Generate multiple rings */}
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="ringy"
              style={{
                left: `${Math.random() * 80}vw`, // random horizontal position
                animationDuration: `${Math.random() * 5 + 2}s`, // random falling speed
              }}
            >
              <img src={ring} alt="Ring" className=""/>
            </div>
          ))}
        </div>
        <div
          className="parallax h-[100vh] absolute w-full top-[5rem]"
          ref={parallaxRef}
        >
          <Parallax pages={1.6}>
            <ParallaxLayer offset={0} speed={0.4}>
              <div className="flex flex-col w-full h-full justify-around items-center">
                
                <motion.div
                  className="text-white font-light text-center w-fit "
                  style={{
                    fontSize: `${Math.max(1.65, 3.5 - scrollPosition / 75)}rem`,
                    opacity: `${100 - scrollPosition / 1.5}%`,
                  }}
                  initial={{ y: -100 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Communicate without any <br />
                  language <span className="font-extralight glowing">barrier!</span>
                </motion.div>
              </div>
            </ParallaxLayer>
            <ParallaxLayer offset={0.5} speed={1}>
              
              <motion.h2
                className="text-white top-[50%] absolute mx-auto w-full text-5xl font-light text-center "
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  fontSize: `${Math.max(
                    1.35,
                    2.8 + (220 - scrollPosition) / 75
                  )}rem`,
                  opacity: `${(350 - scrollPosition) / 1.2}%`,
                }}
              >
                Virtual Meetings, Real <span className="glowing ">Connections:</span>
                <br /> Break Language Barriers Effortlessly
              </motion.h2>
              
            </ParallaxLayer>
            <ParallaxLayer offset={0.8} speed={1}>
              <motion.h1
                className="text-white top-[80%] absolute mx-auto w-full text-5xl font-light text-center "
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
                style={
                  {
                    // fontSize: `${Math.max(1.35, 2 + (400-scrollPosition) / 75)}rem`,
                  }
                }
              >
                Chat Across Cultures:
                <br /> Instant Translation for Seamless Conversations
              </motion.h1>
            </ParallaxLayer>
          </Parallax>
        </div>
        <nav className="w-full flex justify-between p-5 fixed top-0">
          <div className="text-white  text-4xl">VartaLang</div>
          <div className="text-right text-3xl">
            <Link to="/login">
              <h1 className="animate-gradient-text ">Login/Signup</h1>
            </Link>
          </div>
        </nav>
       {scrollPosition<5 && <div className="absolute bottom-5 right-5 text-white flex flex-col items-center justify-center animate-bounce">
          <span className="mr-2">Scroll down</span>
          <img src={down} alt="" className="w-12 transition" />
        </div>}
        <div className="line2 relative" style={{width:`${scrollPosition}px`, top:"110px",height:"5px"}}></div>
      </div>
    </div>
  );
};

export default Landing;
