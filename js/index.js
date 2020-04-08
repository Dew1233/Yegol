$(function(){

  // 1、定义mock.js数据
//   var data = Mock.mock("/infor","get",{
//     'list|1-7':[{ 'daydate':'20200407',
//       // 'daydate':'@time("yyyyMMdd")',
//             'task|0-5':[{
//                 'name':'@ctitle(2)',
//                 'time':'@time("HH:mm")'
//             }]
//     }]
// }
// )
 var data = Mock.mock("/infor","get",{
  
    "list": [
        {
            "daydate": "2020-04-07",
            "task": [
                {
                    "name": "适酸",
                    "time": "05:11"
                },
                {
                    "name": "引据",
                    "time": "13:22"
                },
                {
                    "name": "许号",
                    "time": "07:14"
                },
                {
                    "name": "还子",
                    "time": "13:41"
                }
            ]
        },
        {
            "daydate": "2020-04-08",
            "task": [
                {
                    "name": "音论",
                    "time": "18:03"
                }
            ]
        },
        {
            "daydate": "2020-04-09",
            "task": [
                {
                    "name": "引大",
                    "time": "12:53"
                },
                {
                    "name": "调主",
                    "time": "19:42"
                }
            ]
        },
        {
            "daydate": "2020-04-02",
            "task": [
                {
                    "name": "各后",
                    "time": "22:59"
                }
            ]
        },
        {
            "daydate": "2020-04-01",
            "task": [
                {
                    "name": "长石",
                    "time": "21:47"
                },
                {
                    "name": "转代",
                    "time": "03:43"
                },
                {
                    "name": "局物",
                    "time": "01:32"
                },
                {
                    "name": "们包",
                    "time": "20:08"
                },
                {
                    "name": "带必",
                    "time": "19:05"
                }
            ]
        },
        {
            "daydate": "2020-04-12",
            "task": [
                {
                    "name": "以性",
                    "time": "23:35"
                }
            ]
        }
    ]

 })
  
// 2、获取周日历
  // 获取今天是本周的第几天
  const weekOfday = moment().format('E')
  let arr = [];
  let lastMonday = moment().subtract(weekOfday-1, 'days').format('YYYY-MM-DD');//周一日期
    let lastTuesday = moment().subtract(weekOfday-2, 'days').format('YYYY-MM-DD');//周二日期
    let lastWednesday = moment().subtract(weekOfday-3, 'days').format('YYYY-MM-DD');//周三日期
    let lastThursday = moment().subtract(weekOfday-4, 'days').format('YYYY-MM-DD');//周四日期
    let lastFriday = moment().subtract(weekOfday-5, 'days').format('YYYY-MM-DD');//周五日期
    let lastSaturday = moment().subtract(weekOfday-6, 'days').format('YYYY-MM-DD');//周六日期
    let lastSunday = moment().add(7-weekOfday, 'days').format('YYYY-MM-DD');//周日日期
    
  arr.push({title:'星期一',titledate:lastMonday});
  arr.push({title:'星期二',titledate:lastTuesday});
  arr.push({title:'星期三',titledate:lastWednesday});
  arr.push({title:'星期四',titledate:lastThursday});
  arr.push({title:'星期五',titledate:lastFriday});
  arr.push({title:'星期六',titledate:lastSaturday});
  arr.push({title:'星期日',titledate:lastSunday});
  // console.log(arr);
  // 如果不转换下面就没有效果不知道为什么
  const r = parseInt(weekOfday);

arr.map((rus,index)=>{
    let titledatechange = rus.titledate.split('-');
    var datehtml = '';
    if((index+1)==r){
        var datehtml = '<span style="color:#33C0CD">'+titledatechange[0]+'年'+titledatechange[1]+'月'+titledatechange[2]+'日'+'</span>'+
        '<span style="color:#33C0CD">'+rus.title+'('+'<b style="color:red" class = "dateweekitem0'+index+'">'+0+'</b>'+')'+'</span>';
    $('.taskbox0'+index).addClass("active");
    $('.taskitems0'+(index)).addClass("itemactive");
    $('.taskitems0'+(index+1)).addClass("itemactive");
    }else{
        var datehtml = '<span>'+titledatechange[0]+'年'+titledatechange[1]+'月'+titledatechange[2]+'日'+'</span>'
        +'<span >'+rus.title+'('+'<b style="color:red" class = "dateweekitem0'+index+'">'+0+'</b>'+')'+'</span>';
    }
   
    $('.dateitem0'+index).append(datehtml);
})


  // 3、获取事件
  $.ajax({
    url:'/infor',
    type:'GET',
    dataType:'json',
    sync:'false',
    success:function(res){
  
    console.log(res);
    console.log(arr.length)
    // console.log(res.list.length);
    // console.log(res.list[0].task.length)
    // console.log(res.list[1].task[1].name)
    for(var i =0;i<arr.length;i++){
      // console.log(arr);

    //   if((i+1)==r){
    //     var datehtml = '<li class = "active">'+'<span>'+arr[i].titledate+'</span>'+'<span>'
    //     +arr[i].title+'('+'<b>'+0+'</b>'+')'
    //     +'</span>'
    //     +'<ul class = "task">'+'</ul>'+'</li>';
    //     $(".date").append(datehtml)
    //    }else{
    //     var datehtml = '<li>'+'<span>'+arr[i].titledate+'</span>'+'<span>'+arr[i].title
    //     +'('+'<b>'+0+'</b>'+')'
    //     +'</span>'+'<ul class = "task">'+'</ul>'+'</li>';
    //     $(".date").append(datehtml)
    //    }
    let titledatechangebox = arr[i].titledate.split('-');
      for(var j = 0;j<res.list.length;j++){
        // console.log(res.list[1].daydate)
        let daydatechangebox = res.list[j].daydate.split('-');

        if(daydatechangebox[0] == titledatechangebox[0]&&daydatechangebox[1] == titledatechangebox[1]&&daydatechangebox[2] == titledatechangebox[2]){
        //  对数据进行排序
          res.list[j].task.sort(function(a, b) {
            return b.time< a.time ? 1 : -1;
          });
           // 渲染每日任务列表,产生列表中的小item
        //    将小序号标上去
           $('.dateweekitem0'+i).html(res.list[j].task.length);
          for(var k = 0;k<res.list[j].task.length;k++){
           
            var taskboxhtml ='<li class = "taskBoxli">'+'<span>'+res.list[j].task[k].name
            +'任务'
            +'</span>'
            +'<span>'+res.list[j].task[k].time+'</span>'+'</li>';
            $('.taskbox0'+i).append(taskboxhtml);
           
          }
          
        
        }
       
      }
    
    }
    },
    error:function(){
      console.log(error)
    }
  })
  
})