interface ListNodeI<T> {
    value: T,
    next?: ListNodeI<T>,
    prev?: ListNodeI<T>,
}

class ListNode<T> implements ListNodeI<T> {
    next = null;
    prev = null;
    value = null;

    constructor (value: T) {
        this.value = value;
    }
}

interface LinkedListI<T> {
    head?: ListNode<T>,
    tail?: ListNode<T>,
    length: number,

    isEmpty: () => boolean,
    pop: () => T | undefined,
    push: (value: T) => void,
}

export default class LinkedList<T> implements LinkedListI<T> {
    head = null;
    tail = null;
    length = 0;

    isEmpty () {
        return this.head === null;
    }

    push (value: T) {
        const node = new ListNode<T>(value);

        this.length++;

        if (this.tail === null) {
            this.head = node;
            this.tail = node;

            return this.length;
        }

        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;

        return this.length;
    }

    pop () {
        if (this.tail === null) {
            return undefined;
        }

        const node = this.tail;

        this.tail = this.tail.prev;

        if (node.prev) {
            this.tail.next = null;
        }

        if (this.head === node) {
            this.head = this.tail;
        }

        this.length--;
    
        return node.value;
    }

    shift () {
        if (this.head === null) {
            return undefined;
        }

        const node = this.head;

        this.head = this.head.next;

        if (node.next) {
            this.head.prev = null;
        }

        if (this.tail === node) {
            this.tail = this.head;
        }

        this.length--;

        return node.value;
    }

    unshift (value: T) {
        const node = new ListNode(value);

        this.length++;

        if (this.head === null) {
            this.head = node;
            this.tail = node;

            return this.length;
        }

        this.head.prev = node;
        node.next = this.head;
        this.head = node;

        return this.length;
    }
}
