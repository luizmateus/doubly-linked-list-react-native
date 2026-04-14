import { INode, IDoublyLinkedList } from "./types";
import { LinkedListNode } from "./LinkedListNode";

export class DoublyLinkedList<T> implements IDoublyLinkedList<T> {
  head: LinkedListNode<T> | null = null;
  tail: LinkedListNode<T> | null = null;
  size: number = 0;

  insertHead(value: T): void {
    const newNode = new LinkedListNode(value);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  insertTail(value: T): void {
    const newNode = new LinkedListNode(value);
    if (!this.tail) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  removeByIndex(index: number): void {
    if (index < 0 || index >= this.size) return;
    let current = this.head;
    let i = 0;
    while (current && i < index) {
      current = current.next;
      i++;
    }
    if (!current) return;
    if (current.prev) current.prev.next = current.next;
    else this.head = current.next;
    if (current.next) current.next.prev = current.prev;
    else this.tail = current.prev;
    this.size--;
  }

  removeByValue(value: T): void {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        if (current.prev) current.prev.next = current.next;
        else this.head = current.next;
        if (current.next) current.next.prev = current.prev;
        else this.tail = current.prev;
        this.size--;
        break;
      }
      current = current.next;
    }
  }

  removeDuplicates(): void {
    const seen = new Set<T>();
    let current = this.head;
    while (current) {
      if (seen.has(current.value)) {
        const toRemove = current;
        if (toRemove.prev) toRemove.prev.next = toRemove.next;
        else this.head = toRemove.next;
        if (toRemove.next) toRemove.next.prev = toRemove.prev;
        else this.tail = toRemove.prev;
        this.size--;
      } else {
        seen.add(current.value);
      }
      current = current.next;
    }
  }

  search(value: T): number | null {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) return index;
      current = current.next;
      index++;
    }
    return null;
  }

  getNodes(): INode<T>[] {
    const nodes: INode<T>[] = [];
    let current = this.head;
    while (current) {
      nodes.push(current);
      current = current.next;
    }
    return nodes;
  }
}
