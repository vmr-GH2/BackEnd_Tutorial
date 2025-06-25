const axios = require("axios");

exports.githubLogin = (req, res) => {
  const redirectURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_CALLBACK_URL}`;
  res.redirect(redirectURL);
};

exports.githubCallback = async (req, res) => {
  const { code } = req.query;

  try {
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    const accessToken = tokenRes.data.access_token;
    res.cookie("github_token", accessToken, { httpOnly: true });// Store token in cookie.   
    res.redirect("/profile"); // Redirect to profile after successful login
   
  } catch (err) {
    console.error("OAuth error:", err.message);
    res.status(500).send("Authentication failed");
  }
};


// Fetch and display user profile
exports.getProfile = async (req, res) => {
  const token = req.cookies.github_token;
  if (!token) {
    return res.status(401).send("Not authenticated");
  }
  
  try {
    const userRes = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    const user = userRes.data;
    res.send(`
      <h2 >Login successful! Token stored in cookie.</h2>
      <h2>Welcome, ${user.name || user.login}</h2>
      <p><strong>GitHub username:</strong> ${user.login}</p>
      <p><strong>Bio:</strong> ${user.bio || "N/A"}</p>
      <img src="${user.avatar_url}" width="100" style="border-radius: 8px;" />
      <br/><br/>
      <a href="/logout">Logout</a>
    `);
  } catch (err) {
    console.error("Failed to fetch GitHub profile:", err.message);
    res.status(500).send("Error fetching profile");
  }
};

// Logout - clear cookie
exports.logout = (req, res) => {
  res.clearCookie("github_token");
  res.send("<h2>You have been logged out. <a href='/'>Go Home</a></h2>");
};
