# Lazy Blocks Custom Control Select Dynamic

lazy-blocks custom control to offer a dynamic select containing wordpress posts, pages or categories

## Development

### Installation

- Install PHP `brew install php@7.4`, see https://stackoverflow.com/a/64724216
- Install Composer `brew install composer`
- Run `npm install` in the command line
- Make sure, you use the correct node version according to the `.node-version` file

### Building

- adjust plugin version in the files `lzb-select-dynamic.php` and `readme.md` to the new desired version depending on your changes
- `npm run build` to run build
- `npm run dev` to run build and start files watcher
- `npm run production` to run build and prepare zip files for production

### Testing

- Make sure you have increased the version number
- Run Production Task
- Create zip file from Folder within `dist`
- Install new version via Plugin Upload on your WP Test instance

### Releasing

- `git tag v1.0.0` to create a tag for the version to release
- `git push origin v1.0.0` to push the tag to trigger the git action
