<script>
  const QUERY = `
		query {
			docs {
				title
				slug
			}
		}
	`;
  const QUERYRES = {};

  const orderedDocs = () => {
    return [
      QUERYRES.docs.find(doc => doc.slug == "introduction"),
      QUERYRES.docs.find(doc => doc.slug == "quick-start"),
      ...QUERYRES.docs.filter(
        doc => doc.slug != "quick-start" && doc.slug != "introduction"
      )
    ];
  };

  export let page;
</script>

<div style="min-width: 150px" class="flex flex-row sm:flex-col mt-5 overflow-x-scroll sm:overflow-x-visible whitespace-no-wrap sm:whitespace-normal">
  {#each orderedDocs() as doc}
    <a
      href="/docs/{doc.slug}/"
      class="{page == '/docs/'.concat(doc.slug) ? 'bg-gray-200' : ''}
      mb-1 group flex items-center px-4 py-2 text-base leading-6
      focus:outline-none font-medium text-gray-600 rounded-md transition
      ease-in-out duration-150 text-left">
      {doc.title}
    </a>
  {/each}
</div>
