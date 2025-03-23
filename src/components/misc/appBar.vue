<template>
  <v-app-bar app height="60" elevation="2">
    <v-img
      class="ml-2"
      max-height="55"
      max-width="150"
      :src="require(`@/assets/main-logo.svg`)"
      alt="Sample"
    />

    <v-spacer></v-spacer>

    <div v-if="locationWeather.city" class="d-flex align-center mr-4">
      <v-chip class="mr-2" color="primary" outlined>
        <v-icon start>mdi-map-marker</v-icon>
        {{ locationWeather.city }}
      </v-chip>
      <v-chip outlined color="primary">
        <v-icon start>mdi-weather-cloudy</v-icon>
        {{ weatherCondition }} - {{ locationWeather.temperature }}°C
      </v-chip>
    </div>

    <appBarMenu />
  </v-app-bar>
</template>

<script>
import appBarMenu from "./appBarMenu.vue";

export default {
  name: "AppBar",
  components: { appBarMenu },
  data() {
    return {
      locationWeather: {
        city: "",
        temperature: "",
        weatherCondition: "",
      },
    };
  },
  methods: {
    async fetchLocationAndWeather() {
      try {
        const locationRes = await fetch("https://ipapi.co/json/");
        const locationData = await locationRes.json();

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${locationData.latitude}&longitude=${locationData.longitude}&current_weather=true`
        );
        const weatherData = await weatherRes.json();

        if (weatherData) {
          this.locationWeather = {
            city: locationData.city,
            temperature: weatherData.current_weather.temperature,
            weatherCondition: this.getWeatherCondition(
              weatherData.current_weather.weathercode
            ),
          };
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
    getWeatherCondition(code) {
      const conditions = {
        0: "Sunny",
        1: "Cloudy",
        2: "Clear",
        3: "Partly Cloudy",
      };
      return conditions[code] || "Unknown";
    },
  },
  created() {
    this.fetchLocationAndWeather();
  },
};
</script>
