import { ConnectWallet } from "@thirdweb-dev/react"

const ConnectedPage = () => {
    
    return (
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
            }}>
                <h3>Tribes Web3</h3>   
                <ConnectWallet />             
            </div>
        </div>
    )
};

export default ConnectedPage;