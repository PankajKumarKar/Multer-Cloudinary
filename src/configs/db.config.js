const { connect } = require("mongoose");

exports.dbConnect = () => {
  connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(
    (conn) => {
      console.log("Db Connected !", conn.connection.host);
    },
    (err) => {
      console.error("Db Connection failed !", err);
      process.exit(1);
    }
  );
};
