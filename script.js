let company_data, employee_data;
const employees = document.querySelector(".employees");

const companiesSelector = document.getElementById("companies");
const employeeSearch = document.getElementById("employee-search");

const mainPage = document.querySelector(".main-page");
const companyPage = document.querySelector(".company-page");

let selectedCompany = -1;
const companyName = document.querySelector(".company-name");
const companyLastName = document.querySelector(".c-lastname");
const companyFirstName = document.querySelector(".c-firstname");
const companyEmail = document.querySelector(".c-email");

let showCompany = false;


document.body.onload=function() {
    fetch("company_data.json").then(response=>response.json())
    .then(data=>company_data=data);
    fetch("employee_data.json").then(response=>response.json())
    .then(data=>{
        employee_data=data; 
        showEmployees();
        showCompanyOptions();
        
    });
}


function showCompanyPage(id){
    if(!showCompany) {
        showCompany=true;
        mainPage.hidden =showCompany;
        companyPage.hidden=!showCompany;
        selectedCompany = id;

        const company = company_data.find((company)=>company.id==id)


        companyFirstName.innerHTML = company.contact_first_name;
        companyLastName.innerHTML = company.contact_last_name;
        companyEmail.innerHTML = company.email;
    }
}


function showCompanyOptions() {
    company_data.forEach((company)=>{
        companiesSelector.innerHTML += `<option value="${company.id}">${company.company_name}</option>`
    })
}


function showEmployees() {
    employees.innerHTML = "";
    for(let i = 0; i < employee_data.length; i++) {
        const employee = employee_data[i];
        const company = company_data.find((company)=>company.id==employee.company_id)
        const selectedCompany=companiesSelector.value.toLowerCase();
        const selectedEmployee = employeeSearch.value;
        if((selectedCompany==-1 || company.id==selectedCompany)
         && (selectedEmployee=="" || (employee.first_name.toLowerCase().includes(selectedEmployee)||employee.last_name.toLowerCase().includes(selectedEmployee)))) {
        employees.innerHTML+=`
        <div class="employee">
        <img src="${employee.avatar}" alt="">
        ${employee.last_name}, ${employee.first_name}
        <div class="email">${employee.email}</div>
        <button class='c-button' onclick='showCompanyPage("${company.id}")' data-company=${company.id}>${company.company_name}</button>
        </div>
        `;
        }
    }
}

companiesSelector.onchange=function() {
    showEmployees();
}
employeeSearch.onkeyup=function() {
    showEmployees();
}