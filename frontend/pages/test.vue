<template>
  <div class="-content">
    <dnd-grid-container class="container" :layout.sync="layoutJson">
      <dnd-grid-box class="grid-component" :boxId="layoutJson[0].id">
        <h1>Box 1</h1>
      </dnd-grid-box>
      <dnd-grid-box class="grid-component" :boxId="layoutJson[1].id" resizeVisible>
        <h1>Box 2</h1>
      </dnd-grid-box>
      <dnd-grid-box class="grid-component" :boxId="layoutJson[2].id" resizeVisible>
        <h1>Box 3</h1>
      </dnd-grid-box>
      <dnd-grid-box class="grid-component" :boxId="layoutJson[3].id" resizeVisible>
        <h1>Box 4</h1>
      </dnd-grid-box>
    </dnd-grid-container>
  </div>
</template>

<script>
import { Container, Box } from "@dattn/dnd-grid";
// minimal css for the components to work properly
import "@dattn/dnd-grid/dist/dnd-grid.css";

export default {
  auth: false,
  data() {
    return {
      layoutJson: [
        {
          id: "box-a",
          hidden: false,
          pinned: false,
          position: {
            x: 0,
            y: 0,
            w: 4, // Multiplier for virtual grid width
            h: 4, // Multiplier for virtual grid height
          },
          outerMargin : 20
        },
        {
          id: "box-b",
          hidden: false,
          pinned: false,
          position: {
            x: 4,
            y: 0,
            w: 2,
            h: 2,
          },
          outerMargin : 20
        },
        {
          id: "box-c",
          hidden: false,
          pinned: false,
          position: {
            x: 0,
            y: 4,
            w: 2,
            h: 2,
          },
          outerMargin : 20
        },
        {
          id: "box-d",
          hidden: false,
          pinned: false,
          position: {
            x: 2,
            y: 4,
            w: 2,
            h: 2,
          },
          margin : 20
        },
      ],
    };
  },
  components: {
    DndGridContainer: Container,
    DndGridBox: Box,
  },
  mounted() {},
};
</script>

<style>

.grid-component {
  background: rgb(239, 232, 255) !important;
  border-radius: 20px;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.container {
  width: 50vw;
  min-width: 0;
}
</style>