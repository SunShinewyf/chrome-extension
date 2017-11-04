'use strict';

require('./index.less');
const $ = require('./libs/jquery.js');

let bookmarksType = [];
document.addEventListener('DOMContentLoaded',function(){
    loadStorage();
    initEvent();
})

//读取数据
function loadStorage(){
    chrome.bookmarks.getTree(function(data){
        const result = formatTree(data[0]);
        console.log(result);
        renderData(result);
    })

}

//初始化数据
function initEvent(){

}

//将书签树数据进行遍历
function formatTree(parent,parentTitle){
    const that = this;
    if(parent && parent.children){
        if(parent.children.length){
            parent.children.forEach(function(item){
                let sonTitle = parentTitle
                if(item.children && item.children.length){
                    sonTitle = parentTitle ? parentTitle + '-' + item.title : item.title;
                }
                formatTree(item,sonTitle);
            })
        }else{
            formatTree(null)
        }
    }else if(bookmarksType[parentTitle]){
        bookmarksType[parentTitle].push(parent);
    }else{
        bookmarksType[parentTitle] = parent ? [parent] : that;
    }
    return bookmarksType;
}

//渲染书签数据
function renderData(result){
    const len = result.length;
    for(let i=0; i<len; i++){
        const html = '<div class="content" id="tags">'+
                     '<div class="title">'+ result[i] + '</div>'+
                     '</div>';
                     console.log($('.wrap'));
        $('.wrap').append(html);
    }
}


