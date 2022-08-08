import { parse, join } from "path";
import { createWriteStream } from "fs";
import { URL } from "../../config";

export default {
	Query: {
		info: () => "This is the info endpoint",
	},
	Mutation: {
		imageUploader: async (_, { file }, { isAuth }) => {
			if (!isAuth) {
				throw new ApolloError("Not Authorization User", 401);
			}
			const { filename, createReadStream } = await file;

			let stream = createReadStream();

			let { ext, name } = parse(filename);
			name = name.replace(/([^a-z0-9 ]+)/gi, "-").replace(" ", "_");

			let serverFile = join(
				__dirname,
				`../../assets/${name}-${Date.now()}${ext}`
			);

			let writeStream = await createWriteStream(serverFile);
			await stream.pipe(writeStream);

			serverFile = `${URL}${serverFile.split("assets")[1]}`;

			return serverFile;
		},
	},
};
