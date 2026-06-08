<script>
  import { spaceToDash } from '../utils/helpers.ts';

  const FA_BRAND_PREFIX = 'fa-brands';

  const brandColors = {
    'google-plus': '#dd4b39',
    'tumblr': '#32506d',
    'foursquare': '#0072b1',
    'facebook': '#3b5998',
    'linkedin': '#007bb6',
    'pinterest': '#cb2027',
    'dribbble': '#ea4c89',
    'instagram': '#517fa4',
    'twitter': '#00aced',
    'soundcloud': '#ff3a00',
    'wordpress': '#21759b',
    'youtube': '#bb0000',
    'github': '#171515',
    'stack-overflow': '#828386',
    'flickr': '#ff0084',
    'reddit': '#ff4500',
    'hacker-news': '#ff6600',
    'telegram': '#2291c3',
  };

  let { profile } = $props();

  // Dark-friendly overrides for icons that are too dark on dark backgrounds
  const darkBrandColors = {
    'github': '#c9d1d9',
    'tumblr': '#5a8aab',
  };

  const network = spaceToDash(profile.network);
  const lightColor = brandColors[network] || 'inherit';
  const darkColor = darkBrandColors[network] || lightColor;
  const iconClass = `${FA_BRAND_PREFIX} fa-${network}`;

  // Helper to clean up the URL (e.g. remove protocol and www.)
  function cleanUrl(url) {
    if (!url) return '';
    return url
      .replace(/^(https?:\/\/)?(www\.)?/, '')
      .replace(/\/$/, '');
  }
</script>

{#if profile.network}
  <div class="item">
    <div class="username">
      <span class="{iconClass} social" style="--brand-light: {lightColor}; --brand-dark: {darkColor}"></span>
      {#if profile.url}
        {@const cleaned = cleanUrl(profile.url)}
        <span class="url">
          <a class="hide-href-print" target="_blank" href={profile.url}>
            {#if profile.username.toLowerCase() === cleaned.toLowerCase() || cleaned.toLowerCase().includes(profile.username.toLowerCase().replace(/\s+/g, ''))}
              {profile.username}
            {:else}
              {profile.username} <span class="url-text">({cleaned})</span>
            {/if}
          </a>
        </span>
      {:else}
        <span>{profile.username}</span>
      {/if}
    </div>
  </div>
{/if}

<style>
  .item {
    display: inline-block;
    padding: 3px 8px;
    margin-top: var(--sp-1);
    margin-right: 6px;
    font-size: var(--fs-meta);
    line-height: var(--lh-snug);
    background-color: var(--color-background-alt);
    border-radius: 4px;
  }

  .social {
    font-size: 1.1em;
    margin-right: 0.4em;
    color: var(--brand-light);
  }

  .url-text {
    font-size: 0.9em;
    color: var(--color-text-secondary);
    font-weight: normal;
  }

  @media print {
    .item {
      background-color: var(--color-background-alt) !important;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .social {
      color: var(--brand-light) !important;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    :global(.fa-stack-overflow)::after { content: ""; }
  }

  @media (prefers-color-scheme: dark) {
    .social {
      color: var(--brand-dark);
    }
  }
</style>
