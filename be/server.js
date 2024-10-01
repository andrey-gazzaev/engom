const express = require("express");
const { postgraphile } = require("postgraphile");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(
	postgraphile(process.env.DATABASE_URL, "public", {
		watchPg: true,
		graphiql: true,
		enhanceGraphiql: true,
		appendPlugins: [require("postgraphile-plugin-connection-filter")],
	}),
);

app.listen(5433);
