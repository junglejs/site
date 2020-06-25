---
title: GraphQL Data Layer
slug: graphql-data-layer
---

<h2>Simple Queries</h2>
Since Jungle works during build time, to query data in your Svelte files only a <i>QUERY</i> and a <i>QUERYRES</i> have to be added inside your script tags
<code>&lt;script&gt;
const QUERY = `
&Tab;query {
&Tab;&Tab;posts {
&Tab;&Tab;&Tab;title
&Tab;&Tab;&Tab;slug
&Tab;&Tab;}
&Tab;}
`;
const QUERYRES = {};
...
&lt;/script&gt;
</code>
Then access <i>QUERYRES</i> like any other variable
<code>{#each QUERYRES.posts as post}
&Tab;...
{/each}
</code>

<br/>

<h2>Dynamic Route Queries</h2>
For dynamic routes (those named [param].svelte), multiple routes can be generated from one route file, for blog pages, doc pages, etc. For example, with a blog route named <i>[slug].svelte</i>, script code could look like
<code>&lt;script&gt;
const QUERY = `
    query {
        post(slug: "${QUERYPARAMS['slug']}") {
            title
            subtitle
            author
            slug
        }
    }
`;
const QUERYRES = {};<br/>
const QUERYPARAMOPTS = `
    query {
        posts {
            slug
        }
    }
`;
...
&lt;/script&gt;
</code>
Jungle processes <i>QUERYPARAMOPTS</i> first, and in this case gets all options for <i>slug</i> from posts and makes a new route based on each option, filling in <i>QUERYPARAMS['slug']</i> for each new route. The dynamic route parameter can be anything, as long as it matches up in QUERYPARAMOPTS and QUERYPARAMS for use in generating new routes.