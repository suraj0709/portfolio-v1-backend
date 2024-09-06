import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post("/leetcode", async (req, res) => {
  const { username } = req.body;

  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum {
            count
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      "https://leetcode.com/graphql/",
      {
        query,
        variables: { username },
      },
      {
        headers: {
          "Content-Type": "application/json",
          referer: `https://leetcode.com/${username}/`,
        },
      }
    );
    // console.log(res.json(response.data));
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from LeetCode:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(port, () => {
  console.log(`This Proxy server running at http://localhost:${port}`);
});
