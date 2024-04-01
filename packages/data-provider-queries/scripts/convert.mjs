/* eslint-disable no-undef */
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join, relative } from "node:path";
import walkdir from "walkdir";
import yargs from "yargs";

console.log(yargs);
const { input, output } = yargs(process.argv.slice(2))
	.option("input", {
		alias: "i",
		type: "string",
		description: "Input directory",
		demandOption: true,
	})
	.option("output", {
		alias: "o",
		type: "string",
		description: "Output directory",
		demandOption: true,
	}).argv;

async function convert() {
	const files = walkdir.sync(input).filter((file) => file.endsWith(".json"));
	for await (const file of files) {
		const data = JSON.parse(await readFile(file, "utf-8"));
		const converted = JSON.stringify(data, null, 2);
		const location = join(output, relative(input, file));
		const dir = dirname(location);
		if (!existsSync(dir)) {
			await mkdir(dir, { recursive: true });
		}
		await writeFile(location, converted);
		await writeFile(
			join(output, basename(location.replace(/\.json$/, ".ts"))),
			`export default ${converted} as const;`,
		);
	}
	return files.length;
}

convert()
	.then((count) => console.log(`Converted ${count} files`))
	.catch((err) => {
		console.error(err);
		throw err;
	});
