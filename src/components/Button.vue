<template>
  <button @click="handlePress" class="buttonDesign">{{ props.name }}</button>
</template>

<script setup lang="ts">
const props = defineProps(['name'])
const emit = defineEmits(['submit'])

const handlePress = () => {
  emit('submit')
}
</script>

<style>
.buttonDesign {
  border-radius: 8px;
  float: right;
  padding: 4px;
  font-size: small;
  color: white;
  background-color: #2d2a43;
  width: 90px;
}
:hover.buttonDesign {
  background-color: #3498db;
  border: none;
  color: white;
}
</style>
