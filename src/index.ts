import Box from "./components/Box";

function say(what:any) {
  console.log(what);
  return Box(1, 2);
}

const q = say("hi")

console.log(q)
