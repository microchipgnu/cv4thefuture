module.exports = {
  GetAnswers: `query GetAnswers {
    answers {
      answer(path: "answers")
    }
  }`,
  
  InsertAnswers: `
    mutation InsertAnswers($answer: jsonb, $ip: String) {
      insert_answers(objects: {answer: $answer, ip: $ip}) {
        affected_rows
        returning {
          answer
        }
      }
    }
  `
};
