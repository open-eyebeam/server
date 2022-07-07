import { Room, Client } from "colyseus.js"
import { v4 as uuidv4 } from "uuid"
import {
  uniqueNamesGenerator,
  names,
} from "unique-names-generator"

export function requestJoinOptions(this: Client, i: number) {
  const randomName: string = uniqueNamesGenerator({
    separator: " ",
    length: 1,
    style: "capital",
    dictionaries: [names],
  })

  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  return {
    requestNumber: i,
    name: randomName,
    uuid: uuidv4(),
    shape: "6ddddafe-4acb-4c52-a59e-34a08aca8b86",
    onboarded: true,
    room: "45210a4c-6807-43d9-9e35-55d47dfad271",
    x: getRandomInt(0, 44),
    y: getRandomInt(0, 27),
  }
}

export function onJoin(this: Room) {
  console.log(this.sessionId, "joined.")

  // setInterval(() => {
  //     if (Math.floor(Math.random() * (20 - 1 + 1)) + 1 == 5) {
  //         console.log("** GOING:", this.sessionId,);
  //         this.send("go", { x: Math.floor(Math.random() * (4950 - 50 + 1)) + 50, y: Math.floor(Math.random() * (4950 - 50 + 1)) + 50 });
  //     }
  // }, 1000);

  this.onMessage("*", (type, message) => {
    // console.log(this.sessionId, "received:", type, message);
  })
}

export function onLeave(this: Room) {
  console.log(this.sessionId, "left.")
}

export function onError(this: Room, err: any) {
  console.log(this.sessionId, "!! ERROR !!", err.message)
}

export function onStateChange(this: Room, state: any) {
  // console.log("new state", Date.now());
}
