interface TreeNodeI<T> {
    left?: TreeNodeI<T>,
    right?: TreeNodeI<T>,
    value?: T,
}

class TreeNode<T> implements TreeNodeI<T> {
    left = null;
    right = null;
    value = null;

    constructor (value: T) {
        this.value = value;
    }
}

interface BinarySearchTreeI<T> {
    root?: TreeNode<T>, 
    height: () => number,
}

export default class BinarySearchTree<T> implements BinarySearchTreeI<T> {
    root = null;

    constructor (value: T) {
        this.root = new TreeNode<T>(value);
    }

    insert (value: T, node?: TreeNode<T>) {
        node = node || this.root;

        if (value < node.value) {
            if (node.left === null) {
                node.left = new TreeNode<T>(value);
                return;
            }

            return this.insert(value, node.left);
        }

        if (node.right === null) {
            node.right = new TreeNode<T>(value);
            return;
        }

        return this.insert(value, node.right);
    }

    height (node: TreeNode<T> = this.root) {
        if (node === null) {
            return 0;
        }

        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }
}
