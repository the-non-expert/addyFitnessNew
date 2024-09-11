<script>
  import "../app.css";
  import Footer from "../lib/Footer.svelte";
  import Header from "../lib/Header.svelte";
  import MobileHeader from "../lib/MobileHeader.svelte";
</script>

<Header />
<MobileHeader />

<slot />
<Footer />
