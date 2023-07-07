import styles from "./404.module.css";
import { Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  return (
    <>
      <div>404 - nothing to see here...</div>
      <Spacer />
      <div className={styles.container}>
        <div className={styles.traveller}>
          <div className={styles.bouncingBall}>
            <img
              // src={"429830.jpg"}
              src={"/tumbleweed2.png"}
              alt={"tumbleweed"}
              className={styles.tumbleweed}
            />
          </div>
        </div>
      </div>
      <Spacer />
    </>
  );
}
