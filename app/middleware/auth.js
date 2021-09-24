const axios = require("axios");

exports.authenticateUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token || token == "null") {
    return res.send({
      success: 0,
      loggedIn: 0,
      message: "no user logged in",
    });
  }

  const options = {
    method: "post",
    url: "https://internal-auth.coutloot.com/auth/validate",
    headers: { token },
  };

  try {
    let session = await axios(options);

    if (session.success === 0) {
      res.clearCookie("token");
      return res.send({
        success: 0,
        loggedIn: 0,
        message: "no user logged in",
      });
    }

    if (!session.data) return res.send({ success: 0, loggedIn: 0 });
    session = session.data;
    const { userId, name, phone, email, team, role } = session.data;

    req.loggedInUser = {
      userId,
      name,
      phone,
      email,
      team,
      role,
    };

    return req.loggedInUser && next();
  } catch (error) {
    return res.send({
      success: 0,
      message: "Too much time. Please check internet and refresh after some time",
    });
  }
};
