import LinkedList from './LinkedList';

interface StackI<T> {
    length: number,
    isEmpty: () => boolean,
    pop: () => T | undefined,
    push: (value: T) => void,
}

export default class Stack<T> implements StackI<T> {
    private list = new LinkedList<T>();

    get length () {
        return this.list.length;
    }

    isEmpty () {
        return this.list.isEmpty();
    }

    pop () {
        return this.list.pop();
    }
 
    push (value: T) {
        return this.list.push(value);
    }
}
