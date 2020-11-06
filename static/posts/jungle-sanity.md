---
tags: ['headless cms', 'sanity', 'blog', 'structured content']
title: Adding Sanity CMS to Jungle.js & deploy
slug: jungle-sanity
subtitle: An example of a Sanity powered Jungle.js blog
publish_date: "2020-10-26T12:47:00.000Z"
feature_image: "/jungle-sanity.png"
author: Jacob Stordahl

---
*this post was orignally posted on [stordahl.dev](https://stordahl.dev)*

Today I'm going to be showing you how you can add Sanity CMS as a data source for a Jungle powered blog. Jungle.js is a new Svelte framework that is essentially Svelte alternative to Gatsby, a very popular React framework for Static Site Generation (SSG). Jungle accomplishes SSG very similarly to Gatsby in that it crawls the data sources at build time & then uses graphql to query data within the front end of the app. This produces static HTML pages that can be deployed anywhere & offer blazing fast speeds for your users. There are still many features needed to make Jungle production ready, but I think a blog is the perfect case for Jungle at the time of writing this. So let's get started! 

### Getting Setup

First we're going to follow the [quick start](https://www.junglejs.org/docs/quick-start/) instructions and spin up a new jungle project. In our bash terminal we're going to run the following commands
```shell
	npx degit junglejs/template jungle-sanity
	cd jungle-sanity
```
Then we'll install our dependancies...
```shell
	npm i
```
Once finished, we need to add the sanity client & node-fetch to our Jungle app...
```shell
	npm i --save @sanity/client node-fetch
```
This will allow us to connect to our Sanity project. Speaking of, we can now spin up that Sanity project! In our ```jungle-sanity``` folder lets run the following commands
```shell
	# first we need to install the Sanity CLI
	npm install -g @sanity/cli
	
	# then you'll need to login to your sanity account. run...
	sanity login
	
	# still in the jungle-sanity dir run 
	sanity init
```
Follow the instructions to set-up a new project. By running the ```sanity init``` command inside of our jungle app, our content and our front-end can be managed within the same repository. If you'd like the conent to exist outside of the front-end app, run ```sanity init``` there. I've named the folder "content" for simplicity. When you get to the schema selection, select the pre-made 'blog' schema. 

Now that our Jungle front-end and Sanity back-end are created, we need to run both of them locally. There are many ways to do this, but my favorite solution is to just open two tabs in my terminal. From within the ```jungle-sanity``` open a new tab and move into our 'content' directory...
```shell
	cd content
	
	# now we can boot up the Sanity Studio locally
	sanity start
```
Just click the link to http://localhost:3333 to open up the Sanity Studio. Keep this open, we'll need to enter some blog data later on. Back in the other terminal tab, still inside of ```jungle-sanity``` let's open the whole directory into vscode either by opening finder and dragging the folder into vscode, or by using the vscode cli...

```shell
	# this command opens the entire directory
	code .
```

### A Slight Sanity Modification

The very first thing we need to do is modify the Sanity schema slightly to get it to work with Jungle. Normally, the Sanity field type 'slug' is returned as an object with a ```_type{}``` object & a ```current{}``` object. Within 'current' is the plain text slug for that document. Because the actual string value for the slug is nested inside another object, Jungle isn't able to find it. I've talked to Conner, the creator of Jungle, and there are plans to have this solved through the name of the dynamic route file, but more on that later! Navigate to your content folder and open up the directory named 'schemas'. These js files are all the different schemas used by sanity for our data. Open up the 'post.js' schema so we can deal with the slug. All we need to do is find the object with the name of 'slug' and change the value of 'type' to 'string'. The slug object should look like this...
```javascript
   {
     name: 'slug',
     title: 'Slug',
     type: 'string',
     options: {
       source: 'title',
       maxLength: 96
     }
   },
```
Now our 'slug' input will just be a normal text field, which will return a string value in the root of the object we get when we query Sanity. Perfect! Now would be a great time to enter some blog data into Sanity like I mentioned earlier. Once you have a couple posts in the CMS, let's start working on our Jungle front-end.

### Jungle Front-End

The main file we'll be working in is ```jungle.config.js```. This is where our data sources are added, and where the graphql data layer is created. At the top of the file, we need to require our sanity client & node-fetch to get at our data...
```javascript
//bring in fetch
	const fetch = require('node-fetch');

//bring in sanity client
	const sanityClient = require('@sanity/client');

// declare sanity client
	const client = sanityClient({
	    projectId: '',
	    dataset: 'production',
	    token: '', // or leave blank to be anonymous user
	    useCdn: true // `false` if you want to ensure fresh data
	});
```
Your Sanity projectId & dataset name can be found in 'sanity.json' within the 'content' directory. Now we need to convert the main module function to by asyncronous like so...
```javascript
	module.exports = async () => { ... };
```
Then within that module, we can use node-fetch to fetch our data using the client variable that we created earlier. However, we need to make sure we return everything else that is already in the module. When we're done the first part of our module should look like this...
```javascript
	module.exports = async () => {
	    
	    //fetch our data
	    	const sanityPosts = await client.fetch("*[_type == 'post']");
	    	
	    //return everything else within the module
	    	return{ ...
	    		everything that's inside the module 
	    	... }
	}; 
```
Now we need to do is add the Sanity data to the data sources array at the bottom of the file. Look for the array titled 'dataSources', delete everything inside of it and replace it with this...
```javascript
	dataSources: [
        {
            format: "json", name: "posts", items: sanityPosts, queryArgs: { slug: 'String!' }
        },
    ]
```
The last thing we need to do before getting into actual Svelte code is to edit 'app.js' & 'build.js'. Currently, the server & build portions of our jungle app run 'startGraphqlServer', the function that handles all of our graphql, before our fetch happens in jungle.config.js. We can work around this by moving the 'startGraphqlServer' function inside a promise chain like so...
```javascript
	// app.js
	
	const express = require('express');

	const { startGraphqlServer, stopGraphqlServer, startAppServer, readRoutes } = require('junglejs');
	
	const getJungleConfig = require('./jungle.config');
	
	const app = express();
	
	getJungleConfig().then((jungleConfig) => {
	  	startGraphqlServer(
	  		jungleConfig, 
	  		__dirname, 
	  		() => readRoutes(jungleConfig, app, __dirname).then(() => stopGraphqlServer(() => startAppServer(app))));
		}).catch(console.log('error'));
	
	
	//build.js
	
	const express = require('express');

	const { startGraphqlServer, stopGraphqlServer, readRoutes } = require('junglejs');
	
	const getJungleConfig = require("./jungle.config");
	
	const app = express();
	
	getJungleConfig().then((jungleConfig) => {
	  	startGraphqlServer(
	  		jungleConfig, 
	  		__dirname,
	  		() => readRoutes(jungleConfig, app, __dirname).then(() => stopGraphqlServer(() => null)));
		}).catch(console.log('error'));
``` 
Alright, we're finally ready to start building our Svelte app! In this tutorial, we're not going to do much to the template provided by Jungle except allow our blog route to use our Sanity CMS as its data source. Jungles routing works very similar to Sapper, in that .svelte files & directories within the routes directory become the routes for our app. Navigate to the index.svelte file within the blog route. All we need to do here is edit our graphql query to match our Sanity data, and edit out template to reflect that data in the DOM. First, our ```QUERY``` variable should be structured like so...
```javascript
	const QUERY = `
			query {
				posts {
					title
					slug
				}
			}
		`;
	const QUERYRES = {};
```
Remember that in our jungle.config.js we gave our sanityPosts datasource the 'name' value of post. This means, when we want to query all posts we simply use a plural namespace instead of singular. In this query we are simply returning the post title and the slug which we will display in a list template...
```svelte
	<main>
	  <h1>Recent posts</h1>
		<ul>
			{#each QUERYRES.posts as post}
				<li>
					<a href='/blog/{post.slug}'>{post.title}</a>
				</li>
			{/each}
		</ul>
	</main>
```
Within Jungle, ```QUERYRES``` is the object our data gets pushed into when our site builds so all of the pages can retrieve their data. So in this case, we're using an ```{#each}``` block to create a list item for *each* blog post returned from the query. Now we just need to create all of the individual post pages. You'll notice the other file in our /blog directory is titled [slug].svelte. The square prackets denote to jungle that this route is dynamic, and the build step should generate a page for each item from the top level of the main query within the dynamic route file ([slug].svelte). The In our case, that query looks like this...
```javascript
	const QUERY = `
		query {
			post( slug: "${QUERYPARAMS['slug']}" ) {
				title
				slug
				body {
					children {
						text
					}
				}
			}
		}
	`;
	const QUERYRES = {};
	
	const QUERYPARAMOPTS = `
		query {
			posts {
				slug
			}
		}
	`;
``` 
It's important to note that the string we provide within the square brackets in the file name must match the value we call in ```QUERYPARAMOPTS```, in this case *slug*. Then in our main ```QUERY``` we will take the value returned from ```QUERYPARAMOPTS``` and use that to query the post with a matching slug. In this query, we're looking for a singular *post* so the top level query is in the singular namespace. 

### Parsing Our Data
In this case, we're retrieving the title, slug, & an array called 'body' from the post. Lets look at what this 'body' array looks like and how we can parse it into our template...
```json
body[
  {
    "_key": "5e82ab4fef7c",
    "_type": "block",
    "children": [
      {
        "_key": "a0a28578f701",
        "_type": "span",
        "marks": [],
        "text": "this is another post"
      }
    ],
    "markDefs": [],
    "style": "normal"
  }
]
```
Sanity returns the body of our blog post as an array of objects, each object corresponding to a break in the text box, so when you jump to a new line, it will place whatever you type next in a new object. However our actual text isn't in the top level of each body object; for that we need to look inside the children array. Each children array is also an array of objects, each of which contain a value named "text"; this is the value we're looking for. The Svelte {#each} block makes dealing with this sort of nested object data structure very easy to deal with. Let's take a look at the template I have inside of [slug].svelte...
```svelte
<main>
	<h1>{QUERYRES.post.title}</h1>
		
		{#each QUERYRES.post.body as { children }}
			{#each children as { text }}
				<p>{ text }</p>
			{/each}
		{/each}
	
</main>
```

Here, we're simply displaying the title, and then we have two each blocks, one nested inside the other. The first each block is going to look inside of each object within the body array and look for our children array. We then have access to each "children" within the each block, so we'll pass that into the nested each block, pulling out the text value from inside each object. I should note that I've destructured the variables being iterated over in the each blocks, but I'll show how we can accomplish the same thing without destructuring so that if you're new to working with nested objects in javascript, you can see how it saves us some code! Here's the same set of each blocks without destructuring...
```svelte
<main>
	<h1>{QUERYRES.post.title}</h1>
		
		{#each QUERYRES.post.body.children as children }
			{#each children.text as text }
				<p>{ text }</p>
			{/each}
		{/each}
	
</main>

```
I think this is a great way to visualize destructuring in the context of working with API/JSON responses like this. If we look at the [svelte api docs](https://svelte.dev/docs#each) we can see that this is the basic structure of an each block...
```svelte
	{#each expression as name}
		// code to be run
	{/each}
```
Looking back at the blog template above, because the value of the each block *expression* (the children in QUERYRES.post.body.children) matches the value of the each block *name*, we can simply strip the .children off the *expression* and wrap the *name* in curly braces. Destructuring removes so much code duplication especially when working with data heavy APIs that return huge blocks of data. 

### Deploying our Blog
At this point we have a solid, barebones blog, but now it's time to deploy the project so others can read our content. The first step is to deploy our Sanity studio to the Sanity Cloud Infrastructure available to us. Since we're going to deploy our front-end to Netlify, you could also deploy the studio there, but I find the Sanity CLI makes deploying to Sanity almost effortless. From within the root of our Jungle project..
```shell
	#cd into the directory where your sanity project lives
	cd content
	
	#then simply use the Sanity CLI to deploy
	sanity deploy
```
The next step is to push our front end code up to Github so we can setup CI/CD with Netlify. This step is a bit beyond the scope fo this blog post, but I'll assume you've done this before. Once the code is on your Github account, go to Netlify.com, click login and sign in via your Github account. Once you're in the admin dashboard, you should see a button for 'New Site From Git'. This button will allow you to choose a Github repo from your account to deploy on Netlify. Once you've selected the correct project, we'll need to add our build command & publish directory to the site settings so Netlify can build the site. You can easily do this in the Netlify Dashboard by going to 'Site Settings' for the project in question, and then 'Build & deploy' in the side bar. here you'll see a table of data with an 'Edit Settings' button. We'll want to add 'npm run build' as our build command, and set the publish directory as 'jungle/build'. 

The last step to get this thing 100% deployed is to setup our CORS origins on Sanity. CORS stands for Cross Origin Resource Sharing and is a security measure aimed at limiting the ways resources are shared between websites. This is central to how Sanity works as a headless CMS and I find it to be the easiest to work with as a developer. With Sanity, there's no need to authenticate requests to our backend because *sanity only allows certain domains to query your content*. We accompish this by logging into your Sanity account at [sanity.io](https://sanity.io), navigate to the 'settings' tab in the nav bar, and find the 'API' tab on that page. All we need to do is click the 'Add New Origin' buttons and add our Netlify Domain to the CORS Origin list. When you open the modal to enter the new origin, you'll see a toggle to 'allow credentials' or not. For a simple project like this, I normally don't allow credentials.

And that's it! Our globally deployed Jungle front end can now query our Sanity backend from the clients browser. I've had a lot of fun working out this little project and hope to see Jungle grow into a mature, stable framework. 

Svelte + Graphql + Sanity = ♥️