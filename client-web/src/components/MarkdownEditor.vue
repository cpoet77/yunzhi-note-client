<template>
  <div class="markdownEditor">
    <div id="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Vditor from "vditor";
import "vditor/dist/index.css";

interface IData {
  contentEditor: Vditor | null;
}

export default defineComponent({
  name: "MarkdownEditor",
  props: {
    msg: String,
  },
  data: function (): IData {
    return {
      contentEditor: null,
    };
  },
  mounted: function () {
    this.contentEditor = new Vditor("content", {
      height: 360,
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      after: () => {
        if (this.contentEditor) {
          this.contentEditor.setValue("hello, Vditor + Vue!");
        }
      },
    });
  },
});
</script>
