const vm = new Vue({
    directives:{
      focusAa(el,bindings){
          // 当cur = todo
          if(bindings.value){}
          el.focus();
      }
    },
    el:'#app',
    data:{
        todos:[
            {isSelected:false,title:'吃饭'},
            {isSelected:false,title:'睡觉'}
        ],
        title:'',
        cur:'',
        hash:''
    },
    created(){ // ajax 获取 ，初始化数据
        // 如果localStorage 有数据，就用有的，没有的，没有的就用默认的
       this.todo = JSON.parse(localStorage.getItem('data')) || this.todos;
       // 监控hash 值的变化 ,如果页面已经有hash .重新刷新页面也需要重新获取hash 值
        this.hash = window.location.hash.slice(2) || 'all';
        window.addEventListener('hashchange',(e)=>{
            console.log(e.oldURL)
            this.hash = window.location.hash.slice(2)
            console.log(window.location.hash)
        },false)
    },
    watch:{
        // todos(){ //watch默认只监控一层数据变化，
        //
        // }
       todos:{ //所以需要深度监控
           handler(){ // 默认携程函数，默认写了handler
               // 默认存储字符串
              localStorage.setItem('data',JSON.stringify(this.todos))
           },deep:true
       }
    },
    methods:{
        add(){
            this.todos.push({
                isSelected:false,
                title:this.title
            });
            this.title = ''
        },
        remove(todo){// 拿到当前点击的喝数组比对相当，则返回去false 即可
            this.todos = this.todos.filter(item=>item!==todo)
        },
        remember(todo){
            this.cur = todo;
        },
        cancel(){
            this.cur =''
        }
    },
    computed:{
        filterCount(){
          if(this.hash === 'all') return this.todos
          if(this.hash === 'finish') return this.todos.filter(item=>item.isSelected);
          if(this.hash === 'unfinish') return this.todos.filter(item=>!item.isSelected)
        },
        count(){
            //  为false 留下来
            return this.todos.filter(item=>!item.isSelected).length;
        }
    }
});
// 1.循环到页面
// 2.回车添加数据（计入isSelected 属性）
// 3.删除
// 4.计算当前没有选中的个数