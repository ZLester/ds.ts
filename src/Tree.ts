interface TreeNodeI<T> {
    children: TreeNodeI<T>[],
    value?: T,
}

class TreeNode<T> implements TreeNodeI<T> {
    children = [];
    value = null;

    constructor (value: T) {
        this.value = value;
    }

    addChild (value: T) {
        this.children.push(new TreeNode(value));
    }
}

interface TreeI<T> {
    root?: TreeNode<T>, 
    height: () => number,
}

export default class Tree<T> implements TreeI<T> {
    root = null;

    addRoot (value: T) {
        this.root = new TreeNode<T>(value);
    }

    height (node: TreeNode<T> = this.root) {
        if (node === null) {
            return 0;
        }

        return 1 + Math.max(0, ...node.children.map(child => this.height(child)));
    }
}
