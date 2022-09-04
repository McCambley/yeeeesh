const cron = require("node-cron");

console.log("Hello!");

const sayHello = () => {
  console.log("running a task every minute");
};

cron.schedule("* * * * *", sayHello);
