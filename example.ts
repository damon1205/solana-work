import { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
 
const connection = new Connection(clusterApiUrl("devnet"));
const address = new PublicKey("9C7C55aVuMhHi9xZjBGLd9rKwU6jQet5K585iEzmHdwP");
const balance = await connection.getBalance(address);
console.log(`The balance of the account at ${address} is ${balance} lamports`);
const balanceInSol = balance / LAMPORTS_PER_SOL;
console.log(`The balance of the account at ${address} is ${balanceInSol} SOL`);
console.log(`✅ Connected!`);