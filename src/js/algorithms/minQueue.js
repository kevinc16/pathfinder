class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

// not using heap - could be faster
export class PriorityQueue {
  // An array is used to implement priority
  constructor() {
    this.items = [];
  }

  enqueue(element, priority) {
    var qElement = new QElement(element, priority);
    var contain = false;

    // iterating through the entire
    // item array to add element at the
    // correct location of the Queue
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        // Once the correct location is found it is
        // enqueued
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }

    // if the element have the highest priority
    // it is added at the end of the queue
    if (!contain) {
      this.items.push(qElement);
    }
  }

  // returns and removes the element with highest prio
  dequeue() {
    // return the dequeued element
    // and remove it.
    // if the queue is empty
    // returns Underflow
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }

  front() {
    // returns the highest priority element
    // in the Priority queue without removing it.
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[0];
  }

  rear() {
    // returns the lowest priorty
    // element of the queue
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    // return true if the queue is empty.
    return this.items.length == 0;
  }

  includes(element) {
    return this.items.includes(element);
  }
}
