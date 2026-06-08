<script>
  import { t } from '../utils/helpers.ts';
  import SectionHeader from './SectionHeader.svelte';
  import KeywordList from './KeywordList.svelte';

  let { skills = [] } = $props();
</script>

{#if skills?.length}
  <SectionHeader title={t('resume.skills')}>
    <section class="skills-rows">
      {#each skills as skill}
        <div class="skill-row">
          {#if skill.name}
            <span class="name">
              {skill.name}{#if skill.level}<span class="level-text"> ({skill.levelDisplay || skill.level})</span>{/if}:
            </span>
          {/if}
          <KeywordList keywords={skill.keywords} cssClass="inline-keywords" />
        </div>
      {/each}
    </section>
  </SectionHeader>
{/if}

<style>
  .skills-rows {
    margin-top: var(--sp-2);
  }

  .skill-row {
    display: block;
    margin-bottom: var(--sp-2);
    line-height: 1.8;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .skill-row:last-child {
    margin-bottom: 0;
  }

  .name {
    font-weight: 700;
    font-size: var(--fs-body);
    color: var(--color-heading);
    margin-right: var(--sp-1);
    display: inline;
  }

  .level-text {
    font-weight: 400;
    font-size: 0.9em;
    color: var(--color-text-secondary);
    font-style: italic;
  }

  :global(.inline-keywords) {
    display: inline;
    margin: 0 !important;
    padding: 0;
    list-style: none;
  }

  :global(.inline-keywords li) {
    display: inline-block;
    margin: 2px 4px 2px 0 !important;
    padding: 2px 6px;
    font-size: var(--fs-fine);
    line-height: var(--lh-tight);
    border-radius: 4px;
    border: 1px solid var(--color-keyword-border);
    background-color: var(--color-keyword-bg);
    color: var(--color-keyword-text);
    transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
  }

  :global(.inline-keywords li:hover) {
    background-color: var(--color-keyword-border);
    transform: translateY(-1px);
    cursor: default;
  }

  @media print {
    .skill-row {
      margin-bottom: var(--sp-1_5);
      line-height: 1.6;
    }

    :global(.inline-keywords li) {
      margin: 1px 3px 1px 0 !important;
      padding: 1px 4px;
      font-size: var(--fs-fine);
      border: 1px solid var(--color-keyword-border);
      border-radius: 3px;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
      transform: none;
      transition: none;
    }
  }
</style>
