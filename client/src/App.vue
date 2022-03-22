
<template>
  <div class="btn-box">
    <button @click="socketTestEmit">简单确认信息示例</button>
    <div>服务端返回数据：{{ socketTestBackData }}</div>
    <button @click="socketTest_Event">转发示例</button>
    <div>服务端返回数据：{{ socketTest_EventBackData }}</div>
    <button>广播示例(请参考文章内容)</button>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, inject } from 'vue';
import { Socket } from 'socket.io-client';

const socket = inject('socket') as Socket;
const socketTestBackData = ref()
const socketTest_EventBackData = ref()

const socketTestEmit = () => {
  socket.emit('socketTest', { test: '简单确认信息示例' }, (data: any) => {
    console.log(data)
    socketTestBackData.value = JSON.stringify(data) + "," + new Date().toLocaleString()
  });
}

socket.on('socketTest2', (data) => {
  console.log(data)
  socketTest_EventBackData.value = JSON.stringify(data) + "," + new Date().toLocaleString()
});
const socketTest_Event = () => {
  socket.emit('socketTest_Event', { test: '转发示例' })
}

onMounted(() => {
  socket.connect(); //连接socket服务器
});
</script>

<style>
.btn-box button {
  display: block;
  margin-top: 10px;
}
</style>
