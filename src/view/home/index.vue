<template>
  <Fswaterfall :setParams="setParams" :loading="isFetching">
    <template #item="{ item }">
      <img :src="item.imgUrl" :style="{
        height: `${item.imgHeight}px`
      }" class="card-box" />
      <div class="font-medium	text-left my-[10px] overflow-hidden text-ellipsis desc">{{ item.desc }}</div>
      <div class=" flex justify-between items-center">
        <div class="flex items-center">
          <img class=" rounded-full mr-[10px]" :src="item.head" />
          <div>{{ item.name }}</div>
        </div>
        <div>{{ item.collect }}</div>
      </div>
    </template>
  </Fswaterfall>
</template>

<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { article } from '@/service/home';
import { ref, reactive } from 'vue';
import Fswaterfall from '@/components/fs-waterfall/index.vue';

const params = reactive({
  pageNum: 1,
  pageSize: 20
})

const queryString = new URLSearchParams(params as unknown as string).toString();

const articleUrl = ref(`${article}?${queryString}`);

const { isFetching, execute, data } = useFetch(articleUrl, {
  immediate: false,
  refetch: false,
}).json();

const setParams = async (page: number, pageSize: number) => {
  params.pageNum = page;
  params.pageSize = pageSize;
  articleUrl.value = `${article}?${new URLSearchParams(params as unknown as string).toString()}`;
  await execute();
  return data;
}

</script>

<style scoped lang="less">
.card-box {
  border-radius: 10px;
}

.desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
