$(function() {
    
    activeCost();
    function activeCost(){
        var $costTime = $('.costTime'),
            $costCoin = $('.costCoin'),
            $cofTask,
            $cofMiner,
            progressInnerTimeWidth,
            progressInnerCoinWidth;
        
            $progressInnerTime = $costTime.find('.progressInner').css({width: '50%'});
            $progressInnerCoin = $costCoin.find('.progressInner').css({width: '40%'});
        $( ".sliderTask" ).slider({
            value:70,
            min: 10,
            max: 100,
            step: 10,
            slide: function( eventTask, uiTask ) {
                $cofTask = uiTask.value,
                miner = $('#amountMiner').val();

                $( "#amountTask" ).val( $cofTask );

                if ($cofTask<70) {
                    progressInnerTimeWidth = $cofTask/2
                } else {
                    progressInnerTimeWidth = 70/2 + ($cofTask-70)/6 
                }
                $( "#costTimeTxt span" ).text( Math.floor(95 - progressInnerTimeWidth)/2 - miner*10/8 );
                $( "#costCoinTxt span" ).text( $cofTask * 100 + miner*500 );
                $progressInnerTime.animate(
                    {width : $( "#costTimeTxt span" ).text()/50 *100 + '%'} , 100
                )
                $progressInnerCoin.animate(
                    {width : $( "#costCoinTxt span" ).text()/20000 *100 + '%'} , 100
                )
            }
        });
        
        $( ".sliderMiners" ).slider({
            value:2,
            min: 2,
            max: 10,
            step: 1,
            slide: function( eventMiners, uiMiners ) {
                $cofMiner = uiMiners.value,
                taAliq = $( "#amountTask" ).val();
                if (taAliq<70) {
                    taAliqT = taAliq/2
                } else {
                    taAliqT = 70/2 + (taAliq-70)/6 
                }

                $( "#amountMiner" ).val( $cofMiner );
                $( "#costTimeTxt span" ).text( Math.floor(95 - taAliqT)/2 - $cofMiner*10/8 );
                $( "#costCoinTxt span" ).text( taAliq * 100 + $cofMiner*500 );
                $progressInnerTime.animate(
                    {width : $( "#costTimeTxt span" ).text()/50 *100 + '%'} , 100
                )
                $progressInnerCoin.animate(
                    {width : $( "#costCoinTxt span" ).text()/20000 *100 + '%'} , 100
                )
            }
        });

        $( "#amountTask" ).val(  $( ".sliderTask" ).slider( "value" ) );
        $( "#amountMiner" ).val(  $( ".sliderMiners" ).slider( "value" ) );
        
    }
    
    function activateChart(){
        var $content = $('.column'),
            $charts = $content.find('.chart');

        $charts.each(function(){
            var $chart = $(this),
                $circleLeft = $chart.find('.left .circleMaskInner').css({transform: 'rotate(0)'}),
                $circleRight = $chart.find('.right .circleMaskInner').css({transform: 'rotate(0)'}),
                $percentNum = $chart.find('.percentNum'),
                $percentNumError = $chart.find('.percentNumError'),
                percentData = 100 - $percentNum.text();

            $percentNum.text(0);
            $percentNumError.text(0);

            $({ percent: 0}).delay(800).animate({
                percent: percentData
            }, {duration:1200,
                progress: function () {
                    var now = this.percent,
                        deg = now * 360/100,
                        degRight = Math.min(Math.max(deg, 0),180),
                        degLeft = Math.min(Math.max(deg - 180, 0),180);
                    $circleRight.css({transform: 'rotate(' + degRight + 'deg)'});
                    $circleLeft.css({transform: 'rotate(' + degLeft + 'deg)'});
                    $percentNum.text(Math.floor(now * 100)/100);
                    $percentNumError.text(Math.floor((100 - now) * 100)/100);
                }
            });
        });
    }
    
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
        var allPageClass = ['intro1','intro2','txt1','txt2','txt3','p.txt4','txt4','txt5','txt6','txt6check','txt7pre','txt7','txt7mask'],
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
                    $('p.txt4').css('display','none');
                    $('.txt5').css('display','');
                    $('.next.txt4').css('display','none');
                    $('.ani2miners').css('display','none');
                    $('.ani2file').css('display','none');
                    $('.ani2filesCheckSingle').css('display','none');
                    $('.option.txt4>img').css('opacity','0');
                    break;
            
                case 'txt5':
                    $('.txt4').css('display','none');
                    $('.txt5').css('display','none');
                    $('.txt6').css('display','');
                    break;
            
                case 'txt6':
                    $('.txt6').css('display','none');
                    $('p.token').text( 100000 - $( "#costCoinTxt span" ).text() );
                    $('.txt6check').css('display','');
                    break;

                case 'txt6check':
                    $('.txt6check').css('display','none');
                    $('.ani2miners').css('display','');
                    $('.ani2file').css('display','');
                    $('.ani2filesCheckSingle').css('display','');
                    $('.ani1fortress').css('display','');
                    $('.ani1filesRow').css({animation: 'fOutToDown 2s 0.5s 1 both' ,display:''});
                    $('.ani1fileSliced').css({animation: 'fOutToDown 2s 0.5s 1 both' ,display:''});
                    $('.txt7pre').css('display','');
                    break;
            
                case 'txt7pre':
                    $('.txt7pre').css('display','none');
                    $('.ani2miners').css('display','none');
                    $('.ani2file').css('display','none');
                    $('.ani2filesCheckSingle').css('display','none');
                    $('.ani1fortress').css('display','none');
                    $('.ani1filesRow').css('display','none');
                    $('.ani1fileSliced').css('display','none');
                    $('.txt7').css('display','');
                    activateChart();
                    activateChart2();
                    break;

                default:
                    break;
            }
        })
    }

    diamondCheckBox();
    function diamondCheckBox() {
        var $diamondCB = $('.t2colInput>input:first-child')
        $('.next.txt2').css('opacity','0');
        $diamondCB.click(function() {
            var sum = 0;
            $diamondCB.each(function() {
                $this = $(this);
                uncheckedClass = $this.attr('class').substr(9);
                if ($this.prop('checked')) {
                    sum += parseInt(($this.val()));
                    diamondBrighten(sum);
                    $('.colTxt6Check.'+uncheckedClass).css({opacity:1,textDecoration:'none'});
                    $('p.'+uncheckedClass).css({opacity:1,textDecoration:'none'});
                } else if (!$this.prop('checked')){
                    sum -= $this.val();
                    diamondBrighten(sum);
                    $('.colTxt6Check.'+uncheckedClass).css({opacity:0.4,textDecoration:'line-through'});
                    $('p.'+uncheckedClass).css({opacity:0.4,textDecoration:'line-through'});
                }
            })
            
            function diamondBrighten(sum){
                switch (sum) {
                    case -3:
                        $('.topImg img.txt2').attr('src','img/diamondDarker.png')
                        $('.topImg img.txt3').attr('src','img/diamondDarker.png')
                        break;
                    case -1:
                        $('.topImg img.txt2').attr('src','img/diamondDark.png')
                        $('.topImg img.txt3').attr('src','img/diamondDark.png')
                        $('.next.txt2').css('opacity','1');    
                        break;
                    case 1:
                        $('.topImg img.txt2').attr('src','img/diamondLight.png')
                        $('.topImg img.txt3').attr('src','img/diamondLight.png')
                        $('.next.txt2').css('opacity','1');
                        break;
                    case 3:
                        $('.topImg img.txt2').attr('src','img/diamondLightest.png')
                        $('.topImg img.txt3').attr('src','img/diamondLightest.png')
                        $('.next.txt2').css('opacity','1');
                        break;
                
                    default:
                        break;
                }
            }
        })
    }
} );