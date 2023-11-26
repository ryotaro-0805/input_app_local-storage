import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const input_placefolder_text: string = '入力してください';
  const textRef = useRef<any>('');
  const [getText, setGetText] = useState<any>([]);
  const [currentStatus, setCurrentStatus] = useState<string>('ロード中です。');
  const [registerText, setRegisterText] = useState<any>([]);

  useEffect(() => {
    const getArray: any = localStorage.getItem("storagekey");
    if (getArray.length > 2) {
      setGetText(JSON.parse(getArray));
    } else {
      setCurrentStatus('現在ローカルストレージにはデータは保存されていません。');
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    textRef.current.value.length ? setGetText((e: any) => [...e, textRef.current?.value]) : null;
  }

  useEffect(() => {
    textRef.current.value = '';
    setRegisterText(JSON.stringify(getText));
  }, [getText]);

  useEffect(() => {
    localStorage.setItem("storagekey", registerText)
  }, [registerText]);

  const handleClear: any = () => {
    setGetText([]);
    setRegisterText([]);
    localStorage.setItem("storagekey", JSON.stringify(registerText));
    setCurrentStatus('現在ローカルストレージにはデータは保存されていません。')
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
      </form>

      <div className='text-center'>
        {getText.length ?
          <div>
            <p>現在ローカルストレージには以下のデーターが保存されています。</p>
            {getText.map((data: any, index: number) => (
              <div key={index}>
                <p className='m-auto text-left w-64'>{`${index + 1}. ${data}`}</p>
                <hr className='m-auto text-left w-64' />
              </div>
            ))}
            <button onClick={handleClear} id="myButton" className="bg-pink-500 hover:bg-pink-600 text-white font-bold mx-5 py-1 px-2 rounded transition duration-300">
              CLEAE
            </button>
          </div>
          :
          <p>{currentStatus}</p>
        }
      </div>
      <hr className='my-5' />
    </div>
  )
}
