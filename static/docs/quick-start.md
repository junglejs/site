---
title: Quick Start
slug: quick-start
---

<h2>Use the template</h2>
Create a new project based on the <a href="https://github.com/junglejs/template">template</a> using <a href="https://github.com/Rich-Harris/degit">degit</a>:
<code>npx degit junglejs/template jungle-app
cd jungle-app
</code>
Install the dependencies...
<code>npm install</code>
...then start the build/run
<code>npm run start</code>
Navigate to <a href="https://localhost:3000">localhost:3000</a>. You should see your app running. 
<br/>
Right now this command just builds an output to jungle/build and serves it locally. This jungle/build folder can be deployed immediately, but as of right now livereload doesn't work, so to reload simply stop the current process and rerun it.

<br/>
<br/>

<h2>App structure</h2>

<ul>
These are the important files and folders to work with in every Jungle app.
<li><b>/jungle.config.js</b> - This is your configuration file for Jungle, the most important part of which is <i>dataSources</i>, where data sources for the <a href="/docs/graphql-data-layer">GraphQL data layer</a> are specified. The template includes two helpful examples of data.</li>
<li><b>/jungle/build/</b> - This is the build output from running your Jungle app, and is the directory which should be deployed to hosting.</li>
<li><b>/static</b> - This holds all of your static files, and the contents of which will be inserted into the /jungle/build/ directory to be used by the rest of your app.</li>
<li><b>/src/routes/</b> - This holds all of the routes which will be turned into static pages. Routes can be nested within folders, use multiword or singleword names, or even use a route variable as shown in the /blog/[slug].svelte route file. A route named <i>Index.svelte</i> will act as the route for the name of the folder it resides in.</li>
<li><b>/src/components/</b> - This holds all of the components to be used in multiple routes within your app. These components can access the GraphQL layer just like the routes can.</li>
</ul>