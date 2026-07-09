<script>
  import { t } from '../utils/helpers.ts';
  import SocialProfile from './SocialProfile.svelte';
  import SectionHeader from './SectionHeader.svelte';
  import BirthDate from './BirthDate.svelte';
  import FormattedText from './FormattedText.svelte';

  let { basics } = $props();

  // Helper to format location into a single string
  function formatLocation(loc) {
    if (!loc) return '';
    const parts = [];
    if (loc.city) parts.push(loc.city);
    if (loc.region) parts.push(loc.region);
    let str = parts.join(', ');
    if (loc.countryCode) {
      str += ` (${loc.countryCode})`;
    }
    return str;
  }
</script>

{#if basics}
  <header class="header clear">
    {#if basics.image}
      <img class="image" src={basics.image} alt={basics.name}>
      <div class="middle">
        <h1 class="name">{basics.name}</h1>
        <h2 class="label">{basics.label}</h2>
      </div>
    {:else}
      <div class="title-container">
        <h1 class="name">{basics.name}</h1>
        {#if basics.label}
          <span class="separator">|</span>
          <h2 class="label">{basics.label}</h2>
        {/if}
      </div>
    {/if}

    <BirthDate birth={basics.birth} />

    <div class="contact-bar">
      {#if basics.profiles?.length}
        {#each basics.profiles as profile}
          <SocialProfile {profile} />
        {/each}
      {/if}
      {#if basics.email}
        <div class="contact-item">
          <span class="fa-regular fa-envelope icon"></span>
          <a class="hide-href-print" href="mailto:{basics.email}">{basics.email}</a>
        </div>
      {/if}
      {#if basics.phone}
        <div class="contact-item">
          <span class="fa-solid fa-mobile-screen-button icon"></span>
          <a class="hide-href-print" href="tel:{basics.phone}">{basics.phone}</a>
        </div>
      {/if}
      {#if basics.location}
        <div class="contact-item">
          <span class="fa-solid fa-location-dot icon"></span>
          <span>{formatLocation(basics.location)}</span>
        </div>
      {/if}
      {#if basics.url || basics.website}
        {@const site = basics.url || basics.website}
        <div class="contact-item">
          <span class="fa-solid fa-up-right-from-square icon"></span>
          <a class="hide-href-print" target="_blank" href={site}>{site}</a>
        </div>
      {/if}
    </div>
  </header>

  {#if basics.summary}
    <SectionHeader title={t('resume.summary')}>
      <section class="main-summary">
        <div><FormattedText text={basics.summary} /></div>
      </section>
    </SectionHeader>
  {/if}
{/if}

<style>
  .header {
    margin-bottom: var(--sp-4);
  }

  .title-container {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--sp-2);
  }

  .separator {
    font-size: var(--fs-name);
    color: var(--color-border-light);
    font-weight: 200;
    user-select: none;
  }

  .name {
    font-size: var(--fs-name);
    font-weight: 200;
    line-height: var(--lh-tight);
    letter-spacing: -0.015em;
    color: var(--color-heading);
  }

  .label {
    color: var(--color-heading);
    font-size: var(--fs-label);
    font-weight: 300;
    line-height: var(--lh-snug);
    margin-top: var(--sp-1);
    margin-bottom: var(--sp-3);
  }

  .title-container .label {
    margin-top: 0;
    margin-bottom: 0;
  }

  .image {
    width: 11em;
    float: right;
    border-radius: 4px;
  }

  .contact-bar {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin-top: var(--sp-2);
    gap: 4px 6px;
  }

  .contact-item {
    display: inline-block;
    padding: 3px 8px;
    font-size: var(--fs-meta);
    line-height: var(--lh-snug);
    color: var(--color-text);
    background-color: var(--color-background-alt);
    border-radius: 4px;
  }

  .icon {
    margin-right: 0.4em;
    color: var(--color-text-secondary);
  }

  @media print {
    .header { margin-bottom: var(--sp-2); }
    .contact-item {
      background-color: var(--color-background-alt) !important;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .main-summary { padding: 0; background: transparent; }
  }

  @media screen and (max-width: 601px) {
    .separator {
      display: none;
    }
    .title-container {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--sp-1);
    }
    .name { font-size: 1.857rem; }
    .label { font-size: 1.286rem; }
    .image { float: none; display: block; margin: 0 auto 1rem; width: 8em; }
  }
</style>
