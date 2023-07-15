import { transliterate } from "transliteration";
import { getCookie } from "../../../helper/cookie";
import { generateIdToCorrectFormat } from "../../../helper/helperFunctions";

export const GameData = {
  username: "",

  owner: "",
  guest: "",

  ownerCharacter: "",
  guestCharacter: "",

  ownerScore: 0,
  guestScore: 0,

  roomID: "",
};
