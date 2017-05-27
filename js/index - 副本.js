
        var container = document.getElementById("container");


        setTimeout(function(){

            animate1();

        },3000)

        //每个城市缩小后应该显示的长宽
        var wid = $("body").width();
        var hei = $("body").height();


        // var cit_wid = wid*0.02;
        // var cit_hei = hei*0.02;

        // var x = $("#beijing").offset().left + cit_wid +6;
        // var y = $("#beijing").offset().top + cit_hei + 20;
        //     console.log($("#beijing").offset().top,$("#beijing").css('marginTop'))
        // $("#container").css('transformOrigin', x+'px '+y+'px');

        // 第一个动画，北京光点消失，进入北京
        function animate1(){
            $(".bj_cli").removeClass('animate')
            $("#container").css('transformOrigin', '422px 156.74px');
            
            var beijing = $("#beijing")[0];
            // setTimeout(function(){
            //     MTween({
            //         el: beijing,
            //         target: {
            //             opacity: 100
            //         },
            //         time: 2000,
            //         type: "linear",
            //     })
            // },1000)

            MTween({
                el: container,
                target: {
                    scale: 5600
                },
                time: 2000,
                type: "easeBothStrong",
                callBack: function(){
                    //进入城市后各个公司依次点亮放大界面后的回调函数
                    function callback(){
                        $(".bj_cli").animate({opacity: 1},500);
                        // $(".sh_cli").css('opacity', '0');
                        //北京到上海旋转跳跃
                        var rot_img = $('.bj_sh img')[0];
                        css(rot_img,"rotate",-75)
                        MTween({
                            el: rot_img,
                            target: {rotate: 70,opacity: 100},
                            time: 5000,
                            type: "easeBothStrong",
                            callProcess: function(){
                                var rote = css(rot_img,"rotate")
                                //当旋转到一定角度，上海亮点显示，去除北京亮点
                                // console.log(rote)
                                if(rote >= (-15)){
                                    if ($(".sh_cli").css('opacity') == 0) {
                                        console.log($(".sh_cli").css('opacity'))
                                        $(".bj_cli").animate({opacity: 0},1000);
                                        $(".sh_cli").animate({opacity: 1},1000);
                                    };
                                }
                            },
                            callBack: function(){
                                setTimeout(function(){
                                    console.log(1)
                                    var sh_cli = $(".sh_cli")[0];
                                    MTween({
                                        el: sh_cli,
                                        target: {opacity: 0},
                                        time: 1000,
                                        type: "easeBothStrong"
                                    })

                                    animate2();
                                },2000)
                            }
                        })
                    }
                    
                    intoCity($("#beijing .city"),beijing,callback);

                }
            })
        }

        //上海动画
        function animate2(){
            $("#container").css('transformOrigin', '589px 491px');
            var shanghai = $("#shanghai")[0];

            $("#shanghai").animate({opacity: 1}, 4000)

            MTween({
                el: container,
                target: {
                    scale: 5600
                },
                time: 2000,
                type: "easeBothStrong",
                callBack: function(){
                    function callback(){
                        $(".sh_cli").animate({opacity: 1},1000);
                    }
                    intoCity($("#shanghai .city"),shanghai,callback)
                    // setTimeout(function(){
                    //     MTween({
                    //         el: container,
                    //         target: {
                    //             scale: 100
                    //         },
                    //         time: 1500,
                    //         type: "easeBothStrong",
                    //         callBack: function(){
                    //             // animate3()
                    //         }
                    //     })
                    // },2000)
                }
            })
        }

        function animate3(){
            $("#container").css('transformOrigin', '336px 783px');
            MTween({
                el: container,
                target: {
                    scale: 5600
                },
                time: 2000,
                type: "easeBothStrong",
                callBack: function(){
                    setTimeout(function(){
                        MTween({
                            el: container,
                            target: {
                                scale: 100
                            },
                            time: 1500,
                            type: "easeBothStrong",
                            callBack: function(){
                                animate4()
                            }
                        })
                    },2000)
                }
            })
        }

        function animate4(){
            $("#container").css('transformOrigin', '366px 798px');
            MTween({
                el: container,
                target: {
                    scale: 5200
                },
                time: 2000,
                type: "easeBothStrong",
                callBack: function(){
                    setTimeout(function(){
                        MTween({
                            el: container,
                            target: {
                                scale: 100
                            },
                            time: 1500,
                            type: "easeBothStrong"
                        })
                    },2000)
                }
            })
        }




        function intoCity(city,hide_city,call){
            var num = 0;
            var len = city.length;
            // alert(len)
            

            //以此显示公司
            var timer = setInterval(function(){
               var obj = city[num];

               MTween({
                el: obj,
                target: {
                    opacity: 100
                },
                time: 1000,
                type: "easeBothStrong",
               })

               num++;
               if (num == len) {
                clearInterval(timer)
               };

            }, 1000)

            setTimeout(function(){
                //公司点亮之后视角回到大界面
                MTween({
                    el: container,
                    target: {
                        scale: 100
                    },
                    time: 1500,
                    type: "easeBothStrong",
                    callBack: function(){
                        //回到界面后执行的函数
                        call();
                    }
                })
                // 公司点亮完之后隐藏
                MTween({
                    el: hide_city,
                    target: {
                        opacity: 0
                    },
                    time: 1500,
                    type: "linear",
                })
            },(len+2)*1000)
        }