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

async function makeQuestionVn(tiengviet, tiengnhat) {
  $("#answer").text("Đáp án...?");
  $("#question").text(tiengviet);
  let mp3File = getMp3Fpt(tiengviet);

  //   wait for mp3 content sync to file
  await snooze(2000);
  new Audio(mp3File).play();
  //   wait for thinking
  await snooze(15000);
  $("#answer").text(tiengnhat);
  speakJp(tiengnhat);
}

const start = async (questions) => {
  let n = questions.length;
  for (let i = 0; i < n; i++) {
    let tiengviet = questions[i].sentense_meaning;
    let tiengnhat = questions[i].sentense;
    // console.log(tiengviet);
    // console.log(tiengnhat);
    await snooze(10000);
    await makeQuestionVn(tiengviet.trim(), tiengnhat.trim());
  }
};

$(document).ready(function () {
  let questions = [
    {
      sentense: " ひるごはんは もう たべましたか。 ",
      sentense_meaning: "Bạn đã ăn trưa rồi à? ",
    },
    {
      sentense: "。。。いいえ、これから たべるところです。",
      sentense_meaning: "…Chưa, tôi chuẩn bị ăn bây giờ.",
    },
    {
      sentense: "かいぎは もう はじまりましたか。 ",
      sentense_meaning: "Cuộc họp đã bắt đầu rồi à? ",
    },
    {
      sentense: "。。。いいえ、いまから はじまるところです。",
      sentense_meaning: "…Chưa, sắp sửa bắt đầu.",
    },
    {
      sentense:
        "ちょうど いまから おちゃを のむところです。いっしょに いかがですか。",
      sentense_meaning:
        "Đúng lúc tôi chuẩn bị uống trà. Bạn uống cùng tôi nhé!",
    },
    {
      sentense: "ピンポン しませんか。 ",
      sentense_meaning: "Cậu có chơi bóng bàn không? ",
    },
    {
      sentense: "。。。今 べんきょうしているところですから、あとで いきます。 ",
      sentense_meaning: "Vì bây giờ tôi đang học bài , nên tôi sẽ đi sau.",
    },
    {
      sentense: "かいぎのしりょうは もう できましたか。",
      sentense_meaning: "Tài liệu buổi họp đã chuẩn bị xong chưa? ",
    },
    {
      sentense:
        "すみません。今 コピーしているところですから、もう少し まってください。",
      sentense_meaning:
        "Xin lỗi. Vì bây giờ đang phôtô nên hãy chờ thêm chút nữa.",
    },
    {
      sentense: "８じのバスは もう でましたか。 ",
      sentense_meaning: "Chuyến xe 8 giờ đã đi rồi à? ",
    },
    {
      sentense: "はい、たったいま でたところです。",
      sentense_meaning: "Vâng, vừa mới đi.",
    },
    {
      sentense: "りょうこさんは たったいま うちへ かえったところです。",
      sentense_meaning: "Ryoko vừa trở về nhà. ",
    },
    {
      sentense: "今朝 ハノイに 着いたんですか。 ",
      sentense_meaning: "Bạn đã đến Hà Nội sáng nay à? ",
    },
    {
      sentense: "はい、たった今 ついたところだ。",
      sentense_meaning: "Vâng, tôi vừa đến.",
    },
    {
      sentense: "田中さんは 今 FPT ビルで はたらいているところです。",
      sentense_meaning: "Anh Tanaka bây giờ đang làm việc ở tòa nhà FPT ",
    },
    {
      sentense:
        "やまださんとやまもとさんは ３かげつまえに けっこんしたばかりです。",
      sentense_meaning: "Cô Yamada và anh Yamamoto vừa kết hôn 3 tháng trước.",
    },
    {
      sentense: "たなかさんは ３しゅうかんまえに ベトナムへ きたばかりです。",
      sentense_meaning: "Anh Tanaka vừa đến Việt Nam 3 tuần trước.",
    },
    {
      sentense: "ふるくて、せまいのに、やちんは たかいです。",
      sentense_meaning: "Nhà vừa cổ lại hẹp thế mà tiền nhà lại đắt đỏ.",
    },
    {
      sentense: "このカメラは きのうかったばかりです。",
      sentense_meaning: "Cái máy ảnh này hôm qua tôi vừa mua .",
    },
    {
      sentense: "さっき たべたばかりですから、まだ おなかが いっぱいです。",
      sentense_meaning: "Bởi vì vừa mới ăn lúc nãy nên tôi vẫn còn no.",
    },
    {
      sentense: "さっき たべたばかりですから、まだ おなかが いっぱいです。",
      sentense_meaning: "Vì vừa mới sơn xong nên đừng động vào",
    },
    {
      sentense: "このとけいは かったばかりなのに、もうこわれてしまいました。",
      sentense_meaning: "Cái đồng hồ này vừa mới mua vậy mà đã hỏng mất rồi.",
    },
    {
      sentense: "きのう おしえたばかりなのに、もうわすれてしまいましたか。",
      sentense_meaning: "Vừa mới dạy ngày hôm qua vậy mà đã quên rồi sau?",
    },
    {
      sentense: "かれは3がつにだいがくをそつぎょうしたばかりです。",
      sentense_meaning: "Anh ấy vừa mới tốt nghiệp đại học vào tháng 3.",
    },
    {
      sentense: "しょるいはそくたつでだしましたから、あしたつくはずです。",
      sentense_meaning:
        "Vì tôi gửi tài liệu bằng dịch vụ gửi nhanh, nên chắc chắn ngày mai sẽ đến.",
    },
    {
      sentense: "こしょうのげんいんはわかりましたか？",
      sentense_meaning: "Anh biết nguyên nhân hỏng chưa?",
    },
    {
      sentense: "いいえ、いましらべているところです。",
      sentense_meaning: "Chưa Bây giờ tôi mới xem đây.",
    },
    {
      sentense: "しごとはどうですか。",
      sentense_meaning: "Công việc thế nào rồi ?",
    },
    {
      sentense:
        "せんげつ、かいしゃにはいったばかりですから、まだよくわかりません。",
      sentense_meaning:
        "Vì mới vào công ty tháng trước nên vẫn chưa hiểu rõ lắm.",
    },
  ];
  console.log(questions);
  $("#start").click(function () {
    $(this).hide();
    start(questions);
  });
});

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

function speakJp(text) {
  var msg = new SpeechSynthesisUtterance();
  msg.volume = 1; //ボリューム
  msg.rate = 0.8; //レート
  msg.pitch = 1; //ピッチ
  msg.text = text;
  msg.lang = "ja-JP"; //言語
  //   msg.voice = "Microsoft Haruka Desktop - Japanese"; default is it
  window.speechSynthesis.speak(msg);
}
