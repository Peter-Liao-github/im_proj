$(function() {

    activeCost();
    function activeCost(){
        var $returnTime = $('.topImg .txt6 p:nth-of-type(2)'),
            $costTime = $('.costTime'),
            $costCoin = $('.costCoin'),
            $cofTask,
            $cofMiner,
            progressInnerTimeWidth,
            progressInnerCoinWidth;
        
            $progressInnerTime = $costTime.find('.progressInner').css({width: 2/128 *96.5 +'%'});
            $progressInnerCoin = $costCoin.find('.progressInner').css({width: 70/500 *96.5 +'%'});
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
                    progressInnerTimeWidth = 2* Math.pow( 2,(70-$cofTask)/10 )
                } else {
                    progressInnerTimeWidth = 2 - ($cofTask-70)/100 
                }
                $( "#costTimeTxt span" ).text( progressInnerTimeWidth );
                $returnTime.text( progressInnerTimeWidth +' hr' );
                $( "#costCoinTxt span" ).text( $cofTask * miner/2 );
                $progressInnerTime.animate(
                    {width : $( "#costTimeTxt span" ).text()/128 *96.5 + '%'} , 100
                )
                $progressInnerCoin.animate(
                    {width : $( "#costCoinTxt span" ).text()/500 *96.5 + '%'} , 100
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
                    taAliqT = 2* Math.pow( 2,(70-taAliq)/10 )
                } else {
                    taAliqT = 2 - (taAliq-70)/100 
                }

                $( "#amountMiner" ).val( $cofMiner );
                $( "#costTimeTxt span" ).text( taAliqT );
                $returnTime.text( taAliqT +' hr' );
                $( "#costCoinTxt span" ).text( taAliq * $cofMiner/2 );
                $progressInnerTime.animate(
                    {width : $( "#costTimeTxt span" ).text()/128 *95 + '%'} , 100
                )
                $progressInnerCoin.animate(
                    {width : $( "#costCoinTxt span" ).text()/500 *95 + '%'} , 100
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
                $circleLeft = $chart.find('.correct .left .circleMaskInner').css({transform: 'rotate(0)'}),
                $circleRight = $chart.find('.correct .right .circleMaskInner').css({transform: 'rotate(0)'}),
                $circleLeftErr = $chart.find('.err .left .circleMaskInner').css({transform: 'rotate(0)'}),
                $circleRightErr = $chart.find('.err .right .circleMaskInner').css({transform: 'rotate(0)'}),
                $percentNum = $chart.find('.percentNum'),
                $percentNumError = $chart.find('.percentNumError'),
                percentData = $percentNum.text();

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

            $({ percent: 0}).delay(800).animate({
                percent: 100
            }, {duration:1200,
                progress: function () {
                    var now = this.percent,
                        deg = now * 360/100,
                        degRight = Math.min(Math.max(deg, 0),180),
                        degLeft = Math.min(Math.max(deg - 180, 0),180);
                    $circleRightErr.css({transform: 'rotate(' + degRight + 'deg)'});
                    $circleLeftErr.css({transform: 'rotate(' + degLeft + 'deg)'});
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
            
            $({ percent: 0}).delay(800).animate({
                percent: progressInnerWidth
            }, {duration:1200,
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
        var allPageClass = ['intro1','intro2','txt1','setOfTaskPage','txt2','txt3','p.txt4','txt4','txt5','txt6','txt6check','txt7pre','txt7','txt7mask'],
            $next = $('.next');
            $last = $('.last');

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
                    $('.setOfTaskPage').css('display','');
                    break;
                    
                case 'setOfTaskPage':
                    $('.setOfTaskPage').css('display','none');
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
                    $('.nextBtn.txt4').css('display','none');
                    $('.ani1fileSingle').css('display','none');
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
                    $('span.token').text( 1000 - $( "#costCoinTxt span" ).text() );
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
                    $('.option.txt4').css('display','');
                    $('.ani1monitor').css({animation: 'pureFIn 1s 9s 1 both' ,display:''});
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
                    $('.txt7mask').css('display','');
                    $('.option.txt4').css('display','none');
                    activateChart();
                    activateChart2();
                    break;

                default:
                    break;
            }
        })

        $last.click(function (){
        var nowPage = $(this).attr('class').substr(22)
            switch (nowPage) {
                case 'intro2':
                    $('.intro2').css('display','none');
                    $('.intro1').css('display','');
                break;
                
                case 'txt1':
                    $('.txt1').css('display','none');
                    $('.intro2').css('display','');
                break;
                
                case 'setOfTaskPage':
                    $('.setOfTaskPage').css('display','none');
                    $('.txt1').css('display','');
                break;
                
                case 'txt2':
                    $('.txt2').css('display','none');
                    $('.setOfTaskPage').css('display','');
                break;
                
                case 'txt3':
                    $('.txt3').css('display','none');
                    $('.txt2').css('display','');
                break;
                
                case 'txt4':
                    $('.txt4').css('display','none');
                    $('.txt3').css('display','');
                break;
                
                case 'txt5':
                    $('p.txt4').css('display','');
                    $('.txt5').css('display','none');
                    $('.nextBtn.txt4').css('display','');
                    $('.option.txt4>img').css('opacity','1');
                    $('.ani1fileSingle').css('display','');
                    break;
                    
                case 'txt6':
                    $('.txt4').css('display','');
                    $('p.txt4').css('display','none');
                    $('.txt5').css('display','');
                    $('.ani2file').css('display','none');
                    $('.ani2filesCheckSingle').css('display','none');
                    $('.ani2miners').css('display','none');
                    $('.txt6').css('display','none');
                break;
                
                case 'txt6check':
                    $('.txt6').css('display','');
                    $('span.token').text( 1000 );
                    $('.txt6check').css('display','none');
                    break;
                    
                case 'txt7pre':
                    $('.txt6check').css('display','');
                    $('.ani2miners').css('display','none');
                    $('.ani2file').css('display','none');
                    $('.ani2filesCheckSingle').css('display','none');
                    $('.ani1fortress').css('display','none');
                    $('.ani1filesRow').css({animation: 'pureFIn 1.5s 0.5s 1 both' ,display:'none'});
                    $('.ani1fileSliced').css({animation: 'ani1fileSlicedFIn 3s 0.5s 1 both' ,display:'none'});
                    $('.txt7pre').css('display','none');
                    $('.option.txt4').css('display','none');
                    $('.ani1monitor').css({animation: 'unset' ,display:''});
                break;
                    
                case 'txt7':
                    $('.txt7pre').css('display','');
                    $('.ani2miners').css('display','');
                    $('.ani2file').css('display','');
                    $('.ani2filesCheckSingle').css('display','');
                    $('.ani1fortress').css('display','');
                    $('.ani1filesRow').css({animation: 'fOutToDown 2s 0.5s 1 both' ,display:''});
                    $('.ani1fileSliced').css({animation: 'fOutToDown 2s 0.5s 1 both' ,display:''});
                    $('.txt7').css('display','none');
                    $('.txt7mask').css('display','none');
                    $('.option.txt4').css('display','');
                    $('.ani1monitor').css({animation: 'pureFIn 1s 9s 1 both' ,display:''});
                break;    

                default:
                    break;
            }
        })
    }

    chooseProj();
    function chooseProj(){
        var $choice = $('.introCol');
        $choice.click(function () {
            $this = $(this)
            $choice.css({boxShadow:'unset', opacity:0.6, filter: 'grayscale(20%)', webkitFilter: 'grayscale(20%)'})
            $this.css({boxShadow:'0px 0px 4px 4px #E3C136', opacity:1, filter: 'grayscale(0%)', webkitFilter: 'grayscale(0%)'})
            var $choose = $this.attr('class').substr(29)
                $txt7 = $('.txt7');
            switch ($choose) {
                case 'Dota':
                    $txt7.find('.projDota').css('display','unset')
                    $txt7.find('.projBank').css('display','none')
                    $txt7.find('.projCar').css('display','none')
                    break;
                case 'Bank':
                    $txt7.find('.projDota').css('display','none')
                    $txt7.find('.projBank').css('display','unset')
                    $txt7.find('.projCar').css('display','none')
                    break;
                case 'Car':
                    $txt7.find('.projDota').css('display','none')
                    $txt7.find('.projBank').css('display','none')
                    $txt7.find('.projCar').css('display','unset')
                    break;
                default:
                    break;
            }
        })
    }

    changeBgi();
    function changeBgi() {
        $('.toggleRound').click(function () {
            if ($(this).hasClass('toggleBgi')) {
                $(this).css('background','#eee')
                $('.outerContainer>.bgi>img').attr('src','img/bgi2.png');
                $('.introCont').css('color','#fff')
                $('.mainContent').css('color','#fff')
                $('.fColorGrey').addClass('fColorWhite')
                $('input[disabled]').css('color','#fff')
                $('img[src="img/diamondDarkest.png"]').attr('src','img/diamondDarkestB.png')
                $('img[src="img/diamondDark.png"]').attr('src','img/diamondDarkB.png')
                $('img[src="img/diamondLight.png"]').attr('src','img/diamondLightB.png')
                $('img[src="img/diamondLightest.png"]').attr('src','img/diamondLightestB.png')
                $('.txt7mask').css('opacity',0)
                $(this).removeClass('toggleBgi');
            } else {
                $(this).css('background','linear-gradient(#E3C136 5%,#898989 25%,#898989 60%,#E3C136)'),
                $('.outerContainer>.bgi>img').attr('src','img/bgi1.png');
                $('.introCont').css('color','#898989')
                $('.mainContent').css('color','#898989')
                $('input[disabled]').css('color','#000')
                $('img[src="img/diamondDarkestB.png"]').attr('src','img/diamondDarkest.png')
                $('img[src="img/diamondDarkB.png"]').attr('src','img/diamondDark.png')
                $('img[src="img/diamondLightB.png"]').attr('src','img/diamondLight.png')
                $('img[src="img/diamondLightestB.png"]').attr('src','img/diamondLightest.png')
                $(this).addClass('toggleBgi');
                $('.fColorGrey').removeClass('fColorWhite')
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
                    $('.colTxt6Check.'+uncheckedClass).css({display: ''});
                    $('p.'+uncheckedClass).css({display: ''});
                } else if (!$this.prop('checked')){
                    sum -= $this.val();
                    diamondBrighten(sum);
                    $('.colTxt6Check.'+uncheckedClass).css({display: 'none'});
                    $('p.'+uncheckedClass).css({display: 'none'});
                }
            })
            
            function diamondBrighten(sum){
                if ($('.toggleRound').hasClass('toggleBgi')) {
                    switch (sum) {
                        case -3:
                            $('.topImg img.txt2').attr('src','img/diamondDarkest.png')
                            $('.topImg img.txt3').attr('src','img/diamondDarkest.png')
                            $('.next.txt2').css('opacity','0');
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
                } else {
                    switch (sum) {
                        case -3:
                            $('.topImg img.txt2').attr('src','img/diamondDarkestB.png')
                            $('.topImg img.txt3').attr('src','img/diamondDarkestB.png')
                            $('.next.txt2').css('opacity','0');
                            break;
                        case -1:
                            $('.topImg img.txt2').attr('src','img/diamondDarkB.png')
                            $('.topImg img.txt3').attr('src','img/diamondDarkB.png')
                            $('.next.txt2').css('opacity','1');    
                            break;
                        case 1:
                            $('.topImg img.txt2').attr('src','img/diamondLightB.png')
                            $('.topImg img.txt3').attr('src','img/diamondLightB.png')
                            $('.next.txt2').css('opacity','1');
                            break;
                        case 3:
                            $('.topImg img.txt2').attr('src','img/diamondLightestB.png')
                            $('.topImg img.txt3').attr('src','img/diamondLightestB.png')
                            $('.next.txt2').css('opacity','1');
                            break;
                    
                        default:
                            break;
                    }
                }
            }
        })
    }

    downArrowHover();
    function downArrowHover(){
        var $imgDown = $('.chart a');
        $imgDown.hover(function(){
            var $this = $(this);
            $(this).next().css("display", "block");
            }, function(){
            $(this).next().css("display", "none");
        });
    }
} );