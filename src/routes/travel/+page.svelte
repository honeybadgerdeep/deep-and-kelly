<script lang="ts">
    import { onMount } from 'svelte';
    
  
    // If you need to handle map initialization
    onMount(() => {
        let mapContainer = document.getElementById('map-container');
        let map = document.getElementById('map');

        if (mapContainer && map) {
            map.style.height = '100%';
            map.style.width = '100%';
            
            map.setAttribute('height', '100%');
            map.setAttribute('width', '100%');
        }
    });
  </script>

  <div class="content-box">
    <h3 style="margin-top: 50px; text-align: center;">Our 2-day wedding is taking place in the following locations:</h3>
    <div id="map">
      <div>
        <iframe
            title="map"
            style="border:0"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDwPnW57XGiaPkq_cUpODWDP0yj7EffgI0
            &q=Stonebrae+Country+Club,Hayward+CA">
        </iframe>
        <p>Saturday, February 1: Stonebrae Country Club</p>
      </div>
      <div>
        <iframe
        title="map"
        style="border:0"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDwPnW57XGiaPkq_cUpODWDP0yj7EffgI0
        &q=Oasis+Palace,Newark+CA">
        </iframe>
        <p>Sunday, February 2: Oasis Palace</p>
      </div>
    </div>
    
    <div class="section">
      <h2>Hotels</h2>
      <ul>
        <li><a target="_blank" href="https://www.hilton.com/en/hotels/sjcfcgi-hilton-garden-inn-fremont-milpitas/">Hilton Garden Inn</a> | 15 min from Oasis | 35 min from Stonebrae</li>
        <li><a target="_blank" href="https://www.marriott.com/en-us/hotels/sjcsf-springhill-suites-san-jose-fremont/">SpringHill Suites by Marriot</a> | 15 min from Oasis | 40 from Stonebrae</li>
        <li><a target="_blank" href="https://www.marriott.com/en-us/hotels/sjcnw-residence-inn-newark-silicon-valley/">Residence Inn by Marriot</a> | 10 min from Oasis | 30 min from Stonebrae</li>
        <li><a target="_blank" href="https://www.marriott.com/en-us/hotels/sjcal-aloft-silicon-valley/">Aloft Silicon Valley</a> | 5 min from Oasis | 30 min from Stonebrae</li>
        <li><a target="_blank" href="https://www.hilton.com/en/hotels/nwkbddt-doubletree-newark-fremont/">DoubleTree by Hilton</a> | 12 min from Oasis | 30 min from Stonebrae</li>
        <li><a target="_blank" href="https://www.hilton.com/en/hotels/oakhyht-home2-suites-hayward/">Home2 Suites by Hilton</a> | 20 min from Oasis | 25 min from Stonebrae</li>
        <li><a target="_blank" href="https://www.wyndhamhotels.com/laquinta/fremont-california/la-quinta-fremont-silicon-valley/">La Quinta by Wyndham</a> | 15 min from Oasis | 30 min from Stonebrae</li>
      </ul>
    </div>

    <div class="section">
      <h2>AirBNBs</h2>
      <ul>
        <li><a target="_blank" href="https://www.airbnb.com/s/Fremont--CA--United-States/homes">Fremont</a></li>
        <li><a target="_blank" href="https://www.airbnb.com/s/Newark--CA--United-States/homes">Newark</a></li>
        <li><a target="_blank" href="https://www.airbnb.com/s/Hayward--CA--United-States/homes">Hayward</a></li>
        <li><a target="_blank" href="https://www.airbnb.com/s/Union-City--CA--United-States/homes">Union City</a></li>
      </ul>
    </div>
    
  </div>
  
  <style>
    a,
    a:visited {
      color: black;
    }

    h3 {
      font-weight: 400;
    }

    .section h2 {
      font-weight: 400;
      font-size: 1.2em;
      margin-bottom: 1em;
    }
  
    .section li {
      margin-bottom: 0.5em;
    }
  
    #map {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 50px;
    }

    #map div {
        width: 400px;
        text-align: center;
        font-weight: 300;
        font-size: 1.2em;
    }
  
    #map div iframe {
      width: 100%;
      height: 300px;
    }

    @media (min-width: 768px) {

      .section {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
  
      .section {
        flex-direction: row;
      }
  
      .section h2 {
        flex-basis: 20%;
      }
  
      .section ul {
        flex-basis: 80%;
        list-style-type: none;
        text-align: left;
        font-weight: 400;
      }
    }

    @media screen and (max-width: 768px) {
      .section ul {
        font-size: 0.8em;
      }

      #map {
        flex-wrap: wrap;
      }
    }
  </style>