interface PriorityQueueI<T> {
    length: number,
    dequeue: () => T | undefined,
    enqueue: (value: T) => number,
    isEmpty: () => boolean,
}

export default class PriorityQueue<T> implements PriorityQueueI<T> {
    private data: T[] = [];
    private getValue: (v: T) => any;

    constructor (getValue: (v: T) => any = (v: T) => v) {
        this.getValue = getValue;
    }

    get length () {
        return this.data.length;
    }

    private getLeftChildIdx (idx: number) {
        return idx * 2 + 1;
    }
    
    private getRightChildIdx (idx: number) {
        return this.getLeftChildIdx(idx) + 1;
    }

    private getParentIdx (idx: number) {
        return Math.floor((idx - 1) / 2);
    }

    private swap (x: number, y: number) {
        const temp = this.data[x];
        this.data[x] = this.data[y];
        this.data[y] = temp;
    }

    private siftDown (idx: number) {
        const parent = this.data[idx];
        const parentValue = this.getValue(parent);
        const leftChildIdx = this.getLeftChildIdx(idx);
        const rightChildIdx = this.getRightChildIdx(idx);

        let swapIdx = null;

        if (leftChildIdx <= this.data.length - 1) {
            const leftChild = this.data[leftChildIdx];
            const leftChildValue = this.getValue(leftChild);
            if (leftChildValue < parentValue) {
                swapIdx = leftChildIdx;
            }

            if (rightChildIdx <= this.data.length - 1) {
                const rightChild = this.data[rightChildIdx];
                const rightChildValue = this.getValue(rightChild);
                if (rightChildValue < parentValue && rightChildValue < leftChildValue) {
                    swapIdx = rightChildIdx;
                }
            }
        }

        if (swapIdx !== null) {
            this.swap(idx, swapIdx);
            this.siftDown(swapIdx);
        }
    }

    private siftUp (idx: number) {
        const child = this.data[idx];
        const childValue = this.getValue(child);
        const parentIdx = this.getParentIdx(idx);

        if (parentIdx < 0) {
            return;
        }

        const parent = this.data[parentIdx];
        const parentValue = this.getValue(parent);

        if (childValue < parentValue) {
            this.swap(idx, parentIdx);
            this.siftUp(parentIdx);
        }
    }

    isEmpty () {
        return this.data.length === 0;
    }

    enqueue (value: T) {
        this.data.push(value);
        this.siftUp(this.data.length - 1);

        return this.data.length;
    }

    dequeue () {
        if (this.data.length === 0) {
            return undefined;
        }

        const value = this.data[0];

        if (this.data.length === 1) {
            this.data.pop();
        }

        if (this.data.length > 1) {
            const last = this.data.pop();
            this.data[0] = last;
            this.siftDown(0);
        }

        return value;
    }
}

const pq = new PriorityQueue<{ value: number }>((v: { value: number }) => v.value);

pq.enqueue({ value: 10 });
pq.enqueue({ value: 1 });
pq.enqueue({ value: 9 });
pq.enqueue({ value: 2 });
pq.enqueue({ value: 8 });
pq.enqueue({ value: 3 });
pq.enqueue({ value: 7 });
pq.enqueue({ value: 4 });
pq.enqueue({ value: 6 });
pq.enqueue({ value: 5 });

console.log(
    pq.dequeue(),
    pq.dequeue(),
    pq.dequeue(),
    pq.dequeue(),
    pq.dequeue(),
    pq.dequeue(),
    pq.dequeue(),
    pq.dequeue(),
    pq.dequeue(),
    pq.dequeue(),
);
