// Node and DDL type definitions for the Doubly Linked List

export interface INode<T> {
  value: T;
  next: INode<T> | null;
  prev: INode<T> | null;
}

export interface IDoublyLinkedList<T> {
  head: INode<T> | null;
  tail: INode<T> | null;
  size: number;
  insertHead(value: T): void;
  insertTail(value: T): void;
  removeByIndex(index: number): void;
  removeByValue(value: T): void;
  removeDuplicates(): void;
  search(value: T): number | null;
  getNodes(): INode<T>[];
}
