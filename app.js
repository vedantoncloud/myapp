// app.js
const express = require("express");
const app = express();

// keep the old test string for the unit test
function hello() {
  return "Hello from MyApp - dev";
}

// public route shows CI/CD message
app.get("/", (req, res) => {
  res.send("Hello from MyApp - CI/CD Working!");
});

// export the Express app and the hello() function for tests
module.exports = { app, hello };

// Only start the server when this file is run directly (node app.js),
// not when imported by tests (require).
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    // only log when actually starting the server
    console.log(`Server running on port ${PORT}`);
  });
}
