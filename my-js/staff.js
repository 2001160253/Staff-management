// Đối tượng nhân viên bao gồm các thuộc tính sau:
// +Tài khoản
// +Họ tên
// +Email
// +Mật khẩu
// +Ngày làm
// +Lương cơ bản
// +Chức vụ gồm: Giám đốc, Trưởng Phòng, Nhân Viên
// +Giờ làm trong tháng
// +Tổng lương
// +Loại nhân viên
function staff(
  account,
  name,
  email,
  password,
  date,
  salary,
  position,
  time,
  total,
  type
) {
  this.account = account;
  this.name = name;
  this.email = email;
  this.password = password;
  this.date = date;
  this.salary = salary;
  this.position = position;
  this.time = time;
  this.total = total;
  this.type = type;

  this.totalPrice = function () {
    if (this.position === "Sếp") {
      return this.salary * 3;
    } else if (this.position === "Trưởng phòng") {
      return this.salary * 2;
    } else {
      return this.salary * 1;
    }
  };
  this.classify = function () {
    if (this.time >= 192) return "nhân viên xuất sắc";
    else if (this.time >= 176) return "nhân viên giỏi";
    else if (this.time >= 160) return "nhân viên khá";
    else return "nhân viên trung bình";
  };
}
