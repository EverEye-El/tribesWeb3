import type { AppProps } from "next/app";
import { ThirdwebProvider, 
metamaskWallet,
coinbaseWallet,
walletConnect,
phantomWallet,
embeddedWallet,
smartWallet} from "@thirdweb-dev/react";
import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";
import "../styles/globals.css";
import { ACCOUNT_FACTORY_ADDRESS } from "../constants/constants"; 

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = "mumbai";

const smartWalletConfig = {
  factoryAddress: ACCOUNT_FACTORY_ADDRESS,
  gasless: true,
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={PolygonAmoyTestnet}
      supportedWallets={[
        smartWallet(
          metamaskWallet(),
          smartWalletConfig,
        ),
        smartWallet(
          coinbaseWallet(),
          smartWalletConfig,
        ),
        smartWallet(
          walletConnect(),
          smartWalletConfig,
        ),
        smartWallet(
          embeddedWallet({
            auth: {
              options: [
                "email",
                "google",
                "apple",
                "facebook",
              ],
            },
          }),
          smartWalletConfig,
        ),
        smartWallet(
          phantomWallet(),
          smartWalletConfig,
        ),
      ]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
