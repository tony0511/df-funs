// 13. 封装ajax的get和post方法
const ajax = {
  get : function (option) {
    const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open("GET", option.url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          if (typeof option.onSuccess == "function") {
            option.onSuccess(xhr.responseText, xhr.responseXML);
          }else{
            throw new Error("第2个参数应该是一个函数");
          }
        }else{
          if (typeof option.onFail == "function") {
            option.onFail(xhr.responseText);
          }else{
            throw new Error("第3个参数应该是一个函数");
          }
        }
      }
    };
    xhr.send(null);
  },
  post : function (option) {
    const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open("POST", option.url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          if (typeof option.onSuccess == "function") {
            option.onSuccess(xhr.responseText, xhr.responseXML);
          }else{
            throw new Error("第2个参数应该是一个函数");
          }
        }else{
          if (typeof option.onFail == "function") {
            option.onFail(xhr.responseText);
          }else{
            throw new Error("第3个参数应该是一个函数");
          }
        }
      }
    };
    if (!(option.search instanceof FormData)) {
      // 提交POST请求的时候，必须要添加下面这个请求头，表示我们提交的表单数据经过了url编码
      xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    }
    // POST请求的时候，在send()参数中传入要发送的数据，格式为 xxx=aaa&yyy=bbb
    xhr.send(option.search);
  }
};
// get请求案例
//  document.forms.registerForm.onsubmit = function (event) { // GET请求表单提交（用Ajax提交表单）
//    event.preventDefault(); // 阻止表单的默认行为
//    var userValue = this.user.value;
//    var pwdValue = this.pwd.value;
//    ajax.get({
//      url : "get.php?user=" + userValue + "&pwd=" + pwdValue,
//      onSuccess : function (rt, xml) {
//        var obj = JSON.parse(rt);
//        document.body.innerHTML = rt;
//      },
  //    onFail : function (rt) {
  //      oBox.innerHTML = "返回结果有误";
  //    }
//    });
//  };
// post请求案例
//  document.forms.registerForm.onsubmit = function (event) { // POST请求表单提交（用Ajax提交表单）
//    event.preventDefault(); // 阻止表单的默认行为
//    var data = new FormData(document.forms[0]);
//    console.log(data.get("user"));// 获取data表单数据中的user值
//    data.set("user", "abc");// 表单键值对操作，有user时为修改，无user时为添加，其他操作见笔记
//    ajax.post({
//      url : "http:// 127.0.0.1:8888/0411-JS7day/post.php",
//      search : data,
//      onSuccess : function (rt, xml) {
//        document.body.innerHTML = rt;
//      },
//      onFail : function (rt) {
//        document.body.innerHTML = rt;
//      }
//    });
//  }

// 15. 动画算子
// const pow = Math.pow;
const BACK_CONST = 1.70158;
const Easing = {
  //  匀速运动
  linear: function (t) {
    return t;
  },
  //  匀加速运动
  easeIn: function (t) {
    return t * t;
  },
  //  匀减速运动
  easeOut: function (t) {
    return (2 - t) * t;
  },
  // 先加速后减速
  easeBoth: function (t) {
    return (t *= 2) < 1 ? .5 * t * t : .5 * (1 - (--t) * (t - 2));
  },
  //  4次方加速
  easeInStrong: function (t) {
    return t * t * t * t;
  },
  //  4次方法的减速
  easeOutStrong: function (t) {
    return 1 - (--t) * t * t * t;
  },
  //  先加速后减速，加速和减速的都比较剧烈
  easeBothStrong: function (t) {
    return (t *= 2) < 1 ? .5 * t * t * t * t : .5 * (2 - (t -= 2) * t * t * t);
  },
  //  
  easeOutQuart: function (t) {
    return -(Math.pow((t - 1), 4) - 1)
  },
  //  指数变化 加减速
  easeInOutExpo: function (t) {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if ((t /= 0.5) < 1) return 0.5 *Math.pow(2, 10 * (t - 1));
    return 0.5 * (-Math.pow(2, - 10 * --t) + 2);
  },
  // 指数式减速
  easeOutExpo: function (t) {
    return (t === 1) ? 1 : -Math.pow(2, - 10 * t) + 1;
  },
  //  先回弹，再加速
  swingFrom: function (t) {
    return t * t * ((BACK_CONST + 1) * t - BACK_CONST);
  },

  //  多走一段，再慢慢的回弹
  swingTo: function (t) {
    return (t -= 1) * t * ((BACK_CONST + 1) * t + BACK_CONST) + 1;
  },

  // 弹跳
  bounce: function (t) {
    var s = 7.5625, r;
    if (t < (1 / 2.75)) {
      r = s * t * t;
    } else if (t < (2 / 2.75)) {
      r = s * (t -= (1.5 / 2.75)) * t + .75;
    } else if (t < (2.5 / 2.75)) {
      r = s * (t -= (2.25 / 2.75)) * t + .9375;
    } else {
      r = s * (t -= (2.625 / 2.75)) * t + .984375;
    }

    return r;
  }
};

// 14.动画对象
function Animator (duration = 2000, ease = Easing.linear, doSomething = function (){}) {
  this.duration = duration;
  this.ease = ease;
  this.doSomething = doSomething;
}
Animator.prototype = {
  start : function (count) { // 启动动画
    if (count <= 0) {
      return;
    }
    var startTime = new Date(),
      duration = this.duration,
      ease = this.ease,
      doSomething = this.doSomething,
      p,
      self = this;
    self.id = requestAnimationFrame(function step() {
      p = Math.min( 1, (new Date() - startTime)/duration );
      doSomething(ease(p));
      if (p == 1 && --count > 0) {
        startTime = new Date();
        p = 0;
      }
      p < 1 && (self.id = requestAnimationFrame(step));
    });
  },
  stop : function () { // 停止动画
    cancelAnimationFrame(this.id);
  }
};
// 案例
//  var animator;
//  oStart.onclick = function () {
//    var distanceX = 1100;
//    var distanceY = 540;
//    animator = new Animator(2000, Easing.linear, function (e) {
//      oDiv.style.transform = 
//      `translate(${ Easing.linear(e) * distanceX }px,${ Easing.bounce(e) * distanceY }px)`;
//    });
//    animator.start(Infinity);
//  };
//  oEnd.onclick = function () {
//    animator.stop();
//  }

const funs = {
  // 1.获取元素属性值
  getPropertyValue: function (ele, propertyName) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(ele,null)[propertyName];
    }else{
       return ele.currentStyle[propertyName];
    }
  },

  // 2.1给元素添加className
  addClassName: function (ele, newClassName) {
    ele.className += " " + newClassName;
  },
  // 2.2删除元素中的className
  removeClassName: function (ele, oldClassName) {
    var newClassNameArr = ele.className.split(oldClassName);
    ele.className = newClassNameArr.join("");
  },

  // 3.获取[a,b]区间的随机整数
  randomInt: function (a, b) {
    if( b >= a ){
      return window.parseInt(window.Math.random()*( b - a + 1 )) + a;
    }
  },

  // 4.判断一个数是否是质数
  isPrimeNumber: function (num) {
    num = parseInt(num);
    for(i=2;i<=num;i++){
      if(num%i != 0){
        continue;
      }
      else if(i != num){
        return false;
        break;
      }
      else{
        return true;
      } 
    }
  },

  // 5.获取两个数的最大公约数
  greatestCommonDivisor: function (num1, num2) {
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    for(var i=num1; i>=1; i--){
      if(num1%i == 0 && num2%i == 0){
        return i;
        break;
      }
    }  
  },

  // 6.获取两个数的最小公倍数
  leastCommonMultiple: function (num1, num2) {
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    for(var i=1; i<=num1*num2; i++){
      if(i%num1 == 0 && i%num2 == 0){
        return i;
        break;
      }
    }  
  },

  // 7.求 n!
  nFactorial: function (num){  // 函数递归
    num = parseInt(num);
    if(num==1||num==0){  // 递归终止条件
      return 1;
    }
    return nFactorial(num-1) * num;
  },

  // 8.对一个数进行因式分解，返回因子组成的数组
  primeFactorization: function (num) {
    var factors = [];
    num = parseInt(num);
    if (num==0||num==1||num==-1) {
      factors.push(num);
      return factors;
    }else{
      if (num < 0) {
        factors.push(-1);
        num = Math.abs(num);
      }
      for(var i = 2, temp = num; i <= temp; i++){
        if(temp % i === 0){
          factors.push(i);
          temp /= i;
          i--;
        }
      }
      return factors;
    }
  },

  // 9.1在指定长度中获取一个小于或等于长度的随机数组（数组元素值为[0,length-1]）
  getRandomNumArr: function (length, num) {
    if (length < num) {
      return;
    }
    var arr = [];
    var newArray = [];
    for (var i = 0; i < length; i++) {
      arr.push(i);
    }
    arr.sort((a, b)=>Math.random()-0.5);
    for (var i = 0; i < num; i++) {
      newArray.push(arr[i]);
    }
    return newArray;
  },
  // 9.2在指定数组中获取一个小于或等于该数组长度的随机数组
  getRandomArrOfArr: function (arr, num) {
    if (arr.length < num) {
      return;
    }
    var newArray = [];
    arr.sort((a,b)=>Math.random()-0.5);
    for (var i = 0; i < num; i++) {
      newArray.push(arr[i]);
    }
    return newArray;
  },

  // 10.判断某一年是不是闰年
  isLeapYear: function (year){
    return new Date(year,2,0).getDate() == 29 ? true : false;
  },

  // 11.通过年月日判断某一天是一年当中第几天如果输入不合法返回false
  countDays: function (year, month, day){
    if( isNaN(year) || isNaN(month) || isNaN(day) ||  !Number.isInteger(parseFloat(year))
    || !Number.isInteger(parseFloat(month)) || !Number.isInteger(parseFloat(day))
    || year<1 || month<1 || month>12 || day<1 || day > new Date(year,month,0).getDate() ){
      return false;
    }else{
      return countDays(year,month,day);
    }
    function countDays(year, month, day){
      return month==1 ? day : countMonth(year,month-1)+day;
    }
    function countMonth (year, month) {
       return  month==1 ? 31 : countMonth(year,month-1) + new Date(year,month,0).getDate();
    }
  },

  // 获取一个月的数据（num -> 指定月份相对目前月份偏移，showWeekday -> 是否显示前后月份日期，deadline -> 截止日期之前禁用）
  getMonthDays: function (num, showWeekday, deadline) {
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    const days = new Date(year, month + num, 0).getDate();
    const nowMonth = new Date(year, month + num - 1, 1).getMonth();
    const lastWeekday = new Date(year, month + num, 0).getDay();
    const preWeekday = new Date(year, month + num - 1, 1).getDay();
    const fullDays = preWeekday + days + 6 - lastWeekday;
    const firstDay = new Date(year, month + num - 1, -preWeekday + 1);
    year = firstDay.getFullYear();
    month = firstDay.getMonth();
    const date = firstDay.getDate();
    const result = [];
    for (let i = 0; i < fullDays; i++) {
      const time = new Date(year, month, date + i);
      const item = {
        year: time.getFullYear(), // 年份
        month: time.getMonth() + 1, // 月份
        date: time.getDate(), // 日期
        day: time.getDay(), // 星期
        disabled: time.getMonth() !== nowMonth ? true : now - time < 0 ? true : !deadline ? false : time.getDate() < deadline ? true : false, // 是否禁用
        show: time.getMonth() === nowMonth ? true : showWeekday ? true : false, // 是否显示
      };
      item.dateFormat = `${item.year}-${item.month}-${item.date}`; // 格式化日期
      result.push(item);
    }
    return result;
  },

  // 12.获取对象属性位置，0表示没有该属性，1表示该属性在当前对象中，2表示在对象的原型中
  getPropertyLocation: function (obj, propertyName) {
    return !(propertyName in obj) ? 0 : obj.hasOwnProperty(propertyName) ? 1 : 2; 
  },

  ajax: ajax,

  Animator: Animator,
  Easing: Easing,

  //  格式化344型
  to344: function (str) {
    let trimStr = ' ' + str.trim();
    let trimStrArr = [];
    for (let i = 0; i < trimStr.length; i += 4) {
    trimStrArr.push(trimStr.substr(i, 4))
    }
    return trimStrArr.join(' ').trim();
  },

  //  重置在页面中心
  resetPosition: function (dom) {
    let boxX = $(dom).outerWidth();
    let boxY = $(dom).outerHeight();
    let winW  = 0;
    let winH = 0;
    if (window.innerHeight) { //  all except IE
      winW = window.innerWidth;
      winH = window.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight || document.documentElement.clientWidth) { //  IE 6 Strict Mode
      winW = document.documentElement.clientWidth;
      winH = document.documentElement.clientHeight;
    } else if (document.body) { //  other
      winW = document.body.clientWidth;
      winH = document.body.clientHeight;
    }
    $(dom).css('left', (winW - boxX) / 2);
    $(dom).css('top', (winH - boxY) / 2);
  },

  //  添加移动事件
  boxMove: function (wrap, target) {
    let move = false;
    let startX = 0;
    let startY = 0;
    let boxX = $(wrap).outerWidth();
    let boxY = $(wrap).outerHeight();
    let winW  = 0;
    let winH = 0;
    if(window.innerHeight) { //  all except IE
      winW = window.innerWidth;
      winH = window.innerHeight;
    }else if (document.documentElement && document.documentElement.clientHeight || document.documentElement.clientWidth) { //  IE 6 Strict Mode
      winW = document.documentElement.clientWidth;
      winH = document.documentElement.clientHeight;
    }else if (document.body) { //  other
      winW = document.body.clientWidth;
      winH = document.body.clientHeight;
    }
    $(target).on('mousedown', function(ev) {
      const eve = window.event || ev;
      const offset = $(wrap).offset();
      startX = eve.clientX - offset.left;
      startY = eve.clientY - offset.top;
      $(target).css('cursor', 'move');
      move = true;
    });
    $(document).on('mouseup', function() {
      move = false;
      $(target).css('cursor', 'default');
    });
    $(document).on('mousemove', function(ev) {
      const eve = window.event || ev;
      if (move) {
        let left = eve.clientX - startX;
        let top = eve.clientY - startY;
        if (left < 0) left = 0;
        if (left > winW - boxX) left = winW - boxX;
        if (top < 0) top = 0;
        if (top > winH - boxY) top = winH - boxY;
        $(wrap).css('left', left);
        $(wrap).css('top', top);
      }
     });
  },
};

module.exports = funs;
