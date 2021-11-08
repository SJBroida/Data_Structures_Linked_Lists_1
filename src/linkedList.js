/**
 * Node is used to store values in a LinkedList
 */
class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

/**
 * LinkedList class holds a reference to the `head` node.
 */

class LinkedList {
  constructor() {
    this.head = null; // references the first Node in the LinkedList
  }

  /**
   * The number of elements in the linked list.
   *
   * @returns {number}
   *   the number of elements in the linked list.
   */

  get length() {
    let count = 0; // initialize our counter
    let node = this.head; // refers to the first node in our LL

    // while our node is not null
    // iterate through the LL
    while (node) {
      count++; // increment our counter
      node = node.next; // reassign our node to be the next node
    }

    return count;
  }

  /**
   * Find a node in the linked list.
   *
   * @param isMatch
   *  function that returns true if the current node matches the search criteria.
   *
   * @returns {*|null}
   *  the first node where `isMatch(node, index) === true` or null if no match is found.
   */
  find(isMatch) {
    //let index = 0; // initialize counter
    //let node = this.head; // first node in the LL

    // iterate through LL
    //while (node) {
      //if (isMatch(node, index)) {
        //return node;
      //}

      //index++; // increment the index #
      //node = node.next; // we did not find the node yet, move on to the next node
    //}

    //return null;
    return this.findWithPrevious(isMatch)[0];
  }

  /**
   * Find a node, and its previous node, in the linked list.
   * @param isMatch
   *  Function that returns `true` if the current node matches the search criteria
   *
   * @returns {[Node|null, Node|null]}
   *  The first element is the node where `isMatch(node, index) === true`, or `null` if no match is found.
   *  The second element is the previous Node, or `null` if no match is found.
   *  This second element is also `null` if `this.head` is the matched node.
   */
   findWithPrevious(isMatch) {
    let index = 0;
    let previous = null;
    let node = this.head;
    while (node) {
      if (isMatch(node, index)) {
        return [node, previous];
      }
      index++;
      previous = node;
      node = node.next;
    }
    return [null, null];
      
  }

  /**
   * Insert the value after a matched node in the list.
   *
   * @param isMatch
   *  function that returns true if the current node matches the search criteria.
   *
   * @param value
   *  the value to add.
   *
   * @returns {LinkedList}
   *  this linked list so methods can be chained.
   *
   * @throws 'No match found.'
   *  if list is not empty and no matching element is found.
   */
  insert(value, isMatch = (node, index) => index === this.length - 1) {
    // check if LL is empty
    if (this.head) {

      // find the node to insert after
      const previousNode = this.find(isMatch);
    
      if (!previousNode) {
        throw new Error("No match found");
      }
    
      // assign next pointer to the new node
      // make the "next" pointer of the new Node be the old "next" of the previous Node
      const newNode = new Node(value, previousNode.next);
      previousNode.next = newNode;
    } else {
      this.insertAtHead(value); // case when LL is empty
    }
    
    return this;
  }

  /**
   * Insert a new value at the head of the list.
   * @param value
   *  the new value to insert
   *
   * @returns {LinkedList}
   *  this linked list so methods can be chained.
   */

  insertAtHead(value) {
    // This is a new function that you will need to implement.
    this.head = new Node(value, this.head); // Node(value, next)

    return this; // return the current state of the LL
  }

  /**
   * Remove the first node where `isMatch(node, index) === true`.
   *
   * @param isMatch
   *  function that returns true if the current node matches the node to be removed.
   *
   * @returns {LinkedList}
   *  this linked list so methods can be chained.
   */
  remove(isMatch) {

    const [matchedNode, previousNode] = this.findWithPrevious(isMatch);
  
    if (!matchedNode) {
      return null;
    }
  
    if (this.head === matchedNode) {
      this.head = this.head.next;
    } else {
      previousNode.next = matchedNode.next;
    }
    return matchedNode.value;
  }
}

module.exports = LinkedList;
