const express = require("express");
const app = express();

/* Test ke liye required */
function hello() {
  return "Hello from MyApp - dev";
}

/* Main route for Render */
app.get("/", (req, res) => {
  res.send("Hello from MyApp - CI/CD Working!");
});

/* Health check route (Render + CI monitoring) */
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

/* Export for Jest tests */
module.exports = { app, hello };

/* Local server only when run directly */
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
