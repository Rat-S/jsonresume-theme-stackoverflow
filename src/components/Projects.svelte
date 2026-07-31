<script>
  import { t } from '../utils/helpers.ts';
  import SectionHeader from './SectionHeader.svelte';
  import TimelineItem from './TimelineItem.svelte';

  let { projects = [], language = 'en-gb' } = $props();
</script>

{#if projects?.length}
  <SectionHeader title={t('resume.projects')} count={projects.length}>
    <section id="projects">
      {#each projects as project}
        <TimelineItem
          title={project.name}
          titleUrl={project.url}
          startDate={project.endDate ? project.startDate : undefined}
          endDate={project.endDate}
          singleDate={project.endDate ? undefined : project.startDate}
          {language}
          summary={project.description}
          highlights={project.highlights}
          keywords={project.keywords}
          location={project.location}
        />
      {/each}
    </section>
  </SectionHeader>
{/if}
