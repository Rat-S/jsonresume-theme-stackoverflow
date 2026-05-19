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
      <ul class="highlights">
        {#each certificates as cert}
          <li>
            {cert.name}{#if cert.issuer}{' - '}<i>{cert.issuer}</i>{/if}{#if cert.date} ({MY(cert.date)}){/if}
            {#if cert.url}
              <span class="url">
                <span class="fa-solid fa-up-right-from-square"></span>
                <a target="_blank" href={cert.url}>{cert.url}</a>
              </span>
            {/if}
          </li>
        {/each}
      </ul>
    </section>
  </SectionHeader>
{/if}

<style>
  .highlights {
    margin: var(--sp-2) 0 0 0;
  }

  .highlights > li {
    margin-top: var(--sp-1);
    line-height: var(--lh-base);
    font-size: var(--fs-body);
    font-weight: 400;
  }

  .highlights > li:first-child {
    margin-top: 0;
  }

  .url {
    font-size: 0.9em;
    margin-left: var(--sp-2);
  }

  @media print {
    .highlights { margin: var(--sp-2) 0 0 0; }
    .highlights > li { margin-top: var(--sp-1); line-height: var(--lh-snug); }
  }
</style>
