var staffList = [];

//them nhan vien
var createStaff = function () {
  if (!validate()) return;
  var account = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var date = document.getElementById("datepicker").value;
  var salary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var time = +document.getElementById("gioLam").value;

  document.getElementById("tknv").disabled = false;

  var newStaff = new staff(
    account,
    name,
    email,
    password,
    date,
    salary,
    position,
    time
  );

  staffList.push(newStaff);
  renderStaff();
  saveData();

  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";
};

//xoa nhan vien
var deteleStaff = function (id) {
  var index = findID(id);
  if (index === -1) {
    alert("error");
    return;
  }
  staffList.splice(index, 1);
  renderStaff();
  saveData();
};

var findID = function (id) {
  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].account === id) {
      return i;
    }
  }
  return -1;
};

//cap nhat
///----Lay thong tin dua len form
var getStaff = function (id) {
  var index = findID(id);
  if (index === -1) {
    alert("error");
    return;
  }
  var foundStaff = staffList[index];

  document.getElementById("tknv").value = foundStaff.account;
  document.getElementById("name").value = foundStaff.name;
  document.getElementById("email").value = foundStaff.email;
  document.getElementById("password").value = foundStaff.password;
  document.getElementById("datepicker").value = foundStaff.date;
  document.getElementById("luongCB").value = foundStaff.salary;
  document.getElementById("chucvu").value = foundStaff.position;
  document.getElementById("gioLam").value = foundStaff.time;

  document.getElementById("btnThem").click();
  // document.getElementById("tknv").disabled = true;
  document.getElementById("btnCapNhat").style.display = "block";
  document.getElementById("btnThemNV").style.display = "none";
};

///---Luu thay doi
var updateStaff = function () {
  if (!validate()) return;

  var account = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var date = document.getElementById("datepicker").value;
  var salary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var time = +document.getElementById("gioLam").value;

  var index = findID(account);
  if (index === -1) {
    alert("error");
    return;
  }
  var foundStaff = staffList[index];
  foundStaff.name = name;
  foundStaff.email = email;
  foundStaff.password = password;
  foundStaff.date = date;
  foundStaff.salary = salary;
  foundStaff.position = position;
  foundStaff.time = time;

  renderStaff();
  saveData();

  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";
};

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}
var renderStaff = function (data) {
  data = data || staffList;

  var dataHTML = "";

  for (var i = 0; i < data.length; i++) {
    dataHTML += `
      <tr>
        <td>${data[i].account}</td>
        <td>${data[i].name}</td>
        <td>${data[i].email}</td>
        <td>${data[i].date}</td>
        <td>${data[i].position}</td>
        <td>${data[i].totalPrice()}</td>
        <td>${data[i].classify()}</td>
        <td>
          <button class="btn btn-danger" onclick="deteleStaff(
            '${data[i].account}')">Xoa</button>
        </td>
        <td>
        <button class="btn btn-info" onclick="getStaff(
            '${data[i].account}')"">Cap nhat</button>
      </td>
      </tr>
    `;
  }
  document.getElementById("tableDanhSach").innerHTML = dataHTML;
};
//search
var findStaff = function () {
  var keyword = document
    .getElementById("searchName")
    .value.toLowerCase()
    .trim();
  keyword = removeVietnameseTones(keyword);
  var results = [];

  for (var i = 0; i < staffList.length; i++) {
    var staffClassify = staffList[i].classify().toLowerCase();
    staffClassify = removeVietnameseTones(staffClassify);

    if (staffClassify.includes(keyword)) {
      results.push(staffList[i]);
    }
  }

  renderStaff(results);
};

//save data => Luu nhan vien vao local
var saveData = function () {
  var staffListJson = JSON.stringify(staffList); // chuyen du lieu thanh json de luu
  localStorage.setItem("list", staffListJson);
};

var getData = function () {
  var staffListJson = localStorage.getItem("list");
  if (staffListJson) {
    staffList = mappData(JSON.parse(staffListJson)); //chuyen json thanh mang
    renderStaff();
  }
};

//map data
var mappData = function (dataFromLocal) {
  var data = [];
  for (var i = 0; i < dataFromLocal.length; i++) {
    var currentStaff = dataFromLocal[i];
    var mapStaff = new staff(
      currentStaff.account,
      currentStaff.name,
      currentStaff.email,
      currentStaff.password,
      currentStaff.data,
      currentStaff.salary,
      currentStaff.position,
      currentStaff.time
    );
    data.push(mapStaff);
  }
  return data;
};

renderStaff();
getData();
//render

//-------------------------
var validate = function () {
  var account = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var date = document.getElementById("datepicker").value;
  var salary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var time = +document.getElementById("gioLam").value;

  var accPattern = /^[0-9]+$/;
  var textPattern = /^[A-z ]+$/g;
  var salaryPattern = /[0-9]+/g;
  var timeWorkPattern = /[0-9]+/g;
  var emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
  var passwordPattern = /(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*]){6,10}/g;

  var isValid = true;

  isValid &=
    require(account, "tbTKNV") &&
    pattern(account, "tbTKNV", accPattern) &&
    lengthStaff(account, "tbTKNV", 1, 6, "Tài khoản tối đa 4-6 ký số");

  isValid &= require(name, "tbTen") && pattern(name, "tbTen", textPattern);

  isValid &=
    require(email, "tbEmail") && pattern(email, "tbEmail", emailPattern);

  isValid &=
    require(password, "tbMatKhau") &&
    pattern(password, "tbMatKhau", passwordPattern);

  isValid &= require(date, "tbNgay");

  isValid &=
    require(salary, "tbLuongCB") &&
    pattern(salary, "tbLuongCB", salaryPattern) &&
    limitNumber(
      salary,
      "tbLuongCB",
      1000000,
      20000000,
      "Lương cơ bản 1 000 000 - 20 000 000"
    );

  isValid &=
    require(position, "tbChucVu") &&
    positionWork(
      position,
      "tbChucVu",
      "Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)"
    );

  isValid &=
    require(time, "tbGiolam") &&
    pattern(time, "tbGiolam", timeWorkPattern) &&
    limitNumber(
      time,
      "tbGiolam",
      80,
      200,
      " Số giờ làm trong tháng 80 - 200 giờ"
    );

  return isValid;
};

var require = function (val, spanID) {
  if (!val) {
    document.getElementById(spanID).innerHTML = "* bat buoc nhap";
    document.getElementById(spanID).style.display = "block";
    return false;
  }
  document.getElementById(spanID).innerHTML = "";
  return true;
};

var lengthStaff = function (value, spanId, min, max, message) {
  if (value.length < min || value.length > max) {
    document.getElementById(spanId).style.display = "block";
    document.getElementById(spanId).innerHTML = message;
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
};
var limitNumber = function (value, spanId, min, max, message) {
  value *= 1;
  if (value < min || value > max) {
    document.getElementById(spanId).style.display = "block";
    document.getElementById(spanId).innerHTML = message;
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
};

var pattern = function (value, spanId, regex) {
  if (!regex.test(value)) {
    alert(value);
    document.getElementById(spanId).style.display = "block";
    document.getElementById(spanId).innerHTML = "* Không đúng định dạng";
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
};
var positionWork = function (value, spanId, message) {
  if (value.toLowerCase().includes("c")) {
    document.getElementById(spanId).style.display = "block";
    document.getElementById(spanId).innerHTML = message;
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
};
