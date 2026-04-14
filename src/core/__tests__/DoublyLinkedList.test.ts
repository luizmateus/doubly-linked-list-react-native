import { DoublyLinkedList } from "../DoublyLinkedList";

function values<T>(list: DoublyLinkedList<T>): T[] {
  return list.getNodes().map((n) => n.value);
}

describe("DoublyLinkedList", () => {
  let list: DoublyLinkedList<number>;

  beforeEach(() => {
    list = new DoublyLinkedList<number>();
  });

  describe("initial state", () => {
    it("starts empty", () => {
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.size).toBe(0);
      expect(values(list)).toEqual([]);
    });
  });

  describe("insertHead", () => {
    it("inserts into an empty list", () => {
      list.insertHead(1);
      expect(list.head?.value).toBe(1);
      expect(list.tail?.value).toBe(1);
      expect(list.size).toBe(1);
    });

    it("prepends to the front", () => {
      list.insertHead(2);
      list.insertHead(1);
      expect(values(list)).toEqual([1, 2]);
    });

    it("sets prev/next pointers correctly", () => {
      list.insertHead(2);
      list.insertHead(1);
      expect(list.head?.prev).toBeNull();
      expect(list.head?.next?.value).toBe(2);
      expect(list.tail?.prev?.value).toBe(1);
      expect(list.tail?.next).toBeNull();
    });

    it("increments size", () => {
      list.insertHead(1);
      list.insertHead(2);
      expect(list.size).toBe(2);
    });
  });

  describe("insertTail", () => {
    it("inserts into an empty list", () => {
      list.insertTail(1);
      expect(list.head?.value).toBe(1);
      expect(list.tail?.value).toBe(1);
      expect(list.size).toBe(1);
    });

    it("appends to the back", () => {
      list.insertTail(1);
      list.insertTail(2);
      expect(values(list)).toEqual([1, 2]);
    });

    it("sets prev/next pointers correctly", () => {
      list.insertTail(1);
      list.insertTail(2);
      expect(list.head?.prev).toBeNull();
      expect(list.head?.next?.value).toBe(2);
      expect(list.tail?.prev?.value).toBe(1);
      expect(list.tail?.next).toBeNull();
    });

    it("increments size", () => {
      list.insertTail(1);
      list.insertTail(2);
      expect(list.size).toBe(2);
    });
  });

  describe("removeByIndex", () => {
    beforeEach(() => {
      [1, 2, 3, 4].forEach((v) => list.insertTail(v));
    });

    it("removes the head (index 0)", () => {
      list.removeByIndex(0);
      expect(values(list)).toEqual([2, 3, 4]);
      expect(list.head?.value).toBe(2);
      expect(list.head?.prev).toBeNull();
    });

    it("removes the tail (last index)", () => {
      list.removeByIndex(3);
      expect(values(list)).toEqual([1, 2, 3]);
      expect(list.tail?.value).toBe(3);
      expect(list.tail?.next).toBeNull();
    });

    it("removes a middle node", () => {
      list.removeByIndex(1);
      expect(values(list)).toEqual([1, 3, 4]);
    });

    it("fixes prev/next pointers after middle removal", () => {
      list.removeByIndex(1);
      expect(list.head?.next?.value).toBe(3);
      expect(list.head?.next?.prev?.value).toBe(1);
    });

    it("decrements size", () => {
      list.removeByIndex(0);
      expect(list.size).toBe(3);
    });

    it("does nothing for a negative index", () => {
      list.removeByIndex(-1);
      expect(list.size).toBe(4);
    });

    it("does nothing for an out-of-bounds index", () => {
      list.removeByIndex(4);
      expect(list.size).toBe(4);
    });

    it("removes the only node leaving an empty list", () => {
      const single = new DoublyLinkedList<number>();
      single.insertHead(42);
      single.removeByIndex(0);
      expect(single.head).toBeNull();
      expect(single.tail).toBeNull();
      expect(single.size).toBe(0);
    });
  });

  describe("removeByValue", () => {
    beforeEach(() => {
      [1, 2, 3, 2, 4].forEach((v) => list.insertTail(v));
    });

    it("removes the first occurrence of a value", () => {
      list.removeByValue(2);
      expect(values(list)).toEqual([1, 3, 2, 4]);
    });

    it("removes the head node", () => {
      list.removeByValue(1);
      expect(values(list)).toEqual([2, 3, 2, 4]);
      expect(list.head?.prev).toBeNull();
    });

    it("removes the tail node", () => {
      list.removeByValue(4);
      expect(values(list)).toEqual([1, 2, 3, 2]);
      expect(list.tail?.next).toBeNull();
    });

    it("decrements size", () => {
      list.removeByValue(2);
      expect(list.size).toBe(4);
    });

    it("does nothing when value is not found", () => {
      list.removeByValue(99);
      expect(list.size).toBe(5);
      expect(values(list)).toEqual([1, 2, 3, 2, 4]);
    });

    it("removes the only node leaving an empty list", () => {
      const single = new DoublyLinkedList<number>();
      single.insertHead(7);
      single.removeByValue(7);
      expect(single.head).toBeNull();
      expect(single.tail).toBeNull();
      expect(single.size).toBe(0);
    });
  });

  describe("removeDuplicates", () => {
    it("removes all duplicate values keeping first occurrences", () => {
      [1, 2, 1, 3, 2, 4].forEach((v) => list.insertTail(v));
      list.removeDuplicates();
      expect(values(list)).toEqual([1, 2, 3, 4]);
    });

    it("updates size after removal", () => {
      [1, 1, 1].forEach((v) => list.insertTail(v));
      list.removeDuplicates();
      expect(list.size).toBe(1);
    });

    it("does nothing on a list with no duplicates", () => {
      [1, 2, 3].forEach((v) => list.insertTail(v));
      list.removeDuplicates();
      expect(values(list)).toEqual([1, 2, 3]);
      expect(list.size).toBe(3);
    });

    it("does nothing on an empty list", () => {
      list.removeDuplicates();
      expect(list.size).toBe(0);
    });

    it("fixes tail pointer when last node is a duplicate", () => {
      [1, 2, 1].forEach((v) => list.insertTail(v));
      list.removeDuplicates();
      expect(list.tail?.value).toBe(2);
      expect(list.tail?.next).toBeNull();
    });
  });

  describe("search", () => {
    beforeEach(() => {
      [10, 20, 30].forEach((v) => list.insertTail(v));
    });

    it("returns the index of an existing value", () => {
      expect(list.search(10)).toBe(0);
      expect(list.search(20)).toBe(1);
      expect(list.search(30)).toBe(2);
    });

    it("returns null when value is not found", () => {
      expect(list.search(99)).toBeNull();
    });

    it("returns null on an empty list", () => {
      expect(new DoublyLinkedList<number>().search(1)).toBeNull();
    });
  });

  describe("getNodes", () => {
    it("returns nodes in head-to-tail order", () => {
      [1, 2, 3].forEach((v) => list.insertTail(v));
      expect(values(list)).toEqual([1, 2, 3]);
    });

    it("returns an empty array for an empty list", () => {
      expect(values(list)).toEqual([]);
    });
  });
});
