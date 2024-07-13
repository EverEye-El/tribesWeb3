import { BigNumber } from "ethers";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { truncateAddress } from "../utils/truncateAddress";

type EventCardProps = {
    walletAddress: string;
    newStatus: string;
    timeStamp: BigNumber;
};


export default function EventCard({ walletAddress, newStatus, timeStamp }: EventCardProps) {
    const date = new Date(timeStamp?.toNumber() * 1000);

  return (
    <div className={styles.eventCard}>
        <div className={styles.eventHeader}>
            <Link href={`/account/${walletAddress}`} style={{ color: "whitesmoke"}}>
                <p className={styles.connectedAddress}>{truncateAddress(walletAddress)}</p>
            </Link>
            <p style={{ fontSize: "0.75rem"}}>{ date.toLocaleTimeString()}</p>
        </div>
        <p style={{ fontSize: "16px"}}>{newStatus}</p>
    </div>
  );
};
