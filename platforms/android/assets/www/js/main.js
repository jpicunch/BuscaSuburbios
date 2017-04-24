// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

document.addEventListener('deviceready', function(){
    $('#name').html('<b>' + localStorage.getItem('nombre') + '</b>');
    $('#mail').html('<b>' + localStorage.getItem('mail') + '</b>');
    $('#geo').bind('click', geo);
    $('#cam').bind('click', cam);
}, false);

function geo(){
    myApp.showPreloader('Localizando...');
    navigator.geolocation.getCurrentPosition(
        function(position){
            $('#lat').html(position.coords.latitude);
            $('#lon').html(position.coords.longitude);
            var map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: position.coords.latitude, lng: position.coords.longitude},
                zoom: 16
            });
            var marker = new google.maps.Marker({
                position: {lat: position.coords.latitude, lng: position.coords.longitude},
                map: map,
                title: 'Mi posición'
            });
            
            myApp.hidePreloader();
            myApp.popup('.popup-geo');
        },
        function(error){
            myApp.alert('Se ha producido un error','Busca Suburbios');
            myApp.hidePreloader();
        },
        {
            maximumAge: 3000, 
            timeout: 5000,
            enableHighAccuracy: true 
        }
    );
}
function cam(){
    navigator.camera.getPicture(
        function(photo){
            myApp.prompt('Cual es el nombre de la Foto?','Busca Suburbios', function (value) {
                var html_elemento = "";
                html_elemento += '<li>';
                html_elemento += '<a href="#" class="item-link item-content">';
                html_elemento += '<div class="item-media"><img src="'+photo+'" width="44"></div>';
                html_elemento += '<div class="item-inner">';
                html_elemento += '<div class="item-title-row">';
                html_elemento += '<div class="item-title">'+value+'</div>';
                html_elemento += '</div>';
                html_elemento += '<div class="item-subtitle">Beatles</div>';
                html_elemento += '</div>';
                html_elemento += '</a>';
                html_elemento += '</li>';
                $("#my_lista").append(html_elemento);
            });
            
        }, 
        function(error){
            console.log("error");
        }, 
        {
            quality:100,
            correctOrientation: true,
            saveToPhotoAlbum: true,
            cameraDirection: 0
        }
    );
}