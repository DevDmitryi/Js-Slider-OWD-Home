$( document ).ready(function() {
    let slides = document.querySelectorAll('.wd-slider__item');
    let slider = [];

    for(let i=0; i<slides.length; i++) {
        slider[i] = slides[i].querySelector('.wd-slider__image').src;
        slides[i].remove();        
    }

    console.log(slider);

    let step = 0;
    let offset = 0;

    function draw() {
        let item = document.createElement('div');
        item.classList.add('wd-slider__item');

        let img = document.createElement('img');
        img.src = slider[step];
        img.classList.add('wd-slider__image');
        
        item.style.left = offset*400 + 'px';
        item.appendChild(img);
        
        document.querySelector('.wd-slider__slide-wrapper').appendChild(item);        

        if (step + 1 == slider.length) {
            step = 0;
        } else {
            step++;
        }

        offset = 1;
    }

    draw(); 
    draw();

    function left() {
        let slides2 = document.querySelectorAll('.wd-slider__item');
        let offset2 = 0;

        for(let i = 0; i<slides2.length; i++) {
            slides2[i].style.left = offset2*400-400 + 'px';
            offset2++;
            console.log(slides2[i].style.left);
        }

        setTimeout(() => {
            slides2[0].remove();
        }, 1000);

        draw();        
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
                    transform: `translateX(${currentPos--}px)`,
                }); 
                checkButtons(true);
            }            
        }
        
        checkButtons();
    }

    document.onclick = left;
});