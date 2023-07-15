<template>
  <div class="home-wrapper">
    <div class="inner w-full p-20">
      <div class="title text-right mb-6">
        <h2 class="text-2xl">نمایش لیست کارمندان</h2>
      </div>
      <div class="list w-1/3 text-right">
        <div class="title mb-2">
          <h3 class="text-lg">کارمندان</h3>
        </div>
        <div class="content">
          <ul>
            <!--      SHOW EMPLOYEE INFO & EDIT EMPLOYEE INFO          -->
            <li id="main-li" class="border bg-white main-li cursor-pointer relative px-8 py-6 rounded my-1 text-xs"
                v-for="item in employees" :key="item.id" @click="toggleCard();personId=item.id;fetchEmployeeData()">
              {{ item.firstName }}&nbsp;{{ item.lastName }}
              <form @submit.prevent class="mt-6 text-right cursor-auto " v-if="cardOpen===true&&personId===item.id">
                <Loading v-if="loading=== true"/>
                <div v-if="loading===false" class="remove flex justify-end my-6">
                  <button @click="deleteEmployee()" class="bg-red-600 p-1 rounded w-7 h-7">
                    <img class="w-full h-full" src="../assets/images/delete.png" alt="">
                  </button>
                </div>
                <div v-if="loading===false">
                  <div class="input-group mb-4 flex justify-between items-center">
                    <div class="input flex flex-col">
                      <label for="name" class="mb-2 text-black">نام</label>
                      <input class="border p-1 rounded" type="text" id="name" name="name"
                             v-model="firstName">
                    </div>
                    <div class="input flex flex-col">
                      <label for="lName" class="mb-2 text-black">نام خانوادگی</label>
                      <input class="border p-1 rounded" type="text" id="lName" name="lName"
                             v-model="lastName">
                    </div>
                  </div>
                  <div class="input-group mb-4 flex justify-between items-center">
                    <div class="input flex flex-col">
                      <label for="dateOfBirth" class="mb-2 text-black">تاریخ تولد</label>
                      <input class="border p-1 rounded" type="text" id="dateOfBirth" name="dateOfBirth"
                             v-model="dateOfBirth">
                    </div>
                    <div class="input flex flex-col">
                      <label for="email" class="mb-2 text-black">ایمیل</label>
                      <input class="border p-1 rounded" type="email" id="email" name="email"
                             v-model="email">
                    </div>
                  </div>
                </div>
                <div v-if="loading===false" class="mt-12 border rounded p-4">
                  <div class="family-title mr-4 text-center">
                    <h3 class="text-lg text-black bg-white">اعضای خانواده</h3>
                  </div>
                  <!--      SHOW & EDIT EMPLOYEE FAMILY MEMBERS          -->
                  <div class="card mt-12 p-4 border rounded" v-for="(item,index) in family" :key="index">
                    <div class="family-title-small mb-4 mr-4 bg-white text-center flex justify-center items-center">
                      <h3 class="text-lg text-black ml-6">#{{ index + 1 }}</h3>
                      <button
                          @click="familyIndex=index;removeFamilyMember()"
                          class="bg-red-600 p-1 rounded w-7 h-7">
                        <img class="w-full h-full" src="../assets/images/delete.png" alt="">
                      </button>
                    </div>
                    <div class="input-group mb-4 flex justify-between items-center">
                      <div class="input flex flex-col">
                        <label for="name" class="mb-2 text-black">نام</label>
                        <input class="border p-1 rounded" type="text" id="name" name="name"
                               v-model="item.name">
                      </div>
                      <div class="input flex flex-col">
                        <label for="lName" class="mb-2 text-black">تاریخ تولد</label>
                        <input class="border p-1 rounded" type="text" id="lName" name="lName"
                               v-model="item.dateOfBirth">
                      </div>
                    </div>
                    <div class="input-group mb-4 flex justify-between items-center">
                      <div class="input flex flex-col">
                        <label for="name" class="mb-2 text-black">نسبت</label>
                        <input class="border p-1 rounded" type="text" id="name" name="name"
                               v-model="item.relation">
                      </div>
                    </div>
                  </div>
                  <!--      ADD FAMILY MEMBER          -->
                  <div v-if="createNewFamily===true" class="card mt-12 p-4 border rounded">
                    <div class="family-title-small mb-4 mr-4 bg-white text-center flex justify-center items-center">
                      <h3 class="text-lg text-black ml-6">#</h3>
                    </div>
                    <div class="input-group mb-4 flex justify-between items-center">
                      <div class="input flex flex-col">
                        <label for="name" class="mb-2 text-black">نام</label>
                        <input class="border p-1 rounded" type="text" id="name" name="name"
                               v-model="newFamily.name">
                      </div>
                      <div class="input flex flex-col">
                        <label for="lName" class="mb-2 text-black">تاریخ تولد</label>
                        <input class="border p-1 rounded" type="text" v-model="newFamily.dateOfBirth">
<!--                        <date-picker locale="en,fa" v-model="newFamily.dateOfBirth" type="datetime"/>-->
                      </div>
                    </div>
                    <div class="input-group mb-4 flex justify-between items-center">
                      <div class="input flex flex-col">
                        <label for="name" class="mb-2 text-black">نسبت</label>
                        <select class="border p-1 rounded" name="relation" id="relation" v-model="newFamily.relation">
                          <option value="spouse">همسر</option>
                          <option value="son">پسر</option>
                          <option value="daughter">دختر</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button @click="createNewFamily=true" class="rounded py-2 px-4 bg-blue-600 text-white mt-2 text-xs">
                    افزودن عضو
                  </button>
                </div>
                <div v-if="loading===false" class="w-full flex justify-center">
                  <button @click="editEmployee()" class="rounded py-2 px-4 bg-green-600 text-white mt-2 text-xs">
                    بروزرسانی
                  </button>
                </div>
              </form>
            </li>
            <!--      CREATE EMPLOYEE          -->
            <li class="mt-12 border rounded p-4 bg-white" v-if="createNew === true">
              <div class="family-title mr-4 text-center">
                <h3 class="text-lg text-black">افزودن کارمند</h3>
              </div>
              <form @submit.prevent class="mt-6 text-right text-xs cursor-auto text-right">
                <div>
                  <div class="input-group mb-4 flex justify-between items-center">
                    <div class="input flex flex-col">
                      <label for="name" class="mb-2 text-black">نام</label>
                      <input class="border p-1 rounded" required type="text" id="name" name="name"
                             v-model="firstName">
                    </div>
                    <div class="input flex flex-col">
                      <label for="lastName" class="mb-2 text-black">نام خانوادگی</label>
                      <input class="border p-1 rounded" required type="text" id="lastName" name="lastName"
                             v-model="lastName">
                    </div>
                  </div>
                  <div class="input-group mb-4 flex justify-between items-center">
                    <div class="input flex flex-col">
                      <label for="dateOfBirth" class="mb-2 text-black">تاریخ تولد</label>
                      <input class="border p-1 rounded" type="text" id="dateOfBirth" name="dateOfBirth"
                             v-model="dateOfBirth">
<!--                      <date-picker v-model="dateOfBirth" type="datetime"/>-->
                    </div>
                    <div class="input flex flex-col">
                      <label for="email" class="mb-2 text-black">ایمیل</label>
                      <input class="border p-1 rounded" type="email" id="email" name="email"
                             v-model="email">
                    </div>
                  </div>
                </div>
                <!--      ADD NEW EMPLOYEE FAMILY MEMBER          -->
                <div class="mt-12 border rounded p-4">
                  <div class="family-title mr-4 text-center">
                    <h3 class="text-lg text-black bg-white">اعضای خانواده</h3>
                  </div>
                  <div v-if="createNewFamily===true" class="card mt-12 p-4 border rounded"
                       v-for="(item,index) in family">
                    <div class="family-title-small mb-4 mr-4 bg-white text-center flex justify-center items-center">
                      <h3 class="text-lg text-black ml-6">#</h3>
                      <button class="bg-red-600 p-1 rounded w-7 h-7">
                        <img class="w-full h-full" src="../assets/images/delete.png" alt="">
                      </button>
                    </div>
                    <div class="input-group mb-4 flex justify-between items-center">
                      <div class="input flex flex-col">
                        <label for="name" class="mb-2 text-black">نام</label>
                        <input class="border p-1 rounded" type="text" id="name" name="name"
                               v-model="item.name">
                      </div>
                      <div class="input flex flex-col">
                        <label for="lName" class="mb-2 text-black">تاریخ تولد</label>
                        <input class="border p-1 rounded" type="text" id="dateOfBirth" name="dateOfBirth"
                               v-model="dateOfBirth">
<!--                        <date-picker v-model="item.dateOfBirth" type="datetime"/>-->
                      </div>
                    </div>
                    <div class="input-group mb-4 flex justify-between items-center">
                      <div class="input flex flex-col">
                        <label for="name" class="mb-2 text-black">نسبت</label>
                        <select class="border p-1 rounded" name="relation" id="relation" v-model="item.relation">
                          <option value="spouse">همسر</option>
                          <option value="son">پسر</option>
                          <option value="daughter">دختر</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button @click="createNewFamily=true" class="rounded py-2 px-4 bg-blue-600 text-white mt-2">افزودن عضو
                  </button>
                </div>
                <div class="flex justify-between items-center">
                  <button @click="createEmployee()" class="rounded py-2 px-4 bg-green-600 text-white mt-2 text-xs">
                    افزودن
                  </button>
                  <button @click="createNew=false" class="rounded py-2 px-4 bg-gray-500 text-white mt-2 text-xs">انصراف
                  </button>
                </div>
              </form>

            <li class="flex justify-center">
              <button @click="createNew=true" v-if="createNew===false"
                      class="rounded py-2 px-4 bg-green-600 text-white mt-2 text-xs">افزودن کارمند
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <success v-if="success===true"/>
    <Edited v-if="edited===true"/>
    <Deleted v-if="deleted===true"/>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import Success from "@/components/Success";
import Edited from "@/components/Edited";
import Deleted from "@/components/Deleted";

export default {
  components: {Success, Edited, Deleted, Loading},
  data() {
    return {
      familyIndex: null,
      success: false,
      edited: false,
      deleted: false,
      createNew: false,
      createNewFamily: false,
      loading: true,
      token: 'reyhane-ebrahimi-484ca754-d020-4493-add2-17fb391cec4e',
      personId: null,
      cardOpen: false,
      employees: {},
      employeePerson: {},
      family: [
        {
          name: '',
          dateOfBirth: '',
          relation: ''
        }
      ],
      newFamily: {
        name: '',
        dateOfBirth: '',
        relation: ''
      }
      ,
      firstName: '',
      lastName: '',
      email: '',
      editedEmployee: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        family: [
          {
            name: '',
            dateOfBirth: '',
            relation: ''
          }
        ]
      },
      dateOfBirth: '',
      removedItem: 1,
    }
  },
  created() {
    this.fetchEmployees();
  },
  methods: {
    toggleCard() {
      this.cardOpen = true;
      let card = document.getElementById('main-li');
      if (this.cardOpen === true) {
        card.addEventListener("click", function () {
          this.cardOpen = false
        });
      }
    },
    fetchEmployees() {
      axios.get('https://goharp-task1.iran.liara.run/employee', {params: {token: this.token}})
          .then((res) => {
            this.employees = structuredClone(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
    },
    fetchEmployeeData() {
      const apiUrl = 'https://goharp-task1.iran.liara.run';
      const token = 'reyhane-ebrahimi-484ca754-d020-4493-add2-17fb391cec4e';
      const employeeId = this.personId;
      axios.get(`${apiUrl}/employee/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
          .then(response => {
            this.loading = false;
            this.employeePerson = structuredClone(response.data);
            this.firstName = this.employeePerson.firstName;
            this.lastName = this.employeePerson.lastName;
            this.email = this.employeePerson.email;
            this.dateOfBirth = this.employeePerson.dateOfBirth;
            this.family = this.employeePerson.family;
          })
          .catch(error => {
            console.log(error)
          });
    },
    createEmployee() {
      const apiUrl = 'https://goharp-task1.iran.liara.run';
      const token = 'reyhane-ebrahimi-484ca754-d020-4493-add2-17fb391cec4e';
      axios.post(`${apiUrl}/employee`,
          {
            "firstName": this.firstName,
            "lastName": this.lastName,
            "dateOfBirth": this.dateOfBirth,
            "email": this.email,
            "family": this.family,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then((res) => {
            console.log(res);
            this.createNew = false;
            this.success = true;
            setTimeout(
                () => {
                  this.success = false
                }, 5000
            )
            this.fetchEmployees();
            this.fetchEmployeeData();
          })
          .catch((err) => {
            console.log(err)
          })
    },
    removeFamilyMember() {
      console.log(this.family)
      this.family.splice(this.familyIndex, 1);
      console.log(this.family)
      this.editEmployee();
      this.fetchEmployeeData();
    },
    editEmployee() {
      const apiUrl = 'https://goharp-task1.iran.liara.run';
      const token = 'reyhane-ebrahimi-484ca754-d020-4493-add2-17fb391cec4e';
      const employeeId = this.employeePerson.id;
      if (this.newFamily.name){
        this.family.push(this.newFamily);
        this.newFamily = {};
      }
      axios.put(`${apiUrl}/employee/${employeeId}`,
          {
            "firstName": this.firstName,
            "lastName": this.lastName,
            "dateOfBirth": this.dateOfBirth,
            "email": this.email,
            "family": this.family,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then((res) => {
            this.edited = true;
            setTimeout(
                () => {
                  this.edited = false
                }, 5000
            )
            this.fetchEmployees();
          })
          .catch((err) => {
            console.log(err)
          })
    },
    deleteEmployee() {
      const apiUrl = 'https://goharp-task1.iran.liara.run';
      const token = 'reyhane-ebrahimi-484ca754-d020-4493-add2-17fb391cec4e';
      const employeeId = this.employeePerson.id;
      axios.delete(`${apiUrl}/employee/${employeeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then((res) => {
            this.deleted = true;
            setTimeout(
                () => {
                  this.deleted = false
                }, 5000
            )
            this.fetchEmployees();
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
    }
  }
}
</script>
