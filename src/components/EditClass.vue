<template>
    <v-row justify="end">

            
        <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
            <template v-slot:activator="{ on, attrs }">
                <v-btn @click="getClassDetails(),getClassHall(),getTeachers()" class="teal mr-5" small block dark depressed  v-bind="attrs" v-on="on">Edit<v-icon dark right>mdi-pencil</v-icon></v-btn>
            </template>
            <v-card max-width="700" flat>
                <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Edit Class</v-card-title>
                
                <v-divider></v-divider>
                <v-card-text >
                    <v-card-text>You can change details.</v-card-text>
                    <v-card flat max-width="750px" style="margin: auto">
                        
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card class="mb-12" flat min-height="250px">
                                <v-row dense>
                                    <v-col cols="12" md="6" sm="6">
                                        <v-autocomplete :items="teachers" v-model="teacher" :filter="teacherFilter" item-text="firstName" item-value="teacherID" label="Teacher" prepend-icon="mdi-account" :rules="teacherRules"></v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-select @change="createClassName()" :items="grade" :rules="gradeRules" label="Grade" prepend-icon="mdi-card-bulleted" v-model="getGrade"></v-select>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-select :items="feeType"  label="Fee Type" prepend-icon="mdi-form-select" v-model="getFeeType" :rules="feeTypeRules" Required></v-select>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field v-model="fee" label="Fee" prepend-icon="mdi-cash-multiple" :rules="feeRules" Required prefix="RS." placeholder="0.00" clearable></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-select @change="createClassName()" :items="day" label="Day" prepend-icon="mdi-calendar" v-model="getDay" :rules="dayRules" Required ></v-select>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-select :items="location"  label="Location" prepend-icon="mdi-map-marker" v-model="getLocation" :rules="locationRules" Required :disabled="!getDay"></v-select>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <div>
                                            <v-menu ref="startTimeMenu" v-model="startTimeMenu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="startTime" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field @change="createClassName()" v-model="startTime" label="Start Time" prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on" :rules="timeRules" Required :disabled="!getDay"></v-text-field>
                                                </template>
                                                <v-time-picker v-if="startTimeMenu" v-model="startTime" full-width @click:minute="$refs.startTimeMenu.save(startTime)" ></v-time-picker>
                                            </v-menu>
                                        </div>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <div>
                                            <v-menu ref="endTimeMenu" v-model="endTimeMenu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="endTime" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="endTime" label="End Time" prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on" :rules="timeRules" Required :disabled="!startTime"></v-text-field>
                                                </template>
                                                <v-time-picker v-if="endTimeMenu" v-model="endTime" full-width @click:minute="$refs.endTimeMenu.save(endTime)"></v-time-picker>
                                            </v-menu>
                                        </div>
                                    </v-col>

                                    <v-col cols="12" md="12" sm="12">
                                        <v-text-field v-model="className" label="Class Name" prepend-icon="mdi-home-variant" :rules="nameRules" required ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="12" sm="12">
                                        <v-divider></v-divider>
                                        <v-switch color="red" @change="classStatus()"  inset v-model="status" label="Mark as a Deactivated Class"></v-switch>
                                    </v-col>

                                </v-row>
                                
                            </v-card>
                        </v-form>
                    </v-card>   
                
                </v-card-text>
                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn   @click="dialog = false" outlined color="grey">Cancel</v-btn>
                    <v-btn :loading="loading"  color="primary" @click="updateClass()" depressed>Save
                        <v-icon left>mdi-content-save</v-icon>
                    </v-btn>
                </v-card-actions>
                
            </v-card>
        
        </v-dialog>


    </v-row>
</template>



<script>
    

    export default {
        props:['classDetails'],
        data () {
            return {
                dialog:false,
                loading:false,
                valid:true,

                getLocation:'',
                getDay:'',
                getFeeType:'Daily',
                className:'',
                fee:'0.00',
                getGrade:'',


                startTimeMenu: false,
                startTimeModel: false,
                startTime: null,

                endTimeMenu: false,
                endTimeModel: false,
                endTime: null,

                teacher:null,
                status:null,
                showStatus:'',
                subject:[{
                    subjectID:null, subjectName:null, medium:null
                }],

                category:[{
                    categoryID:null, categoryName:null
                }],
                


                // -----------Validation rules-----------
                nameRules: [v=> !!v || 'Class name is required', v=> (v && v.length >3)|| 'Name must be greater than 3'],
                
                feeTypeRules: [v=> !!v || 'Fee type is required'],

                locationRules: [v=> !!v || 'Location is required'],

                dayRules: [v=> !!v || 'Day is required'],

                timeRules: [v=> !!v || 'Time is required'],

                feeRules: [v=> !!v || 'Fee is required', v => /^\d{0,8}(\.\d{1,4})?$/.test(v) ||'Invalid fee', v=> v != 0.00 ],

                teacherRules: [v=> !!v || 'Teacher is required'],

                subjectRules: [v=> !!v || 'Subject is required'],

                gradeRules: [v=> !!v || 'Grade is required'],



                // -----------dropdown list-----------
                location:[],
                
                subjects: [],

                categories:[],

                teachers:[],

                day:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],

                feeType:['Monthly','Daily'],

                grade:['1','2','3','4','5','6','7','8','9','10','11','12','13','Other'],
                



                

                multiLine: true,

                
                unsuccessfulCreateClass:false,
            }
        },


        methods: {

            classStatus(){
                if(this.status == false){
                    this.showStatus = "Active"
                }else if(this.status == true){
                    this.showStatus = "Deactivate"
                }
            },

            getClassDetails(){
                this.axios.get(this.$apiUrl+"/api/v1.0/ClassManagement/classes/"+this.classDetails.classID)
                .then(Response=>{
                    this.teacher=Response.data.class.data[0].teacher.teacherID;
                    this.getLocation=Response.data.class.data[0].room;
                    this.getDay=Response.data.class.data[0].day;
                    this.getFeeType=Response.data.class.data[0].feeType;
                    this.className=Response.data.class.data[0].className;
                    this.category=Response.data.class.data[0].category;
                    this.subject=Response.data.class.data[0].subject;
                    this.getGrade=Response.data.class.data[0].grade;
                        
                    this.startTime=this.changeTimeFormat(Response.data.class.data[0].startTime);
                    this.endTime=this.changeTimeFormat(Response.data.class.data[0].endTime);

                    if(Response.data.class.data[0].status=="Active"){
                        this.status=false;
                        this.showStatus="Active"
                    }else{
                        this.status=true;
                        this.showStatus="Deactivate"
                    }
                    
                    const str=Response.data.class.data[0].classFee;
                    this.fee=str.split('.')[0]
                })
            },

            createClassName(){
                this.className = this.subject.subjectName+"/Grd"+this.getGrade+"/"+this.getDay+"/"+this.startTime;
            },

            getClassHall(){
                const LogedUser = JSON.parse(localStorage.getItem('user'));
                this.axios.get(this.$apiUrl+"/api/v1.0/BranchManagement/branches/"+LogedUser.employee.branch.branchID)
                .then(Response=>{
                    var halls=Response.data.branch.data[0].noOfRooms;

                    for(var i=1; i<=halls; i++){
                        this.location.push("Room No. "+i);
                    }
                    this.location.push("Online");
                })
            },

            getTeachers(){
                this.axios.get(this.$apiUrl+"/api/v1.0/TeacherManagement/teachers",{
                params:{
                    status: "Active"
                }
                
                }).then(Response=>(
                    this.teachers=Response.data.teacher.data,
                    
                    this.teachers.forEach(element => {
                        element.firstName=element.title+" "+element.firstName+" "+element.lastName
                    })
                    
                ))
            },

            Reset() {
                this.$refs.form.reset()
            },

            scrollToTop() {
                window.scrollTo(0, 0);
            },

            teacherFilter (item, queryText) {
                const textOne = item.firstName.toLowerCase()
                const textTwo = item.teacherID.toLowerCase()
                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
            },


            changeTimeFormat(time){
                const str = time;

                var newHour;
                var newMin;

                const arr1 = str.split(' ');
                const period = arr1[1];

                const arr2 = arr1[0].split(':');
                const hour = arr2[0];
                newMin = arr2[1];

                if(period == 'PM'){
                    if(hour == '01'){
                        newHour = '13';
                    }else if(hour == '02'){
                        newHour = '14';
                    }else if(hour == '03'){
                        newHour = '15';
                    }else if(hour == '04'){
                        newHour = '16';
                    }else if(hour == '05'){
                        newHour = '17';
                    }else if(hour == '06'){
                        newHour = '18';
                    }else if(hour == '07'){
                        newHour = '19';
                    }else if(hour == '08'){
                        newHour = '20';
                    }else if(hour == '09'){
                        newHour = '21';
                    }else if(hour == '10'){
                        newHour = '22';
                    }else if(hour == '11'){
                        newHour = '23';
                    }else if(hour == '12'){
                        newHour = '00';
                    }
                }else{
                    newHour=arr2[0];
                }
                return newHour+":"+newMin;
            },


            updateClass(){
                if(this.$refs.form.validate()){
                    const LogedUser = JSON.parse(localStorage.getItem('user'));
                    this.loading=true
                    this.axios.patch(this.$apiUrl+"/api/v1.0/ClassManagement/classes/"+this.classDetails.classID,{
                        className: this.className,
                        day: this.getDay,
                        startTime: this.startTime,
                        endTime : this.endTime,
                        grade : this.getGrade,
                        room: this.getLocation,
                        classFee: this.fee +".00",
                        feeType: this.getFeeType,
                        status: this.showStatus,
                        subjectID: this.subject.subjectID,
                        categoryID: this.category.categoryID,
                        teacherID: this.teacher,
                        branchID: LogedUser.employee.branch.branchID
                        
                        
                    })
                    .then(Response=>{
                        
                        if(Response.data.success == true){
                            if(this.showStatus == "Active"){
                                this.changeStudentEnrollmentStatus('1')
                            }else if(this.showStatus == "Deactivate"){
                                this.changeStudentEnrollmentStatus('0')
                            }
                            this.loading=false
                            this.dialog = false
                            this.Reset()
                            this.successAlert()
                        }else{
                            this.failedAlert()
                        }
                    })
                    .catch(error => {
                        this.failedAlert()
                        console.log(error.data)
                        this.loading=false
                    });
                    
                }
            },

            successAlert(){
                this.$emit('success',true)
            },

            failedAlert(){
                this.$emit('failed',true)
            },


            changeStudentEnrollmentStatus(status){
            this.axios.patch(this.$apiUrl+'/api/v1.0/EnrollmentManagement/classes/'+this.classDetails.classID+'/students',{
                status:status,
            })
            .then(Response=>{
                if(Response.data.success == true){
                    console.log(status)
                }else{
                    console.log(status)
                }
            }).catch(error => {
                console.log(error.data)
                console.log("fail")
            });
        }



        }
    }
</script>
            



