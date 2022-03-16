// 객체를 순회하며 key가 title이거나
// name일 경우 value를 대문자로 바꿔주세요.

const obj = {
  title: 'The Title',
  name: 'Jane',
  contents: 'Nothing to say'
};

for (let key in obj) {
  if (obj.title || obj.name) {
    obj.title = obj.title.toUpperCase();
    obj.name = obj.name.toUpperCase();
  }
}

console.log(obj);
// {
//   title : "THE TITLE",
//   name : "JANE",
//   contents: "Nothing to say"
// }
