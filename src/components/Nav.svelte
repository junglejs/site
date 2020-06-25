<script>
  import TailwindCSS from "./TailwindCSS.svelte";

  export let page;

  const routes = [
    { route: "/docs/introduction/", name: "Docs" },
    { route: "/blog/", name: "Blog" },
    { route: "/contributing/use-it/", name: "Contributing" }
  ];

  function toggleTheme() {
    const theme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "light";

    if (theme == "dark") {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else if (theme == "light") {
      document.documentElement.setAttribute('data-theme', 'sepia');
      localStorage.setItem('theme', 'sepia');
    } else if (theme == "sepia") {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  let showMobileMenu = false;
</script>

<TailwindCSS />

<nav>
  <div class="max-w-7xl mx-auto px-4 sm:px-16 lg:px-32">
    <div class="flex justify-between h-16">
      <div class="flex px-2 lg:px-0">
        <div class="flex-shrink-0 flex items-center text-lg font-bold">
          <a href="/" class="flex flex-row">
            <img
              class="block h-8 w-auto mr-3"
              src="/jungle-logo.svg"
              alt="Jungle Logo" />
            <span class="my-auto">JungleJS</span>
          </a>
        </div>
        <div class="hidden lg:mr-6 lg:flex">
          {#each routes as route}
            <a
              href={route.route}
              class="{page == route.route ? 'text-primary' : 'text-gray-500 hover:text-gray-700 focus:text-gray-700'}
              border-transparent ml-8 inline-flex items-center px-1 pt-1
              border-b-2 text-base font-medium leading-5 focus:outline-none
              transition duration-150 ease-in-out">
              {route.name}
            </a>
          {/each}
        </div>
      </div>
      <!-- Readd with algolia <div class="hidden sm:flex flex items-center justify-center px-2 g:ml-6 lg:justify-end">
        <div class="max-w-lg w-full lg:max-w-xs text-gray-500">
          <label for="search" class="sr-only">Search the docs</label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center
              pointer-events-none">
              <svg
                class="h-5 w-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817
                  4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <input
              id="search"
              class="block w-full pl-10 pr-3 py-2 border-solid border-2 border-gray-300
              rounded-md leading-5 placeholder-gray-500
              focus:outline-none
              focus:border-primary focus:shadow-outline-primary sm:text-sm
              transition duration-150 ease-in-out"
              placeholder="Search the docs"
              type="search" />
          </div>
        </div>
      </div> -->
      <div class="flex pl-4">
        <div class="flex-shrink-0 flex items-center">
          <button class="focus:outline-none" on:click="{toggleTheme}">
            <img class="block h-5 w-auto icon" src="/icons/sun.svg" alt="Sun Icon" />
          </button>
        </div>
        <div class="flex-shrink-0 flex items-center">
          <a rel="noopener" href="https://twitter.com/jungle_js" target="_blank">
            <img
              class="block h-5 pl-5 w-auto icon"
              src="/icons/twitter.svg"
              alt="Twitter Logo" />
          </a>
        </div>
        <div class="flex-shrink-0 flex items-center">
          <a rel="noopener" href="https://github.com/junglejs/junglejs" target="_blank">
            <img
              class="block h-5 pl-5 w-auto icon"
              src="/icons/github.png"
              alt="Github Logo" />
          </a>
        </div>
      </div>
      <div class="flex items-center lg:hidden">
        <!-- Mobile menu button -->
        <button
          class="inline-flex items-center justify-center ml-4 p-2 rounded-md
          text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none
          focus:bg-gray-100 focus:text-gray-500 transition duration-150
          ease-in-out"
          aria-label="Main menu"
          aria-expanded="false"
          on:click={() => (showMobileMenu = !showMobileMenu)}>
          <!-- Icon when menu is closed. -->
          <svg
            class="{showMobileMenu ? 'hidden' : 'block'} h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <!-- Icon when menu is open. -->
          <svg
            class="{showMobileMenu ? 'block' : 'hidden'} h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  -->
  <div class="{showMobileMenu ? 'block' : 'hidden'} lg:hidden">
    <div class="pt-2 pb-2 px-4">
      {#each routes as route}
        <a
          href={route.route}
          class="mb-1 block pl-3 pr-4 py-2 border-l-4 {page == route.route ? 'border-primary text-primary' : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300'}
          text-base font-medium focus:outline-none transition duration-150
          ease-in-out">
          {route.name}
        </a>
      {/each}
    </div>
  </div>
</nav>
