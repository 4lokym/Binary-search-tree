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

  // buildTree(arr){

  //   const q = new Array();
  //   const mid = Math.floor((arr.length - 1)/2);
  //   const root = new Node(arr[mid]);

  //   q.push({node: root, range: [0, arr.length -1]});

  //   while(q.length !== 0){
  //     console.log("q.length: " +q.length);
  //     console.log(q);
  //     let front = q.shift();
  //     let frontNode = front.node;
  //     let [s, e] = front.range;

  //     let index = s + Math.round((e - s)/2);

  //     if(s < index){
  //       let leftStart = s;
  //       let leftEnd = index -1;
  //       let leftMid = leftStart + Math.round((leftEnd - leftStart)/2);

  //       let leftNode = new Node(arr[leftMid]);
  //       q.push({node: leftNode, range: [leftStart, leftEnd]});
  //       frontNode.left = leftNode;
  //     }

  //     if(e > index){
  //       let rightStart = index -1;
  //       let rightEnd = e;
  //       let rightMid = rightStart + Math.round((rightEnd - rightStart)/2);

  //       let rightNode = new Node(arr[rightMid]);
  //       q.push({node: rightNode, range: [rightStart, rightEnd]});
  //       frontNode.right = rightNode;
  //     }

  //   }

  //   this.root = root;

  //   return root
  // }

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

  // deleteItem(value) {
  //   const s = new Array();
  //   s.push(this.root);

  //   let found = false;
  //   let item = this.root;
  //   //if its the root don't go in the loop
  //   if (value === this.root.data) {
  //     found = true;
  //   } else {
  //     while (s[s.length - 1]) {
  //       let top = s[s.length - 1];
  //       if (top.data === value) {
  //         item = top;
  //         found = true;
  //         break;
  //       } else if (value > top.data) {
  //         s.push(top.right);
  //       } else {
  //         s.push(top.left);
  //       }
  //     }

  //     if (!found) {
  //       return null;
  //     }

  //     // three cases

  //     //1 item is a leaf

  //     s.pop();
  //     let parent = s.pop();

  //     if (!item.right && !item.left) {
  //       if (!parent) {
  //         this.root = null;
  //         return item;
  //       }
  //       if (item.data > parent.data) {
  //         parent.right = null;
  //       } else {
  //         parent.left = null;
  //       }
  //       //2 item has 1 child
  //     } else if (!item.right || !item.left) {
  //       if (!parent) {
  //         this.root = child;
  //         return item;
  //       }

  //       let child = item.right ? item.right : item.left;
  //       if (item.data > parent.data) {
  //         parent.right = child;
  //       } else {
  //         parent.left = child;
  //       }
  //       //3 item has both childs
  //     } else {
  //       //find the smaller right descendant (nearest)
  //       let nearestParent = item;
  //       let nearest = item.right;
  //       while(nearest.left){
  //         nearestParent = nearest;
  //         nearest = nearest.left;
  //       }

  //       if(item.data > parent.right){
  //         parent.right = nearest;
  //       }else{
  //         parent.left = nearest;
  //       }

  //       // if nearest has a right child
  //       if(nearest.right){
  //         nearest.left = item.left;
  //         nearestParent.left = nearest.right;
  //         nearest.right = (item.right === nearest) ? nearest.right : item.right;

  //         // if nearest is a leaf, substitute the item with it
  //       }else{
  //         nearest.right = (item.right === nearest) ? null: item.right;
  //         nearest.left = item.left;
  //         if(nearestParent !== item){
  //           nearestParent.left = null;
  //         }
  //       }

  //     }
  //     return item;
  //   }
  // }


  // deleteItem2(value) {
  //   const stack = new Array();
  //   stack.push(this.root);

  //   let item = this.root;

  //   let top = this.root;
  //   let past = null;

  //   console.log(value);
  //   while (top && past !== top) {
  //     console.log("-----------------")
  //     console.log(top);
  //     console.log(past);
  //     if (value < top.data) {
  //       console.log("value < top.data");
  //       stack.push(top.left);
  //     } else if (value > top.data) {
  //       console.log("value > top.data");
  //       stack.push(top.right);
  //     } else {
  //       console.log("eslesesesesese")
  //       if (!top.right) {
  //         if (stack.length > 1) {
  //           let parent = stack[stack.length - 2];
  //           if (top.data > parent.data) {
  //             parent.right = top.left;
  //           } else {
  //             parent.left = top.left;
  //           }
  //         } else {
  //           this.root = null;
  //         }
  //         return item;
  //       } else if (!top.left) {
  //         if (stack.length > 1) {
  //           let parent = stack[stack.length - 2];
  //           if (top.data > parent.data) {
  //             parent.right = top.right;
  //           } else {
  //             parent.left = top.right;
  //           }
  //         } else {
  //           this.root = null;
  //         }
  //         return item;
  //       } else {
  //         console.log("-----");
  //         let succ = top.right;
  //         let parentsucc = top;
  //         while (succ && succ.left) {
  //           parentsucc = succ;
  //           succ = succ.left;
  //         }
  //         console.log("++----");
  //         console.log(parentsucc)
  //         if(parentsucc){
  //           if(succ.data > parentsucc){
  //             parentsucc.right = top;
  //           }else{
  //             parentsucc.left = top;
  //           }
  //         }

  //         if (stack.length > 1) {
  //           let parent = stack[stack.length - 2];
  //           if (top.data > parent.data) {
  //             parent.right = succ;
  //             console.log(parent);
  //           } else {
  //             parent.left = succ;
  //             console.log(parent);
  //           }
  //         }else{
  //           this.root = succ;
  //         }
  //         console.log("+----");
  //         let tempL = succ.left;
  //         let tempR = succ.right 
  //         succ.left = top.left;
  //         succ.right = top.right;
  //         top.left = tempL;
  //         top.right = tempR;
  //         console.log(succ);
  //         console.log(top);
  //         console.log("++++++++++++++++");
  //         stack.push(succ.right);
  //       }
  //     }
  //     past = top;
  //     top = stack[stack.length - 1];
  //   }

  //   item = top;

  //   return item;
  // }

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

// myTree.insertValue(19);

//delete a leaf
// myTree.deleteItem(24);
// myTree.deleteItem(22);
// myTree.deleteItem(23);
// myTree.deleteItem(20);
// myTree.deleteItem(19);
// myTree.deleteItem(21);

prettyPrint(myTree.root);

// delete an item with a child
// myTree.deleteItem(7);
// myTree.deleteItem(4);
// myTree.deleteItem(13);
myTree.deleteItem(11);
myTree.deleteItem(13);
myTree.deleteItem(14);
myTree.deleteItem(15);
myTree.deleteItem(16);
myTree.deleteItem(17);
myTree.deleteItem(18);
myTree.deleteItem(19);
myTree.deleteItem(20);
myTree.deleteItem(21);
myTree.deleteItem(22);
myTree.deleteItem(23);
myTree.deleteItem(24);
myTree.deleteItem(7);
myTree.deleteItem(8);
myTree.deleteItem(9);
myTree.deleteItem(10);
myTree.deleteItem(12);
myTree.deleteItem(4);
myTree.deleteItem(6);
myTree.deleteItem(5);
myTree.deleteItem(2);
myTree.deleteItem(3);
myTree.deleteItem(1);

prettyPrint(myTree.root);
