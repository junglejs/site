<script>
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
  } else {
    window.matchMedia("(prefers-color-scheme: dark)").addListener(e => {
        if (e.matches) {
            document.documentElement.setAttribute("data-theme", "dark")
        } else {
            document.documentElement.setAttribute("data-theme", "light")
        }
    });
  }
</script>

<style global>
  @tailwind base;
  @tailwind components;

  :root {
    --text-color: #212121;
    --bg-color: white;
  }

  [data-theme="dark"] {
    --text-color: white;
    --bg-color: #212121;
  }

  [data-theme="dark"] .icon {
    filter: invert(100%);
    color: #212121;
  }

  [data-theme="sepia"] {
    --text-color: #402b0c;
    --bg-color: #eae0b9;
  }

  [data-theme="sepia"] .card {
    border-color: var(--text-color);
  }

  [data-theme="sepia"] .text-gray-500 {
    color: #896f47;
  }

  [data-theme="sepia"] .placeholder-gray-500::placeholder {
    color: #896f47;
  }

  [data-theme="sepia"] .text-gray-600 {
    color: #5e4828;
  }

  [data-theme="sepia"] .border-gray-300 {
    border-color: #a8906b;
  }

  [data-theme="sepia"] .border-gray-600 {
    border-color: #5e4828;
  }

  [data-theme="sepia"] .bg-gray-200 {
    background-color: #d8c3a2;
  }

  main {
    @apply px-10;
    text-align: center;
    margin: 0 auto;
    min-height: calc(
      100vh - 64px - (3rem + 23.6px)
    ); /*Full screen height minus navbar height minus footer height*/
  }

  input,
  textarea {
    background-color: var(--bg-color);
    color: var(--text-color);
  }

  body {
    background-color: var(--bg-color);
    color: var(--text-color);
  }

  @screen sm {
    main {
      @apply px-16;
    }
  }

  @screen lg {
    main {
      @apply px-48;
    }
  }

  @tailwind utilities;
</style>
