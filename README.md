# Ed25519 NPM Package

### Description
NPM package for parts of [SUPERCOP's Ed25519 implementation](https://bench.cr.yp.to/supercop.html).

This package will attempt to use the following modules in the order they are listed. This results in the fastest Ed25519 implementation being used on every platform.
* [Ed25519 React Native Module](https://github.com/NicolasFlamel1/Ed25519-React-Native-Module)
* [Ed25519 Node.js Addon](https://github.com/NicolasFlamel1/Ed25519-Node.js-Addon)
* [Ed25519 WASM Wrapper](https://github.com/NicolasFlamel1/Ed25519-WASM-Wrapper)
