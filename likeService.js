app.post("/threads/like", async (req, res) => {
    try {
      const userData = await AppDataSource.query(
        `insert into users,likes('','',''),{?,?,?}
        `,[,,,]
      );
      return res.status(200).json({
        USERS: "users",
      });
    } catch (error) {
      console.log(error);
    }
  });