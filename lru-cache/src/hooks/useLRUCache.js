import { useRef } from "react";

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.currentLength = 0;
    this.head = null;
    this.tail = null;
  }

  get(key) {
    if (this.head === null) return null;
    let node = this.head;
    while (node) {
      if (node.key === key) {
        return node;
      }
      node = node.next;
    }
    return null;
  }

  put(key, value) {
    if (this.get(key)) {
      this.moveToFront(key);
    } else {
      if (this.currentLength === this.capacity) {
        this.removeLast();
      }
      this.addToFront(key, value);
    }
  }
  addToFront(key, value) {
    const newNode = {
      key,
      value,
      next: null,
    };
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    ++this.currentLength;
  }

  moveToFront(key) {
    const current = this.get(key);

    if (current === this.head) return;
    let prev = null;
    let node = this.head;
    while (node && node.key !== key) {
      prev = node;
      node = node.next;
    }

    if (!node) return;

    if (node === this.tail) {
      this.tail = prev;
    }
    if (prev) {
      prev.next = node.next;
    }

    node.next = this.head;
    this.head = node;
  }

  removeLast() {
    if (!this.head) return;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      let current = this.head;
      while (current.next !== this.tail) {
        current = current.next;
      }
      current.next = null;
      this.tail = current;
    }
    --this.currentLength;
  }
}

export const useLRUCache = (capacity) => {
  const cacheRef = useRef(new LRUCache(capacity));
  console.log(cacheRef.current);
  return {
    get: (key) => cacheRef.current.get(key),
    put: (key, value) => cacheRef.current.put(key, value),
  };
};
