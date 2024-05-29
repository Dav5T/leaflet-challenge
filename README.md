
# Leaflet Challenge
The United States Geological Survey (USGS) monitors and reports on earthquakes. They collect data and asses the impacts, hazards, and the cause and effects of earthquakes. By using the data collected from USGS and the use of Leaflet library, I was able to created a tool that allows users to visualize where earthquakes have taken place in the past 7 days, along with additional information.

## Description

### Files and folders
There are 2 relevant folders which contains files and subfolders:
<br>**1. data:**
<br>&ensp;• PB2002_boundaries.json (this file is required in order to rund the program)
<br>**2. static:**
<br>&ensp;• css --> style.css
<br>&ensp;• js --> logic.js (this is where you will be able to find the lines of code)

### Getting started
To access the tool you can go to: https://dav5t.github.io/leaflet-challenge/
<br> Alternatively you can download everything and open index.html
<br>&ensp;*note: If you run in to CORS policy issues and have downloaded the files, you can one of the following options when using Visual Studio Code:*
<br>&ensp;1. Right click on index.html and click "Open with server"
<br>&ensp;2. Open the terminal, make sure it's rooted to the same folder as your logic.js, type: python -m http.server" and click on the server link 

### How to use the tool
The default setting when you open the tool is GrayScale map layer and earthquake overlay data. You can toggle between three map layers: GrayScale, Satellite, and Outdoor. For the overlay, you can choose one or both; Earthquake and Tectonic. You can also click on each circle marker and it will provide you the location, time, magnitude and depth of the earthquake. 

### Screenshot of the app
![image](https://github.com/Dav5T/leaflet-challenge/assets/130593953/177a81f6-4265-4ac9-ac2e-56ba04af8492)



## Source
### Data
**Earthquake:** https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
<br>**Tectonic lines:** https://github.com/fraxen/tectonicplates
<br>

### References
*1. Gradient Generator*
<br>https://colordesigner.io/gradient-generator
<br>
<br>*2. Interactive Choropleth Map*
<br>https://leafletjs.com/examples/choropleth/
<br>
<br>*3. JavaScript Question Mark (?) Operator Explained*
<br>https://builtin.com/software-engineering-perspectives/javascript-question-mark-operator
<br>
<br>*4. Maps for Leaflets*
<br>https://leaflet-extras.github.io/leaflet-providers/preview/
<br>
<br>*5. Using GeoJSON with Leaflet*
<br>https://leafletjs.com/examples/geojson/












