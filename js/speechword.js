$(document).ready(function () {
  $("#start").click(function () {
    $("#setting").hide();
    startFromJa(questions);
  });

  $("#reverse").click(function () {
    $("#setting").hide();
    startFromVn(questions);
  });
});

// // curl -X POST https://api.fpt.ai/hmi/tts/v5 -H "api-key: 8Lbch6jCZMEEw0SwFfm9bmIdgCarmEQB" -H "speed: -1" -H "voice: lannhi" -d "Vâng"
const snooze = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var voices;
window.speechSynthesis.onvoiceschanged = function () {
  voices = window.speechSynthesis.getVoices();
};

function makeQuestionJp(question, anwser) {
  let mp3File = speakVn();
  new Audio(mp3File).play();
  setInterval(() => {
    speakJp("おはようございます。タンと申します。よろしくお願いします。");
    setTimeout(() => {
      let mp3File = speakVn();
      new Audio(mp3File).play();
    }, 5000);
  }, 15000);
}

async function makeQuestionJp(id, tiengviet, tiengnhat, tienganh) {
  $("#ja").text(tiengnhat);
  speakJp(tiengnhat);

  if (tienganh) {
    await snooze(3000);
    $("#en").text(tienganh);
    responsiveVoice.speak(tienganh);
    // speakEn();
  }

  if (tiengviet) {
    // let mp3File = localStorage.getItem(id);
    // if (mp3File == null) {
    let mp3File = getMp3Fpt(tiengviet);
    // }
    //   wait for mp3 content sync to file
    await snooze(3000);
    localStorage.setItem(id, mp3File);
    $("#vi").text(tiengviet);
    new Audio(mp3File).play();
  }
}

async function makeQuestionVn(id, tiengviet, tiengnhat, tienganh) {
  if (tiengviet) {
    $("#vi").text(tiengviet);
    let mp3File = localStorage.getItem(id);
    if (mp3File) {
      new Audio(mp3File).play();
      await snooze(3000);
    }
  }

  if (tienganh) {
    $("#en").text(tienganh);
    responsiveVoice.speak(tienganh);
    await snooze(3000);
    // speakEn();
  }

  $("#ja").text(tiengnhat);
  speakJp(tiengnhat);
}

const startFromVn = async (questions) => {
  let n = questions.length;
  for (let i = 0; i < n; i++) {
    let id = questions[i].id;
    let tiengviet = questions[i].vi;
    let tiengnhat = questions[i].ja;
    let tienganh = questions[i].en;
    await snooze(3000);
    $("#ja").text("...");
    $("#en").text("...");
    $("#vi").text("...");

    await makeQuestionVn(
      id,
      tiengviet ? tiengviet.trim() : "",
      tiengnhat ? tiengnhat.trim() : "",
      tienganh ? tienganh.trim() : ""
    );
  }
};

const startFromJa = async (questions) => {
  let n = questions.length;
  for (let i = 0; i < n; i++) {
    let id = questions[i].id;
    let tiengviet = questions[i].vi;
    let tiengnhat = questions[i].ja;
    let tienganh = questions[i].en;
    await snooze(3000);
    $("#ja").text("...");
    $("#en").text("...");
    $("#vi").text("...");
    await makeQuestionJp(
      id,
      tiengviet ? tiengviet.trim() : "",
      tiengnhat ? tiengnhat.trim() : "",
      tienganh ? tienganh.trim() : ""
    );
  }
};

function getMp3Fpt(stringToSpeech) {
  let mp3;
  $.ajax({
    url: "https://api.fpt.ai/hmi/tts/v5",
    async: false,
    method: "POST",
    headers: {
      "api-key": "8Lbch6jCZMEEw0SwFfm9bmIdgCarmEQB",
      //   speed: -1,
      voice: "lannhi",
    },
    data: stringToSpeech,
  })
    .done(function (data) {
      mp3 = data.async;
    })
    .fail(function (err) {
      console.log(err);
    });
  return mp3;
}

// speakJp("コア");
// speakEn("Core");
function speakEn(m) {
  let msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[0];
  msg.voiceURI = "native";
  msg.volume = 1;
  msg.rate = 0.6;
  msg.pitch = 1;
  msg.text = m;
  msg.lang = "en-US";
  speechSynthesis.speak(msg);
}

function speakJp(text) {
  let msg = new SpeechSynthesisUtterance();
  msg.volume = 1; //ボリューム
  msg.rate = 0.5; //レート
  msg.pitch = 1; //ピッチ
  msg.text = text;
  msg.lang = "ja-JP"; //言語
  //   msg.voice = "Microsoft Haruka Desktop - Japanese"; default is it
  window.speechSynthesis.speak(msg);
}

function getQuestions(book_name, lession_name) {
  let res;
  $.ajax({
    url: "http://kahootmaker.test/japanese/tuvungit",
    type: "get",
    data: { book: book_name, lession: lession_name },
    async: false,
    success: function (data) {
      res = data;
    },
  });
  return res;
}

function getBooks() {
  let res;
  $.ajax({
    url: "http://kahootmaker.test/japanese/getbooks",
    type: "get",
    // data: data,
    async: false,
    success: function (data) {
      res = data;
    },
  });
  return res;
}

function getLessionsByBook(book_name) {
  let res;
  $.ajax({
    url: "http://kahootmaker.test/japanese/getlessions",
    type: "get",
    data: { book: book_name },
    async: false,
    success: function (data) {
      res = data;
    },
  });
  return res;
}
