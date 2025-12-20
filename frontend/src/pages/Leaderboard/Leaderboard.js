// import { useEffect, useState } from "react";

// function Leaderboard() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetch("https://coding-platform-beige.vercel.app/leaderboard")
//       .then(res => res.json())
//       .then(setUsers);
//   }, []);

//   return (
//     <div>
//       <h2>🏆 Leaderboard</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Rank</th>
//             <th>User</th>
//             <th>Score</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u, i) => (
//             <tr key={u._id}>
//               <td>{i + 1}</td>
//               <td>{u.username}</td>
//               <td>{u.totalScore}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Leaderboard;
import { useEffect, useState } from "react";

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://34.207.145.160:3001/leaderboard")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setUsers(data);
        else setUsers([]);
      })
      .catch(() => setUsers([]));
  }, []);

  return (
    <div>
      <h2>🏆 Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u._id}>
              <td>{i + 1}</td>
              <td>{u.username}</td>
              <td>{u.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
