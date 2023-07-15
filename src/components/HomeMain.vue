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
                  <button class="bg-red-600 p-1 rounded w-7 h-7">
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
                  <div class="card mt-12 p-4 border rounded" v-for="(item,index) in employeePerson.family" :key="index">
                    <div class="family-title-small mb-4 mr-4 bg-white text-center flex justify-center items-center">
                      <h3 class="text-lg text-black ml-6">#{{ index + 1 }}</h3>
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
                  <button class="rounded py-2 px-4 bg-blue-600 text-white mt-2">افزودن عضو</button>
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
                      <input class="border p-1 rounded" type="text" id="name" name="name"
                             v-model="firstName">
                    </div>
                    <div class="input flex flex-col">
                      <label for="lastName" class="mb-2 text-black">نام خانوادگی</label>
                      <input class="border p-1 rounded" type="text" id="lastName" name="lastName"
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
                <div class="mt-12 border rounded p-4">
                  <div class="family-title mr-4 text-center">
                    <h3 class="text-lg text-black bg-white">اعضای خانواده</h3>
                  </div>
                  <div class="card mt-12 p-4 border rounded">
                    <div class="family-title-small mb-4 mr-4 bg-white text-center flex justify-center items-center">
                      <h3 class="text-lg text-black ml-6"></h3>
                      <button class="bg-red-600 p-1 rounded w-7 h-7">
                        <img class="w-full h-full" src="../assets/images/delete.png" alt="">
                      </button>
                    </div>
                    <div class="input-group mb-4 flex justify-between items-center">
                      <div class="input flex flex-col">
                        <label for="name" class="mb-2 text-black">نام</label>
                        <input class="border p-1 rounded" type="text" id="name" name="name"
                               v-model="familyInput.name">
                      </div>
                      <div class="input flex flex-col">
                        <label for="dateOfBirth" class="mb-2 text-black">تاریخ تولد</label>
                        <input class="border p-1 rounded" type="text" id="dateOfBirth" name="dateOfBirth"
                               v-model="familyInput.dateOfBirth">
                      </div>
                    </div>
                    <div class="input-group mb-4 flex justify-between items-center">
                      <div class="input flex flex-col">
                        <label for="relation" class="mb-2 text-black">نسبت</label>
                        <select class="border p-1 rounded" name="relation" id="relation" v-model="familyInput.relation">
                          <option value="spouse">همسر</option>
                          <option value="son">پسر</option>
                          <option value="daughter">دختر</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button @click="addFamilyMember()" class="rounded py-2 px-4 bg-blue-600 text-white mt-2">افزودن عضو
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
  </div>
</template>

<script>
import Loading from "@/components/Loading";

export default {
  components: {Loading},
  data() {
    return {
      createNew: false,
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
      familyInput: {
        name: '',
        dateOfBirth: '',
        relation: '',
      },
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
    addFamilyMember() {
      this.family.push(this.familyInput);
      this.removedItem = this.family.shift();
    },
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
            for (let i = 0; i <= this.employeePerson.family.length; i++) {
              if (this.employeePerson.family[i]) {
                this.familyInput.name = this.employeePerson.family[i].name;
                this.familyInput.dateOfBirth = this.employeePerson.family[i].dateOfBirth;
                this.familyInput.relation = this.employeePerson.family[i].relation;
                this.family.push(this.familyInput);
              }
            }
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
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
    },
    editEmployee() {
      const apiUrl = 'https://goharp-task1.iran.liara.run';
      const token = 'reyhane-ebrahimi-484ca754-d020-4493-add2-17fb391cec4e';
      const employeeId = this.employeePerson.id;
      axios.put(`${apiUrl}/employee/${employeeId}`,
          {
            "firstName": this.firstName,
            "lastName": this.lastName,
            "dateOfBirth": this.dateOfBirth,
            "email": this.email,
            "family": this.employeePerson.family,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
    }
  }
}
</script>
