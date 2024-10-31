<script>
  import "../app.css";
  import { page } from "$app/stores";
  import Footer from "../lib/Footer.svelte";
  import Header from "../lib/Header.svelte";
  import MobileHeader from "../lib/MobileHeader.svelte";

  $: activeRoute = $page.url.pathname;

  const noHeaderFooterRoutes = ["/signin", "/signup"];
  $: showHeader = !noHeaderFooterRoutes.includes(activeRoute);
  $: showFooter = !noHeaderFooterRoutes.includes(activeRoute);
</script>

{#if showHeader}
  <Header />
  <MobileHeader />
{/if}

<slot />

{#if showFooter}
  <Footer />
{/if}
