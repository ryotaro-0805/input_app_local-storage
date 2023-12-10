'use client'
import { useEffect, useRef, useState } from 'react';
import Revise from './components/Revise';

export default function Home() {
  const input_placefolder_text: string = '入力してください';
  const textRef = useRef<any>('');
  const [getText, setGetText] = useState<any>([]);
  const [currentStatus, setCurrentStatus] = useState<any>('ロード中です。');
  const [registerText, setRegisterText] = useState<any>([]);
  const [modeRevise, setModeRevise] = useState<boolean>(false);

  useEffect(() => {
    const getArray: any = localStorage.getItem("storagekey");
    if (getArray === null) {
      setCurrentStatus('現在ローカルストレージにはデータは保存されていません。');
    } else {
      if (getArray.length > 2) {
        setGetText(JSON.parse(getArray));
      } else {
        setCurrentStatus('現在ローカルストレージにはデータは保存されていません。');
      }
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    textRef.current.value.length ? setGetText((e: any) => [...e, textRef.current?.value]) : null;
  }

  useEffect(() => {
    textRef.current.value = '';
    if (getText.length) {
      setRegisterText(JSON.stringify(getText));
    }
  }, [getText]);

  useEffect(() => {
    localStorage.setItem("storagekey", registerText)
  }, [registerText]);

  const handleClear: any = async () => {
    setGetText([]);
    setRegisterText([]);
    // localStorage.setItem("storagekey", JSON.stringify(registerText));
    localStorage.removeItem("storagekey");
    setCurrentStatus('現在ローカルストレージにはデータは保存されていません。')
  }

  const handleStorageClear = () => {
    setGetText([]);
    localStorage.removeItem("storagekey");
    setCurrentStatus(
      <>
        <p>Local Storageをクリアーしました。</p>
        <p>
          リロードするとキーが再生成されますのでこのままタブを閉じてください。
        </p>
      </>
    )
  }

  const handleEdit = (e: any) => {
    const getTag = e.currentTarget.parentElement.querySelector('p');
    // const getText = document.querySelectorAll('.textGetter');
    // console.log(getText[2].textContent);
    console.log(getTag.textContent.slice(2));
    setModeRevise(true);

    // console.log(e.currentTarget.parentElement);
  }

  const handleDelete = (e: any) => {
    const updatedText = [...getText];
    updatedText.splice(e, 1);
    setGetText(updatedText);
    localStorage.setItem("storagekey", JSON.stringify(updatedText));
    if (!updatedText.length) {
      setCurrentStatus('現在ローカルストレージにはデータは保存されていません。')
      console.log('run');

    }
    console.log(updatedText.length);
  }

  return (
    <div>
      <h1 className='text-3xl text-center my-2'>Input App</h1>
      <p className='text-xl text-center my-2'>This App is created by <span className='text-xl text-pink-400 hover:cursor-pointer'>~Ryotaro~</span></p>
      <h2 className='main_title'>inputタグに打ち込んだ文字を<br />ローカルストレージに保存してみよう</h2>
      <form onSubmit={handleSubmit} className='my-5 text-center' action="">
        <input ref={textRef} type="text" className='w-64 h-10 px-4 py-2 bg-gray-200 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' placeholder={input_placefolder_text} />
        <button type='submit' id="myButton" className="bg-blue-500 hover:bg-blue-600 text-white font-bold mx-5 py-2 px-4 rounded transition duration-300">
          入力
        </button>
        <button onClick={handleStorageClear} className='bg-yellow-500  hover:bg-yellow-600 text-white font-bold m-5 py-2 px-4 rounded transition duration-300'>Local Storage Cleare</button>
      </form>

      <div className='text-center'>
        {getText.length ?
          <div>
            <p>現在ローカルストレージには<br />以下のデーターが保存されています。</p>
            {getText.map((data: any, index: number) => (
              <div key={index}>
                <div className='w-64 flex m-auto'>
                  <p className='textGetter mx-auto my-2 text-left w-3/4 overflow-hidden'>{`${index + 1}. ${data}`}</p>
                  <button onClick={handleEdit} className=' bg-green-50 rounded-lg border border-green-500 text-xs w-3/12 justify-end duration-200 hover:bg-green-100'>編集</button>
                  <button onClick={() => handleDelete(index)} className=' bg-pink-50 rounded-lg border border-pink-500 text-xs w-3/12 justify-end duration-200 hover:bg-pink-100 ml-3'>削除</button>
                </div>
                <hr className='m-auto text-left w-64' />
              </div>
            ))}
            <button onClick={handleClear} id="myButton" className="bg-pink-500 hover:bg-pink-600 text-white font-bold m-5 py-1 px-2 rounded transition duration-300">
              CLEAR
            </button>
          </div>
          : currentStatus
        }
      </div>
      <hr className='my-5' />
      {modeRevise ?
        <Revise /> :
        null}
    </div>
  )
}
