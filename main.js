"use strict"


function headerFixed(){
    window.addEventListener('scroll', headerAnimation)

    function headerAnimation(){
        if(window.scrollY === 0){
            document.querySelector('header').classList.add('header_disabled')
            document.querySelectorAll('.header_menu ul a').forEach(item => item.classList.add('link_disabled'))
            document.querySelectorAll('.burger_button span').forEach(item => item.classList.remove('burger_button_blue'))
        }
        if(window.scrollY > 10){
            document.querySelector('header').classList.remove('header_disabled')
            document.querySelectorAll('.header_menu ul a').forEach(item => item.classList.remove('link_disabled'))
            document.querySelectorAll('.burger_button span').forEach(item => item.classList.add('burger_button_blue'))
        }
    }
    headerAnimation()
}
headerFixed()

function headingAnimation() {
    let tittles = document.querySelectorAll('.tittle_animation');
    let subtittles = document.querySelectorAll('.subtittle_animation');

    window.addEventListener('scroll', textAnimation);
    window.addEventListener('load', firstHeadingAnimation)

    
    function textAnimation(){
        let currentScrollPosition = window.scrollY

        switch (true) {

            case currentScrollPosition >= 0 && currentScrollPosition <= 200:
                document.querySelector('.tittle2_crossout_big').style.width = '100%'
                document.querySelector('.tittle1_span').style.width = '100%'
                break;
            case currentScrollPosition >= 200 && currentScrollPosition <= 1100:
                subtittles[0].style.width = '100%'
                tittles[0].style.width = '101%'
                break;
            case currentScrollPosition >= 1100 && currentScrollPosition <= 2200:
                subtittles[1].style.width = '100%'
                tittles[1].style.width = '101%'
                break;
            case currentScrollPosition >= 2200 && currentScrollPosition <= 2600:
                subtittles[2].style.width = '100%'
                tittles[2].style.width = '101%'
                break;
            case currentScrollPosition >= 3400 || (screen.width <= 890 && currentScrollPosition >= 2600):
                subtittles[3].style.width = '100%'
                tittles[3].style.width = '101%'
                break;
        }
        
        if(subtittles[0].style.width === '100%' && subtittles[3].style.width == '100%') window.removeEventListener('scroll', textAnimation)
    }
    function firstHeadingAnimation(){
        document.querySelector('.tittle2_crossout_big').style.width = '100%'
        document.querySelector('.tittle1_span').style.width = '100%'
    }
}

headingAnimation()

function burgerMenu(){
    const burgerButton = document.querySelector('.burger_button')
    const burgerMenu = document.querySelector('.burger_menu')
    const allBurgerLinks = document.querySelectorAll('.burger_menu > ul a')
    

    burgerButton.addEventListener('click', changeBurgerState)
    allBurgerLinks.forEach(item => item.addEventListener('click', changeBurgerState))

    burgerMenu.style.width = `0px`

    function changeBurgerState(){
        burgerMenu.classList.add('burger_transition')
        
        if(burgerMenu.style.width === `280px`){
            burgerMenu.style.width = `0px`
            burgerButton.classList.remove('open_burger')

        }
        else if(burgerMenu.style.width === `0px`){
            burgerMenu.style.width = `280px`
            burgerButton.classList.add('open_burger')

        }

        setTimeout(() => burgerMenu.classList.remove('burger_transition'), 300)
        window.navigator.vibrate(10);   

    }



}
burgerMenu()
   

function servicesPanel(){
    let scrollPosition = 0;
    let memoryPosition = 0;

    let sliderPos = 0;
    let memberTouchPos = 0;

    function tabs(){
        let tabName = document.querySelectorAll('.services_tab_name')
        let tabContent = document.querySelectorAll('.services_tab')
        
        tabName.forEach(item => {
            item.addEventListener('click', changeTab)
        });

        function changeTab(){
            let activeTabNumber = this.getAttribute('data-tab-number')



            tabName.forEach(item => {
                item.classList.remove('is_active')
            })
            this.classList.add('is_active')

            tabContent.forEach(item => {
                item.classList.remove('is_active')
            })
            tabContent[activeTabNumber].classList.add('is_active')

            checkAviable()

            function checkAviable(){
                scrollPosition = 0;
                memoryPosition = 0;
                memberTouchPos = 0;
                sliderPos = 0;

                document.querySelector('.scroll').style.transform = `translateX(0px)`
                document.querySelector('.services_tab.is_active').style.transform = `translateX(0px)`

                if(document.querySelector('.services_tab.is_active').children.length > 3){
                    document.querySelector('.scroll').classList.remove('scroll_disabled')
                }
                if(document.querySelector('.services_tab.is_active').children.length <= 3){
                    document.querySelector('.scroll').classList.add('scroll_disabled')
                }
            }
        }
        
    }

    tabs()





    function scroll(){
        const scroll = document.querySelector('.scroll')
        const scrollbar = document.querySelector('.scrollbar')

        scroll.addEventListener('mousedown', translateon)


        function translateon(e){
            
            const activeTabNumber = document.querySelector('.services_tab.is_active')
            const left = e.pageX
            const maxLineWidth = activeTabNumber.children.length * (activeTabNumber.children[0].clientWidth + 17)
            const tabKoef = (maxLineWidth - activeTabNumber.clientWidth) / 420

            console.log(activeTabNumber.children[0].clientWidth + 24)
            if(activeTabNumber.children.length > 3){
                document.querySelector('main').addEventListener('mousemove', scrollMove)
            } 

            function scrollMove(e){
                let betweenCoord = -(left - e.clientX);

                scrollPosition = memoryPosition + betweenCoord

                if(scrollPosition < 0){
                    scrollPosition = 0
                    betweenCoord = 0
                    activeTabNumber.style.transform = `translateX(${-(scrollPosition * tabKoef)}px)`
                    scroll.style.transform = `translateX(0px)`
                    return
                }
                if(scrollPosition > 420){
                    scrollPosition = 420
                    betweenCoord = 420
                    activeTabNumber.style.transform = `translateX(${-(scrollPosition * tabKoef)}px)`
                    scroll.style.transform = `translateX(420px)`
                    return
                }
                
                scroll.style.transform = `translateX(${scrollPosition}px)`
                activeTabNumber.style.transform = `translateX(${-(scrollPosition * tabKoef)}px)`

                document.body.style.cursor = 'pointer'
                window.getSelection().removeAllRanges()

                document.querySelector('main').addEventListener('mouseup', removeScrollMove)
                function removeScrollMove(){
                    document.querySelector('main').removeEventListener('mousemove', scrollMove)
                    document.body.style.cursor = 'auto'
                    memoryPosition = scrollPosition

                    if(memoryPosition < 0) memoryPosition = 0
                    if(memoryPosition > 420) memoryPosition = 420

                    document.querySelector('main').removeEventListener('mouseup', removeScrollMove)
                }
            }
        }       
    }
    scroll()

    function modal(){
        const modalTabItem = document.querySelectorAll('.services_tab_item')

        modalTabItem.forEach(item => item.addEventListener('click', showModale))

        function showModale(){
            const modalOverlay = document.querySelector('.modal_overflow')
            const modalLine = document.querySelectorAll('.modal')
            const activeTebItem = +this.getAttribute('data-card-number') 
            const activeTabNumber = document.querySelector('.services_tab_name.is_active').getAttribute('data-tab-number')
            let currentModaleItem = modalLine[activeTabNumber].children[activeTebItem]
            let allModalItem = Array.from(modalLine[activeTabNumber].children)
            let closeModalButton = document.querySelectorAll('.close_modal')

            closeModalButton.forEach(item => item.addEventListener('click', closeModal))

            modalOverlay.classList.add('modal_overflow_active')
            setTimeout(() => {modalOverlay.classList.add('modal_overflow_animation')}, 1)
            if(window.innerWidth >= 1025){
                document.body.style.padding = '0px 7px 0px 0px'
                document.querySelector('#header').style.padding = '20px 7px 20px 0px'
            }
            
            document.body.style.overflow = 'hidden'

            modalLine[activeTabNumber].classList.add('modal_active')
            setTimeout(() => {modalLine[activeTabNumber].classList.add('modal_animation')}, 1)

            modalLine[activeTabNumber].children[activeTebItem].classList.add('modal_content_active')
            

            document.querySelectorAll('.left_arrow').forEach(item => item.addEventListener('click', leftSwipe))
            document.querySelectorAll('.right_arrow').forEach(item => item.addEventListener('click', rightSwipe))

            function leftSwipe(){
                if(currentModaleItem.previousElementSibling === null) return

                currentModaleItem = currentModaleItem.previousElementSibling

                allModalItem.forEach(item => item.classList.remove('modal_content_active'))
                currentModaleItem.classList.add('modal_content_active')
            }
            
            function rightSwipe(){
                if(currentModaleItem.nextElementSibling === document.querySelectorAll('.left_arrow')[activeTabNumber]) return

                currentModaleItem = currentModaleItem.nextElementSibling

                allModalItem.forEach(item => item.classList.remove('modal_content_active'))
                currentModaleItem.classList.add('modal_content_active')
            }

            modalOverlay.addEventListener('click', closeModal)
            function closeModal(){
                modalOverlay.classList.remove('modal_overflow_animation')
                setTimeout(() => {modalOverlay.classList.remove('modal_overflow_active')}, 300);
                
                if(window.innerWidth <= 1080){
                    document.body.style.overflow = 'visible'
                    document.body.style.padding = '0px 0px 0px 0px'
                    document.querySelector('#header').style.padding = '20px 0px 20px 0px'
                }
                setTimeout(() => document.body.style.overflow = 'visible', 300)
                setTimeout(() => document.body.style.padding = '0px 0px 0px 0px', 300)
                setTimeout(() => document.querySelector('#header').style.padding = '20px 0px 20px 0px', 300)


                modalLine[activeTabNumber].classList.remove('modal_animation')
                setTimeout(() => {modalLine[activeTabNumber].classList.remove('modal_active')}, 300);
                
                //modalLine[activeTabNumber].classList.add('modal_closed_fix')
                //setTimeout( ()=> modalLine[activeTabNumber].classList.remove('modal_closed_fix'), 300)

                
                setTimeout(() => {allModalItem.forEach(item => item.classList.remove('modal_content_active'))}, 300);


                document.querySelectorAll('.left_arrow').forEach(item => item.removeEventListener('click', leftSwipe))
                document.querySelectorAll('.right_arrow').forEach(item => item.removeEventListener('click', rightSwipe))
                modalOverlay.removeEventListener('click', closeModal)
            }

            //-------------------phone swipe modal----------------------//

            const allModales = document.querySelectorAll('.modal_content')
            if(window.innerWidth <= 1024){
                allModales.forEach(item => item.addEventListener('touchstart', modalTouchStart))
                document.addEventListener('touchend', modalTouchEnd)
                allModales.forEach(item => item.addEventListener('touchmove', modalTouchMove))
            }

            let touchStartPos
            let touchMovePos
            let swipeLength
            let oneSwipe = true

            function modalTouchStart(e){
                touchStartPos = e.touches[0].clientX
                console.log(oneSwipe)
            }
            function modalTouchMove(e){
                touchMovePos = e.touches[0].clientX
                swipeLength = touchStartPos - touchMovePos

                
                if(oneSwipe && touchStartPos - touchMovePos >= 40){
                    oneSwipe = false
                    leftSwipe()
                }
                else if(oneSwipe && touchStartPos - touchMovePos <= -40){
                    oneSwipe = false
                    rightSwipe()
                }
            }
            function modalTouchEnd(){
                oneSwipe = true
            }

        }

    }
    modal()

    function swipeGalery(){}{
        if(window.innerWidth < 1024){
            document.querySelectorAll('.services_tab_item').forEach(item => item.addEventListener('touchstart', touchStart))
            document.querySelectorAll('.services_tab_item').forEach(item => item.addEventListener('touchmove', translateCard))
        }

        let touchStartPos
        let touchMovePos
        let maxWidthTablet
        let maxWidthPhone

        function touchStart(e){
            touchStartPos = e.touches[0].clientX

            memberTouchPos = sliderPos

            maxWidthTablet = ((this.parentElement.children.length * this.clientWidth) + ((this.parentElement.children.length - 1) * 16) - this.parentElement.clientWidth) + 10
            maxWidthPhone = ((this.parentElement.children.length * this.clientWidth) + ((this.parentElement.children.length - 1) * 16) - this.parentElement.clientWidth) +10

        }
        function translateCard(e){
            touchMovePos = e.touches[0].clientX

            if(memberTouchPos + (-(touchStartPos - touchMovePos)) > 0) {
                this.parentElement.style.transform = `translateX(0px)`
                return
            }
            if(memberTouchPos + (-(touchStartPos - touchMovePos)) < -maxWidthTablet && window.innerWidth >= 768) {
                this.parentElement.style.transform = `translateX(${-(maxWidthTablet+3)}px)`   
                return
            }
            if(memberTouchPos + (-(touchStartPos - touchMovePos)) < -maxWidthPhone && window.innerWidth < 768) {
                this.parentElement.style.transform = `translateX(${-(maxWidthPhone+3)}px)`
                return
            }
            
            sliderPos = memberTouchPos + (-(touchStartPos - touchMovePos))        
            
            this.parentElement.style.transform = `translateX(${sliderPos}px)`
            

        }


        const allNavTabs = Array.from(document.querySelectorAll('.services_tab_name'))

        function navTranslate(e){
            touchStartPos = e.touches[0].clientX

            memberTouchPos = sliderPos
        }
    }
    swipeGalery()
}

servicesPanel()


function mapsSection(){

    function select(){
        const selectedItem = document.querySelector(".selected_item")
        const selectItems = document.querySelectorAll(".select_item")
        const selectHead = document.querySelector(".select_head")
        const selectBody = document.querySelector(".select_body")
        const arrowIcon = document.querySelector(".fa-chevron-down")

        const adresses = document.querySelectorAll(".adress")
        const phoneNumbers = document.querySelectorAll('.phone_number_item')

        selectHead.addEventListener('click', showSelect)


        function showSelect(){
            selectBody.classList.add("select_body_active")

            selectHead.removeEventListener('click', showSelect)
            selectHead.addEventListener('click', closeSelect)

            selectItems.forEach(item => item.addEventListener('click', changeSelect))

            arrowIcon.classList.add("location_svg_rotate")

            selectItems.forEach(item => {
                if(item.innerText === selectedItem.innerText) item.classList.add('display_none')
            })
        }

        function closeSelect(){
            selectBody.classList.remove("select_body_active")

            selectHead.removeEventListener('click', closeSelect)
            selectHead.addEventListener('click', showSelect)

            selectItems.forEach(item => item.removeEventListener('click', changeSelect))

            arrowIcon.classList.remove("location_svg_rotate")

            selectItems.forEach(item => item.classList.remove('display_none'))
        }

        function changeSelect(){
            selectedItem.innerText = this.innerText

            selectHead.removeEventListener('click', closeSelect)
            selectHead.addEventListener('click', showSelect)

            selectBody.classList.remove("select_body_active")

            arrowIcon.classList.remove("location_svg_rotate")

            selectItems.forEach(item => item.classList.remove('display_none'))

            changeMapBlock()
        }

        function changeMapBlock(){
            const maps = document.querySelectorAll('.map')

            if(selectedItem.innerText.toUpperCase() === "WARSZAWA"){
                adresses.forEach(item => {
                    item.classList.add('display_none')
                    if(item.getAttribute('data-sity-adress') === 'WARSZAWA') item.classList.remove('display_none')
                })
                phoneNumbers.forEach(item => {
                    item.classList.add('display_none')
                    if(item.getAttribute('data-sity-phone') === 'WARSZAWA') item.classList.remove('display_none')
                })
                maps.forEach(item => item.classList.remove('display_block'))
                maps[0].classList.add('display_block')
            }
            if(selectedItem.innerText.toUpperCase() === "KRAKÓW"){
                adresses.forEach(item => {
                    item.classList.add('display_none')
                    if(item.getAttribute('data-sity-adress') === 'KRAKÓW') item.classList.remove('display_none')
                })
                phoneNumbers.forEach(item => {
                    item.classList.add('display_none')
                    if(item.getAttribute('data-sity-phone') === 'KRAKÓW') item.classList.remove('display_none')
                })
                maps.forEach(item => item.classList.remove('display_block'))
                maps[2].classList.add('display_block')
            }
        }
        changeMapBlock()

    }

    select()


    function mapChange(){
        const maps = document.querySelectorAll('.map')
        const adresses = document.querySelectorAll(".adress")

        adresses.forEach(item => item.addEventListener('click', changeMap))

        function changeMap(){
            maps.forEach(item => item.classList.remove('display_block'))

            if(this.getAttribute('data-selected-adress') === "przyokopowa") maps[0].classList.add('display_block')
            if(this.getAttribute('data-selected-adress') === "grzybowska") maps[1].classList.add('display_block')
            if(this.getAttribute('data-selected-adress') === "lwowska") maps[2].classList.add('display_block')
        }
    }

    mapChange()
    

}

mapsSection()










/*


let currentFullDate = new Date()
let currentYear = currentFullDate.getFullYear()
let currentMonth = currentFullDate.getMonth()
let currentDate = currentFullDate.getDate()


//console.log(currentFullDate)
//console.log(currentYear)
//console.log(currentMonth)
//console.log(currentDate)


function singIn(){
    const singUpWindow = document.querySelector('.singup_window')
    const closeModalButton = document.querySelector('#closeSingUp')
    const nextButton = document.querySelector('.window_footer .button1')
    const backButton = document.querySelector('.window_footer .button2')
    const allWindowContainers = document.querySelectorAll('.window_container')
    let currentItems = document.querySelectorAll('.window_item')
    let currentWindowContainer = document.querySelectorAll('.window_container')[0]

    const barContainer = document.querySelectorAll('.window_container')[0]
    const сategoryContainer = document.querySelectorAll('.window_container')[1]
    const subсategoryContainer = document.querySelectorAll('.window_container')[2]
    const serviceContainer = document.querySelectorAll('.window_container')[3]
    const dateContainer = document.querySelectorAll('.window_container')[4]
    const formContainer = document.querySelectorAll('.window_container')[5]
    const packageContainer = document.querySelectorAll('.window_container')[6]
    const phoneContainer = document.querySelectorAll('.window_container')[7]
    const stylistsContainer = document.querySelectorAll('.window_container')[8]
    const stylistContainer = document.querySelectorAll('.window_container')[9]

    let selectedBar = null
    let toOnePerson = false
    let selectedCategory = null
    let selectedSubCategory = null 
    let selectedServises = new Array
    let selectedDate = null 
    let form = null
    let selectedStylist = null


    document.querySelector('#singInButton').addEventListener('click', showModale)

    function showModale(){
        singUpWindow.hidden = false;
        setTimeout(() => singUpWindow.classList.add('singup_window_animation'), 3)
        closeModalButton.addEventListener('click', closeModal)

        nextButton.addEventListener('click', nextStep)
        backButton.addEventListener('click', backStep)

        Array.from(barContainer.lastElementChild.children).forEach(item => item.addEventListener('click', barSelect))

        showContentContainer()
    }

    function closeModal(){
        singUpWindow.classList.remove('singup_window_animation')
        setTimeout(()=> singUpWindow.hidden = true, 300) 

        closeModalButton.removeEventListener('click', closeModal)
    }




    function showContentContainer(){
        allWindowContainers.forEach(item => item.classList.add('display_none'))
        currentWindowContainer.classList.remove('display_none')

        nextButton.classList.add('button1_disabled')

        backButton.classList.remove('display_none')
        if(currentWindowContainer == barContainer) backButton.classList.add('display_none')
    }

    function showSubContainer(selected){

    }


    function nextStep(){

        switch (currentWindowContainer.getAttribute('data-stage-name')){

            case "barContainer":
                if(toOnePerson === false && selectedBar === null)   return

                Array.from(currentWindowContainer.lastElementChild.children).forEach(item => item.removeEventListener('click', barSelect))
                
                if(toOnePerson === true){
                    currentWindowContainer = stylistsContainer
                    showContentContainer()
                    Array.from(currentWindowContainer.lastElementChild.children).forEach(item => item.addEventListener('click', stylistSelect))
                }
                else if(toOnePerson === false){
                    currentWindowContainer = сategoryContainer
                    showContentContainer()
                    Array.from(currentWindowContainer.lastElementChild.children).forEach(item => item.addEventListener('click', сategorySelect))
                }
            break;
        
            case "сategoryContainer":
                Array.from(сategoryContainer.lastElementChild.children).forEach(item => item.removeEventListener('click', сategorySelect))              
            break;

            case "subсategoryContainer":
                currentWindowContainer = document.querySelectorAll('.window_container')[2]
                Array.from(currentWinCont.lastElementChild.children).forEach(item => item.addEventListener('click', subсategorySelect)) 
            break; 

            case "serviceContainer":
                currentWindowContainer = document.querySelectorAll('.window_container')[3]
                Array.from(currentWinCont.lastElementChild.children).forEach(item => item.addEventListener('click', serviceSelect))
            break;

            case "dateContainer":
                currentWindowContainer = document.querySelectorAll('.window_container')[4]
                Array.from(currentWinCont.lastElementChild.children).forEach(item => item.addEventListener('click', dateSelect))
            break;

            case "formContainer":
                currentWindowContainer = document.querySelectorAll('.window_container')[5]
                Array.from(currentWinCont.lastElementChild.children).forEach(item => item.addEventListener('click', formSelect))
            break;

            case "packageContainer":
                currentWindowContainer = document.querySelectorAll('.window_container')[6]
                Array.from(currentWinCont.lastElementChild.children).forEach(item => item.addEventListener('click', packageSelect))
            break; 

            case "phoneContainer":
                currentWindowContainer = document.querySelectorAll('.window_container')[7]
                Array.from(currentWinCont.lastElementChild.children).forEach(item => item.addEventListener('click', phoneSelect))
            break; 
            
            case "stylistContainer":
                currentWindowContainer = document.querySelectorAll('.window_container')[8]
                Array.from(currentWinCont.lastElementChild.children).forEach(item => item.addEventListener('click', stylistSelect))
            break; 
        }
        
        showContentContainer()
    }

    function backStep(){

    }


    function barSelect(){
        if(this.lastElementChild.classList[2] === 'display_block'){
            this.lastElementChild.classList.remove('display_block')
            toOnePerson = false
            selectedBar = null
            nextButton.classList.add('button1_disabled')
            return
        }
        if(this.getAttribute('data-item-name') === 'ToOnePerson'){
            toOnePerson = true;
            selectedBar = null;
        }
        else if(this.getAttribute('data-item-name') !== 'ToOnePerson'){
            toOnePerson = false;
            selectedBar = this.getAttribute('data-item-name');
        }

        nextButton.classList.remove('button1_disabled')

        document.querySelectorAll('.window_item').forEach(item => item.lastElementChild.classList.remove('display_block'))
        this.lastElementChild.classList.add('display_block')
    }

    function stylistSelect(){
        if(this.lastElementChild.classList[2] === 'display_block'){
            this.lastElementChild.classList.remove('display_block')
            selectedStylist = null
            nextButton.classList.add('button1_disabled')
            return
        }
        
        selectedStylist = this.getAttribute('data-item-name');

        nextButton.classList.remove('button1_disabled')

        document.querySelectorAll('.window_item').forEach(item => item.lastElementChild.classList.remove('display_block'))
        this.lastElementChild.classList.add('display_block')
    }

    function сategorySelect(){
        if(this.lastElementChild.classList[2] === 'display_block'){
            this.lastElementChild.classList.remove('display_block')
            selectedCategory = null
            nextButton.classList.add('button1_disabled')
            return
        }
        
        selectedCategory = this.getAttribute('data-item-name');

        nextButton.classList.remove('button1_disabled')

        document.querySelectorAll('.window_item').forEach(item => item.lastElementChild.classList.remove('display_block'))
        this.lastElementChild.classList.add('display_block')
    }












}
singIn()



*/