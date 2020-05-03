import LinkedList from './LinkedList';

interface QueueI<T> {
    length: number,
    dequeue: () => T | undefined,
    enqueue: (value: T) => number,
    isEmpty: () => boolean,
}

export default class Queue<T> implements QueueI<T> {
    private list = new LinkedList<T>();

    get length () {
        return this.list.length;
    }

    isEmpty () {
        return this.list.isEmpty();
    }

    dequeue () {
        return this.list.shift();
    }
 
    enqueue (value: T) {
        return this.list.push(value);
    }
}
