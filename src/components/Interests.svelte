<script>
  import { t } from '../utils/helpers.ts';
  import SectionHeader from './SectionHeader.svelte';
  import KeywordList from './KeywordList.svelte';
  import FormattedText from './FormattedText.svelte';

  let { interests = [] } = $props();

  let columns = $derived(
    interests.length === 1 ? 1 : (interests.length === 2 || interests.length === 4 ? 2 : 3)
  );
</script>

{#if interests?.length}
  <SectionHeader title={t('resume.interests')} count={interests.length}>
    <section class="interests-grid" style="--interests-cols: {columns}">
      {#each interests as interest}
        <div class="interest-item">
          {#if interest.name}
            <h3 class="name">{interest.name}</h3>
          {/if}
          <KeywordList keywords={interest.keywords} />
          {#if interest.summary}
            <div class="summary">
              <FormattedText text={interest.summary} />
            </div>
          {/if}
        </div>
      {/each}
    </section>
  </SectionHeader>
{/if}

<style>
  .interests-grid {
    display: grid;
    grid-template-columns: repeat(var(--interests-cols, 3), minmax(0, 1fr));
    column-gap: var(--sp-5);
    row-gap: var(--sp-3);
  }

  .interest-item {
    padding: 0;
    border-bottom: none;
  }

  .interest-item .name {
    font-weight: 700;
    font-size: var(--fs-card);
    line-height: var(--lh-snug);
    color: var(--color-heading);
    margin-bottom: var(--sp-1);
  }

  @media screen and (max-width: 479px) {
    .interests-grid { grid-template-columns: 1fr; }
  }

  @media screen and (min-width: 480px) and (max-width: 601px) {
    .interests-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media print {
    .interests-grid {
      display: flex;
      flex-wrap: wrap;
      column-gap: var(--sp-5);
      row-gap: var(--sp-3);
    }
    .interest-item {
      flex: 0 0 calc((100% - (var(--interests-cols) - 1) * var(--sp-5)) / var(--interests-cols));
      break-inside: avoid;
      page-break-inside: avoid;
    }
  }
</style>
