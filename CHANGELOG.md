# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.7.3](https://github.com/sarneeh/reaptcha/compare/v1.7.2...v1.7.3) (2021-09-03)

**Note:** Version bump only for package reaptcha-monorepo

<a name="1.7.2"></a>

## [1.7.2](https://github.com/sarneeh/reaptcha/compare/v1.7.1...v1.7.2) (2019-12-28)

### Bug Fixes

- update component on className change ([3a376d4](https://github.com/sarneeh/reaptcha/commit/3a376d4)), closes [#189](https://github.com/sarneeh/reaptcha/issues/189)

<a name="1.7.1"></a>

## [1.7.1](https://github.com/sarneeh/reaptcha/compare/v1.7.0...v1.7.1) (2019-12-28)

### Bug Fixes

- add getResponse method ([ab57db7](https://github.com/sarneeh/reaptcha/commit/ab57db7))

### Features

- added getResponse example ([274e4cf](https://github.com/sarneeh/reaptcha/commit/274e4cf))

<a name="1.7.0"></a>

# [1.7.0](https://github.com/sarneeh/reaptcha/compare/v1.6.0...v1.7.0) (2019-10-20)

### Bug Fixes

- add missing render prop ([2137d81](https://github.com/sarneeh/reaptcha/commit/2137d81))
- cant call this.props.children cause getResponse missing ([77ee190](https://github.com/sarneeh/reaptcha/commit/77ee190))
- could not find react and react-dom for tests ([ecea312](https://github.com/sarneeh/reaptcha/commit/ecea312))
- eslint lint node_modules contents ([c7d86c3](https://github.com/sarneeh/reaptcha/commit/c7d86c3))
- release script missing run at npm build ([df5076d](https://github.com/sarneeh/reaptcha/commit/df5076d))
- resolve and reject not defined ([eac3a13](https://github.com/sarneeh/reaptcha/commit/eac3a13))
- use npm inside scripts ([64feee1](https://github.com/sarneeh/reaptcha/commit/64feee1))

### Features

- added getResponse to types ([33d6d16](https://github.com/sarneeh/reaptcha/commit/33d6d16))
- exposed getResponse ([c0793aa](https://github.com/sarneeh/reaptcha/commit/c0793aa))

<a name="1.5.1"></a>

## [1.5.1](https://github.com/sarneeh/reaptcha/compare/v1.5.0...v1.5.1) (2019-06-28)

### Features

- add typescript definitions ([c2a4f3](https://github.com/sarneeh/reaptcha/commit/c2a4f3))

<a name="1.5.0"></a>

# [1.5.0](https://github.com/sarneeh/reaptcha/compare/v1.4.2...v1.5.0) (2019-05-25)

### Bug Fixes

- **theme:** support invisible dark mode ([44c6c82](https://github.com/sarneeh/reaptcha/commit/44c6c82))

<a name="1.4.2"></a>

## [1.4.2](https://github.com/sarneeh/reaptcha/compare/v1.4.1...v1.4.2) (2019-01-18)

### Bug Fixes

- script detection ([5634d35](https://github.com/sarneeh/reaptcha/commit/5634d35)), closes [#18](https://github.com/sarneeh/reaptcha/issues/18)

<a name="1.4.1"></a>

## [1.4.1](https://github.com/sarneeh/reaptcha/compare/v1.4.0...v1.4.1) (2019-01-11)

### Bug Fixes

- **package:** update styled-components to version 4.0.3 ([9bd381a](https://github.com/sarneeh/reaptcha/commit/9bd381a))
- **package:** update styled-components to version 4.1.0 ([f3fe8d9](https://github.com/sarneeh/reaptcha/commit/f3fe8d9))
- **package:** update styled-components to version 4.1.2 ([75e76aa](https://github.com/sarneeh/reaptcha/commit/75e76aa))
- **package:** update styled-components to version 4.1.3 ([8d5b72c](https://github.com/sarneeh/reaptcha/commit/8d5b72c))

<a name="1.4.0"></a>

# [1.4.0](https://github.com/sarneeh/reaptcha/compare/v1.3.0...v1.4.0) (2018-10-25)

### Bug Fixes

- ava tests on babel 7 ([4370fc6](https://github.com/sarneeh/reaptcha/commit/4370fc6))
- babel-loader version bump breaking build ([2ed8d81](https://github.com/sarneeh/reaptcha/commit/2ed8d81))
- better test when hl parameter is not specified ([eed56be](https://github.com/sarneeh/reaptcha/commit/eed56be))
- if hl param is specified, inject it in script ([2ad96a8](https://github.com/sarneeh/reaptcha/commit/2ad96a8))
- use props hl to init script to set up the correct language ([ebeb734](https://github.com/sarneeh/reaptcha/commit/ebeb734))
- using formik field outside of formik form crashes the app ([d91ca6e](https://github.com/sarneeh/reaptcha/commit/d91ca6e)), closes [#59](https://github.com/sarneeh/reaptcha/issues/59)

<a name="1.3.0"></a>

# [1.3.0](https://github.com/sarneeh/reaptcha/compare/v1.2.1...v1.3.0) (2018-07-22)

### Bug Fixes

- cleanup on unmount, removed deprecated react methods ([7c30ba4](https://github.com/sarneeh/reaptcha/commit/7c30ba4)), closes [#29](https://github.com/sarneeh/reaptcha/issues/29) [#28](https://github.com/sarneeh/reaptcha/issues/28) [#26](https://github.com/sarneeh/reaptcha/issues/26)
- do not inject script when one already present ([5db105d](https://github.com/sarneeh/reaptcha/commit/5db105d)), closes [#18](https://github.com/sarneeh/reaptcha/issues/18)

<a name="1.2.1"></a>

## [1.2.1](https://github.com/sarneeh/reaptcha/compare/v1.2.0...v1.2.1) (2018-07-04)

### Bug Fixes

- default container classname ([d2071fa](https://github.com/sarneeh/reaptcha/commit/d2071fa))

<a name="1.2.0"></a>

# [1.2.0](https://github.com/sarneeh/reaptcha/compare/v1.1.0...v1.2.0) (2018-07-04)

### Features

- **render:** language support with `hl` ([7bd5e90](https://github.com/sarneeh/reaptcha/commit/7bd5e90))

<a name="1.1.0"></a>

# [1.1.0](https://github.com/sarneeh/reaptcha/compare/v1.0.0...v1.1.0) (2018-06-13)

### Features

- make package usable in script tags ([c5ac515](https://github.com/sarneeh/reaptcha/commit/c5ac515))

<a name="1.1.0-beta.1"></a>

# [1.1.0-beta.1](https://github.com/sarneeh/reaptcha/compare/v1.0.0...v1.1.0-beta.1) (2018-06-13)

### Features

- make package usable in script tags ([ac0733a](https://github.com/sarneeh/reaptcha/commit/ac0733a))

<a name="1.1.0-beta.0"></a>

# [1.1.0-beta.0](https://github.com/sarneeh/reaptcha/compare/v1.0.0...v1.1.0-beta.0) (2018-06-13)

### Features

- make package usable in script tags ([ac0733a](https://github.com/sarneeh/reaptcha/commit/ac0733a))

<a name="1.0.0"></a>

# [1.0.0](https://github.com/sarneeh/reaptcha/compare/v0.1.0-beta.1...v1.0.0) (2018-06-13)

**Note:** Version bump only for package reaptcha-monorepo

<a name="0.1.0-beta.1"></a>

# [0.1.0-beta.1](https://github.com/sarneeh/reaptcha/compare/v0.1.0-beta.0...v0.1.0-beta.1) (2018-06-13)

### Bug Fixes

- **example:** reset submitted flag on expire ([76936ff](https://github.com/sarneeh/reaptcha/commit/76936ff))
- config flow type in example ([c5fe42e](https://github.com/sarneeh/reaptcha/commit/c5fe42e))
- don't reset on execution ([8047e1e](https://github.com/sarneeh/reaptcha/commit/8047e1e))
- proper flow types ([36beb16](https://github.com/sarneeh/reaptcha/commit/36beb16))
- reset recaptcha before execute ([e75a355](https://github.com/sarneeh/reaptcha/commit/e75a355))

### Features

- **example:** add invisible size configuration option ([3ba6841](https://github.com/sarneeh/reaptcha/commit/3ba6841))
- **example:** add render method configuration option ([88302c7](https://github.com/sarneeh/reaptcha/commit/88302c7))
- **example:** create one example component for both render methods ([e434ecb](https://github.com/sarneeh/reaptcha/commit/e434ecb))
- example as a form ([7dae749](https://github.com/sarneeh/reaptcha/commit/7dae749))
- **example:** footer ([77d8d12](https://github.com/sarneeh/reaptcha/commit/77d8d12))
- **example:** fully functional and covered example ([38d5496](https://github.com/sarneeh/reaptcha/commit/38d5496))
- **example:** handle render param in example component ([3f50a42](https://github.com/sarneeh/reaptcha/commit/3f50a42))
- **example:** recaptcha status indicators ([a7f9ddc](https://github.com/sarneeh/reaptcha/commit/a7f9ddc))
- **example:** remove react-router, make app single-routed ([acbae8a](https://github.com/sarneeh/reaptcha/commit/acbae8a))
- **example:** reset button ([be44f80](https://github.com/sarneeh/reaptcha/commit/be44f80))

<a name="0.1.0-beta.0"></a>

# 0.1.0-beta.0 (2018-06-12)

**Note:** Version bump only for package undefined
