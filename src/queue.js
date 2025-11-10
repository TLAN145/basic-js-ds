const { NotImplementedError } = require('../lib/errors');
const { ListNode } = require('../extensions/list-node.js');

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  getUnderlyingList() {
    // Convert linked list to plain object recursively
    function toPlain(node) {
      if (!node) return null;
      return { value: node.value, next: toPlain(node.next) };
    }
    return toPlain(this.head);
  }

  enqueue(value) {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }

  dequeue() {
    if (!this.head) return undefined; // <-- tests expect undefined, not null
    const value = this.head.value;
    this.head = this.head.next;
    return value;
  }
}

module.exports = {
  Queue,
};
