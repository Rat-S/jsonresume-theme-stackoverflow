<script>
  import { t } from '../utils/helpers.ts';
  import { getDateHelpers } from '../utils/date-helpers.ts';
  import SectionHeader from './SectionHeader.svelte';

  let { certificates = [], language = 'en-gb' } = $props();

  const { MY } = getDateHelpers(language);
</script>

{#if certificates?.length}
  <SectionHeader title={t('resume.certificates')} count={certificates.length}>
    <section id="certificates">
      <ul class="certs-list">
        {#each certificates as cert}
          <li class="cert-pill">
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
  }

  .cert-pill {
    display: inline-block;
    margin: 4px 6px 4px 0;
    padding: 3px 8px;
    font-size: var(--fs-meta);
    line-height: var(--lh-snug);
    color: var(--color-keyword-text);
    background-color: var(--color-keyword-bg);
    border: 0 solid var(--color-keyword-border);
    border-radius: 4px;
    white-space: normal;
    max-width: 100%;
    word-break: break-word;
  }

  .cert-pill:hover {
    background-color: var(--color-keyword-bg);
    opacity: 0.9;
  }

  .cert-link {
    color: inherit;
    text-decoration: none;
  }

  .cert-link:hover {
    text-decoration: underline;
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
      padding: 0;
    }
    .cert-pill {
      display: inline-block;
      margin: 2px 4px 2px 0;
      padding: 2px 6px;
      font-size: var(--fs-meta);
      line-height: var(--lh-snug);
      color: var(--color-keyword-text);
      background-color: var(--color-keyword-bg);
      border: 0 solid var(--color-keyword-border);
      border-radius: 3px;
      white-space: normal;
      max-width: 100%;
      word-break: break-word;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .cert-icon {
      display: none;
    }
  }
</style>
