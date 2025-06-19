

class Node{
  constructor(data = "", right = null, left = null){
    this.data = data;
    this.right = right;
    this.left = left;
  }
}

class Tree{
  root = null;

  constructor(){
  }

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

  buildTree(arr){
    // create the root
    const mid = Math.floor(arr.length/2);
    const root = new Node(arr[mid]);

    const q = new Array();
    q.push({node: root, range: [0, arr.length - 1]});

    while(q.length !== 0){
      
      let front = q.shift();
      let fronNode = front.node;
      let [start, end] = front.range;
      let midIndex = start + Math.floor((end - start)/2);
      
      //console.log(`front Node: (${fronNode.value})\nStart - end: ${start} - ${end}\nMidIndex: ${midIndex}`);

      if(start < midIndex){
        let leftStart = start;
        let leftEnd = midIndex - 1;
        let leftMid = leftStart + Math.floor((leftEnd-leftStart)/2);
        let leftNode = new Node(arr[leftMid]);

        q.push({node: leftNode, range: [leftStart, leftEnd]});
        fronNode.left = leftNode;
      }

      if(midIndex < end){
        let rightStart = midIndex + 1;
        let rightEnd = end;
        let rightMid = rightStart + Math.floor((rightEnd - rightStart)/2);
        let rightNode = new Node(arr[rightMid]);

        q.push({node: rightNode, range: [rightStart, rightEnd]});
        fronNode.right = rightNode;
      }
    }

    this.root = root;

    return root;

  }

  insertValue(value){

    if(!this.root){
      throw new Error("No root estabilished");
    }

    let currNode = this.root;
    let nodeValue = currNode.data;
    let newNode = new Node(value);

    while(currNode){
      if(nodeValue == value){
        console.log(`${value} = ${nodeValue}`);
        return;
      }
      if(value > nodeValue){
        console.log(`${value} > ${nodeValue}`);
        if(currNode.right){
          currNode = currNode.right;
          nodeValue = currNode.data;
        }else{
          currNode.right = newNode;
          break;
        }
      }else{
        console.log(`${value} < ${nodeValue}`);
        if(currNode.left){
          currNode = currNode.left;
          nodeValue = currNode.data;
        }else{
          currNode.left = newNode;
          break;
        }
      }
    }

  }

}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const myTree = new Tree();
myTree.buildTree([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]);

prettyPrint(myTree.root);

myTree.insertValue("19");
prettyPrint(myTree.root);