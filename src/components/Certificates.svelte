<script>
  import { t } from "../utils/helpers.ts";
  import { getDateHelpers } from "../utils/date-helpers.ts";
  import SectionHeader from "./SectionHeader.svelte";

  let { certificates = [], language = "en-gb" } = $props();

  const { MY } = getDateHelpers(language);
</script>

{#if certificates?.length}
  <SectionHeader title={t("resume.certificates")} count={certificates.length}>
    <section id="certificates">
      <ul class="certs-list">
        {#each certificates as cert}
          <li class="cert-item">
            {#if cert.url}
              <a target="_blank" href={cert.url} class="cert-link">
                <span class="cert-name">{cert.name}</span>{#if cert.issuer}<span class="cert-issuer"> · {cert.issuer}</span>{/if}{#if cert.date}<span class="cert-date"> ({MY(cert.date)})</span>{/if}
                <span class="fa-solid fa-up-right-from-square cert-icon"></span>
              </a>
            {:else}
              <span class="cert-name">{cert.name}</span>{#if cert.issuer}<span class="cert-issuer"> · {cert.issuer}</span>{/if}{#if cert.date}<span class="cert-date"> ({MY(cert.date)})</span>{/if}
            {/if}
          </li>
        {/each}
      </ul>
    </section>
  </SectionHeader>
{/if}

<style>
  .certs-list {
    margin: var(--sp-2) 0 0 0;
    padding: 0;
    list-style: none;
    column-count: 2;
    column-gap: var(--sp-6);
  }

  .cert-item {
    display: block;
    break-inside: avoid;
    page-break-inside: avoid;
    margin-bottom: 6px;
    font-size: var(--fs-meta);
    line-height: var(--lh-snug);
    color: var(--color-text);
    position: relative;
    padding-left: 14px;
  }

  .cert-item::before {
    content: "•";
    position: absolute;
    left: 0;
    color: var(--color-accent);
    font-weight: bold;
  }

  .cert-link {
    color: inherit;
    text-decoration: none;
  }

  .cert-link:hover {
    text-decoration: underline;
    color: var(--color-link);
  }

  .cert-icon {
    font-size: 0.8em;
    margin-left: var(--sp-1);
    color: var(--color-link);
  }

  .cert-issuer {
    color: var(--color-text-secondary);
    font-weight: normal;
  }

  .cert-date {
    color: var(--color-text-muted);
    font-size: 0.95em;
  }

  @media print {
    .certs-list {
      margin: var(--sp-1) 0 0 0;
      column-count: 2;
      column-gap: var(--sp-4);
    }
    .cert-item {
      margin-bottom: 4px;
    }
    .cert-icon {
      display: none;
    }
  }

  @media screen and (max-width: 600px) {
    .certs-list {
      column-count: 1;
    }
  }
</style>
