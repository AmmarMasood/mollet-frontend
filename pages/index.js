import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);
  return (
    <Layout
      childern={
        <div className={styles.container}>
          <div>
            <h1>TOP RANKED ROBO ADVISOR</h1>
            <p>
              You will get your portfolio built for you with no fee at all.
              Because you dont always have to follow market to master it.
            </p>

            {user ? (
              <Link href={"/dashboard"}>
                <Button
                  text={"My Portfolio"}
                  style={{ backgroundColor: "var(--primary-color)" }}
                />
              </Link>
            ) : (
              <Link href={"/get-started"}>
                <Button
                  text={"Get Started"}
                  style={{ backgroundColor: "var(--primary-color)" }}
                />
              </Link>
            )}
          </div>
          <div>
            <Image
              src={"/images/home-landing.svg"}
              width={"700px"}
              height={"500px"}
            />
          </div>
        </div>
      }
    />
  );
}
