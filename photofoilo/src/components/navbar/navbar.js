import React from "react";
import styles from "./navbar.module.css";

export default function Navbar(){

    return(
        <div className={styles.navContainer}>
            <div className={styles.leftNavbar}>
                <div className={styles.navLogo}>
                    <img src="./albumLogo.png" alt="Album logo" />

                </div>
                <p className={styles.logoTitle}>PhotoFolio</p>
            </div>
        </div>
    )
}