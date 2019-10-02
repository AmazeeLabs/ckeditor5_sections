# CKEditor5 Sections

Drupal editor plugin that allows content editors to create pages from an 
extensible set of section templates. User input is stored as html blobs, but
structured information is exposed to typed data.

## Dependencies

- Media library
- Linkit

## Developing

1. Change into the `editor` folder.
2. Do any changes.
3. Run `yarn build`.
4. Commit the build result.

### CKEditor5 inspector

From V12 onwards CKEditor comes with a nifty [inspector](https://ckeditor.com/docs/ckeditor5/latest/framework/guides/development-tools.html#ckeditor-5-inspector).
To enable it follow these steps:

1. Add a line to the `parameters` section of `development.services.yml`: `ckeditor5_sections.enable_inspector: true`
2. Make sure to run `yarn install` in the `editor/`-subfolder to install it.
3. Rebuild caches `drush cr`.

Subsequently it will be attached automatically to all CKEditor5 instances.
