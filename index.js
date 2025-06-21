class Node {
  constructor(data = "", right = null, left = null) {
    this.data = data;
    this.right = right;
    this.left = left;
  }
}

class Tree {
  root = null;

  constructor() {}

  buildTree(arr) {
    // create the root
    const mid = Math.floor(arr.length / 2);
    const root = new Node(arr[mid]);

    const q = new Array();
    q.push({ node: root, range: [0, arr.length -1] });

    while (q.length !== 0) {
      let front = q.shift();
      let fronNode = front.node;
      let [start, end] = front.range;
      let midIndex = start + Math.round((end - start) / 2);

      console.log(`front Node: (${fronNode.data})\nStart - end: ${start} - ${end}\nMidIndex: ${midIndex}`);

      if (start < midIndex) {
        let leftStart = start;
        let leftEnd = midIndex - 1;
        let leftMid = leftStart + Math.round((leftEnd - leftStart) / 2);
        let leftNode = new Node(arr[leftMid]);

        q.push({ node: leftNode, range: [leftStart, leftEnd] });
        fronNode.left = leftNode;
      }

      if (midIndex < end) {
        let rightStart = midIndex + 1;
        let rightEnd = end;
        let rightMid = rightStart + Math.round((rightEnd - rightStart) / 2);
        let rightNode = new Node(arr[rightMid]);

        q.push({ node: rightNode, range: [rightStart, rightEnd] });
        fronNode.right = rightNode;
      }
    }

    this.root = root;

    return root;
  }

  insertValue(value) {
    if (!this.root) {
      throw new Error("No root estabilished");
    }

    let currNode = this.root;
    let nodeValue = currNode.data;
    let newNode = new Node(value);

    while (currNode) {
      if (nodeValue == value) {
        console.log(`${value} = ${nodeValue}`);
        return;
      }
      if (value > nodeValue) {
        console.log(`${value} > ${nodeValue}`);
        if (currNode.right) {
          currNode = currNode.right;
          nodeValue = currNode.data;
        } else {
          currNode.right = newNode;
          break;
        }
      } else {
        console.log(`${value} < ${nodeValue}`);
        if (currNode.left) {
          currNode = currNode.left;
          nodeValue = currNode.data;
        } else {
          currNode.left = newNode;
          break;
        }
      }
    }
  }

  deleteItem(value){

    let curr = this.root;
    let parent = null;

    while(curr && curr.data !== value){
      parent = curr;
      if(value < curr.data){
        curr = curr.left;
      }else{
        curr = curr.right;
      }
    }

    if(curr === null){
      return null;
    }

    if(!curr.left || !curr.right){
      let newCurr = (curr.left) ? curr.left : curr.right;

      if(!parent){
        this.root = newCurr;
      }else{
        if(parent.left === curr){
          parent.left = newCurr;
        }else{
          parent.right = newCurr;
        }
      }
    }else{

      let succ = curr.right;
      let pSucc = null;

      while(succ.left){
        pSucc = succ;
        succ = succ.left;
      }
      
      if(pSucc){
        console.log("psucc")
        if(!parent){
          console.log("is root")
          this.root = succ;
          pSucc.left = succ.right;
          succ.left = curr.left;
          succ.right = curr.right;
        }else{
          console.log("not root")
          if(parent.right === curr){
            parent.right = succ;
          }else{
            parent.left = succ;
          }
          succ.left = curr.left;
          pSucc.left = succ.right;
          succ.right = curr.right;
        }
      }else{
        
        if(!parent){
          this.root = succ;
          succ.left = curr.left;
        }else{
          parent = succ;
          succ.left = curr.left;
        }

      }

      return curr;

    }

  }

  findValue(value){
    let temp = this.root;
    while(temp && temp.data !== value){
      if(value > temp.data){
        temp = temp.right;
      }else{
        temp = temp.left;
      }
    }
    return temp;
  }

  levelOrder(callback){
    const q = new Array();
    q.push(this.root);

    if(!callback){
      throw new Error("No callback inserted");
    }
    if(!this.root){
      throw new Error("No root to traverse");
    }

    while(q.length !== 0){
      let front = q.shift();
      callback(front);
      if(front.left){
        q.push(front.left);
      }
      if(front.right){
        q.push(front.right);
      }
    }

  }  

}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const myTree = new Tree();
myTree.buildTree([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24,
]);


prettyPrint(myTree.root);

console.log(myTree.findValue(1));

myTree.levelOrder((x)=>{(x.data)});