const fs = require('fs');
const path = require('path');

//specify path to file
const sourceDirA = 'files/dirA';
const sourceDirB = 'files/dirB';

//define file dir fetcher
const walkSync = (dir, filelist = []) =>
	fs
		.readdirSync(dir)
		.map(
			(file) =>
				fs.statSync(path.join(dir, file)).isDirectory()
					? walkSync(path.join(dir, file), filelist)
					: filelist.concat(path.join(dir, file))[0]
		);

const doSomethingWithFile = (dir, content) => {
	console.log(`----------------------------`);
	console.log(`Content of "${dir}":\n`, content);
};

//get all files dir
const scriptsA = walkSync(sourceDirA);
const scriptsB = walkSync(sourceDirB);

console.log('File list A', scriptsA);
console.log('File list B', scriptsB);

//Read content of files on list A
scriptsA.forEach(async (file) => {
	const sql = fs.readFileSync(file).toString();
	doSomethingWithFile(file, sql);
});
//Read content of files on list B
scriptsB.forEach(async (file) => {
	const sql = fs.readFileSync(file).toString();
	doSomethingWithFile(file, sql);
});
