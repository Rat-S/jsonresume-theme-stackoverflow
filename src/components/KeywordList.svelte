<script>
  let { keywords = [], cssClass = 'keywords' } = $props();
</script>

{#if keywords?.length}
  <ul class={cssClass}>
    {#each keywords as keyword}
      <li>{keyword}</li>
    {/each}
  </ul>
{/if}

<style>
  ul {
    margin: var(--sp-2) 0 0 0;
  }

  li {
    display: inline-block;
    margin: 2px 4px 2px 0;
    padding: 3px 8px;
    font-size: var(--fs-fine);
    line-height: 1.4;
    color: var(--color-keyword-text);
    background-color: var(--color-keyword-bg);
    border: 1px solid var(--color-keyword-border);
    border-radius: 4px;
    white-space: normal;
    max-width: 100%;
    word-break: break-word;
    transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  }

  li:hover {
    background-color: var(--color-keyword-border);
    transform: translateY(-1px);
    cursor: default;
  }

  @media print {
    ul { margin: var(--sp-1) 0 0 0; }
    li {
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
      transform: none;
      transition: none;
    }
    li::after { content: none; }
    :global(.skills-grid) li::after { content: none; }
    ul::before { font-size: var(--fs-body); font-weight: 600; }
    ul.keywords::before { content: "Skills: "; font-size: var(--fs-body); }
    :global(.skills-grid) ul::before { content: none; }
    ul.courses::before { content: "Major courses: "; font-size: var(--fs-body); }
    :global(.skills-grid) .keywords { font-size: var(--fs-meta); margin: 0; }
  }
</style>
