$( document ).ready(function() {

    let position = 0;
    const slidesToShow = 3;
    const slidesToScroll = 2;

    const sliderContainer = $(`.wd-slider`);
    const sliderWrapper = $(`.wd-slider__slide-wrapper`);
    const sliderItem = $(`.wd-slider__item`);
    const sliderItemCount = sliderItem.length;

    const prevBtn = $(`.wd-slider__prev-button`);
    const nextBtn = $(`.wd-slider__next-button`);

    const sliderItemWidth =  sliderContainer.width() / slidesToShow;
    const movePosition = slidesToScroll * sliderItemWidth;

    sliderItem.each(function(index,item){
        $(item).css({
            minWidth: sliderItemWidth
        })
    });

    function checkButtons(value) {  
        
        prevBtn.prop( "disabled", function() {
            if((value == true) || (position === 0)) {
                return true;
            } else {
                return false;
            }            
        });

        nextBtn.prop( "disabled", function() {
            if((value == true) || (position <= -(sliderItemCount - slidesToShow) * sliderItemWidth)) {
                return true;
            } else {
                return false;
            }            
        });       
    }

    function setTransitionPrev(resultPosition, position) {
        let sliderInterval = setInterval(setAnimation, 1);
        let currentPos = position - resultPosition; 

        function setAnimation() {
            if (currentPos > position) {
                clearInterval(sliderInterval);
                checkButtons(false);
            } else {
                sliderWrapper.css({
                    transform: `translateX(${currentPos++}px)`
                }); 
                checkButtons(true);                
            }                       
        }

        checkButtons(); 
    }

    function setTransitionNext(resultPosition, position) {     
    
        let sliderInterval = setInterval(setAnimation, 1);
        let currentPos = position + resultPosition; 

        function setAnimation() {
            if (currentPos < position) {
                clearInterval(sliderInterval);
                checkButtons(false);
            } else {
                sliderWrapper.css({
                    transform: `translateX(${currentPos--}px)`
                }); 
                checkButtons(true);
            }            
        }
        
        checkButtons();
    }

    /*--- Without Animation ---*/

    function setPosition() {     

        sliderWrapper.css({
            transform: `translateX(${position}px)`
        });           

        checkButtons();
    }

    /* ----------------------- */

    // function checkButtons() {
    //     prevBtn.prop('disabled', position === 0);
    //     nextBtn.prop(
    //         'disabled', 
    //         position <= -(sliderItemCount - slidesToShow) * sliderItemWidth
    //     );
    // }   

    prevBtn.click(function() {        
        const sliderItemsLeft = Math.abs(position) / sliderItemWidth;
        let resultPosition = sliderItemsLeft >= slidesToScroll ? movePosition : sliderItemsLeft * sliderItemWidth;
        position += resultPosition;
        setTransitionPrev(resultPosition, position);
        checkButtons();
    });

    nextBtn.click(function() {
        const sliderItemsLeft = sliderItemCount - (Math.abs(position) + slidesToShow * sliderItemWidth) / sliderItemWidth;
        let resultPosition = sliderItemsLeft >= slidesToScroll ? movePosition : sliderItemsLeft * sliderItemWidth;
        position -= resultPosition;
        setTransitionNext(resultPosition, position); 
        checkButtons();
    });

    checkButtons();

});