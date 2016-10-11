window.onload=function(){
    imgLocation('container','box');
    window.onscroll=function(){
        // check();
        var imgData = {
        "data": [
            {"src": "1.jpg"},
            {"src": "2.jpg"},
            {"src": "3.jpg"},
            {"src": "4.jpg"},
            {"src": "5.jpg"},
            {"src": "6.jpg"},
            {"src": "7.jpg"},
            {"src": "8.jpg"}]
    };

    if (check()) {
        var parent = document.getElementById("container");//添加父级对象
        for (var i = 0; i < imgData.data.length; i++) {

            var box = document.createElement("div");//添加 元素节点
            box.className = "box";//添加 类名 name属性
            parent.appendChild(box);//添加 子节点

            var boximg = document.createElement("div");
            boximg.className = "box_img";
            box.appendChild(boximg);

            var img = document.createElement("img");
            img.src = "img/" + imgData.data[i].src;
            boximg.appendChild(img);
        }

        imgLocation("container", "box");
    }
    }
}
function check() {
    var parent = document.getElementById("container");
    var child = getChildElement(parent, "box");
    var lastContentHeight = child[child.length - 1].offsetTop;
    // console.log(lastContentHeight);最后一张图片距顶部的距离
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(scrollTop);监听滚动条
    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // console.log(lastContentHeight+":"+scrollTop+":"+pageHeight);
    if (lastContentHeight <= scrollTop + pageHeight) {
        return true;
    }
}
/*通过父级和子元素的class类 获取该同类子元素的数组*/
function imgLocation(parent,content){
    var cparent=document.getElementById(parent);
    var ccontent=getChildElement(cparent,content);
    // alert("2222");
    // console.log(ccontent);
    var imgWidth=ccontent[0].offsetWidth;
    var num=Math.floor(document.documentElement.clientWidth/imgWidth);
    cparent.style.cssText="width:"+imgWidth*num+"px;margin:0 auto";  
    var boxHeightArr=[];
    for(var i=0;i<ccontent.length;i++){
        if(i<num){
            boxHeightArr[i]=ccontent[i].offsetHeight;
            // console.log(boxHeightArr[i]);
        }
        // boxHeightArr[i]=ccontent[i].offsetHeight;
        // console.log(boxHeightArr[i]);
        else{
            var minheight=Math.min.apply(null, boxHeightArr);
            // console.log(minheight);
            var minIndex=getminheightLocation(boxHeightArr,minheight);
            ccontent[i].style.position="absolute";
            ccontent[i].style.top=minheight+"px";
            ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
            boxHeightArr[minIndex]=boxHeightArr[minIndex]+ccontent[i].offsetHeight;
        }
    }
}
/*获取 box高度 最小值的索引index*/
function getminheightLocation(boxHeightArr,minheight){
    for(var i in boxHeightArr){
        if(boxHeightArr[i]==minheight){
            return i;
        }
    }
}
function getChildElement(parent,content){
    var contentArr=[];
    var allContent=parent.getElementsByTagName('*');
    for(var i=0;i<allContent.length;i++)
    {
        if(allContent[i].className==content)
        {
            contentArr.push(allContent[i]);
        }
    }
   return contentArr;
}
