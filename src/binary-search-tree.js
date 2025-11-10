const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addWithin(this.rootNode, data);

    function addWithin(node, data) {
      if (!node) return new Node(data);
      if (data === node.data) return node;
      if (data < node.data) node.left = addWithin(node.left, data);
      else node.right = addWithin(node.right, data);
      return node;
    }
  }

  has(data) {
    return searchWithin(this.rootNode, data);

    function searchWithin(node, data) {
      if (!node) return false;
      if (node.data === data) return true;
      return data < node.data
        ? searchWithin(node.left, data)
        : searchWithin(node.right, data);
    }
  }

  find(data) {
    return findWithin(this.rootNode, data);

    function findWithin(node, data) {
      if (!node) return null;
      if (node.data === data) return node;
      return data < node.data
        ? findWithin(node.left, data)
        : findWithin(node.right, data);
    }
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, data) {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        // Node found

        // No children
        if (!node.left && !node.right) return null;

        // One child
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        // Two children — find minimum in right subtree
        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }

        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);
        return node;
      }
    }
  }

  min() {
    if (!this.rootNode) return null;
    let node = this.rootNode;
    while (node.left) node = node.left;
    return node.data;
  }

  max() {
    if (!this.rootNode) return null;
    let node = this.rootNode;
    while (node.right) node = node.right;
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
