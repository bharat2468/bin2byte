import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
	path: "./env",
});

connectDB()
	.then(() => {
		app.on("errror", (error) => {
			console.log(error);
		});
		app.listen(process.env.PORT, () => {
			console.log(`app listening on port ${process.env.PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
		process.exit(1);
	});
