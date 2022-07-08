<template>
  <markdown-editor />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownEditor from "@/components/MarkdownEditor.vue";

export default defineComponent({
  name: "App",
  components: {
    MarkdownEditor,
  },
});
</script>

<style lang="scss"></style>
