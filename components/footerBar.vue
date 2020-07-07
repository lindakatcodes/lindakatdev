<template>
  <div class="footer-container">
    <div class="overline"></div>
    <footer class="footer">
      <h2 class="footer-title">Get in Touch!</h2>
      <hr class="title-divider" />
      <p class="email">
        You can reach me directly by email: <button type="button" class="email-copy-btn" @click="copyEmail">hello@lindakat.com</button>
      </p>
      <div class="footer-icons">
        <a href="https://github.com/lindakatcodes" target="_blank" rel="noreferrer" tooltip="GitHub" class="gh-icon">
          <figure>
            <img src="~assets/icons/github-square.svg" alt="GitHub icon" />
            <figcaption class="caption">GitHub</figcaption>
          </figure>
        </a>

        <a href="https://dev.to/lindakatcodes" target="_blank" rel="noreferrer" tooltip="blog" class="dev-icon">
          <figure>
            <img src="~assets/icons/dev.svg" alt="Dev.to icon" />
            <figcaption class="caption">Dev.To</figcaption>
          </figure>
        </a>

        <a href="https://twitter.com/lindakatcodes" target="_blank" rel="noreferrer" tooltip="Twitter" class="tw-icon">
          <figure>
            <img src="~assets/icons/twitter-square.svg" alt="Twitter icon" />
            <figcaption class="caption">Twitter</figcaption>
          </figure>
        </a>

        <!-- eslint-disable-next-line prettier/prettier -->
        <a href="https://drive.google.com/open?id=1uKiEzc3-9yPJ_2qEVh44E4dPCl7eps7T" rel="noreferrer" target="_blank" tooltip="resume" class="res-icon">
          <figure>
            <img src="~assets/icons/file-pdf.svg" alt="PDF icon" />
            <figcaption class="caption">Resume</figcaption>
          </figure>
        </a>

        <a href="https://www.linkedin.com/in/linda-thompson-10534847" target="_blank" rel="noreferrer" tooltip="LinkedIn" class="li-icon">
          <figure>
            <img src="~assets/icons/linkedin.svg" alt="LinkedIn icon" />
            <figcaption class="caption">LinkedIn</figcaption>
          </figure>
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    methods: {
      copyEmail() {},
    },
  };
</script>

<style scoped>
  .overline {
    width: 100%;
    height: 5px;
    background: var(--lightGradient);
    margin-bottom: 1%;
  }

  .footer-title {
    color: var(--lightBasic);
    font-size: 1.75rem;
    text-align: center;
  }

  .title-divider {
    background: var(--lightGradient);
    height: 4px;
    width: 12%;
  }

  .email {
    color: var(--lightBasic);
    text-align: center;
    font-family: var(--sansSerif);
  }

  .email-copy-btn {
    color: var(--lightBasic);
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: 1.5px solid underline var(--lightPurple);
    font-family: var(--sansSerif);
    font-size: 1rem;
  }

  .email-copy-btn:hover {
    background: var(--lightGradient);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: 1.5px solid underline var(--lightBasic);
  }

  .footer-icons {
    width: 50%;
    margin: 1.5% auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* border: 2px solid green; */
  }

  .footer-icons img {
    width: 4.5vw;
    padding: 0.5rem 1rem 0;
  }

  .caption {
    text-align: center;
    color: var(--darkBasic);
    font-size: 0.7rem;
    font-family: var(--sansSerif);
    transition: color 0.2s;
  }

  .footer-icons a {
    text-decoration: 1.5 px solid underline;
    text-decoration-color: var(--lightBasic);
    transition: text-decoration-color 0.2s;
  }

  .footer-icons a:hover {
    text-decoration-color: var(--lightBasic);
  }

  .gh-icon:hover {
    filter: url('~assets/icons/github-square.svg#gh-hover-color');
  }

  .gh-icon:hover .caption {
    color: var(--lightGreen);
  }

  .tw-icon:hover {
    filter: url('~assets/icons/twitter-square.svg#tw-hover-color');
  }

  .tw-icon:hover .caption {
    color: var(--lightBlue);
  }

  .dev-icon:hover {
    filter: url('~assets/icons/dev.svg#dev-hover-color');
  }

  .dev-icon:hover .caption {
    color: var(--lightPurple);
  }

  .li-icon:hover {
    filter: url('~assets/icons/linkedin.svg#li-hover-color');
  }

  .li-icon:hover .caption {
    color: var(--lightPink);
  }

  .res-icon:hover {
    filter: url('~assets/icons/file-pdf.svg#res-hover-color');
  }

  .res-icon:hover .caption {
    color: var(--lightYellow);
  }
</style>