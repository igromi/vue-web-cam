<template>

    <div class="container p-3 my-3 border">
        
        <table>         
           <tr>
               <th>
                   <th> 
                       <div class="container">
                        <h1 class="text-success"></h1>                     
                       </div>
                        <div class="container">
                        <h1 class="text-danger"></h1>                     
                       </div>
                        
                   </th>
                    <th>
                     <div class="container">   
                        <h1> Sweet Celebration</h1> 
                     </div>
                     <div class="container ">   
                     <img  v-bind:src="urlIMG">
                 
                    </div>
                    </th>

               <th>
                   <div class="container">
                    <h1 style="color:black; font-size: 80px; ">{{color1Cam1}}%</h1>
                   </div>
                    <div class="container">
                        <h1 style="color:red; font-size: 80px;">{{color2Cam1}}%</h1>                     
                    </div>
            
              </th>
           </tr>
                  
        </table>

        </div>

</template>

<script>
import axios from 'axios';

export default {
    name: "App",
    data() {
        return {
            img: null,
            camera: null,
            deviceId: null,
            devices: [],
            color1Cam1: "",
            color2Cam1: "",
            urlAPI:"http://localhost/data.json",
            urlIMG:"./uvas.jpg",
            info:""
        };
    },

    created(){
       
        this.interval = setInterval(() =>  this.loadData(), 100);
       
    },
    computed: {
        device: function() {
            return this.devices.find(n => n.deviceId === this.deviceId);
        }
    },
    methods: {

        loadData() {
            axios
            .get(this.urlAPI)
            .then(response => (this.info = response));
           

           let negras = parseInt(this.info.data.CAM1.negra);
           let rosadas = parseInt(this.info.data.CAM1.rosada);

           this.color1Cam1= Math.trunc(negras/(negras+rosadas)*100);
           this.color2Cam1= Math.trunc(rosadas/(negras+rosadas)*100);

        },
    }
};
</script>
