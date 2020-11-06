<script>
  const QUERY = `
    query {
      post(slug: "${QUERYPARAMS['slug']}") {
        title
        subtitle
        author
        slug
        html
        feature_image
        publish_date
        tags
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

  import Nav from "../../components/Nav.svelte";
  import Footer from "../../components/Footer.svelte";

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  function authorProfileSrc(author) {
    return '/authors/' + author.toLowerCase().replace(" ", "-") + '/profile.jpg';
  }
  function frmtPublishDate(date) {
    const dateObject = new Date(date);
    return (
      month[dateObject.getMonth()] +
      " " +
      dateObject.getDay() +
      ", " +
      dateObject.getFullYear()
    );
  }
  function copyPageURL() {
    let dummy = document.createElement("input"),
      text = window.location.href;
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }
</script>

<style>
  @screen lg {
    .content {
      max-width: 50vw;
      margin: 0 auto;
    }
  }
  .title {
    font-size: 2.6em;
    font-weight: 500;
    margin-bottom: 7px;
  }
  .subtitle {
    font-size: 1.4em;
    font-weight: 400;
    color: #757575;
    margin-bottom: 20px;
  }
  .authorLabel {
    margin-bottom: 40px;
  }
  .profilePic {
    border-radius: 50%;
    margin-right: 20px;
  }
  .pubDate {
    color: #757575;
    font-size: 14px;
  }
  .copyLink {
    margin: auto 0 auto auto;
    height: 20px;
    width: 20px;
    cursor: pointer;
  }
  .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }
  .content :global(pre) {
    background-color: #f9f9f9;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    overflow-x: auto;
    border: 1px solid #ddd;
    border-left: 3px solid rgb(70,170,86);
  }
  .content :global(pre) :global(code) {
    color: #666;
    font-family: monospace;
    line-height: 1.6;
    max-width: 100%;
    overflow: auto;
	  padding: 1em 0;
    display: block;
    word-wrap: break-word;
    white-space: pre;
  }
  .content :global(ul) {
    line-height: 1.5;
  }
  .content :global(li) {
    margin: 0 0 0.5em 0;
  }

  .content :global(code) {
    background: #f4f4f4;
  }
</style>

<svelte:head>
  <title>{QUERYRES.post.title} - Blog - JungleJS</title>
</svelte:head>

<Nav/>

<div class="content px-10">
  <img
    src={QUERYRES.post.feature_image}
    alt="Feature"
    style="width: calc(100% - 60px); margin: 30px;" />
  <h1 class="title">{QUERYRES.post.title}</h1>
  <h3 class="subtitle">{QUERYRES.post.subtitle}</h3>
  <div class="flex authorLabel">
    <img
      src={authorProfileSrc(QUERYRES.post.author)}
      alt="Profile"
      width="48"
      height="48"
      class="profilePic" />
    <div class="flex flex-col">
      <span>{QUERYRES.post.author}</span>
      <span class="pubDate">{frmtPublishDate(QUERYRES.post.publish_date)}</span>
    </div>
    <svg
      on:click={copyPageURL}
      class="copyLink"
      style="color: var(--text-color)"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512">
      <path
        fill="currentColor"
        d="M326.612 185.391c59.747 59.809 58.927 155.698.36
        214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699
        59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84
        26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986
        5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905
        73.66-1.155 101.96 28.024 28.579 74.086 28.749
        102.325.51l67.2-67.19c28.191-28.191 28.073-73.757
        0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0
        1-6.947-12.606c-.396-10.567 3.348-21.456
        11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199
        20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547
        44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2
        67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36
        214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789
        20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037
        16.037 0 0
        0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639
        0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3
        26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783
        16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446
        27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z" />
    </svg>
  </div>

  {@html QUERYRES.post.html}
</div>

<Footer/>