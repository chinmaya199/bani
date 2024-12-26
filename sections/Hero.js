import React, { useEffect, useRef } from "react";
import Banner from "@/components/Banner";
import Expertise from "@/components/Expertise";
import ShowCase from "@/components/ShowCase";
import Testimonial from "@/components/Testimonial";
import { Title, TitleLogo, TitleSm } from "@/components/common/Title";
import { BlogCard, Brand } from "@/components/router";

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const banner = document.querySelector('.banner');
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let dots = [];
    const arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];

    const initDots = () => {
      dots = [];
      for (let index = 0; index < 50; index++) {
        dots.push({
          x: Math.floor(Math.random() * canvas.width),
          y: Math.floor(Math.random() * canvas.height),
          size: Math.random() * 3 + 5,
          color: arrayColors[Math.floor(Math.random() * 5)],
        });
      }
    };

    const drawDots = () => {
      dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const resizeCanvas = () => {
      canvas.width = banner.offsetWidth;
      canvas.height = banner.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      initDots();
      drawDots();
    };

    const handleMouseMove = event => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawDots();
      const mouse = {
        x: event.pageX - banner.getBoundingClientRect().left,
        y: event.pageY - banner.getBoundingClientRect().top,
      };
      dots.forEach(dot => {
        const distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if (distance < 300) {
          ctx.strokeStyle = dot.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });
    };

    const handleMouseOut = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawDots();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    banner.addEventListener('mousemove', handleMouseMove);
    banner.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      banner.removeEventListener('mousemove', handleMouseMove);
      banner.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <main>
        <div className="banner" style={styles.banner}>
          <div>
            <h1 style={{ ...styles.heading, ...styles.headingLeft }}>WE BUILD DIGITAL EXPERIENCES</h1>
          </div>
          <h4>
            Suspendisse ut magna porttitor, sollicitudin ligula at, molestie dolor. Vivamus a ligula ut velit placerat egestas at id leo. 
            <br />
            Nulla ac volutpat nunc. Nulla facilisi. Pellentesque tempus tellus ut magna porttitor scelerisque.
          </h4>
          <button style={styles.button}>Subscribe Now &#8599;</button>
          <canvas id="dotsCanvas" ref={canvasRef} style={styles.canvas}></canvas>
        </div>
      </main>
      <Expertise />
      <Banner />
      <Testimonial />
      <ShowCase />
      <Brand />
      <div className='text-center'>
        <Title title='Latest news & articles' />
      </div>
      <BlogCard />
    </>
  );
};

const styles = {
  body: {
    color: '#eee',
    fontFamily: 'Poppins',
    margin: 0,
    backgroundImage: `
      repeating-linear-gradient(
        to right, #2d2a44 0 1px, transparent 2px 200px
      ),
      repeating-linear-gradient(
        to bottom, #2d2a44 0 1px, transparent 2px 200px
      ),
      radial-gradient(
        at 50% 50%, #2d2a44, #1d1b34
      )
    `,
  },
  logo: {
    width: '30px',
  },
  header: {
    width: 'min(1200px, 90vw)',
    margin: 'auto',
    height: '70px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navList: {
    display: 'flex',
    gap: '30px',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  banner: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    textAlign: 'center',
    marginTop: '-70px',
    position: 'relative',
  },
  button: {
    all: 'unset',
    border: '1px solid #afaeae55',
    padding: '10px 20px',
    borderRadius: '20px',
    backgroundImage: 'linear-gradient(to bottom, #eee1, transparent, #eee1)',
    cursor: 'pointer',
    transition: '0.5s',
  },
  buttonHover: {
    backgroundColor: '#c691e6',
    color: '#040018',
    boxShadow: '0 0 50px #c691e6',
  },
  heading: {
    fontSize: '4em',
    fontWeight: 'bold',
    backgroundImage: 'linear-gradient(to left, #89a5df, #e46e7f, #e8e191)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textTransform: 'uppercase',
    lineHeight: '1em',
  },
  headingLeft: {
    '--to': 'left',
  },
  headingRight: {
    '--to': 'right',
  },
  canvas: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    pointerEvents: 'none',
  },
};

export default Hero;
