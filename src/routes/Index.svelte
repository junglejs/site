<script>
  import Nav from "../components/Nav.svelte";
  import Footer from "../components/Footer.svelte";
</script>

<style>
  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: rgb(70, 170, 86);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
</style>

<svelte:head>
  <title>JungleJS</title>
</svelte:head>

<Nav page="/" />

<main>
  <h1 class="text-5xl text-center font-bold pt-16">
    The Jamstack framework for Svelte
  </h1>
  <h3 class="text-2xl text-center font-semibold pt-3">
    Write less code and develop static sites from any data source
  </h3>
  <h3 class="text-2xl text-center font-semibold pt-3">
    Leverage Svelte and GraphQL for a seamless build
  </h3>
  <span class="inline-flex rounded-md shadow-sm pt-8">
    <a href="/docs/quick-start/">
      <button
        type="button"
        class="inline-flex items-center px-6 py-3 border border-transparent
        text-base leading-6 font-medium rounded-md text-white bg-primary
        hover:mb-3 focus:outline-none focus:shadow-outline-indigo
        active:bg-primary transition ease-in-out duration-150">
        Get Started
      </button>
    </a>
  </span>

  <!-- What Jungle Does Boxes -->
  <div class="mt-32 flex flex-col sm:flex-row">
    <div
      class="overflow-hidden border-solid border-2 border-gray-600 rounded-lg
      sm:w-1/4">
      <div class="px-4 py-5 sm:p-6">
        <dl>
          <dt class="text-2xl leading-9 font-semibold truncate">Source</dt>
          <dd class="mt-2 text-base leading-5 font-medium text-gray-500">
            Any Headless CMS, Git-based CMS, or API such as Contentful,
            WordPress, Forestry, AirTable, CSV or JSON
          </dd>
        </dl>
      </div>
    </div>
    <div
      class="flex flex-row transform rotate-90 sm:rotate-0 mx-auto sm:my-auto">
      <div class="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
    <div
      class="overflow-hidden border-solid border-2 border-gray-600 rounded-lg
      sm:w-1/4">
      <div class="px-4 py-5 sm:p-6">
        <dl>
          <dt class="text-2xl leading-9 font-semibold truncate">Build</dt>
          <dd class="mt-2 text-base leading-5 font-medium text-gray-500">
            Compile to a completely static site with GraphQL and Svelte
          </dd>
        </dl>
      </div>
    </div>
    <div
      class="flex flex-row transform rotate-90 sm:rotate-0 mx-auto sm:my-auto">
      <div class="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
    <div
      class="overflow-hidden border-solid border-2 border-gray-600 rounded-lg
      sm:w-1/4">
      <div class="px-4 py-5 sm:p-6">
        <dl>
          <dt class="text-2xl leading-9 font-semibold truncate">Deploy</dt>
          <dd class="mt-2 text-base leading-5 font-medium text-gray-500">
            Send your static site to static web hosts like Netlify, AWS Amplify,
            Vercel, Surge.sh, Github Pages - or anywhere else
          </dd>
        </dl>
      </div>
    </div>
  </div>

  <!-- What Were Doing Text -->
  <div class="mt-32 sm:mx-32 flex flex-col">
    <span class="text-lg leading-5 font-medium">What we're doing</span>
    <span class="mt-4 text-base leading-5 font-medium text-gray-500">
      Jungle was designed for the modern web, as a framework that lets you
      design websites to be only what they need to be - nothing more, and
      nothing less. Build static websites quickly, with powerful modern tools in
      a simple way.
    </span>
  </div>

  <!-- Blog Posts -->
  <!--<div class="mt-32 grid grid-cols-1 gap-6 lg:gap-16 sm:grid-cols-3">
    <div
      class="overflow-hidden border-solid border-2 border-gray-600
      rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <dl>
          <dt class="text-2xl leading-9 font-semibold truncate">
            Source
          </dt>
          <dd class="mt-2 text-base leading-5 font-medium text-gray-500">
            Any Headless CMS, Git-based CMS, or API such as Contentful,
            WordPress, Forestry, AirTable, CSV or JSON
          </dd>
        </dl>
      </div>
    </div>
    <div
      class="overflow-hidden border-solid border-2 border-gray-600
      rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <dl>
          <dt class="text-2xl leading-9 font-semibold truncate">
            Build
          </dt>
          <dd class="mt-2 text-base leading-5 font-medium text-gray-500">
            Compile to a completely static site with GraphQL and Svelte
          </dd>
        </dl>
      </div>
    </div>
    <div
      class="overflow-hidden border-solid border-2 border-gray-600
      rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <dl>
          <dt class="text-2xl leading-9 font-semibold truncate">
            Deploy
          </dt>
          <dd class="mt-2 text-base leading-5 font-medium text-gray-500">
            Send your static site to static web hosts like Netlify, AWS Amplify,
            Vercel, Surge.sh, Github Pages - or anywhere else
          </dd>
        </dl>
      </div>
    </div>
  </div> -->

  <!-- Newsletter Signup -->
  <div class="my-32 flex flex-col items-center justify-center sm:mx-16 lg:mx-32">
    <form
      action="https://buttondown.email/api/emails/embed-subscribe/junglejs"
      method="post"
      onsubmit="window.open('https://buttondown.email/junglejs')"
      class="embeddable-buttondown-form flex flex-row rounded-lg w-full">
      <input
        class="py-3 px-4 text-gray-800 border-gray-300 border-2 border-r-0
        outline-none placeholder-gray-500 rounded-l-lg w-full"
        type="email"
        name="email"
        id="bd-email"
        placeholder="Enter your email for the newsletter" />
      <input type="hidden" value="1" name="embed" />
      <button class="py-3 px-6 bg-primary text-white font-semibold rounded-r-lg">
        Subscribe
      </button>
    </form>
    <span class="mt-4 text-base leading-5 font-medium text-gray-500">
      Subscribe to our newsletter to see future blogposts
    </span>
  </div>
</main>

<Footer />
