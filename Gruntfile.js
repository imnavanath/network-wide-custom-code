module.exports = function (grunt) {
	grunt.initConfig({
		copy: {
			main: {
				options: {
					mode: true
				},
				src: [
					'**',
					'*.zip',
					'!node_modules/**',
					'!build/**',
					'!css/sourcemap/**',
					'!admin/src/**',
					'!.git/**',
					'!bin/**',
					'!.gitlab-ci.yml',
					'!bin/**',
					'!tests/**',
					'!phpunit.xml.dist',
					'!*.sh',
					'!*.map',
					'!Gruntfile.js',
					'!package.json',
					'!.gitignore',
					'!phpunit.xml',
					'!README.md',
					'!sass/**',
					'!codesniffer.ruleset.xml',
					'!vendor/**',
					'!composer.json',
					'!composer.lock',
					'!package-lock.json',
					'!phpcs.xml.dist',
					'!phpcs.xml',
					'!postcss.config.js',
					'!tailwind.config.js',
					'!webpack.config.js',
				],
				dest: 'network-wide-custom-code/'
			}
		},

		compress: {
			main: {
				options: {
					archive: 'network-wide-custom-code.zip',
					mode: 'zip'
				},
				files: [
					{
						src: [
							'./network-wide-custom-code/**'
						]

					}
				]
			}
		},

		clean: {
			main: ["network-wide-custom-code"],
			zip: ["network-wide-custom-code.zip"],
		},

		makepot: {
			target: {
				options: {
					domainPath: '/',
					mainFile: 'network-wide-custom-code.php',
					potFilename: 'languages/nwcc.pot',
					potHeaders: {
						poedit: true,
						'x-poedit-keywordslist': true
					},
					type: 'wp-plugin',
					updateTimestamp: true
				}
			}
		},

		wp_readme_to_markdown: {
			your_target: {
				files: {
					"README.md": "readme.txt"
				}
			},
		},

		addtextdomain: {
			options: {
				textdomain: 'nwcc',
			},
			target: {
				files: {
					src: ['*.php', '**/*.php', '!node_modules/**', '!php-tests/**', '!bin/**']
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-wp-i18n');

	/* Read File Generation task */
	grunt.loadNpmTasks("grunt-wp-readme-to-markdown");

	// Generate Read me file
	grunt.registerTask( "readme", ["wp_readme_to_markdown"] );

	grunt.registerTask('i18n', ['addtextdomain', 'makepot']);
	grunt.registerTask('release', ['clean:zip', 'copy', 'compress', 'clean:main']);
};
