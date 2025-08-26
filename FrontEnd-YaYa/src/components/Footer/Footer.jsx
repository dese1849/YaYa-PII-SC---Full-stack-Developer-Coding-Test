import styles from "./Footer.module.css";
import Logo from "../../assets/logo.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Logo on the left */}
          <div className={styles.logoContainer}>
            <img src={Logo} alt="Coding Logo" className={styles.logoSvg} />
          </div>

          {/* Copyright text in the middle */}
          <div className={styles.copyrightText}>
            <span>© YaYa PII SC</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
