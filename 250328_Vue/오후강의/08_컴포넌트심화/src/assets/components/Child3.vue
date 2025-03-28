<script setup>
import { useCssModule } from 'vue';

const styles = useCssModule();
</script>

<template>
  <div :class="styles.child">
    <h2>Child3</h2>
  </div>
</template>

<style module>
.child {
  background-color: rgb(73, 193, 121);
  border: solid 1px black;
  margin: 1.5em;
  padding: 1em;
}
</style>
