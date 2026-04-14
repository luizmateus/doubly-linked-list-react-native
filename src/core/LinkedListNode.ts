import { INode } from "./types";

export class LinkedListNode<T> implements INode<T> {
  value: T;
  next: LinkedListNode<T> | null = null;
  prev: LinkedListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
