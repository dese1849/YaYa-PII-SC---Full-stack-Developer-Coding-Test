import styles from "./Header.module.css";
import Logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          {/* Logo on the left */}
          <div className={styles.logoContainer}>
            <img src={Logo} alt="Coding Logo" className={styles.logoSvg} />
          </div>

          {/* Code Testing text on the right */}
          <div className={styles.codeTestingText}>
            <span>YaYa PII SC - Full-stack Developer | Coding Test</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
