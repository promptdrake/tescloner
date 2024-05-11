const app = require('./app.js');
const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

const fs = require("fs")
async function resetLimit() {
  const db = JSON.parse(fs.readFileSync('./database/api.json', "utf-8"))
  for (const data of db) {
      data.limit = 20
      fs.writeFileSync('./database/api.json', JSON.stringify(db, null, 2))
  }
  console.log("Reset Limit Success")
}

setInterval(resetLimit, 1800000);
