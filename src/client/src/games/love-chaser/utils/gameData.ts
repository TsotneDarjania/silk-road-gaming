import { transliterate } from "transliteration";
import { getCookie } from "../../../helper/cookie";
import { generateIdToCorrectFormat } from "../../../helper/helperFunctions";

export const GameData = {
  username: JSON.parse(getCookie("loginSession")).userName,

  owner: "",
  guest: "",

  ownerCharacter: "",
  guestCharacter: "",

  roomID: `${window.location.href}/${generateIdToCorrectFormat(
    transliterate(JSON.parse(getCookie("loginSession")).userName)
  )}`,
};
