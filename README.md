# TypeScript `soundworks-template`

This template is based on the original `soundworks-template` while supporting TypeScript in the developing process. The local `tsconfig.json` is used for the configuration. Please beware, that that `"noEmit": true` should be enabled to actually not build the output, but only to check it. 



> Project template for developing [*soundworks*](https://github.com/collective-soundworks/soundworks/) applications.

_For a complete documentation of *soundworks*, please refer to [http://collective-soundworks.github.io](http://collective-soundworks.github.io)_

## Creating a new application

```sh
git clone https://github.com/collective-soundworks/soundworks-template.git my-application
cd my-application
rm -Rf .git
npm install
npm run dev
```

## Internal tools

### `@soundworks/template-build`

The [`@soundworks/template-build`](https://github.com/collective-soundworks/soundworks-template-build) package contains all the build scripts for the `soundworks-template`

### `@soundworks/template-helpers`

The [`@soundworks/template-helpers`](https://github.com/collective-soundworks/soundworks-template-helpers) package contains common helpers (views, etc.) shared by most the applications.

## License

BSD-3-Clause
