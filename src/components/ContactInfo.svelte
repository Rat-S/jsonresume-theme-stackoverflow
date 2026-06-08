<script>
  let { website, email, phone, location } = $props();
</script>

{#if website || email || phone || location}
  <div class="contact">
    {#if email}
      <div class="contact-item">
        <span class="fa-regular fa-envelope icon"></span>
        <a class="hide-href-print" href="mailto:{email}">{email}</a>
      </div>
    {/if}
    {#if phone}
      <div class="contact-item">
        <span class="fa-solid fa-mobile-screen-button icon"></span>
        <a class="hide-href-print" href="tel:{phone}">{phone}</a>
      </div>
    {/if}
    {#if location}
      <div class="contact-item">
        <span class="fa-solid fa-location-dot icon"></span>
        <span>{location}</span>
      </div>
    {/if}
    {#if website}
      <div class="contact-item">
        <span class="fa-solid fa-up-right-from-square icon"></span>
        <a class="hide-href-print" target="_blank" href={website}>{website}</a>
      </div>
    {/if}
  </div>
{/if}

<style>
  .contact {
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
    border: 1px solid var(--color-border-light);
    border-radius: 4px;
  }

  .icon {
    margin-right: 0.4em;
    color: var(--color-text-secondary);
  }
</style>
