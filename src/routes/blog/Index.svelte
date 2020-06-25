<script>
  const QUERY = `
    query {
      posts {
        title
        subtitle
        author
        slug
        feature_image
        tags
      }
    }
  `;
  const QUERYRES = {};

  import Nav from "../../components/Nav.svelte";
  import Footer from "../../components/Footer.svelte";
</script>

<svelte:head>
  <title>JungleJS</title>
</svelte:head>

<Nav page="/blog/" />

<main class="flex flex-col items-center sm:mx-16 lg:mx-32 pt-16">
  <!--Not gonna show example posts for now-->
  <!--{#each QUERYRES.posts as post}
    <a href="/blog/{post.slug}/" class="flex flex-row rounded-lg w-full mb-8">
      <div
        class="flex flex-col items-start justify-center py-6 px-8 border-gray-300 border-2 border-r-0 card
        outline-none  rounded-l-lg w-3/4">
        <div class="flex flex-row flex-no-wrap w-full mb-1">
            <span class="font-bold text-lg text-left mr-auto">{post.title}</span>
            <div class="hidden sm:block">
                {#each post.tags as tag}
                    <span class="bg-gray-200 px-2 py-1 ml-2 text-primary text-xs truncate">{tag}</span>
                {/each}
            </div>
        </div>
        <span class="text-gray-500 font-semibold text-base text-left">{post.subtitle}</span>
        <div class="flex flex-wrap flex-row sm:hidden mr-auto mt-1 w-full">
            {#each post.tags as tag}
                <span class="bg-gray-200 px-2 py-1 mr-2 mt-1 text-primary text-xs truncate">{tag}</span>
            {/each}
        </div>
      </div>
      <img
        src="/successkid.jpg"
        alt="Preview"
        class="text-white font-semibold rounded-r-lg w-1/4 object-cover object-center" />
    </a>
  {/each}-->

  <!-- Newsletter Signup -->
  <div class="my-32 flex flex-col items-center justify-center w-full">
    <form
      action="https://buttondown.email/api/emails/embed-subscribe/junglejs"
      method="post"
      onsubmit="window.open('https://buttondown.email/junglejs')"
      class="embeddable-buttondown-form flex flex-row rounded-lg w-full">
      <label class="hidden" for="bd-email">Enter your email for the newsletter</label>
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
    <span class="mt-4 text-base leading-5 font-medium text-gray-500">
      Nothing here yet, but stay tuned for it!
    </span>
  </div>
</main>

<Footer />
