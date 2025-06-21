import { useState, useEffect } from 'react';

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      try {
        const memos = await contract.getMemos();
        setMemos(memos);
      } catch (error) {
        console.error("❌ Failed to fetch memos:", error);
      }
    };

    if (contract) {
      memosMessage();
    }
  }, [contract]);

  return (
    <>
      <p><strong>Messages:</strong></p>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Message</th>
            <th>From</th>
          </tr>
        </thead>
        <tbody>
          {memos.map((memo, idx) => (
            <tr key={idx}>
              <td>{memo.name}</td>
              <td>{new Date(Number(memo.timestamp) * 1000).toLocaleString()}</td>
              <td>{memo.message}</td>
              <td>{memo.from}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Memos;