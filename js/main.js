var content1 = `
/*
Hi,尊敬的面试官,您好~
My name is DobbyKim
喜欢唱,跳,rap和篮球, music~
这是我的demo项目: 会动的简历
Let's get started ~
*/

*{
    transition:all 1s;    
}
html{
    background:#3F5263;
}
#innerPre{
    background:rgba(0,0,0,0.5);
    padding:16px;
}

/*字体很难看？修改一下哈~*/
#innerPre{
    font-size: 16px;
    font-family: 'Kalam', cursive;
}
/*来点3D效果？没问题~*/
#innerPre{
    transform: rotate(360deg);
    box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);
    transform: perspective(.5em) rotateY(0.1deg);
}
/*代码高亮一下哈，亲~*/
.token.selector{color: #690;}
.token.property{color: #905;}
.token.function{color: #DD4A68;}
.token.string{color: #9933FF;}
/*
好，现在开始正式介绍一下我自己
待我先准备一张简历先~
*/
`;

var content2 = `
#paper{
    position: fixed;
    top:0;
    right: 0;
    width:50%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
}
#paper>.resume{
    box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);
    padding: 16px;
    background: #FFFFFF;
    height: 90%;
    width: 90%;
    transform: perspective(.5em) rotateY(-0.1deg);
    overflow:auto;
}
`;

var content3 = `
## 自我介绍

姓名：金润恒
年龄：25

## 技能介绍

HTML,CSS,JavaScript

## 社交媒体

[博客](https://jrhiscoding.com/)
[GitHub](https://github.com/DobbyKimmy)
[掘金](https://juejin.im/user/5cb9a26551882541625682f7)
[简书](https://www.jianshu.com/u/c8013e366bb3)
[知乎](https://www.zhihu.com/people/jin-run-heng/activities)
[facebook](https://www.facebook.com/profile.php?id=100034972901967)
[详细简历预览](https://jrhiscoding.com/resume-19-05-25/)

## 联系方式
Tel:15526787357
Email:jinrunheng@foxmail.com

## 自我评价
东北路飞,一个兴趣使然的英雄~
`;

var content4 = `
/*呃...很难看是吧?好,我马上把MarkDown格式转化为你能看懂的HTML哈~*/
`;
var content5 = `
/*我来加个样式哈~*/
#paper>.resume{
    font-size:16px;
    font-family: 'Gloria Hallelujah', cursive;
}
a{
    text-decoration:none;
}
a:hover{
    cursor: pointer;
}
/*
好啦~我的动态简历到此为止了
感谢您耐心的观看~~~
*/
`;
writeInPre('',content1,()=>{
    createPaper(()=>{
        writeInPre(content1,content2,()=>{
            writeMarkdown(content3,()=>{
                writeInPre(content1+content2,content4,()=>{
                    transformHtml(content3,()=>{
                        writeInPre(content1+content2+content4,content5,()=>{})
                    })
                })
            })
        })
    })
})
function writeInPre(prefix,content,fn) {
    let n = 0;
    let innerPre = document.querySelector('#innerPre');
    let styleTag = document.querySelector('#styleTag');
    let intervalId = setInterval(()=>{
        n++;
        innerPre.innerHTML = Prism.highlight(prefix+content.substr(0,n), Prism.languages.css, 'css');
        styleTag.innerHTML = prefix+content.substr(0,n);
        innerPre.scrollTop = innerPre.scrollHeight;
        if(n>=content.length){
            window.clearInterval(intervalId);
            fn.call();
        }
    },50)
}

function createPaper(fn) {
    var div = document.createElement('div');
    var resume = document.createElement('pre');
    div.id = 'paper';
    resume.className = 'resume';
    div.appendChild(resume);
    document.body.appendChild(div);
    fn.call();
}
function writeMarkdown(content,fn) {
    let n = 0;
    let resume = document.querySelector('#paper>.resume');
    let intervalId = setInterval(()=>{
        n++;
        resume.innerHTML = content.substr(0,n);
        resume.scrollTop = resume.scrollHeight;
        if(n>=content.length){
            window.clearInterval(intervalId);
            fn.call();
        }
    },50)
}

function transformHtml(content,fn) {
    let resume = document.querySelector('#paper>.resume');
    resume.innerHTML = marked(content);
    fn.call();
}
