<h1 align="center" id="svelte-repel-cursor">Svelte Repel Cursor</h1>

[![license](https://img.shields.io/npm/l/svelte.svg)](https://raw.githubusercontent.com/JuanDAC/power-styles/main/LICENSE) 

>  The svelte-repel-cursor provider a action of svelte that repel do it the element repel the cursor

## Prerequisites

This library requires Svelte 3.x.x (version 3 or later).
[Svelte](https://svelte.dev/) are really easy to install.

## Table of contents

- [Svelte Repel Cursor](#svelte-repel-cursor)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)


## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

To install and set up the library, run:

```sh
$ npm install svelte-repel-cursor
```

Or if you prefer using Yarn:

```sh
$ yarn add svelte-repel-cursor
```
## Usage for Svelte Kit 

[//]: `Font.svelte`:


[//]: ![Font](https://github.com/JuanDAC/power-styles/blob/main/examples/simple_font.png?raw=true)

[//]: ```html
<!-- Font.svelte -->
<script>
  import powerStyles from "power-styles";
	import { browser } from '$app/env';
	const { FontSize } = browser ? powerStyles() : {};

  export let fontSize = CSS.em(2);
</script>

<p use:FontSize={fontSize}>
  <slot />
</p>
```
<!--
you can use like that

``html
<script>
  import Font from "./Font.svelte";
</script>

<main>
  <Font fontSize={CSS.em(4)}> Ex fugiat laboris dolore id culpa. </Font>

  <Font>
    Pariatur reprehenderit pariatur voluptate ea ipsum ullamco Lorem aliquip
    magna duis qui proident.
  </Font>
</main>
```
-->

<!--
[//]: Usage for Svelte

[//]: `Font.svelte`:

[//]: ![Font](https://github.com/JuanDAC/power-styles/blob/main/examples/simple_font.png?raw=true)

[//]: ```html
-->
<!-- Font.svelte -->
<script>
  import powerStyles from "power-styles";
  const { FontSize } = powerStyles();

  export let fontSize = CSS.em(2);
</script>

<p use:FontSize={fontSize}>
  <slot />
</p>
```

<!--
you can use like that
```html
<script>
  import Font from "./Font.svelte";
</script>

<main>
  <Font fontSize={CSS.em(4)}> Ex fugiat laboris dolore id culpa. </Font>

  <Font>
    Pariatur reprehenderit pariatur voluptate ea ipsum ullamco Lorem aliquip
    magna duis qui proident.
  </Font>
</main>
```
-->

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/JuanDAC/svelte-repel-cursor/tags).

## Authors

<details  style="user-select: none;">
	<summary>
		<strong style="user-select: none;cursor: pointer;">Juan David Avila</strong> - <a href="https://github.com/JuanDAC" target="_blank">JuanDAC</a>
	</summary>
	<img align="center" src="https://github-readme-stats.vercel.app/api/top-langs/?username=JuanDAC&layout=compact&theme=vue&langs_count=6" alt="JuanDAC github stats"/>
</details>

<br/>

See also the list of [contributors](https://github.com/JuanDAC/svelte-repel-cursor/contributors) who participated in this project.

## License

[MIT License](https://raw.githubusercontent.com/JuanDAC/svelte-repel-cursor/main/LICENSE)
