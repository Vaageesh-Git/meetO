import { Notification } from "../models/Notification";

export interface IObserver {
  update(actionType: string, payload: any): void;
}

export interface ISubject {
  addObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
  notifyObservers(actionType: string, payload: any): void;
}
