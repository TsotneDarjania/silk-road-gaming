import React, {useRef} from "react";
import style from "./donationpage.module.css";

const DonationPage = () => {
    const accountRef = useRef(null)
    const account_number = '0101010110101110'
    const copyToClipBoard = async () => {
      try{
        // console.log(accountRef.current.value)
        // await navigator.clipboard.writeText(accountRef.current.value);
        console.log(accountRef.current.select)
        accountRef.current.select()
        document.execCommand('copy')
      } catch(err) {
        console.log('FAILED TO COPY', err)
      }
    }

  return (
    <div className={style.donationContainer}>
      <div className={style.textBox}>
        Our designer strongly dislikes using Lorem Ipsum text, considering it
        distasteful and unappealing. As a tribute to their preference, we have
        chosen to replace Lorem Ipsum with the following text whenever we need
        placeholder contents
      </div>
      <div className={style.numberBox}>
        <input type="text" ref={accountRef} value={account_number} readOnly/>
        <button onClick={() => copyToClipBoard()}>copy</button>
      </div>
    </div>
  );
};

export default DonationPage;
