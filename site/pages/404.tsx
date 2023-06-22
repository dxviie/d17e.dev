import styles from "./404.module.css";

export default function Custom404() {
  return (
    <>
      <div>404 - nothing to see here...</div>
      <div className={styles.container}>
        <div className={styles.traveller}>
          <div className={styles.bouncingBall}>
            <img
              src={"429830.jpg"}
              alt={"tumbleweed"}
              className={styles.tumbleweed}
            />
          </div>
        </div>
      </div>
    </>
  );
}
