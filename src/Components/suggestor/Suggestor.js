// import React from "react";
// import "./Suggest.css";
// const { Configuration, OpenAIApi } = require("openai");
// const OPENAI_API_KEY = "";

// function Suggestor({ location, feels }) {
// const configuration = new Configuration({
//   apiKey: OPENAI_API_KEY,
// });
// console.log(OPENAI_API_KEY);

// const openai = new OpenAIApi(configuration);
// openai
//   .createCompletion({
//     model: "text-davinci-002",
//     prompt: `Top 5 activities to do in ${location} when its ${feels}`,
//     temperature: 0.7,
//     max_tokens: 256,
//     top_p: 1,
//     frequency_penalty: 0,
//     presence_penalty: 0,
//   })
//   .then((response) => {
//     console.log(response.data.choices[0].text);
//   });

//   return (
//     <div>
//       Top 5 activities to do in {location} when its {feels}
//     </div>
//   );
// }

// export default Suggestor;
