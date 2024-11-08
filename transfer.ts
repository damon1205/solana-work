import { Connection, LAMPORTS_PER_SOL, PublicKey, Keypair, T, Transaction, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js";
import { config, config as dotenv } from "dotenv"
dotenv();
import { getKeypairFromEnvironment, getKeypairFromFile } from "@solana-developers/helpers";
import bs58 from "bs58"

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
    throw new Error("Provide a public key to check the balance of!");
}

const privateKey = process.env.SECRET_KEY || "";

const secretKey = bs58.decode(privateKey);

const senderKeypair = Keypair.fromSecretKey(secretKey);
 
console.log(`suppliedToPubkey: ${suppliedPublicKey}`);
 
const toPubkey = new PublicKey(suppliedPublicKey);
 
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
 
console.log(
  `✅ Loaded our own keypair, the destination public key, and connected to Solana`, senderKeypair.publicKey.toBase58()
);

const balanceInLamports = await connection.getBalance(senderKeypair.publicKey);

console.log(balanceInLamports);

const transaction = new Transaction();
 
const LAMPORTS_TO_SEND = 500000000;
 
const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey,
  lamports: LAMPORTS_TO_SEND,
});
 
transaction.add(sendSolInstruction);

transaction.feePayer = senderKeypair.publicKey;
transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
 
console.log(await connection.simulateTransaction(transaction))
transaction.sign(senderKeypair);
const signature = await connection.sendRawTransaction(transaction.serialize(),{ skipPreflight: true })
 
console.log(
  `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `,
);
console.log(`Transaction signature is ${signature} !`);