---
title: Configuration
slug: config
---

Configuration is written in jungle.config.js.

<code>module.exports = {
  /* ...config */
}</code>

## Config

Option | Type  | Description
--- | --- | ---
clientInputOptions | (filename: String, extension: String) => [inputOptions](https://rollupjs.org/guide/en/#inputoptions-object) | Function returning [rollup input options](https://rollupjs.org/guide/en/#inputoptions-object) given the filename and extension of each file for *client-side hydration*.
clientOutputOptions | (filename: String, extension: String) => [outputOptions](https://rollupjs.org/guide/en/#outputoptions-object) | Function returning [rollup output options](https://rollupjs.org/guide/en/#outputoptions-object) given the filename and extension of each file for *client-side hydration*.
ssrInputOptions | (filename: String, extension: String) => [inputOptions](https://rollupjs.org/guide/en/#inputoptions-object) | Function returning [rollup input options](https://rollupjs.org/guide/en/#inputoptions-object) given the filename and extension of each file for *server-side rendering*.
ssrOutputOptions | (filename: String, extension: String) => [outputOptions](https://rollupjs.org/guide/en/#outputoptions-object) | Function returning [rollup output options](https://rollupjs.org/guide/en/#outputoptions-object) given the filename and extension of each file for *server-side rendering*.
dataSources | {format: String, name: String, queryArgs: {[String]: String} /\*...moreConfig\*/} | Data sources config - 'format' is the type of source, 'name' is the GraphQL name, 'queryArgs' adds any GraphQL query parameters supported by the format. Further config depends on the format of the data source.

<br/>

## Data sources
JungleJS currently only supports two data sources (we have an issue open to add more [here](https://github.com/junglejs/junglejs/issues/4))
- JSON
- Markdown

<br/>

### JSON
#### Usage
<code>module.exports = {
  dataSources: [
    {
      format: "json",
      name: "members",
      items: [
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'}
      ],
      queryArgs: {id: 'Int!'}
    }
  ]
}</code>

#### Options
Option | Description
--- | ---
items | Data given as array of JSON objects. These can be handwritten or pulled from another API at the top of the jungle.config.js file.

#### Query arguments
Any field in any of the JSON objects.

<br/>

### Markdown
#### Usage
<code>module.exports = {
  dataSources: [
    {
      format: "dir/markdown",
      name: "posts",
      items: 'static/posts',
      queryArgs: { slug: 'String!' }
    }
  ]
}</code>

#### Options
Option | Description
--- | ---
items | Directory to markdown files.

#### Query Arguments
Any field from the frontmatter of the markdown file. Frontmatter is specified at the top of the markdown seperated by triple dashes.
<code>---
title: Hello everyone!
slug: hello
---</code>
