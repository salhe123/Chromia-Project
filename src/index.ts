import { randomInt } from "crypto";
import * as pcl from "postchain-client";

async function simpleClient() {
  //Key pair
  const adminPubkey = Buffer.from(
    "031b84c5567b126440995d3ed5aaba0565d71e1834604819ff9c17f5e9d5dd078f",
    "hex"
  );
  const adminPrivkey = Buffer.from(
    "0101010101010101010101010101010101010101010101010101010101010101",
    "hex"
  );

  //Connection setup
  const nodeUrl = "http://localhost:7740/"; //Using default postchain node REST API port
  const blockchainRid = "11F6F7A21E30BDB7B134F90D414A7E23D60CAECED27775F46D9D02955BF3888C"; //Dapp Blockchain RID
  const chromiaClient = await pcl.createClient({
    nodeUrlPool: nodeUrl,
    blockchainRid: blockchainRid,
  });

  //Transaction
  const { status, statusCode, transactionRid } =
    await chromiaClient.signAndSendUniqueTransaction(
      {
        operations: [
          {
            name: "set_name",
            args: ["Developer"],
          },
        ],
        signers: [adminPubkey],
      },
      { privKey: adminPrivkey, pubKey: adminPubkey }
    );

  //Query
  const result = await chromiaClient.query("hello_world");

  console.log(result);
}

simpleClient();