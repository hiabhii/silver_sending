import abi from "./contract/Lock.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./component/Buy";
import Memos from "./component/Memos";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      try {
        const contractAddress = "0x35CaC9B6073cEEE66B348CfD557DBCAE4A14de1d";
        const contractABI = abi.abi;

        if (!window.ethereum) {
          alert("Please install MetaMask!");
          return;
        }

        await window.ethereum.request({ method: "eth_requestAccounts" });

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();;
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        setState({ provider, signer, contract });
      } catch (error) {
        console.error("Wallet connection error:", error);
      }
    };

    connectWallet();
  }, []);

  return (
    <div className="App">
      <Buy state={state}  />
      <Memos state={state}/>
    </div>
  );
}

export default App;