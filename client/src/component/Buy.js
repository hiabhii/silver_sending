import { ethers } from "ethers";

const Buy = ({ state }) => {
  const buysilver = async (event) => {
    event.preventDefault();

    const { contract } = state;

    // ⚠️ Guard: Ensure contract is available
    if (!contract) {
      alert("Contract not loaded yet. Please wait...");
      return;
    }

    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    console.log("Sending:", name, message);

    try {
      const amount = { value: ethers.parseEther("0.01") }; // ✅ ethers v6
      const transaction = await contract.buysilver(name, message, amount);
      await transaction.wait();
      console.log("✅ Transaction successful:", transaction);
    } catch (err) {
      console.error("❌ Transaction failed:", err);
    }
  };

  return (
    <>
      <form onSubmit={buysilver}>
        <label>Name</label>
        <input type="text" id="name" placeholder="Enter your name" />
        <label>Message</label>
        <input type="text" id="message" placeholder="Enter your message" />
        <button type="submit">Pay</button>
      </form>
    </>
  );
};

export default Buy;