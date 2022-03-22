import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { SocketTestService } from './socket-test.service';
import { CreateSocketTestDto } from './dto/create-socket-test.dto';
import { UpdateSocketTestDto } from './dto/update-socket-test.dto';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true, maxHttpBufferSize: '1e8' })
export class SocketTestGateway {
  constructor(private readonly socketTestService: SocketTestService) {}

  @SubscribeMessage('createSocketTest')
  create(@MessageBody() createSocketTestDto: CreateSocketTestDto) {
    return this.socketTestService.create(createSocketTestDto);
  }

  @SubscribeMessage('findAllSocketTest')
  findAll() {
    return this.socketTestService.findAll();
  }

  @SubscribeMessage('findOneSocketTest')
  findOne(@MessageBody() id: number) {
    return this.socketTestService.findOne(id);
  }

  @SubscribeMessage('updateSocketTest')
  update(@MessageBody() updateSocketTestDto: UpdateSocketTestDto) {
    return this.socketTestService.update(
      updateSocketTestDto.id,
      updateSocketTestDto,
    );
  }

  @SubscribeMessage('removeSocketTest')
  remove(@MessageBody() id: number) {
    return this.socketTestService.remove(id);
  }

  //简单确认信息示例
  @SubscribeMessage('socketTest')
  socketTest(@MessageBody() data: any) {
    Logger.log('客户端发送的数据：' + JSON.stringify(data));
    return {
      msg1: '测试1',
      msg2: '测试2',
    };
  }

  //转发示例
  @SubscribeMessage('socketTest_Event')
  socketTest_Event(@MessageBody() data: any) {
    Logger.log('客户端发送的数据：' + JSON.stringify(data));
    return {
      event: 'socketTest2',
      data,
    };
  }

  // 广播示例
  @SubscribeMessage('socketTest_Broadcast')
  socketTest_Broadcast(
    @MessageBody() data: any,
    @ConnectedSocket() clinet: Socket,
  ) {
    clinet.broadcast.emit('socketTest3', data);
  }
}
