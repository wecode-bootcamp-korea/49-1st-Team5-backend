app.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === undefined || password === undefined) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    const Dbcheck = await myDataSource.query(`
        SELECT id, email FROM users WHERE email='${email}';
       `);

    if (Dbcheck.length == 0) {
      const error = new Error("NOT_FOUND_EMAIL");
      error.statusCode = 400;
      throw error;
    }

    const passwordCheck = Dbcheck[0].password;
    if (password == passwordCheck) {
      const error = new Error("INVALID_PASSWORD");
      error.statusCode = 400;
      throw error;
    }

    console.log("LOGIN_SUCCESS");
    return res.status(200).json({ message: "LOGIN_SUCCESS " });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode).json({ message: err.message });
  }
});
