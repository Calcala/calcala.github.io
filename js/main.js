// jQuery Variables
var
    $panelContent   = $(".ca-contentGeneral") ,
    $pnlButton      = $(".panelButton"),
    $body           = $('body'),
    $bodyhtml       = $('html,body'),
    $window         = $(window),
    $sectionNav     = $('.sectionNav'),
    $menuItems      = $('.sectionNav ul a'),
    $menuList       = $('.sectionNav ul'),
    $menuButton     = $('#iconMenu')



//Global variables
var
    menuScrollTop   = Number.MAX_VALUE, // Initialize as MAX value in order to not show the menu when the panel is opening

    currentScrollTop,
    isListVisible  = false,
    sectionToNavigate,

    //Next four variables will store the offset top for each section on the web
    offsetAboutMe,
    offsetCareer,
    offsetSkills,
    OffsetWork


$window.scroll( manageMainMenu )
$menuItems.on("click",navigateToSection)
$menuButton.on("click",showHideList)

$pnlButton.on("click", function(){
    $panelContent.stop().slideToggle(400, function(){

        iniatilizeOffset ()

        $pnlButton.toggleClass("rotated")
        $bodyhtml.animate({scrollTop: $("#aboutMe").offset().top}, 1000,
                            function(){
                                $sectionNav.stop().fadeIn(600)

                                if($bodyhtml.scrollTop() == 0){
                                    menuScrollTop = Number.MAX_VALUE
                                    showHideMenu()
                                }else{
                                    menuScrollTop = $bodyhtml.scrollTop()
                                }
                            })

    })

})


function manageMainMenu () {
    currentScrollTop = $window.scrollTop()
    showHideMenu ()
    highlightCurrentMenuSection ()
}


function showHideMenu (){
    if(currentScrollTop < menuScrollTop || currentScrollTop == 0){
        $sectionNav.stop().fadeOut(400)
    }else{
        $sectionNav.stop().fadeIn(600)
    }
}

function showHideList (){
   $menuList.toggleClass( "visible" )
   iniatilizeOffset ()
}

function navigateToSection (event) {
    event.preventDefault()
    sectionToNavigate = $(this).attr("href")
    $bodyhtml.stop().animate({scrollTop: $(sectionToNavigate).offset().top}, 800)
    $menuList.toggleClass( "visible" )
    
}

function highlightCurrentMenuSection (){
   $menuItems.removeClass("itemSelected")
   if (currentScrollTop >= offsetAboutMe && currentScrollTop < offsetCareer){
       $menuItems.eq(0).addClass("itemSelected")

   }else if (currentScrollTop >= offsetCareer && currentScrollTop < offsetSkills){
       $menuItems.eq(1).addClass("itemSelected")

   }else if (currentScrollTop >= offsetSkills){
       $menuItems.eq(2).addClass("itemSelected")

   //}else if (currentScrollTop >= OffsetWork){
   //    $menuItems.eq(3).addClass("itemSelected")
   }
}

// This function set the values for each section's offset
function iniatilizeOffset (){
    offsetAboutMe   = $("#aboutMe").offset().top
    offsetCareer    = $("#career").offset().top
    offsetSkills    = $("#skills").offset().top
    //OffsetWork      = $("#work").offset().top
}

