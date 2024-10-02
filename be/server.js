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
		jwtSecret:process.env.JWT_SECRET,
		jwtPgTypeIdentifier: "public.token"
	}),
);

app.listen(process.env.SERVER_PORT);
