$(function() {
    
    activeCost();
    function activeCost(){
        var $costTime = $('.costTime'),
            $costCoin = $('.costCoin'),
            $cofTask,
            $cofMiner,
            progressInnerTimeWidth,
            progressInnerCoinWidth;
        
            $progressInnerTime = $costTime.find('.progressInner').css({width: '55%'});
            $progressInnerCoin = $costCoin.find('.progressInner').css({width: '46%'});
        $( ".sliderTask" ).slider({
            value:70,
            min: 10,
            max: 100,
            step: 10,
            slide: function( eventTask, uiTask ) {
                $cofTask = uiTask.value;
                    
                $( "#amountTask" ).val( $cofTask );

                if ($cofTask<70) {
                    progressInnerTimeWidth = $cofTask/2
                } else {
                    progressInnerTimeWidth = 70/2 + ($cofTask-70)/6 
                }
                $progressInnerTime.animate(
                    {width : 90 - progressInnerTimeWidth + '%'} , 100
                )
                $progressInnerCoin.animate(
                    {width : 20 + $cofTask * 50/100 + '%'} , 100
                )
                $( "#costTimeTxt span" ).text( Math.floor(90 - progressInnerTimeWidth)/2 );
                $( "#costCoinTxt span" ).text( $cofTask * 100 );
            }
        });
        
        $( ".sliderMiners" ).slider({
            value:2,
            min: 2,
            max: 10,
            step: 1,
            slide: function( eventMiners, uiMiners ) {
                $cofMiner = uiMiners.value,
                timeTotalWidthDeci = 50,
                $timeNowWidthDeci = $("#costTimeTxt span").text(),
                progressInnerTimeWidth = ($timeNowWidthDeci / timeTotalWidthDeci * 100 - $cofMiner * 10/4 );

                $( "#amountMiner" ).val( $cofMiner );
                $progressInnerTime.animate(
                    {width : progressInnerTimeWidth + '%'} , 100
                )
                // $( "#costTimeTxt span" ).text(  );
                // $( "#costCoinTxt span" ).text(  );
            }
        });

        $( "#amountTask" ).val(  $( ".sliderTask" ).slider( "value" ) );
        $( "#amountMiner" ).val(  $( ".sliderMiners" ).slider( "value" ) );
        
    }

    activateChart();
    function activateChart(){
        var $content = $('.column'),
            $charts = $content.find('.chart');

        $charts.each(function(){
            var $chart = $(this),
                $circleLeft = $chart.find('.left .circleMaskInner').css({transform: 'rotate(0)'}),
                $circleRight = $chart.find('.right .circleMaskInner').css({transform: 'rotate(0)'}),
                $percentNum = $chart.find('.percentNum'),
                percentData = 100 - $percentNum.text();

            $percentNum.text(0);

            $({ percent: 0}).delay(1000).animate({
                percent: percentData
            }, {duration:1500,
                progress: function () {
                    var now = this.percent,
                        deg = now * 360/100,
                        degRight = Math.min(Math.max(deg, 0),180),
                        degLeft = Math.min(Math.max(deg - 180, 0),180);
                    $circleRight.css({transform: 'rotate(' + degRight + 'deg)'});
                    $circleLeft.css({transform: 'rotate(' + degLeft + 'deg)'});
                    $percentNum.text(Math.floor(now * 100)/100);
                }
            });
        });
    }
    activateChart2();
    function activateChart2() {
        var $content = $('.column'),
            $chartProgItems = $content.find('.chartProgItem');

        $chartProgItems.each(function () {
            var $chartProgItem = $(this),
                $progressInner = $chartProgItem.find('.progressInner'),
                $progressInnerNum = $chartProgItem.find('p'),
                progressInnerWidth = $progressInnerNum.text();
            
            $progressInnerNum.text(0);
            
            $({ percent: 0}).delay(1000).animate({
                percent: progressInnerWidth
            }, {duration:1500,
                progress: function () {
                    var now2 = this.percent,
                        num = (Math.floor(now2 * 1000)/1000).toFixed(3),
                        numColorDeci = (Math.floor(now2 * 1000/100)),
                        numBarColor;
                    if (numColorDeci < 3) {
                        numBarColor = '#BE2932';
                    } else if (numColorDeci < 7) {
                        numBarColor = '#E3C136';
                    } else {
                        numBarColor = '#B6B950';
                    }
                    $progressInner.css({width: now2 * 1000 * 0.95 / 10 + '%',backgroundColor: numBarColor});
                    $progressInnerNum.text(num);
                }
            });
        })
    }

    nextButton();
    function nextButton() {
        var allPageClass = ['intro1','intro2','txt1','txt2','txt3','p.txt4','txt4','txt5','txt6','txt6check','txt7','txt7mask'],
            $next = $('.next');


        for (let index = 1; index < allPageClass.length; index++) {
            const element = allPageClass[index];
            $('.'+element).css('display','none')
        }
        
        $next.click(function (){
        var nowPage = $(this).attr('class').substr(22)
            switch (nowPage) {
                case 'intro1':  
                    $('.intro1').css('display','none');
                    $('.intro2').css('display','');
                    break;
            
                case 'intro2':
                    $('.intro2').css('display','none');
                    $('.txt1').css('display','');
                    break;
            
                case 'txt1':
                    $('.txt1').css('display','none');
                    $('.txt2').css('display','');
                    break;
                    
                case 'txt2':
                    $('.txt2').css('display','none');
                    $('.txt3').css('display','');
                    break;
            
                case 'txt3':
                    $('.txt3').css('display','none');
                    $('.txt4').css('display','');
                    break;
            
                case 'txt4':
                    $('.txt4').css('display','none');
                    $('.txt5').css('display','');
                    break;
            
                case 'txt5':
                    $('.txt5').css('display','none');
                    $('.txt6').css('display','');
                    break;
            
                case 'txt6':
                    $('.txt6').css('display','none');
                    $('.txt7').css('display','');
                    break;
            
                case 'txt7':
                    break;
                    
                default:
                    break;
            }
        })
    }
} );