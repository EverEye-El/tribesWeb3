import { ConnectEmbed, ConnectWallet, darkTheme, useShowConnectEmbed } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import ConnectedPage from "../components/NavigationBar"
import UserStatus from "../components/userStatus";
import StatusEvents from "../components/statusEvents";

const customTheme = darkTheme({
  colors: {
    borderColor: "#800000",
    separatorLine: "#800000",
    accentText: "#800000",
    accentButtonBg: "#800000",
    secondaryIconColor: "#7e7d86",
    danger: "#fa0000",
    primaryButtonBg: "#ededef",
    primaryButtonText: "#131418",
    secondaryText: "#7e7d86",
    modalBg: "#000000",
  },
})

const Home: NextPage = () => {
  const showConnectEmbed = useShowConnectEmbed();
  return (
    <main className={styles.main}>
      <div>
        {showConnectEmbed ? (
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
          }}>
            <div style={{
              width: '50%',
              height: '100vh',
              backgroundColor: 'maroon',
            }}> 
            </div>
            <div style={{
              width: '50%',
              height: '100vh',
              backgroundColor: 'black',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <h1>Welcome to the Tribe</h1>
              <h3>Login to start</h3>
              <ConnectEmbed 
              theme={customTheme}
              showThirdwebBranding={false}
              style={{border: 'none'}}
              auth={{ loginOptional: false }}
              />
            </div>
          </div>
        ) : (
          <main className={styles.main}>
              <div>
                <ConnectedPage />
              </div>
              <div className={styles.container}>
                  <div className={styles.statusContainer}>
                      <UserStatus />
                  </div>
                  <h3>Status Feed</h3>
                  <StatusEvents />
              </div>
          </main>
        )}
        
      </div>
    </main>
  );
};

export default Home;
