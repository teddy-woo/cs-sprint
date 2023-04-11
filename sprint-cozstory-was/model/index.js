const validate = require('./scheme')()

let allArticles = [
  { "_id": 1, "author": { "name": "임푸라" }, "title": "나는 인프라 담당자", "body": "데브옵스는 재미있어" },
  { "_id": 2, "author": { "name": "김코딩" }, "title": "데브옵스도 코딩 능력이 필요할까?", "body": "당연합니다!" },
  { "_id": 3, "author": { "name": "최해커" }, "title": "서버 다운이 지겨우신가요?", "body": "가용성을 높입시다!" }
]


module.exports = {
  readAll: async () => {
    return allArticles;
  },
  readOne: async (id) => {
    const found = allArticles.filter(article => article._id === Number(id))[0];
    return found;
  },
  createOne: async (body) => {
    const newArticle = {
      _id: allArticles.length + 1,
      ...body
    }

    allArticles.push(newArticle)

    return newArticle;
  },
  updateOne: async (id, body) => {
    const found = allArticles.filter(article => article._id === Number(id))[0];
    if(found) {
      found.author = body.author;
      found.title = body.title;
      found.body = body.body;

      return found;
    }
  },
  deleteOne: async (id) => {
    const found = allArticles.filter(article => article._id === Number(id))[0];
    if(found) {
      const idx = allArticles.indexOf(found)
      allArticles = [...allArticles.slice(0, idx), ...allArticles.slice(idx + 1)]
    }

    return found;
  },
  isValid: (body) => {
    const valid = validate(body);
    // console.log(validate.errors)
    return valid
  }
}
