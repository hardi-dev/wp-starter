/**
 * Installation
 */

const fs = require('fs');
const theCWD = process.cwd();
const theCWDArray = theCWD.split('/');
const theDir = theCWDArray[theCWDArray.length - 1];
const ora = require('ora');
const execa = require('execa');
const chalk = require('chalk');
const download = require('download');
const handleError = require('./handleError.js');
const clearConsole = require('./clearConsole.js');
const printNextSteps = require('./printNextSteps.js');

module.exports = () => {
	// Init.
	clearConsole();

	// Files.
	const filesToDownload = [
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/.babelrc',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/.gitignore',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/.stylelintrc',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/LICENSE',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/README.md',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/gulpfile.js',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/installer/package.json',

		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/assets/css/globals.css',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/assets/css/mixins.css',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/assets/css/style.css',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/assets/css/variables.css',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/assets/css/wordpressify.css',

		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/assets/js/main.js',

		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/theme/404.php',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/theme/archive.php',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/theme/comments.php',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/theme/content-none.php',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/theme/content-page.php',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/theme/content-single.php',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/theme/content.php',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/theme/footer.php',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/theme/functions.php',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/theme/header.php',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/theme/index.php',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/theme/page.php',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/theme/screenshot.png',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/theme/search.php',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/theme/searchform.php',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/theme/sidebar.php',
		'https://raw.githubusercontent.com/luangjokaj/wordpressify/v0.2.8-11/src/theme/single.php',
	];

	// Organise file structure
	const dotFiles = ['.babelrc', '.gitignore', '.stylelintrc'];
	const cssFiles = ['globals.css', 'mixins.css', 'style.css', 'variables.css', 'wordpressify.css'];
	const jsFiles = ['main.js'];
	const pluginFiles = ['README.md'];
	const themeFiles = [
		'404.php',
		'archive.php',
		'comments.php',
		'content-none.php',
		'content-page.php',
		'content-single.php',
		'content.php',
		'footer.php',
		'functions.php',
		'header.php',
		'index.php',
		'page.php',
		'screenshot.png',
		'search.php',
		'searchform.php',
		'sidebar.php',
		'single.php',
	];

	// Start.
	console.log('\n');
	console.log(
		'📦 ',
		chalk.black.bgYellow(` Downloading 🎈 WordPressify files in: → ${chalk.bgGreen(` ${theDir} `)}\n`),
		chalk.dim(`\n In the directory: ${theCWD}\n`),
		chalk.dim('This might take a couple of minutes.\n'),
	);

	const spinner = ora({ text: '' });
	spinner.start(`1. Creating 🎈 WordPressify files inside → ${chalk.black.bgWhite(` ${theDir} `)}`);

	// Download.
	Promise.all(filesToDownload.map(x => download(x, `${theCWD}`))).then(async () => {
		if (!fs.existsSync('src')) {
			await execa('mkdir', [
				'src',
				'src/theme',
				'src/plugins',
				'src/assets',
				'src/assets/css',
				'src/assets/js',
			]);
		}

		dotFiles.map(x =>
			fs.rename(`${theCWD}/${x.slice(1)}`, `${theCWD}/${x}`, err => handleError(err)),
		);
		cssFiles.map(x =>
			fs.rename(`${theCWD}/${x}`, `${theCWD}/src/assets/css/${x}`, err => handleError(err)),
		);
		jsFiles.map(x =>
			fs.rename(`${theCWD}/${x}`, `${theCWD}/src/assets/js/${x}`, err => handleError(err)),
		);
		themeFiles.map(x =>
			fs.rename(`${theCWD}/${x}`, `${theCWD}/src/theme/${x}`, err => handleError(err)),
		);
		spinner.succeed();

		// The npm install.
		spinner.start('2. Installing npm packages...');
		// await execa('npm', ['install', '--silent']);
		await execa('npm', ['install']);
		spinner.succeed();

		// Installing WordPress files
		spinner.start(`3. Installing WordPress files from ${chalk.green('https://wordpress.org/')} ...`);
		await execa('npm', ['run', 'install:wordpress']);
		spinner.succeed();

		// Done.
		printNextSteps();
	});
};
