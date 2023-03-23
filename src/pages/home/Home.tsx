import React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Home.module.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AppleIcon from '@mui/icons-material/Apple';
import Laptop from '../../assets/video/laptop.mp4';
import M1 from '../../assets/video/m1_chip.mp4';
import Gpu from '../../assets/video/Gpu.mp4';
import m1_logo from '../../assets/images/m1_icon.jpg';
import m1_eyebrow from '../../assets/images/m1_eyebrow.png';
import display from '../../assets/images/display.jpg';
import m1_laptop from '../../assets/images/m1_laptop.png';

const Home: React.FC = () => {
  const windowSize = useRef(window.innerWidth);
  window.scrollTo(0, 0);
  return (
    <div className={styles.home}>
      <div className={styles.ribbon}>
        <div className={styles.buttonWrapper}>
          <Link to='/All' className={styles.storeButton}>
            <AppleIcon />
          </Link>
        </div>
        Get MacBook Air with M1 starting at $899 in our Education Store.
      </div>

      <section className={styles.sectionHero}>
        <video muted autoPlay width='100%' preload='auto'>
          <source src={Laptop} type='video/mp4' />
        </video>
        <h1>MacBook Air</h1>
        <h2>Power. It's in the Air.</h2>
        <p>
          MacBook Air with M1 is an incredibly portable laptop — it's nimble and
          quick, with a silent, fanless design and a beautiful Retina display.
          Thanks to its slim profile and all-day battery life, this Air moves at
          the speed of lightness.
        </p>

        <div className={styles.sectionHero__callout}>
          <img src={m1_logo} alt='m1_logo' />
          <p>Supercharged by the Apple M1 chip</p>
        </div>

        <ul className={styles.sectionHero__list}>
          <li>From $999</li>
          <li>
            <Link to='/Mac/9'>
              <span>Watch the event</span>
              <ArrowForwardIosIcon fontSize='small' />
            </Link>
          </li>
        </ul>
      </section>

      <section className={styles.sectionM1Chip}>
        <img
          src={m1_eyebrow}
          className={styles.sectionM1Chip__img}
          alt='m1_eyebrow'
        />
        <p className={styles.sectionM1Chip__headerline}>
          Small chip. Giant leap.
        </p>
        <p className={styles.sectionM1Chip__description}>
          M1 is our first chip designed specifically for Mac. Apple silicon
          integrates the CPU, GPU, Neural Engine, I/O, and so much more onto a
          single tiny chip. Packed with an astonishing 16 billion transistors,
          M1 delivers exceptional performance, custom technologies, and
          unbelievable power efficiency — a major breakthrough for Mac.
        </p>
        <video muted autoPlay width='100%' preload='auto'>
          <source src={M1} type='video/mp4' />
        </video>
      </section>

      <section className={styles.cards}>
        <section className={styles.cardCpu}>
          <h3 className={styles.cardCpu__logo}>CPU</h3>
          <div className={styles.cardCpu__container}>
            <div className={styles.cardCpu__textContent}>
              <p className={styles.cardCpu__headerline}>
                <span>8-core CPU</span> <br />
                Devours tasks. Sips battery.
              </p>
              <p className={styles.cardCpu__description}>
                The CPU on M1 isn't just astonishingly fast — it balances
                high-performance cores with efficiency cores that crush everyday
                jobs while using far less energy. With that kind of processing
                power, MacBook Air can take on intensive tasks like
                professional-level video editing and action-packed gaming.
              </p>
            </div>
            <motion.div
              whileInView={
                windowSize.current > 760 ? { x: [300, 0] } : { x: [300, 100] }
              }
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <img
                src={m1_laptop}
                className={styles.cardCpu__img}
                alt='display'
              />
            </motion.div>
          </div>
        </section>

        <section className={styles.cardGpu}>
          <div className={styles.cardGpu__container}>
            <h3 className={styles.cardGpu__logo}>GPU</h3>

            <div className={styles.cardGpu__textContainer}>
              <p className={styles.cardGpu__headerline}>
                <span>7-core GPU</span> <br />
                Plays hard.
                <br /> Works wonders.
              </p>
              <p className={styles.cardGpu__description}>
                The GPU in M1 delivers lightning-fast integrated graphics. So
                you can create, edit, and seamlessly play back multiple streams
                of full-quality 4K video without dropping a frame.
              </p>
            </div>
          </div>

          <video
            muted
            autoPlay
            width='100%'
            preload='auto'
            className={styles.cardGpu__video}
          >
            <source src={Gpu} type='video/mp4' />
          </video>
        </section>

        <section className={styles.cardFlex}>
          <div className={styles.cardBattery}>
            <h3>All-day battery life</h3>
            <p className={styles.cardBattery__description}>
              Up to 18 hours of battery life. Go long — free of charge.
            </p>
          </div>

          <div className={styles.cardThermal}>
            <h3>Thermal efficiency</h3>
            <p>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                No fan.
                <br /> No noise.
                <br />
              </motion.span>
              Just Air.
            </p>
            <button>Get the M1 thermal story</button>
          </div>
        </section>
      </section>

      <section className={styles.sectionDisplay}>
        <h2 className={styles.sectionDisplay__headerline}>Retina display</h2>
        <p className={styles.sectionDisplay__secondHeaderline}>
          Lifelike colors for unreal beauty.
        </p>
        <p className={styles.sectionDisplay__description}>
          Images take on new levels of detail and realism on the brilliant
          13.3-inch, 2560-by-1600-resolution Retina display. Text is sharp and
          clear. Colors are bright and vibrant. And the glass goes right to the
          edge of the enclosure, so nothing takes away from your gorgeous view.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img
            src={display}
            className={styles.sectionDisplay__img}
            alt='display'
          />
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
