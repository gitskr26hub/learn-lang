import axios from "axios";
import { generate } from "random-words";
import _ from "lodash";

const generateMCQ = (meaning: { Text: string }[], idx: number): string[] => {
  const correctAnswer: string = meaning[idx].Text;
  const MeaningExceptfromCorrect = meaning.filter(
    (i) => i.Text !== correctAnswer
  );

  const incorrectAnswer: string[] = _.sampleSize(
    MeaningExceptfromCorrect,
    3
  ).map((i) => i.Text);

  const mcqOptions = _.shuffle([...incorrectAnswer, correctAnswer]);
  return mcqOptions;
};

export const translateWords = async (params: LangType): Promise<Wordtype[]> => {
  try {
    const words = generate(8).map((i) => ({
      Text: i,
    }));

    const resposnce = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      words,
      {
        params: {
          "to[0]": params,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":import.meta.env.VITE_RAPID_API,
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
      }
    );

    // console.log(resposnce.data);

    const recievedData: fetchedDataType[] = resposnce.data;

    const array: Wordtype[] = recievedData.map((i, index) => {
      const options: string[] = generateMCQ(words, index);

      return {
        word: i.translations[0].text,
        meaning: words[index].Text,
        options,
      };
    });

    return array;
  } catch (error) {
    // console.log(error);
    throw new Error("Some Error");
  }
};

export async function getAudioMsg(
  text: string,
  language: LangType
) {
 
  const encodedParams = new URLSearchParams({
    src: text,
    r: "0",
    c: "mp3",
    f: "8khz_8bit_mono",
    b64: "true"
  });

  if (language === "ja") encodedParams.set("hl", "ja-jp");
  else if (language === "es") encodedParams.set("hl", "es-es");
  else if (language === "fr") encodedParams.set("hl", "fr-fr");
  else encodedParams.set("hl", "hi-in");

  const api_key = import.meta.env.VITE_TEXT_TO_SPEECH_APIKEY;
  const RAPID_API = import.meta.env.VITE_RAPID_API;


  const options = {
    method: 'POST',
    url: 'https://voicerss-text-to-speech.p.rapidapi.com/',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': RAPID_API,
      'X-RapidAPI-Host': 'voicerss-text-to-speech.p.rapidapi.com'
    },
    data: encodedParams,
    params:{key:api_key}
  };
  try {
    const response = await axios.request(options);
    return response?.data;
    // console.log(response.data);
  } catch (error) {
    if(error) throw new Error
    // console.error(error);
  }

}
