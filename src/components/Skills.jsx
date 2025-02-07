import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { FaReact, FaHtml5, FaCss3Alt, FaSass, FaBootstrap, FaGithubSquare, FaGitAlt, FaFigma } from 'react-icons/fa';
import { RiJavascriptFill, RiNpmjsFill } from 'react-icons/ri';
import { SiRedux, SiExpress, SiMongodb, SiJira } from 'react-icons/si';
import useBreakpoints from './responsive';
import SmallDescription from './small-description';

const skills = [
  { icon: <FaReact color='var(--primary-text-color)' />, name: 'React' },
  { icon: <RiJavascriptFill color='var(--primary-text-color)' />, name: 'JavaScript' },
  { icon: <FaHtml5 color='var(--primary-text-color)' />, name: 'HTML5' },
  { icon: <FaCss3Alt color='var(--primary-text-color)' />, name: 'CSS3' },
  { icon: <FaSass color='var(--primary-text-color)' />, name: 'Sass' },
  { icon: <SiRedux color='var(--primary-text-color)' />, name: 'Redux' },
  { icon: <FaBootstrap color='var(--primary-text-color)' />, name: 'Bootstrap' },
  { icon: <SiExpress color='var(--primary-text-color)' />, name: 'Express.js' },
  { icon: <SiMongodb color='var(--primary-text-color)' />, name: 'MongoDB' },
  { icon: <FaGithubSquare color='var(--primary-text-color)' />, name: 'GitHub' },
  { icon: <RiNpmjsFill color='var(--primary-text-color)' />, name: 'NPM' },
  { icon: <FaGitAlt color='var(--primary-text-color)' />, name: 'Git' },
  { icon: <SiJira color='var(--primary-text-color)' />, name: 'Jira' },
  { icon: <FaFigma color='var(--primary-text-color)' />, name: 'Figma' },
];

const Skills = () => {
  const { isMobile } = useBreakpoints();
  const ref = useRef(null);
  const inView = useInView(ref);
  const titleControls = useAnimation();
  const skillsControls = useAnimation();
  const [showContent, setShowContent] = useState(false);
  const titleTextTimeout = isMobile ? 500 : 1000;
  const titleTextDuration = isMobile ? 0.5 : 1;

  async function fetchData() {
    try {
      // console.log('start');
      // const response = await fetch('https://reqres.in/api/users?page=2');
      // const data = await response.json();
      // console.log(data);
      // console.log('end');
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  fetchData();
  
  

  useEffect(() => {
    if (inView) {
      // First, animate out the "SKILLS" text
      setShowContent(false);
      titleControls.start({
        opacity: 0,
        x: '-100%',
        transition: { duration: 0.5 },
      });

      // After a delay, show the main content
      setTimeout(() => {
        setShowContent(true);
        skillsControls.start({
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, delay: 0.5 },
        });
      }, titleTextTimeout);  // Delay should match the duration of the "SKILLS" text exit animation
    } else {
      setShowContent(false);
    }
  }, [inView, titleControls, skillsControls]);

  return (
    <>
      <AnimatePresence>
        {!inView && (
          <motion.div
            className="title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: titleTextDuration }}
          >
            SKILLS
          </motion.div>
        )}
      </AnimatePresence>
      <div className="inviewAnalyzer" ref={ref} />
      {showContent && (
        <AnimatePresence>
          <div className='skill-main-container'>
            <motion.div
              className="skillTitleWrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            >
              <motion.div
                className='aboutme-btn'
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateY: [0, 360, 360],
                }}
                transition={{
                  opacity: { duration: 1 },
                  scale: { duration: 1 },
                  rotateY: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}>
                SKILLS
              </motion.div>
              <h1 className='titleDescription'>
                <SmallDescription text='Technologies and Skills'
                delay={0.2}
                duration={0.2}
                color='var(--grey-text-color)'
                highlightColor='var(--primary-text-color)'
                /></h1>
            </motion.div>
            <div className='skillContentWrapper'>
              <motion.div
                className='skill-rightside-container'
                initial={{ opacity: 0, x: '100%' }}
                animate={skillsControls}
                exit={{ opacity: 0, x: '100%' }}
              >
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className='skill-item'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: index * 0.3 } }}
                    exit={{ opacity: 0 }}
                  >
                    {skill.icon}
                    <p className='skill-name'>{skill.name}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </AnimatePresence>
      )}
    </>
  );
};

export default Skills;
