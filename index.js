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
        //console.log(`${value} = ${nodeValue}`);
        return;
      }
      if (value > nodeValue) {
        //console.log(`${value} > ${nodeValue}`);
        if (currNode.right) {
          currNode = currNode.right;
          nodeValue = currNode.data;
        } else {
          currNode.right = newNode;
          break;
        }
      } else {
        //console.log(`${value} < ${nodeValue}`);
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

  preOrder(callback){
    const stack = new Array();

    if(!callback){
      throw new Error("No callback inserted");
    }
    if(!this.root){
      throw new Error("No root to traverse");
    }

    stack.push(this.root);

    while(stack.length !== 0){
      let top = stack.pop();
      callback(top);
      if(top.right){
        stack.push(top.right);
      }
      if(top.left){
        stack.push(top.left);
      }
    }
  }

  inOrder(callback){
    if(!callback){
      throw new Error("No callback inserted");
    }
    if(!this.root){
      throw new Error("No root to traverse");
    }
    const stack = new Array();
    stack.push(this.root);

    while(stack.length !== 0){
      let top = stack.pop();
      while(top){
        stack.push(top);
        top = top.left;
      }
      if(stack.length !== 0){
        top = stack.pop();
        callback(top);
        stack.push(top.right);
      }
    }
  }

  postOrder(callback, start = this.root){

    if(!callback){
      throw new Error("No callback inserted");
    }
    if(!this.root){
      throw new Error("No root to traverse");
    }
    const stack = new Array();
    const stackB = new Array();

    stack.push(start);
    stackB.push(true);

    while(stack.length !== 0){


      let top = stack.pop();
      let f = stackB.pop();

      if(f){
        stack.push(top);
        stackB.push(false);

        if(top.right){
          stack.push(top.right);
          stackB.push(true);
        }
        if(top.left){
          stack.push(top.left);
          stackB.push(true);
        }
      }else{
        callback(top);
      }
    }
  }
  

  depth(value, start = this.root){
    if(!this.root){
      return null
    }
    let height = 0;
    let node = start;
    while(node){
      if(value === node.data){
        return height;
      }else if(value > node.data){
        node = node.right;
        height++;
      }else{
        node = node.left;
        height++;
      }
    }
    return null;
  }

  height(value){
    if(!this.root){
      return null
    }
    let height = 0;
    const startValue =(value === this.root.data) ? this.root : this.findValue(value);
    if(!startValue){
      return null;
    }

    this.postOrder((node)=>{
      let depth = this.depth(node.data, startValue);
      if(depth > height){
        height = depth;
      }
    }, startValue)
    if(value === undefined){
      return null;
    }else{
      return height;
    }
  }

  isBalanced(){
    if(!this.root){
      return true;
    }
    if(!this.root.left && !this.root.right){
      return true;
    }
    const lHeight = (this.root.left) ? this.height(this.root.left.data) : null;
    const rHeight = (this.root.right) ? this.height(this.root.right.data) : null;
    if(!lHeight || !rHeight){
      return false;
    }
    console.log(lHeight);
    console.log(rHeight);
    const diff = Math.abs(lHeight - rHeight);
    return diff < 2;
  }

  reBalance(){
    if(!this.root){
      return null
    }

    const newArr = new Array();
    this.inOrder((node) =>{
      newArr.push(node.data);
    })

    this.buildTree(newArr);
    return true;
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

//myTree.levelOrder((x)=>{(x.data)});
//myTree.postOrder((x)=>{console.log(x.data)});
myTree.insertValue(100);
myTree.insertValue(101);
myTree.insertValue(102);
myTree.insertValue(103);


prettyPrint(myTree.root)

console.log(myTree.height(13));
console.log(myTree.isBalanced());
myTree.reBalance();
prettyPrint(myTree.root);