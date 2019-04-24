import { Injectable } from '@angular/core';
import { Model } from '../../../backend/src/app/layout/models/models.model';
import * as io from 'socket.io-client';
import {ToasterService} from 'angular5-toaster';

@Injectable()
export class AppSocketIoService {
  private socket: SocketIOClient.Socket; // The client instance of socket.io

  // Constructor with an injection of ToastService
  constructor(private toasterService: ToasterService) {
    this.socket = io();
  }

  // Emit: model saved event
  emitEventOnModelSaved(modelSaved){
      this.socket.emit('modelSaved', modelSaved);
  }

  // Emit: model updated event
  emitEventOnModelUpdated(modelUpdated){
    this.socket.emit('modelUpdated', modelUpdated);
  }

  // Consume: on model saved 
  consumeEvenOnModelSaved(){
    var self = this;
    this.socket.on('modelSaved', function(model: Model){
      self.toasterService.pop('success', 'NEW Model SAVED',
          'A model with title \"' + model.title + '\" has just been shared' + ' with stack: ' + model.technologies);
    });
  }

  // Consume on model updated 
  consumeEvenOnModelUpdated(){
    var self = this;
    this.socket.on('modelUpdated', function(model: Model){
      self.toasterService.pop('info', 'MODEL UPDATED', 
          'A model with title \"' + model.title + '\" has just been updated');
    });
  }
}