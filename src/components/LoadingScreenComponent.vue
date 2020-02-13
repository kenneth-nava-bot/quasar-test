<template>
  <div class="fit window-height bg-grey-4 column wrap justify-center items-center content-center q-gutter-md">
    <div class="text-h3 text-title"><q-spinner-bars color="primary" /></div>
    <div class="text-caption"><slot>Please wait, while we load the page...</slot></div>
  </div>
</template>

<script>
export default {
}
</script>
