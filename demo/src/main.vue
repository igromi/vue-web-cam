<template>

    <div class="container p-3 my-3 border">
        <table>         
           <tr>
               <th>
                   <th> 
                       <div class="container">
                        <h1 class="text-success">{{colorCam2}}</h1>                     
                       </div>
                        <div class="container">
                        <h1 class="text-danger">{{calibreCam2}}</h1>                     
                       </div>
                        
                   </th>
                    <th>

                     <div class="container ">   
                     <vue-web-cam
                        ref="webcam"
                        :device-id="deviceId"
                        width="100%"
                        @started="onStarted"
                        @stopped="onStopped"
                        @error="onError"
                        @cameras="onCameras"
                        @camera-change="onCameraChange"
                    />
                 
                    </div>
                    </th>

               <th>
                   <div class="container">
                    <h1 class="text-success">{{colorCam1}}</h1>
                   </div>
                    <div class="container">
                        <h1 class="text-danger">{{calibreCam1}}</h1>                     
                    </div>
            
              </th>
           </tr>
                  
        </table>

        </div>

</template>

<script>
import { WebCam } from "../../src";
import axios from 'axios';

export default {
    name: "App",
    components: {
        "vue-web-cam": WebCam
    },
    data() {
        return {
            img: null,
            camera: null,
            deviceId: null,
            devices: [],
            colorCam1: "",
            colorCam2: "",
            calibreCam1 : "",
            calibreCam2 : "",
            urlAPI:"http://localhost/data.json",
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
    watch: {
        camera: function(id) {
            this.deviceId = id;
        },
        devices: function() {
            // Once we have a list select the first one
            const [first, ...tail] = this.devices;
            if (first) {
                this.camera = first.deviceId;
                this.deviceId = first.deviceId;
            }
        }
    },
    methods: {
        onCapture() {
            this.img = this.$refs.webcam.capture();           
        },
        onStarted(stream) {
            console.log("On Started Event", stream);
        },
        onStopped(stream) {
            console.log("On Stopped Event", stream);
        },
        onStop() {
            this.$refs.webcam.stop();
        },
        onStart() {
            this.$refs.webcam.start();
        },
        onError(error) {
            console.log("On Error Event", error);
        },
        onCameras(cameras) {
            this.devices = cameras;
            console.log("On Cameras Event", cameras);
        },
        onCameraChange(deviceId) {
            this.deviceId = deviceId;
            this.camera = deviceId;
            console.log("On Camera Change Event", deviceId);
        },
        loadData() {
            axios
            .get(this.urlAPI)
            .then(response => (this.info = response));
           
           this.colorCam1=this.info.data.color.CAM1
           this.colorCam2=this.info.data.color.CAM2
           this.calibreCam1=this.info.data.calibre.CAM1
           this.calibreCam2=this.info.data.calibre.CAM2
    },
    }
};
</script>
