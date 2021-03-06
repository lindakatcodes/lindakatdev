<template>
  <div class="footer-container">
    <div class="overline"></div>
    <footer class="footer">
      <h2 class="footer-title">Get in Touch!</h2>
      <hr class="title-divider" />

      <tippy to="email-copy" content="Click to copy!" multiple></tippy>
      <tippy to="email-copy" content="Email copied!" trigger="click" multiple></tippy>

      <p class="email">
        You can reach me directly by email: <span name="email-copy" class="email-copy-action" @click="copyEmail">hello@lindakat.com</span>
      </p>
      <div class="footer-icons">
        <a href="https://github.com/lindakatcodes" target="_blank" rel="noreferrer noopener" tooltip="GitHub" class="gh">
          <figure>
            <img src="~assets/icons/github-square.svg" alt="GitHub icon" class="gh-icon" />
            <figcaption class="caption">GitHub</figcaption>
          </figure>
        </a>

        <a href="https://dev.to/lindakatcodes" target="_blank" rel="noreferrer noopener me" tooltip="blog" class="dev">
          <figure>
            <img src="~assets/icons/dev.svg" alt="Dev.to icon" class="dev-icon" />
            <figcaption class="caption">Dev.To</figcaption>
          </figure>
        </a>

        <a href="https://twitter.com/lindakatcodes" target="_blank" rel="noreferrer noopener me" tooltip="Twitter" class="tw">
          <figure>
            <img src="~assets/icons/twitter-square.svg" alt="Twitter icon" class="tw-icon" />
            <figcaption class="caption">Twitter</figcaption>
          </figure>
        </a>

        <!-- eslint-disable-next-line prettier/prettier -->
        <a href="https://drive.google.com/file/d/1V7ypnulk-pDooBEf-GINj5jkzs0HNuxQ/" rel="noreferrer noopener" target="_blank" tooltip="resume" class="res">
          <figure>
            <img src="~assets/icons/google-drive.svg" alt="Google Drive icon" class="res-icon" />
            <figcaption class="caption">Resume</figcaption>
          </figure>
        </a>

        <a href="https://www.linkedin.com/in/linda-thompson-10534847" target="_blank" rel="noreferrer noopener" tooltip="LinkedIn" class="li">
          <figure>
            <img src="~assets/icons/linkedin.svg" alt="LinkedIn icon" class="li-icon" />
            <figcaption class="caption">LinkedIn</figcaption>
          </figure>
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
  // this.$sentry.captureException(new Error('example'));

  export default {
    methods: {
      copyEmail() {
        navigator.clipboard.writeText('hello@lindakat.com').then(
          () => {
            console.log('Successfully copied text!');
          },
          () => {
            console.error('Sorry, could not copy text');
          }
        );
      },
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
    margin: 0 auto 1%;
  }

  .email {
    color: var(--lightBasic);
    text-align: center;
    font-family: var(--sansSerif);
  }

  .email-copy-action {
    color: var(--lightBasic);
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: solid underline var(--lightPurple);
    font-family: var(--sansSerif);
    font-size: 1rem;
  }

  .email-copy-action:hover {
    background: var(--lightGradient);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: solid underline var(--lightBasic);
  }

  .footer-icons {
    width: 30%;
    margin: 1.5% auto;
    display: flex;
    justify-content: center;
    align-items: baseline;
    /* border: 2px solid green; */
  }

  .footer-icons img {
    width: 100%;
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
    width: calc(100% - 10rem / 5);
  }

  .footer-icons a:hover {
    text-decoration-color: var(--lightBasic);
  }

  .gh-icon:hover {
    filter: url('~assets/icons/github-square.svg#gh-hover-color');
  }

  .gh:hover .caption {
    color: var(--lightGreen);
  }

  .tw-icon:hover {
    filter: url('~assets/icons/twitter-square.svg#tw-hover-color');
  }

  .tw:hover .caption {
    color: var(--lightBlue);
  }

  .dev-icon:hover {
    filter: url('~assets/icons/dev.svg#dev-hover-color');
  }

  .dev:hover .caption {
    color: var(--lightPurple);
  }

  .li-icon:hover {
    filter: url('~assets/icons/linkedin.svg#li-hover-color');
  }

  .li:hover .caption {
    color: var(--lightPink);
  }

  .res-icon:hover {
    filter: url('~assets/icons/file-pdf.svg#res-hover-color');
  }

  .res:hover .caption {
    color: var(--lightYellow);
  }

  @media screen and (max-width: 768px) {
    .title-divider {
      width: 43%;
      margin-bottom: 3%;
    }

    .email {
      width: 95%;
    }

    .footer-icons {
      width: 95%;
    }

    .caption {
      color: var(--lightBasic);
    }

    .footer-icons a {
      text-decoration: none;
    }

    .gh-icon {
      filter: url('~assets/icons/github-square.svg#gh-hover-color');
    }

    .tw-icon {
      filter: url('~assets/icons/twitter-square.svg#tw-hover-color');
    }

    .dev-icon {
      filter: url('~assets/icons/dev.svg#dev-hover-color');
    }

    .li-icon {
      filter: url('~assets/icons/linkedin.svg#li-hover-color');
    }

    .res-icon {
      filter: url('~assets/icons/file-pdf.svg#res-hover-color');
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1200px) {
    .footer-icons {
      width: 45%;
    }

    .title-divider {
      width: 20%;
    }
  }
</style>
