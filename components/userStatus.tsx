import { Web3Button, useAddress, useContract, useContractRead, useDisconnect } from "@thirdweb-dev/react";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { STATUS_CONTRACT_ADDRESS } from "../constants/constants";
import Link from "next/link";
import { truncateAddress } from "../utils/truncateAddress";

export default function UserStatus() {
    const address = useAddress() ?? ""; // <-- Added nullish coalescing operator here
    // const disconnect = useDisconnect();

    const [newStatus, setNewStatus] = useState("");
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [characterCount, setCharacterCount] =useState(0);
    const characterDecoration = characterCount > 2000 ? styles.characterCountOver : styles.characterCountUnder;


    const { contract } = useContract(STATUS_CONTRACT_ADDRESS);

    const { data: myStatus, isLoading: isMyStatusLoading } = useContractRead(
        contract,
        "getStatus",
        [address]
    );

    if(!address) {
        return (
            <div>
                <p>Please connect your wallet.</p>
            </div>
        )
    }

    return (
        <div className={styles.userContainer}>
            <div className={styles.statusHeader}>
                <Link href={`/account/${address}`} style={{ color: "whitesmoke"}}>
                    <p className={styles.connectedAddress}>{truncateAddress(address)}</p>
                </Link>
            </div>
            {!isMyStatusLoading && myStatus && (
                <div>
                    <p className={styles.statusText}>{myStatus}</p>
                </div>
            )}
            <button
                className={styles.updateButton}
                onClick={() => setIsStatusModalOpen(true)}>
                Update
            </button>

            {isStatusModalOpen && (
                <div className={styles.statusModalContainer}>
                    <div className={styles.statusModal}>
                        <div className={styles.statusModalHeader}>
                            <p>New Status:</p>
                            <button
                                onClick={() => setIsStatusModalOpen(false)}>
                            Close
                            </button>
                        </div>
                        <textarea 
                            value={newStatus}
                            onChange={(e) => {
                                setNewStatus(e.target.value);
                                setCharacterCount(e.target.value.length);
                            }}
                            placeholder="What's on your mind?"
                        />
                        <div className={styles.characterCountContainer}>
                            <p className={characterDecoration}>{characterCount}/2000</p>
                        </div>
                        <Web3Button className={styles.statusModalButton}
                            contractAddress={STATUS_CONTRACT_ADDRESS}
                            action={(contract) => contract.call(
                                "setStatus",
                                [newStatus]
                            )}
                            isDisabled={newStatus.length === 0 || newStatus.length > 2000}
                            onSuccess={() => {
                                setIsStatusModalOpen(false);
                                setNewStatus("");
                            }}
                        >Update Status</Web3Button>
                    </div>
                </div>
            )}
        </div>
    );
};