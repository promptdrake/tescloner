const app = require('./app.js');
const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});


const api = require("caliph-api");
async function main() {
  console.log("Wet")
 const k = await api.tools.whois("aisbircubes.my.id")
 console.log(k)
}
main()