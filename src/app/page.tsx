'use client'
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const input_placefolder_text: string = '入力してください';
  const textRef = useRef<any>('');
  const [getText, setGetText] = useState<any>(null);
  const [currentStatus, setCurrentStatus] = useState<string>('ロード中です。');

  useEffect(() => {
    setGetText(localStorage.getItem('storagekey'));
    if (!getText) {
      setCurrentStatus('現在ローカルストレージにはデータは保存されていません。')
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    textRef.current.value.length ? setGetText(textRef.current?.value) : null;
  }

  useEffect(() => {
    const dataGeter: any = localStorage.getItem('storagekey');
    setGetText(dataGeter);
    console.log(getText);

  }, []);


  useEffect(() => {
    console.log(textRef.current.value.length);
    textRef.current.value = '';
    getText ?
      localStorage.setItem('storagekey', getText)
      : null
  }, [getText]);


  const handleClear: any = () => {
    setGetText('');
    localStorage.setItem('storagekey', '')
  }


  return (
    <div>
      <h1 className='text-3xl text-center my-2'>Input App</h1>
      <p className='text-xl text-center my-2'>This App is created by <span className='text-xl text-violet-800 hover:cursor-pointer'>~Ryotaro~</span></p>
      <h2 className='main_title'>inputタグに打ち込んだ文字を<br />ローカルストレージに保存してみよう</h2>
      <form onSubmit={handleSubmit} className='my-5 text-center' action="">
        <input ref={textRef} type="text" className='w-64 h-10 px-4 py-2 bg-gray-200 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' placeholder={input_placefolder_text} />
        <button type='submit' id="myButton" className="bg-blue-500 hover:bg-blue-600 text-white font-bold mx-5 py-2 px-4 rounded transition duration-300">
          入力
        </button>
      </form>

      <div className='text-center'>
        {getText ?
          <div>
            <p>{`現在ローカルストレージには『${getText}』というデータが保存されています。`}</p>
            <button onClick={handleClear} id="myButton" className="bg-pink-500 hover:bg-pink-600 text-white font-bold mx-5 py-1 px-2 rounded transition duration-300">
              CLEAE
            </button>
          </div>
          :
          // <p>{`現在ローカルストレージにはデータは保存されていません。`}</p>
          <p>{currentStatus}</p>
        }
      </div>
      <hr className='my-5' />
    </div>
  )
}
