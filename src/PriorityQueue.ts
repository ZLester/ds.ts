import Heap from './Heap';

interface PriorityQueueI<T> {
    length: number,
    dequeue: () => T | undefined,
    enqueue: (value: T) => number,
}

export default class PriorityQueue<T> implements PriorityQueueI<T> {
    private heap = null;

    constructor (getValue: (v: T) => any = (v: T) => v) {
        this.heap = new Heap<T>(getValue);
    }

    get length () {
        return this.heap.length;
    }

    dequeue () {
        return this.heap.pop();
    }

    enqueue (value: T) {
        return this.heap.push(value);        
    }
}
