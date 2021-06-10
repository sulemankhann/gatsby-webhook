const express = require("express")
const { exec } = require("child_process")
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static("public"))

app.post("/gatsbywebhook", (req, res) => {
  const { from } = req.headers
  if (from === "Strapi") {
    console.log(`Gatsby build is triggered at ${Date.now()}`)
    exec(`npm run build`, (err, stdout, stderr) => {
      if (err) {
        console.log("Builld failed with", err, stderr)
      } else {
        console.log(stdout)
      }
    })
    res.json({ message: `Gatsby build is triggered at ${Date.now()}` })
  } else {
    res.json({
      message: `Gatsby build is not triggered, Header is not correct.`,
    })
  }
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
