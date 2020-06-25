<script>
  const QUERY = `
		query {
			contributes {
				title
				slug
			}
		}
	`;
  const QUERYRES = {};

  const orderedContributes = () => {
    return [
      QUERYRES.contributes.find(contribute => contribute.slug == "use-it"),
      ...QUERYRES.contributes.filter(
        contribute => contribute.slug != "use-it"
      )
    ];
  };

  export let page;
</script>

<div style="min-width: 150px" class="flex flex-row sm:flex-col mt-5 overflow-x-scroll sm:overflow-x-visible whitespace-no-wrap sm:whitespace-normal">
  {#each orderedContributes() as contribute}
    <a
      href="/contributing/{contribute.slug}/"
      class="{page == '/contributing/'.concat(contribute.slug) ? 'bg-gray-200' : ''}
      mb-1 group flex items-center px-4 py-2 text-base leading-6
      focus:outline-none font-medium text-gray-600 rounded-md transition
      ease-in-out duration-150 text-left">
      {contribute.title}
    </a>
  {/each}
</div>
