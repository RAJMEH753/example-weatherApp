let weather = {
    apikey: "6e965de3d3117e309b1c1ebf9989cf53",

    fetchweather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apikey + "&units=metric")
        .then((response) => {
            if(!response.ok){
                alert("No weather found");
            }
            return response.json();
        })
        .then((data) => this.displayweather(data));
    },

    displayweather: function(data){
        console.log(data);
        const {name} = data;
        const {temp, humidity} = data.main;
        const {icon, description} = data.weather[0];
        const {speed} = data.wind;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temp").innerText = temp + " °C";
        document.querySelector(".weather_icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " Km/h";

        //---------------------------------------------------------------------------------

        var apiUrl = "https://pixabay.com/api/?key=45450559-21280a32042e78d1eabd94a26&q="+name+"&image_type=photo";

        fetch(apiUrl)
        .then(response => {
            if(!response.ok){
                alert("No response");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);

            const imageUrl = data.hits[0].largeImageURL;
            document.body.style.backgroundImage = "url("+imageUrl+")";
        });
    },

    search: function(){
        this.fetchweather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchweather("goa");