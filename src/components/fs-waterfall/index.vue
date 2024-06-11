<template>
  <div class="fs-waterfall-container" ref="containerRef" @scroll="handleScroll">
    <div class="fs-waterfall-list flex flex-wrap gap-[8px] ">
      <div class="fs-waterfall-item flex flex-1 flex-col gap-[8px]" v-for="(item, index) in state.list" :key="index">
        <div :style="{
          width: `${state.cardWidth}px`,
          transition: 'all 0.3s'
        }" v-for="(itm, ind) in item" :key="ind">
          <slot name="item" :item="itm" :index="ind"></slot>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
const props = defineProps(['data', 'setParams', 'loading']);
const containerRef = ref<HTMLDivElement | null>(null);
const state = reactive<{
  column: number,
  list: any,
  orderList: any,
  isFinish: boolean,
  pageNum: number,
  gap: number,
  cardWidth: number
}>({
  column: 0, // 列
  list: [], // 二维数组，每列对应数据，页面渲染处理后的数据
  orderList: [], // 未处理的数据，用于布局变化排序
  isFinish: false, // 是否没数据了
  pageNum: 1,
  gap: 8,
  cardWidth: 230,
})

onMounted(() => {
  if (containerRef.value) {
    resizeObserver.observe(containerRef.value);
    getColumn();
  }
  getCardList(1, 20);
});

const getCardList = async (page: number, pageSize: number) => {
  const data = await props.setParams(page, pageSize);
  const { list = [], total = 0 } = data.value?.data
  state.pageNum++;
  if (total === state.list.flat().length + list.length) {
    state.isFinish = true;
    return;
  }
  const newList = !state.list.length ? new Array(state.column).fill(null).map(() => []) : state.list;
  const last = 20 % state.column;
  list.forEach((item: any, index: number) => {
    const row = (state.pageNum > 2 ? index + last : index) % state.column; // 计算当前项应该放置的行索引
    const imgHeight = Math.floor((item.height * state.cardWidth) / item.width);
    newList[row].push({
      ...item,
      imgHeight,
    });
  })
  state.orderList = [...state.orderList, ...list];
  state.list = newList;
};

const getColumn = () => {
  const containerWidth = containerRef.value?.clientWidth ?? 0;
  const col = Math.floor(containerWidth / (state.cardWidth + state.gap));
  state.column = col;
}

const handleScroll = () => {
  const { scrollTop, clientHeight, scrollHeight } = containerRef.value!;
  const bottom = scrollHeight - clientHeight - scrollTop;
  if (bottom === 0) {
    getCardList(state.pageNum, 20);
  }
}

const resizeObserver = new ResizeObserver(useDebounceFn(() => {
  getColumn();
}, 500));

watch(
  () => state.column,
  () => {
    const newList: any = new Array(state.column).fill(null).map(() => []);

    state.orderList.forEach((item: any, index: number) => {
      const row = index % state.column;
      const imgHeight = Math.floor((item.height * state.cardWidth) / item.width);
      newList[row].push({
        ...item,
        imgHeight,
      });
    });
    state.list = newList;
  }
);

onUnmounted(() => {
  containerRef.value && resizeObserver.unobserve(containerRef.value);
});

</script>

<style scoped lang="less">
.fs-waterfall {
  &-container {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0 20px;
  }
}
</style>
