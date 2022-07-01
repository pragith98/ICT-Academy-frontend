<template>
  <v-row >
    <v-dialog v-model="dialog" scrollable max-width="500px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn small @click="getStaffAdvance()" class="teal" dark depressed  v-bind="attrs" v-on="on">Edit<v-icon dark right>mdi-pencil</v-icon></v-btn>
        </template>

        <v-form ref="form" v-model="valid" lazy-validation>
            <v-card max-width="700" flat>
                <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Edit Pay Advance</v-card-title>
                
                <v-divider></v-divider>
                
                <v-card-text style="height: 800px;">

                    <v-col cols="12" md="12" sm="12">
                        <v-autocomplete :items="staffs" v-model="staff" :filter="staffFilter" item-text="firstName" item-value="staffID" label="Staff member"  :rules="staffRules"></v-autocomplete>
                    </v-col>
                    
                    <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="amount" :rules="amountRules" clearable  label="Amount" prefix="RS."></v-text-field>
                    </v-col>

                    <v-col cols="12" md="12" sm="12">
                        <v-textarea v-model="description" :rules="descriptionRules" rows="2"  label="Description"></v-textarea>
                    </v-col>

                    <v-col cols="12" md="12" sm="12">
                        <template>
                            <div >
                                <v-menu ref="menud" v-model="dateMenu" :close-on-content-click="true" transition="scale-transition" offset-y min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="date" label="Date" readonly v-bind="attrs" v-on="on" :rules="dateRules"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="date" :active-picker.sync="dateActivePicker" :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)" min="1950-01-01"></v-date-picker>
                                </v-menu>
                            </div>
                        </template>
                    </v-col>
                    
                

                </v-card-text>
                <v-divider></v-divider>




                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn   @click="dialog=false" outlined color="grey" >Cancel</v-btn>
                    <v-btn :disabled="!valid " color="primary" @click="updateAdvance()" depressed >Save
                        <v-icon left>mdi-content-save</v-icon>
                    </v-btn>
                </v-card-actions>

                
            </v-card>
        </v-form>
    </v-dialog>
  </v-row>
</template>



<script>
    
    export default {
        props:['advance'],
        
        data () {
            return {
                dialog:false,

                valid:true,
                staff:null,

                dateActivePicker: null,
                date: '',
                dateMenu: false,

                amount:'0',
                description:'',


                staffs: [],





                // -----------Validation rules-----------
                descriptionRules: [v=> !!v || 'Description is required', v=> (v && v.length >5)|| 'Description must be greater than 5'],
            
                amountRules: [v=> !!v || 'Amount is required', v => /^\d+$/.test(v) || 'Must be a number'],

                staffRules: [v=> !!v || 'Staff member is required'],

                dateRules: [v=> !!v || 'Join Date is required'],



            }
        },

        created(){
            this.getStaffs()
        },

        methods: {

            getStaffAdvance(){
                this.axios.get(this.$apiUrl+"/api/v1.0/AdvanceManagement/advances/"+this.advance.advanceID)
                .then(Response=>{
                    this.description=Response.data.advance.data[0].description;
                    this.date=Response.data.advance.data[0].date;
                    this.staff=Response.data.advance.data[0].staff;

                    const fullAmount=(Response.data.advance.data[0].advanceAmount).split('.');
                    this.amount=fullAmount[0]

                    
                    
                })
            },

            staffFilter (item, queryText) {
                const textOne = item.firstName.toLowerCase()
                const textTwo = item.staffID.toLowerCase()
                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1

            },

            updateAdvance(){
                if(this.$refs.form.validate()){
                    this.axios.patch(this.$apiUrl+'/api/v1.0/AdvanceManagement/advances/'+this.advance.advanceID,{
                        description:this.description,
                        advanceAmount:this.amount+".00",
                        date:this.date,
                        employeeID:this.staff.staffID,
                        handlerStaffID:"STAFF001",
                        branchID:"BRNCH001",
                    })
                    .then(Response=>{
                        if(Response.data.success == true){
                            this.successAlert(),
                            this.dialog=false
                            
                        }else{
                            this.failedAlert()
                        }
                    })
                    .catch(error => {
                        this.failedAlert(),
                        console.log(error.data)
                        
                    });
                }
                
            },

            Reset() {
                this.$refs.form.reset()
            },

            getStaffs(){
                this.axios.get(this.$apiUrl+"/api/v1.0/StaffManagement/staffs",{
                params:{
                    status: "Active"
                }
                
                }).then(Response=>(
                    this.staffs=Response.data.staff.data,
                    
                    this.staffs.forEach(element => {
                        element.firstName=element.title+" "+element.firstName+" "+element.lastName
                    })
                    
                ))
            },

            successAlert(){
                this.$emit('success',true)
            },

            failedAlert(){
                this.$emit('failed',true)
            }



            
           
        }
    }
</script>
            


<style scoped>
 fieldset{
    border-color: rgb(225, 225, 225);
    border-style: solid;
    border:0.1;
    border-style: solid;
 }

</style>