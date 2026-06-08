<script>
  import { t } from '../utils/helpers.ts';
  import SectionHeader from './SectionHeader.svelte';

  let { skills = [] } = $props();
</script>

{#if skills?.length}
  <SectionHeader title={t('resume.skills')}>
    <section class="skills-columns">
      {#each skills as skill}
        <div class="skill-row">
          {#if skill.name}
            <span class="name">
              {skill.name}{#if skill.level}<span class="level-text"> ({skill.levelDisplay || skill.level})</span>{/if}:
            </span>
          {/if}
          <span class="keywords-list">
            {skill.keywords.join(', ')}
          </span>
        </div>
      {/each}
    </section>
  </SectionHeader>
{/if}

<style>
  .skills-columns {
    margin-top: var(--sp-2);
    column-count: 2;
    column-gap: var(--sp-6);
  }

  .skill-row {
    display: block;
    margin-bottom: var(--sp-3);
    line-height: var(--lh-base);
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

  .keywords-list {
    font-size: var(--fs-meta);
    color: var(--color-text);
    display: inline;
  }

  @media print {
    .skills-columns {
      column-gap: var(--sp-4);
    }
    .skill-row {
      margin-bottom: var(--sp-2);
    }
  }

  @media screen and (max-width: 600px) {
    .skills-columns {
      column-count: 1;
    }
  }
</style>
