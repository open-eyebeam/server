import { Room, Client } from "colyseus.js";
import { v4 as uuidv4 } from "uuid";
import { uniqueNamesGenerator, names, adjectives, colors, animals } from "unique-names-generator";

// SAMPLE COMMAND FROM FILE ROOT: npx colyseus-loadtest ./loadtest/passive.ts --room game  --numClients 500 --delay 500 --endpoint wss://{YOUR_SERVER}/

export function requestJoinOptions(this: Client, i: number) {
  const randomName: string = uniqueNamesGenerator({
    separator: " ",
    length: 1,
    style: "capital",
    dictionaries: [names],
  });

  const randomUUID = uuidv4();
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return {
    requestNumber: i,
    name: randomName,
    uuid: randomUUID,
    shape: "6ddddafe-4acb-4c52-a59e-34a08aca8b86",
    onboarded: true,
    room: "a8ae1c02-abe7-42d0-a704-6ecfe0ea0dc0",
    x: getRandomInt(0, 30),
    y: getRandomInt(0, 20),
  };
}

export function onJoin(this: Room) {
  console.log(this.sessionId, "joined.");
  const randomName: string = uniqueNamesGenerator({
    separator: " ",
    length: 1,
    style: "capital",
    dictionaries: [names],
  });

  const randomUUID = uuidv4();

  setInterval(() => {
    if (Math.floor(Math.random() * (20 - 1 + 1)) + 1 == 5) {
      console.log("** GOING:", this.sessionId);
      this.send("go", { x: Math.floor(Math.random() * (4950 - 50 + 1)) + 50, y: Math.floor(Math.random() * (4950 - 50 + 1)) + 50 });
    }
  }, 1000);
  setInterval(() => {
    if (Math.floor(Math.random() * (20 - 1 + 1)) + 1 == 5) {
      console.log("** MSG:", this.sessionId);
      const message: string = uniqueNamesGenerator({
        separator: " ",
        length: 3,
        dictionaries: [adjectives, colors, animals],
      });
      this.send("submitChatMessage", {
        name: randomName,
        uuid: randomUUID,
        msgId: uuidv4(),
        text: message,
        authenticated: true,
        room: "a8ae1c02-abe7-42d0-a704-6ecfe0ea0dc0",
      });
    }
  }, 1000);

  this.onMessage("*", (type, message) => {
    // console.log(this.sessionId, "received:", type, message);
  });
}

export function onLeave(this: Room) {
  console.log(this.sessionId, "left.");
}

export function onError(this: Room, err: any) {
  console.log(this.sessionId, "!! ERROR !!", err.message);
}

export function onStateChange(this: Room, state: any) {
  // console.log("new state", Date.now());
}
